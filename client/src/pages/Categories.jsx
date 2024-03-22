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
import { currencyFormatter } from '../utils';

const Categories = () => {
    const [searchParams] = useSearchParams();
    const spendingCategoryID = searchParams.get("id");
    const [spendingCategory, setSpendingCategory] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [amountUsed, setAmountUsed] = useState([]);
    const [budgetLimit, setBudgetLimit] = useState([]);
    const [spendingCategoryName, setSpendingCategoryName] = useState([]);
    const [image, setImage] = useState("https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg");


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
                setImage(response.data.data.styles.image);
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
        <div className="categories">
            <h2 className="flex justify-center text-gray-900 dark:text-white text-3xl font-extrabold mt-5">{spendingCategoryName}</h2>
            <section>
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-8">
                    <div className="bg-theme-cornsilk dark:bg-gray-800 border border-theme-cornsilk dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
                        <div className="flex items-center justify-center">
                            <div className="text-center flex-1">
                                <h3 className="text-gray-900 dark:text-white text-3xl font-medium mb-2">Amount Used</h3>
                                <p className="text-9xl">{currencyFormatter.format(amountUsed)}</p>
                            </div>
                            <div className="mx-5 h-20 min-h-[1em] w-0.5 bg-gray-300 dark:bg-white/10"></div>
                            <div className="text-center flex-1">
                                <h3 className="text-gray-900 dark:text-white text-3xl font-medium mb-">Total Budget</h3>
                                <p className="text-9xl">{currencyFormatter.format(budgetLimit)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-theme-cornsilk dark:bg-gray-800 border border-theme-cornsilk dark:border-gray-700 rounded-lg p-8 md:pt-12 mb-8">
                        <div className="flex items-center justify-center">
                            <img className="rounded-t-lg w-960 h-540" src={image} alt="" />
                        </div>
                        <div className="flex items-center justify-center">
                            {isLeader && (
                                <div className="flex my-5">
                                    <button
                                        className="bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center mr-2"
                                        onClick={openEditCategoryModal}
                                    >
                                        <span className="flex items-center">
                                            <CiEdit className="mr-1" size={20} />
                                            Edit Category
                                        </span>
                                    </button>
                                    <button
                                        className="bg-theme-coral hover:bg-theme-bittersweet focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center mr-2"
                                        onClick={openConfirmDeleteModal}
                                    >
                                        <span className="flex items-center">
                                            <MdDeleteOutline className='mr-1' size={20} />
                                            Delete Category
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                
                    <div className="bg-theme-cornsilk dark:bg-gray-800 border border-theme-cornsilk dark:border-gray-700 rounded-lg p-8 md:p-12 mt-8">
                        <div className="transactions flex flex-col items-center justify-center">
                            <h2 className="flex justify-center text-gray-900 dark:text-white text-2xl font-bold mb-5">Transactions</h2>
                            <TransactionsTable transactions={transactions} />
                            <button
                                className="mt-4 bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={openAddTransactionModal}
                            >
                                Add Transaction
                            </button>
                            {isAddTransactionModalOpen && (
                                <CreateTransactionModal
                                    onClose={closeAddTransactionModal}
                                    spendingCategories={[spendingCategory]}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
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
        </div>
    );
}

export default Categories;