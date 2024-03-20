import React from "react";

const InfoCard = ({ title, value }) => {
  
    return (
    <div className="flex justify-center items-center bg-gray-200 p-4 rounded-md m-2">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xl">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;
