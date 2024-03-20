import { useState, useEffect } from 'react';
import axios from 'axios';
import InfoCard from '../components/InfoCard';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
    const [totalSpent, setTotalSpent] = useState('');
    const [totalBudget, setTotalBudget] = useState('');
    const [spendingCategories, setSpendingCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [newSpendingCategory, setNewSpendingCategory] = useState('');
    const [newSpendingCategoryBudgetLimit, setNewSpendingCategoryBudgetLimit] = useState('');

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
        await axios.get('http://localhost:5000/getAllTransactions', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                setTransactions(response.data.data);
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
       
          <div>
          <div>
            <h1>Create Spending Category</h1>
            <form onSubmit={createNewSpendingCategory}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter the name of the spending category"
                  onChange={(e) => setNewSpendingCategory(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Budget Limt</label>
                <input
                  type="text"
                  placeholder="Enter a budget limit"
                  onChange={(e) =>
                    setNewSpendingCategoryBudgetLimit(e.target.value)
                  }
                  required
                />
              </div>
              <button>Create Spending Category</button>
            </form>
          </div>
        </div>
        <br></br>
        <br></br>
        <div>
          <h2>Transactions</h2>
          <ul>
            {transactions.map((transaction, index) => {
              return (
                <li key={index}>
                  <p>{transaction.transactionName}</p>
                  <p>Amount: {transaction.transactionAmount}</p>
                  <p>Spending Category: {transaction.spendingCategoryName}</p>
                  <p>User: {transaction.username}</p>
                  <br></br>
                </li>
              );
            })}
          </ul>
          <div>
            <h1>Create Transaction</h1>
            <form onSubmit={createNewTransaction}>
              <div>
                <label>Spending Category</label>
                <input
                  type="text"
                  placeholder="Enter the name of the spending category"
                  onChange={(e) =>
                    setNewTransactionSpendingCategoryName(e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label>Transaction Name</label>
                <input
                  type="text"
                  placeholder="Enter a transaction name"
                  onChange={(e) => setNewTransactionName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Transaction Amount</label>
                <input
                  type="text"
                  placeholder="Enter an amount"
                  onChange={(e) => setNewTransactionAmount(e.target.value)}
                  required
                />
              </div>
              <button>Create Transaction</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Home;