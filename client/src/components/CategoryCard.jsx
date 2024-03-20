import React from "react";
import { currencyFormatter } from "../utils";

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md m-2">
      <h3 className="text-lg font-semibold">{category.spendingCategoryName}</h3>
      <p>Budget Limit: {currencyFormatter.format(category.budgetLimit)}</p>
      <p>Amount Used: {currencyFormatter.format(category.amountUsed)}</p>
    </div>
  );
};

export default CategoryCard;
