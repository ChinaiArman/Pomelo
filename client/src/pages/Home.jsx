import { useState, useEffect } from 'react';
import axios from 'axios';
import { VscDiffAdded } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";


import InfoCard from '../components/InfoCard';
import CategoryCard from '../components/CategoryCard';
import CreateCategoryModal from "../components/CreateCategoryModal";
import TransactionsTable from '../components/TransactionsTable';
import CreateTransactionModal from '../components/CreateTransactionModal';
import EditTeamSpaceModal from '../components/EditTeamSpaceModal';
import LatestTransactionsCard from '../components/LatestTransactionsCard';

const Home = () => {
    const [teamSpaceName, setTeamSpaceName] = useState('')
    const [totalSpent, setTotalSpent] = useState('');
    const [totalBudget, setTotalBudget] = useState('');
    const [spendingCategories, setSpendingCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
    const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
    const [isEditTeamSpaceModalOpen, setIsEditTeamSpaceModalOpen] = useState(false);

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
                setTransactions(response.data.data.recentTransactions);
            }).catch(error => {
                console.log(error);
            });

        await axios.get('http://localhost:5000/getTeamSpaceByID', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                setTeamSpaceName(response.data.data.teamSpaceName);
                if (response.data.data.teamSpaceLeaderUserID === window.localStorage.getItem("userID")) {
                    setIsLeader(true);
                } else {
                    setIsLeader(false);
                }
            }).catch(error => {
                console.log(error);
            });
        await axios.get('http://localhost:5000/getTeamSpaceByUserID', { params: { "userID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
              console.log(response.data.data)
              if (response.data.data === null) {
                    window.localStorage.removeItem("teamSpaceID")
                    window.location.replace('/register')
              }
            }).catch(error => {
                console.log(error)
            });
    };

    const openCreateCategoryModal = () => {
      setIsCreateCategoryModalOpen(true);
    };

    const closeCreateCategoryModal = () => {
      setIsCreateCategoryModalOpen(false);
    };

    const openAddTransactionModal = () => {
      setIsAddTransactionModalOpen(true);
    };

    const closeAddTransactionModal = () => {
      setIsAddTransactionModalOpen(false);
    };

    const openEditTeamSpaceModal = () => {
      setIsEditTeamSpaceModalOpen(true);
    };

    const closeEditTeamSpaceModal = () => {
      setIsEditTeamSpaceModalOpen(false);
    };


    return (
      <div className="home flex flex-col items-center justify-center">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Hello {window.localStorage.getItem("username")}</h1>
            <h2 className="text-l text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Team Space: {teamSpaceName}</h2>
          </div>
          {isLeader && (
            <button 
            className="bg-gray-500 hover:bg-gray-400 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center mr-2"
            style={{ position: "absolute", right: 0 }}
            onClick={openEditTeamSpaceModal}
            >
              <span className="flex items-center">
                <CiEdit className="mr-1" />
                Edit Team Space
              </span>
            </button>
          )}

          {isEditTeamSpaceModalOpen && (
            <EditTeamSpaceModal 
              onClose={closeEditTeamSpaceModal}
              currentTeamName={teamSpaceName}
              currentTotalBudget={totalBudget}
              fetchData={fetchData}
            />
          )}
        </div>

        <div className="flex">
          <InfoCard title="Total Budget" value={totalBudget} />
          <InfoCard title="Amount Used" value={totalSpent} />
        </div>
        <div className="flex flex-wrap items-center justify-center mt-5 mb-5">
          {spendingCategories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}

        {isLeader && (
            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-5 mr-5 h-36 w-36 flex items-center justify-center cursor-pointer" onClick={openCreateCategoryModal}>
                <VscDiffAdded  size={80}/>
            </div>
        )}
        </div>

        {isCreateCategoryModalOpen && (
          <CreateCategoryModal
            onClose={closeCreateCategoryModal}
            fetchData={fetchData}
          />
        )}

        <LatestTransactionsCard transactions={transactions} />
        <button
            className="bg-primary-500 hover:bg-primary-700 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={openAddTransactionModal}
          >
            Add Transaction
          </button>
         {isAddTransactionModalOpen && (
          <CreateTransactionModal 
            onClose={closeAddTransactionModal}
            spendingCategories={spendingCategories}
            fetchData={fetchData}
          />
         )}
      </div>
    );
}

export default Home;