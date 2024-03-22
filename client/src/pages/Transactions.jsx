import { useState, useEffect } from 'react';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";

import TransactionsTable from '../components/TransactionsTable';
import CreateTransactionModal from '../components/CreateTransactionModal';
import NullSectionCard from '../components/NullSectionCard';

const Transactions = () => {
    const [spendingCategories, setSpendingCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);

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
        await axios.get('http://localhost:5000/getTeamSpaceByUserID', { params: { "userID": window.localStorage.getItem("userID") } })
            .then(response => {
                if (response.data.data === null) {
                    window.localStorage.removeItem("teamSpaceID")
                    window.location.replace('/register')
                }
            }).catch(error => {
                console.log(error)
            });
    }

    const openAddTransactionModal = () => {
        setIsAddTransactionModalOpen(true);
    };

    const closeAddTransactionModal = () => {
        setIsAddTransactionModalOpen(false);
    };

    if (transactions.length === 0) {
        return (
            <div className="transactions flex flex-col items-center justify-cente">
                <p>Transactions</p>
                <NullSectionCard
                    header="Oops, We couldn't find any transactions..."
                    body="Add a transaction to start tracking finances with Pomelo."
                />
                <button
                    className="mt-4 bg-primary-500 hover:bg-primary-700 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={openAddTransactionModal}
                >
                    Add Transaction
                </button>
                {isAddTransactionModalOpen && (
                    <CreateTransactionModal
                        onClose={closeAddTransactionModal}
                        spendingCategories={spendingCategories}
                    />
                )}
            </div>
        );
    }

    return (
         <>
         <h2 className="flex justify-center text-gray-900 dark:text-white text-3xl font-extrabold mb-5">Transactions</h2>
         <div className="transactions flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mt-8 mx-auto max-w-screen-xl">
         <TransactionsTable
             transactions={transactions}
         />
             <button
                 className="mt-4 bg-primary-500 hover:bg-primary-700 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                 onClick={openAddTransactionModal}
             >
                 Add Transaction
             </button>
             {isAddTransactionModalOpen && (
                 <CreateTransactionModal
                     onClose={closeAddTransactionModal}
                     spendingCategories={spendingCategories}
                 />
             )}
         </div>
         </>
    );
}

export default Transactions;