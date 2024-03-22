import React from "react";

const NullSectionCard = ({ header, body }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-5 mr-5">
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{header}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{body}</p>
            </div>
        </div>
    );
};

export default NullSectionCard;
