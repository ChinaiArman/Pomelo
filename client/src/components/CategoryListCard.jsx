import { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { currencyFormatter } from '../utils';
import EditCategoryModal from './EditCategoryModal';


const CategoryListCard = ({teamSpaceName, categoryList}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

    const openConfirmDeleteModal = (category) => {
        setSelectedCategory(category);
        setIsConfirmDeleteModalOpen(true)
    }

    const closeConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false)
    }

    const openEditCategoryModal = (category) => {
        setSelectedCategory(category);
        setIsEditCategoryModalOpen(true);
    };
  
      const closeEditCategoryModal = () => {
        setIsEditCategoryModalOpen(false);
    };

    return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{teamSpaceName}: Spending Categories</h5>
        </div>
        <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {categoryList.map((category, index) => (
                    <li key={index} className="py-3 sm:py-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-t-sm" src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt=""></img>
                            </div>
                            <div className="flex-1 min-w-0 ms-4">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {category.spendingCategoryName}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    Budget Limit: {currencyFormatter.format(category.budgetLimit)}
                                </p>
                            </div>
                            <div className="space-x-4 inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <CiEdit className="cursor-pointer" size={20} onClick={() => openEditCategoryModal(category)}/>
                                <MdDeleteOutline className='cursor-pointer' size={20} onClick={() => openConfirmDeleteModal(category)}/>
                            </div>

                            {isEditCategoryModalOpen && selectedCategory && (
                                <EditCategoryModal 
                                    onClose={closeEditCategoryModal}
                                    currentCategoryName={selectedCategory.spendingCategoryName}
                                    currentBudgetLimit={selectedCategory.budgetLimit}
                                    spendingCategoryID={selectedCategory.spendingCategoryID}
                                />
                            )}
                            {isConfirmDeleteModalOpen && selectedCategory && (
                                <ConfirmDeleteModal
                                    itemName={selectedCategory.spendingCategoryName}
                                    onClose={closeConfirmDeleteModal}
                                    type="Spending Category"
                                    itemID={selectedCategory.spendingCategoryID}
                                />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
</div>
    )
}

export default CategoryListCard;