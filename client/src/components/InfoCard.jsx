import React from "react";
import { currencyFormatter } from "../utils";

const InfoCard = ({ title, value }) => {
  
    return (
      <div className="flex justify-center items-center bg-gray-200 p-4 rounded-md m-2">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-xl">{currencyFormatter.format(value)}</p>
        </div>
      </div>
    );
};

export default InfoCard;
