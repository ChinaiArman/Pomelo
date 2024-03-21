import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import TransactionsTable from '../components/TransactionsTable';
import CreateTransactionModal from '../components/CreateTransactionModal';
import InfoCard from '../components/InfoCard';
import EditCategoryModal from '../components/EditCategoryModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const Categories = () => {
    const [searchParams] = useSearchParams();
    const spendingCategoryID = searchParams.get("id");
    const [spendingCategory, setSpendingCategory] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [amountUsed, setAmountUsed] = useState([]);
    const [budgetLimit, setBudgetLimit] = useState([]);
    const [spendingCategoryName, setSpendingCategoryName] = useState([]);

    const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

    const [isLeader, setIsLeader] = useState(false);

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

    const openEditCategoryModal = () => {
        setIsEditCategoryModalOpen(true);
    };
  
      const closeEditCategoryModal = () => {
        setIsEditCategoryModalOpen(false);
    };

    const openAddTransactionModal = () => {
        setIsAddTransactionModalOpen(true);
    };
  
    const closeAddTransactionModal = () => {
        setIsAddTransactionModalOpen(false);
    };

    const openConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(true)
    }

    const closeConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false)
    }

    return (
        <div className="categories flex flex-col items-center justify-center">
                <h1 className="text-4xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {spendingCategoryName}
                </h1>

            <div className='flex items-center justify-center'>
                <InfoCard title="Amount Used" value={amountUsed} />
                <InfoCard title="Budget Limit" value={budgetLimit} />
            </div>
            
            <img className="rounded-t-lg" src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt="" />

            {isLeader && (
                <div className="flex my-5">
                    <button 
                        className="bg-gray-500 hover:bg-gray-400 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center mr-2"
                        onClick={openEditCategoryModal}
                    >
                        <span className="flex items-center">
                            <CiEdit className="mr-1" size={20}/>
                            Edit Category
                        </span>
                    </button>
                    <button 
                        className="bg-red-500 hover:bg-red-400 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center mr-2"
                        onClick={openConfirmDeleteModal}
                    >
                        <span className="flex items-center">
                            <MdDeleteOutline className='mr-1' size={20}/>
                            Delete Category
                        </span>
                     </button>
                 </div>
            )}

            {isEditCategoryModalOpen && (
                <EditCategoryModal 
                    onClose={closeEditCategoryModal}
                    currentCategoryName={spendingCategoryName}
                    currentBudgetLimit={budgetLimit}
                    spendingCategoryID={spendingCategoryID}
                />
            )}
            {isConfirmDeleteModalOpen && (
                <ConfirmDeleteModal 
                    itemName={spendingCategoryName}
                    onClose={closeConfirmDeleteModal}
                    type="Spending Category"
                    itemID={spendingCategoryID}
                />
            )}

            <div>
                <p>Transactions</p>
                <TransactionsTable transactions={transactions} />
                <button
                    className="bg-primary-500 hover:bg-primary-700 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={openAddTransactionModal}
                    >
                    Add Transaction
                </button>
                {isAddTransactionModalOpen && (
                    <CreateTransactionModal 
                    onClose={closeAddTransactionModal}
                    spendingCategories={[spendingCategory]}
                    fetchData={fetchData}
                    />
                )}
            </div>
        </div>
    );
}

export default Categories;