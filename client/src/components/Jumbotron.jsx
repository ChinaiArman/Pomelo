import React from "react";
import { useState } from 'react';
import { currencyFormatter } from "../utils";

import LatestTransactionsCard from "./LatestTransactionsCard";
import CategoryCard from "./CategoryCard";
import NullSectionCard from "./NullSectionCard";
import InfoCard from "./InfoCard";

import logo from "../assets/logo_icon.png";
import CreateCategoryModal from "./CreateCategoryModal";
import { VscDiffAdded } from "react-icons/vsc";

const Jumbotron = ({ username, transactions, spendingCategory, teamSpaceName, totalBudget, totalSpent, spendingCategories, isLeader }) => {
    const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);

    const openCreateCategoryModal = () => {
        setIsCreateCategoryModalOpen(true);
      };
    
      const closeCreateCategoryModal = () => {
        setIsCreateCategoryModalOpen(false);
      };

    if (spendingCategory === undefined) {
        var categoryCard = <NullSectionCard header="Oops! Looks like this section is empty!" body="Add a category below to start tracking finances with Pomelo." />
    } else {
        var categoryCard = <CategoryCard key="largest-category" category={spendingCategory} />
    }

    if (transactions.length === 0) {
        var transactionCard = <NullSectionCard header="Oops, We couldn't find any recent transactions..." body="Add a transaction to start tracking finances with Pomelo." />
    } else {
        var transactionCard = <LatestTransactionsCard transactions={transactions} />
    }
    
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
                    <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">Hello {username}!</h1>
                    <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">Welcome to <span><img src={logo} className="h-7 inline"></img></span><b>{teamSpaceName}</b>. Below is a summary of your latest transactions and your spending categories</p>
                    <a href="#categories" className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        See spending categories
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
                    {/* <InfoCard budgetTitle="Total Budget" budgetValue={totalBudget} amountUsedValue={totalSpent} /> */}
                    <div className="flex items-center justify-center">
                        <div className="text-center flex-1">
                            <h3 className="text-gray-900 dark:text-white text-3xl font-medium mb-2">Amount Used</h3>
                            <p className="text-9xl">{currencyFormatter.format(totalSpent)}</p>
                        </div>
                        <div className="mx-5 h-20 min-h-[1em] w-0.5 bg-gray-300 dark:bg-white/10"></div>
                        <div className="text-center flex-1">
                            <h3 className="text-gray-900 dark:text-white text-3xl font-medium mb-">Total Budget</h3>
                            <p className="text-9xl">{currencyFormatter.format(totalBudget)}</p>
                        </div>
                    </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 justify-center mt-8">
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 justify-center items-center">
                        <a href="#" className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2">
                            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
                            </svg>
                            Transactions
                        </a>
                        <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Latest Transactions</h2>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Here is a look at the most recent transactions from the last 24 hours.</p>
                        <div className="flex flex-col items-center justify-center">
                            {transactionCard}
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
                        <a href="#categories" className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15" />
                            </svg>
                            Spending Categories
                        </a>
                        <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Largest Spending Category</h2>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Here is a look at your team space's largest spending category.</p>
                        <div className="flex flex-col items-center justify-center">
                            {categoryCard}
                        </div>
                        <a href="#categories" className="mt-3 text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">See all spending categories
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mt-8">
                    <a href="#categories" className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                        <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15" />
                        </svg>
                        Spending Categories
                    </a>
                    <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Spending Categories</h2>
                    <div className="flex flex-wrap justify-center gap-5" id="categories">
                        {spendingCategories.map((category, index) => (
                            <CategoryCard key={index} category={category} />
                        ))}
                        {isLeader && (
                            <div className="bg-white border border-gray-200 rounded-lg shadow m-5 dark:bg-gray-800 dark:border-gray-700 h-36 w-36 flex items-center justify-center cursor-pointer" onClick={openCreateCategoryModal}>
                                <VscDiffAdded size={80} />
                            </div>
                        )}
                    </div>
                    {isCreateCategoryModalOpen && (
                        <CreateCategoryModal onClose={closeCreateCategoryModal} />
                    )}
                </div>

            </div>
        </section>
    );
};

export default Jumbotron;
