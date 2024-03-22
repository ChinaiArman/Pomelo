import { useState } from 'react';
import { currencyFormatter } from "../utils";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import EditTransactionModal from "./EditTransactionModal";
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const TransactionsTable = ({ transactions }) => {
    const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    
    const openEditTransactionModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsEditTransactionModalOpen(true);
    };
  
    const closeEditTransactionModal = () => {
        setIsEditTransactionModalOpen(false);
    };

    const openConfirmDeleteModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsConfirmDeleteModalOpen(true)
    }

    const closeConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false)
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg w-full items-center justify-center">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-theme-vanilla dark:bg-gray-700 dark:text-gray-400 text-center">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Item
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Spending Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => {
                        const categoryId = transaction.spendingCategoryID
                        var redirect = "/categories?id=" + categoryId;
                        return (
                            <tr 
                                key={index}     
                                className="bg-theme-oldlace border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-theme-floralwhite dark:hover:bg-gray-600 text-center"
                            >
                                <td className="px-6 py-4 flex justify-center">
                                    <a href={redirect}>
                                        <img className="w-8 h-8 rounded-full" src={transaction.styles.image} alt="image" />
                                    </a>
                                </td>
                                <td className="px-6 py-4">
                                    <a href={redirect}>
                                        {transaction.transactionName}
                                    </a>
                                </td>
                                <td className="px-6 py-4">
                                    <a href={redirect}>
                                        {currencyFormatter.format(transaction.transactionAmount)}
                                    </a>
                                </td>
                                <td className="px-6 py-4">
                                    <a href={redirect}>
                                        {transaction.spendingCategoryName}
                                    </a>
                                </td>
                                <td className="px-6 py-4">
                                    {transaction.username}
                                </td>
                                <td className="px-6 py-4">
                                    {transaction.transactionDate}
                                </td>
                                <td>
                                    <CiEdit className="mx-5 cursor-pointer" size={20} onClick={() => openEditTransactionModal(transaction)}/>
                                </td>
                                <td>
                                    <MdDeleteOutline className='mx-5 cursor-pointer' size={20} onClick={() => openConfirmDeleteModal(transaction)}/>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {isEditTransactionModalOpen && selectedTransaction && (
                <EditTransactionModal 
                    onClose={closeEditTransactionModal}
                    currentTransactionName={selectedTransaction.transactionName}
                    currentTransactionAmount={selectedTransaction.transactionAmount}
                    transactionID={selectedTransaction.transactionID}
                    oldImage={selectedTransaction.styles.image}
                />
            )}
            {isConfirmDeleteModalOpen && selectedTransaction && (
                <ConfirmDeleteModal 
                    itemName={selectedTransaction.transactionName}
                    onClose={closeConfirmDeleteModal}
                    type="Transaction Item"
                    itemID={selectedTransaction.transactionID}
                />
            )}

        </div>
    );
};

export default TransactionsTable;
