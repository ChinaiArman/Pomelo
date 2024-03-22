import React from "react";
import { useState } from "react";
import { currencyFormatter } from "../utils";

const CategoryCard = ({ category }) => {
  const [image, setImage] = useState(category.styles ? category.styles.image : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg");
  if (category.styles && category.styles.image !== image) {
    setImage(category.styles.image);
  }
  var redirect = "/categories?id=" + category.spendingCategoryID;
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-5 mr-5">
      <a href={redirect}>
        <img className="rounded-t-lg" src={image} alt="" />
      </a>
      <div className="p-5">
        <a href={redirect}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{category.spendingCategoryName}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Budget Limit: {currencyFormatter.format(category.budgetLimit)}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Amount Used: {currencyFormatter.format(category.amountUsed)}</p>
        <a href={redirect} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          View
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default CategoryCard;
