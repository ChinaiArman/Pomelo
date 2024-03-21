import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import axios from 'axios';

const ConfirmDeleteModal = ({itemToDelete, onClose, type, itemID}) => {
    
    let deleteSpendingCategory = async function (event) {
        event.preventDefault();
        await axios.post('http://localhost:5000/deleteSpendingCategory', {
            "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
            "spendingCategoryID": itemID
        }).then(response => {
            console.log(response)
            window.location.replace('/')
        }).catch(error => {
            console.log(error)
        })
    }

    const handleDelete = async function(event) {
        console.log('event', event)
        event.preventDefault();
        if (type === "Spending Category") {
            await deleteSpendingCategory(event);
        }
        onClose();
    }



    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
            <IoCloseSharp className="absolute top-0 right-0 mr-4 mt-4 cursor-pointer"size={20} onClick={onClose}/>
            <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Confirm Delete
            </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Are you sure you want to delete {itemToDelete} {type}?
            </p>
            <div className="absolute bottom-0 right-0 flex space-x-2 my-4 mr-4">
            <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={(event) => handleDelete(event)}
            >
                Delete
            </button>
            </div>
        </div>
        </div>
    );
};

export default ConfirmDeleteModal;
