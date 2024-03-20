import { useState, useEffect } from 'react';
import axios from 'axios';
import InfoCard from '../components/InfoCard';
import CategoryCard from '../components/CategoryCard';
import CreateCategoryModal from "../components/CreateCategoryModal";
import TransactionsTable from '../components/TransactionsTable';

const Home = () => {
    const [totalSpent, setTotalSpent] = useState('');
    const [totalBudget, setTotalBudget] = useState('');
    const [spendingCategories, setSpendingCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [newSpendingCategory, setNewSpendingCategory] = useState('');
    const [newSpendingCategoryBudgetLimit, setNewSpendingCategoryBudgetLimit] = useState('');
    const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);

    const [newTransactionName, setNewTransactionName] = useState('');
    const [newTransactionAmount, setNewTransactionAmount] = useState('');
    const [newTransactionSpendingCategoryName, setNewTransactionSpendingCategoryName] = useState('');

    const [isLeader, setIsLeader] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await axios.get('http://localhost:5000/getTeamSpaceTotalBudget', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                setTotalBudget(response.data.data.totalBudget);
            }).catch(error => {
                console.log(error);
            });
        await axios.get('http://localhost:5000/getTeamSpaceTotalAmountUsed', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                setTotalSpent(response.data.data.totalAmountUsed);
            }).catch(error => {
                console.log(error);
            });
        await axios.get('http://localhost:5000/getAllSpendingCategories', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                setSpendingCategories(response.data.data);
            }).catch(error => {
                console.log(error);
            });
        await axios.get('http://localhost:5000/getRecentTransactions', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                console.log('transactions', response.data)
                setTransactions(response.data.data.recentTransactions);
            }).catch(error => {
                console.log(error);
            });

        await axios.get('http://localhost:5000/getTeamSpaceByID', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                if (response.data.data.teamSpaceLeaderUserID === window.localStorage.getItem("userID")) {
                    setIsLeader(true);
                } else {
                    setIsLeader(false);
                }
            }).catch(error => {
                console.log(error);
            });
    };

    let createNewSpendingCategory = async function (event) {
        event.preventDefault();
        await axios.get('http://localhost:5000/getTeamSpaceByID', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(async response => {
                if (response.data.data.teamSpaceLeaderUserID === window.localStorage.getItem("userID")) {
                    await axios.post('http://localhost:5000/createSpendingCategory', {
                        "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
                        "spendingCategoryName": newSpendingCategory,
                        "budgetLimit": Number(newSpendingCategoryBudgetLimit)
                    }).then(response => {
                        console.log(response);
                        fetchData();
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    alert("You are not the leader of this team space")
                }
            }).catch(error => {
                console.log(error);
            });
    }

    let createNewTransaction = async function (event) {
        event.preventDefault();
        for (let i = 0; i < spendingCategories.length; i++) {
            if (newTransactionSpendingCategoryName === spendingCategories[i].spendingCategoryName) {
                var newTransactionSpendingCategoryID = spendingCategories[i].spendingCategoryID;
            }
        }
        await axios.post('http://localhost:5000/createTransaction', {
            "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
            "spendingCategoryID": newTransactionSpendingCategoryID,
            "spendingCategoryName": newTransactionSpendingCategoryName,
            "userID": window.localStorage.getItem("userID"),
            "username": window.localStorage.getItem("username"),
            "transactionName": newTransactionName,
            "transactionAmount": Number(newTransactionAmount)
        }).then(response => {
            console.log(response);
            fetchData();
        }).catch(error => {
            console.log(error);
        })
    }

    const openCreateCategoryModal = () => {
      setIsCreateCategoryModalOpen(true);
    };

    const closeCreateCategoryModal = () => {
      setIsCreateCategoryModalOpen(false);
    };


    return (
      <div className="home flex flex-col items-center justify-center">
        <div>
          <h1>Hello {window.localStorage.getItem("username")}</h1>
        </div>

        <div className="flex">
          <InfoCard title="Total Budget" value={totalBudget} />
          <InfoCard title="Amount Used" value={totalSpent} />
        </div>
        <div className="flex flex-wrap">
          {spendingCategories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>

        {isLeader && (
          <button
            className="bg-primary-500 hover:bg-primary-700 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={openCreateCategoryModal}
          >
            Create Spending Category
          </button>
        )}

        {isCreateCategoryModalOpen && (
          <CreateCategoryModal
            onClose={closeCreateCategoryModal}
            createNewSpendingCategory={createNewSpendingCategory}
            setNewSpendingCategory={setNewSpendingCategory}
            setNewSpendingCategoryBudgetLimit={
              setNewSpendingCategoryBudgetLimit
            }
          />
        )}

        <TransactionsTable transactions={transactions} />
      </div>
    );
}

export default Home;