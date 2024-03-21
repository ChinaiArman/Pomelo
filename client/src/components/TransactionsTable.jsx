import { Table } from "flowbite-react";
import { currencyFormatter } from "../utils";
import { CiEdit } from "react-icons/ci";
import EditTransactionModal from "./EditTransactionModal";
import { useState } from 'react';

const TransactionsTable = ({ transactions, showEditButton, fetchData }) => {
    const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    
    const openEditTransactionModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsEditTransactionModalOpen(true);
    };
  
    const closeEditTransactionModal = () => {
        setIsEditTransactionModalOpen(false);
    };

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
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
                        {showEditButton && (
                            <th>
                                <span className="sr-only">Edit</span>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => {
                        const categoryId = transaction.spendingCategoryID
                        var redirect = "/categories?id=" + categoryId;
                        return (
                            <tr 
                                key={index}     
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
                            >
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
                                {showEditButton && (
                                    <td>
                                        <CiEdit className="mx-5 cursor-pointer" size={20} onClick={() => openEditTransactionModal(transaction)}/>
                                    </td>
                                )}
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
                    fetchData={fetchData}
                />
            )}

        </div>
    );
};

export default TransactionsTable;
