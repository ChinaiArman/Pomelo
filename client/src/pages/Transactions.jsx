import { useState, useEffect } from 'react';
import axios from 'axios';

import TransactionsTable from '../components/TransactionsTable';
import AddTransactionModal from '../components/AddTransactionModal';

const Transactions = () => {
    const [spendingCategories, setSpendingCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [newTransactionName, setNewTransactionName] = useState('');
    const [newTransactionAmount, setNewTransactionAmount] = useState('');
    const [newTransactionSpendingCategoryName, setNewTransactionSpendingCategoryName] = useState('');
    const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await axios.get('http://localhost:5000/getAllTransactions', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                setTransactions(response.data.data);
            }).catch(error => {
                console.log(error);
            });
        await axios.get('http://localhost:5000/getAllSpendingCategories', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                setSpendingCategories(response.data.data);
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

    const openAddTransactionModal = () => {
        setIsAddTransactionModalOpen(true);
      };
  
      const closeAddTransactionModal = () => {
        setIsAddTransactionModalOpen(false);
      };

    return (
        <div className="transactions">
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
                spendingCategories={spendingCategories}
            />
         )}
        </div>
        
    );
}

export default Transactions;