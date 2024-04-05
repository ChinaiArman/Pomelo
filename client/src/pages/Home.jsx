import { useState, useEffect } from 'react';
import axios from 'axios';
import Jumbotron from '../components/Jumbotron';
import Landing from './Landing';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const BASE_SERVER_URL = "http://comp-3962-term-project-refactore-env.eba-dxvdjjmk.us-west-2.elasticbeanstalk.com";

const Home = () => {
  if (!window.localStorage.getItem("userID")) {
    return <Landing />;
  }
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
    await axios.get(`${BASE_SERVER_URL}/getTeamSpaceTotalBudget`, { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
      .then(response => {
        setTotalBudget(response.data.data.totalBudget);
      }).catch(error => {
        console.log(error);
      });
    await axios.get(`${BASE_SERVER_URL}/getTeamSpaceTotalAmountUsed`, { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
      .then(response => {
        setTotalSpent(response.data.data.totalAmountUsed);
      }).catch(error => {
        console.log(error);
      });
    await axios.get(`${BASE_SERVER_URL}/getAllSpendingCategories`, { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
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
    await axios.get(`${BASE_SERVER_URL}/getRecentTransactions`, { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
      .then(response => {
        setTransactions(response.data.data.recentTransactions);
      }).catch(error => {
        console.log(error);
      });

    await axios.get(`${BASE_SERVER_URL}/getTeamSpaceByID`, { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
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
    await axios.get(`${BASE_SERVER_URL}/getTeamSpaceByUserID`, { params: { "userID": window.localStorage.getItem("userID") } })
      .then(response => {
        if (response.data.data === null) {
          window.localStorage.removeItem("teamSpaceID")
          window.location.replace('/register')
        }
      }).catch(error => {
        console.log(error)
      });
  };

  return (
    <div>
      <NavBar />
      <div className="home flex flex-col items-center justify-center">

        <div className="flex">
          <Jumbotron
            username={window.localStorage.getItem("username")}
            transactions={transactions}
            spendingCategory={largestSpendingCategory}
            teamSpaceName={teamSpaceName}
            totalBudget={totalBudget}
            totalSpent={totalSpent}
            spendingCategories={spendingCategories}
            isLeader={isLeader}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;