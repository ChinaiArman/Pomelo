import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

import TransactionsTable from '../components/TransactionsTable';
import AddTransactionModal from '../components/AddTransactionModal';

const Categories = () => {
    const [searchParams] = useSearchParams();
    const spendingCategoryID = searchParams.get("id");
    const [spendingCategory, setSpendingCategory] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [amountUsed, setAmountUsed] = useState([]);
    const [budgetLimit, setBudgetLimit] = useState([]);
    const [spendingCategoryName, setSpendingCategoryName] = useState([]);

    const [newTransactionName, setNewTransactionName] = useState('');
    const [newTransactionAmount, setNewTransactionAmount] = useState('');
    const [newTransactionSpendingCategoryName, setNewTransactionSpendingCategoryName] = useState('');
    const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await axios.get('http://localhost:5000/getSpendingCategoryByID', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID"), "spendingCategoryID": spendingCategoryID } })
            .then(response => {
                if (response.data.data === null) {
                    window.location.href = '/404';
                }
                setSpendingCategoryName(response.data.data.spendingCategoryName);
                setSpendingCategory(response.data.data);
                setAmountUsed(response.data.data.amountUsed);
                setBudgetLimit(response.data.data.budgetLimit);
            }).catch(error => {
                console.log(error);
            });
        await axios.get('http://localhost:5000/getTransactionsBySpendingCategory', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID"), "spendingCategoryID": spendingCategoryID } })
            .then(response => {
                if (response.data.data === null) {
                    window.location.href = '/404';
                }
                setTransactions(response.data.data);
            }).catch(error => {
                console.log(error);
            });
    }

    let createNewTransaction = async function (event) {
        event.preventDefault();
        if (newTransactionSpendingCategoryName === spendingCategoryName) {
            var newTransactionSpendingCategoryID = spendingCategory.spendingCategoryID;
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

    const openAddTransactionModal = () => {
        setIsAddTransactionModalOpen(true);
    };
  
      const closeAddTransactionModal = () => {
        setIsAddTransactionModalOpen(false);
    };

    return (
        <div className="categories">
            <h1>{spendingCategoryName}</h1>
            <p>Amount Used: {amountUsed}</p>
            <p>Budget Limit: {budgetLimit}</p>
            <img className="rounded-t-lg" src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt="" />
            <p>Transactions</p>
            <TransactionsTable transactions={transactions} />
            <button
                className="bg-primary-500 hover:bg-primary-700 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={openAddTransactionModal}
                >
                Add Transaction
            </button>
            {isAddTransactionModalOpen && (
                <AddTransactionModal 
                onClose={closeAddTransactionModal}
                createNewTransaction={createNewTransaction}
                setNewTransactionName={setNewTransactionName}
                setNewTransactionAmount={setNewTransactionAmount}
                setNewTransactionSpendingCategoryName={setNewTransactionSpendingCategoryName}
                spendingCategories={[spendingCategory]}
                />
            )}
        </div>
    );
}

export default Categories;