import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [totalSpent, setTotalSpent] = useState('');
    const [totalBudget, setTotalBudget] = useState('');
    const [spendingCategories, setSpendingCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [newSpendingCategory, setNewSpendingCategory] = useState('');
    const [newSpendingCategoryBudgetLimit, setNewSpendingCategoryBudgetLimit] = useState('');


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

    let createNewSpendingCategory = async function (event) {
        event.preventDefault();
        await axios.get('http://localhost:5000/getTeamSpaceByID', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(async response => {
                if (response.data.data.teamSpaceLeaderUserID === window.localStorage.getItem("userID")) {
                    await axios.post('http://localhost:5000/createSpendingCategory', {
                        "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
                        "spendingCategoryName": newSpendingCategory,
                        "budgetLimit": newSpendingCategoryBudgetLimit
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
                <div>
                    <h1>Create Spending Category</h1>
                    <form onSubmit={createNewSpendingCategory}>
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder="Enter the name of the spending category" onChange={e => setNewSpendingCategory(e.target.value)} required />
                        </div>
                        <div>
                            <label>Budget Limt</label>
                            <input type="text" placeholder="Enter a budget limit" onChange={e => setNewSpendingCategoryBudgetLimit(e.target.value)} required />
                        </div>
                        <button>Create Spending Category</button>
                    </form>
                </div>
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