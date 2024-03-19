import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [totalSpent, setTotalSpent] = useState('');
    const [totalBudget, setTotalBudget] = useState('');
    const [spendingCategories, setSpendingCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);

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
    };

    return (
        <div className="home">
            <div>
                <h1>Hello {window.localStorage.getItem("username")}</h1>
            </div>
            <br>
            </br>
            <br>
            </br>
            <div>
                <p>Total Budget: {totalBudget}</p>
                <p>Amount Used: {totalSpent}</p>
            </div>
            <br>
            </br>
            <br>
            </br>
            <div>
                <h2>Spending Categories</h2>
                <ul>
                    {spendingCategories.map((category, index) => {
                        return (
                            <li key={index}>
                                <p>Spending Category: {category.spendingCategoryName}</p>
                                <p>Budget Limit: {category.budgetLimit}</p>
                                <p>Amount Used: {category.amountUsed}</p>
                                <br>
                                </br>
                            </li>
                        );
                    })}
                </ul>
                <button>Add Spending Category</button>
            </div>
            <br>
            </br>
            <br>
            </br>
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
                                <br>
                                </br>
                            </li>
                        );
                    })}
                </ul>
                <button>Add transactions</button>
            </div>
        </div>
    );
}

export default Home;