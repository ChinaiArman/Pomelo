import React from "react";
import { currencyFormatter } from "../utils";

// const InfoCard = ({ budgetTitle, budgetValue, amountUsedValue }) => {
const InfoCard = ({ title, value }) => {
  return (
    <div className="flex justify-center items-center bg-white border-gray-200 shadow sm:p-8 p-4 rounded-md m-2">
      <div className="text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xl">{currencyFormatter.format(value)}</p>
      </div>
    </div>

    // TODO: fix this (jumbotron on home page and infocard)
      // <div className="flex items-center justify-center">
      //   <div className="text-center flex-1">
      //     <h3 className="text-gray-900 dark:text-white text-3xl font-medium mb-2">Amount Used</h3>
      //     <p className="text-9xl">{currencyFormatter.format(amountUsedValue)}</p>
      //   </div>
      //   <div className="mx-5 h-20 min-h-[1em] w-0.5 bg-gray-300 dark:bg-white/10"></div>
      //   <div className="text-center flex-1">
      //     <h3 className="text-gray-900 dark:text-white text-3xl font-medium mb-">{budgetTitle}</h3>
      //     <p className="text-9xl">{currencyFormatter.format(budgetValue)}</p>
      //   </div>
      // </div>

  );
};

export default InfoCard;
