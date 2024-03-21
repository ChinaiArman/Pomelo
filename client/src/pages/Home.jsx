import { useState, useEffect } from 'react';
import axios from 'axios';
import { VscDiffAdded } from "react-icons/vsc";


import InfoCard from '../components/InfoCard';
import Jumbotron from '../components/Jumbotron';
import CategoryCard from '../components/CategoryCard';
import CreateCategoryModal from "../components/CreateCategoryModal";
import CreateTransactionModal from '../components/CreateTransactionModal';
import LatestTransactionsCard from '../components/LatestTransactionsCard';

const Home = () => {
  const [teamSpaceName, setTeamSpaceName] = useState('')
  const [totalSpent, setTotalSpent] = useState('');
  const [totalBudget, setTotalBudget] = useState('');
  const [spendingCategories, setSpendingCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [largestSpendingCategory, setLargestSpendingCategory] = useState('');

  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);

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
        let currLargest = response.data.data[0];
        for (let i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].amountUsed > currLargest.amountUsed) {
            currLargest = response.data.data[i];
          }
        }
        setLargestSpendingCategory(currLargest);
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
    await axios.get('http://localhost:5000/getTeamSpaceByUserID', { params: { "userID": window.localStorage.getItem("userID") } })
      .then(response => {
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


  return (
    <div className="home flex flex-col items-center justify-center">

      <div className="flex">
        {/* <InfoCard title="Total Budget" value={totalBudget} />
        <InfoCard title="Amount Used" value={totalSpent} /> */}
        <Jumbotron username={window.localStorage.getItem("username")} transactions={transactions} spendingCategory={largestSpendingCategory} teamSpaceName={teamSpaceName} />
      </div>
      <div className="flex flex-wrap items-center justify-center mt-5 mb-5" id="categories">
        {spendingCategories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}

        {isLeader && (
          <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-5 mr-5 h-36 w-36 flex items-center justify-center cursor-pointer" onClick={openCreateCategoryModal}>
            <VscDiffAdded size={80} />
          </div>
        )}
      </div>

      {isCreateCategoryModalOpen && (
        <CreateCategoryModal
          onClose={closeCreateCategoryModal}
        />
      )}
    </div>
  );
}

export default Home;