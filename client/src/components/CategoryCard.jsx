import React from "react";

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md m-2">
      <h3 className="text-lg font-semibold">{category.spendingCategoryName}</h3>
      <p>Budget Limit: {category.budgetLimit}</p>
      <p>Amount Used: {category.amountUsed}</p>
    </div>
  );
};

export default CategoryCard;
