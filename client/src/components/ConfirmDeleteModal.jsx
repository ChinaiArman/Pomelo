import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import axios from 'axios';

const BASE_SERVER_URL = "http://pomelo-server.vercel.app/";

const ConfirmDeleteModal = ({ itemName, onClose, type, itemID }) => {

    let deleteSpendingCategory = async function (event) {
        event.preventDefault();
        await axios.post(`${BASE_SERVER_URL}/deleteSpendingCategory`, {
            "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
            "spendingCategoryID": itemID
        }).then(response => {
            console.log(response)
            if (window.location.pathname == '/categories') {
                window.location.replace('/')
            } else {
                window.location.href = window.location.href
            }
        }).catch(error => {
            console.log(error)
        })
    }

    let deleteTransaction = async function (event) {
        event.preventDefault();
        await axios.post(`${BASE_SERVER_URL}/deleteTransaction`, {
            "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
            "transactionID": itemID
        }).then(response => {
            console.log(response)
            window.location.href = window.location.href
        }).catch(error => {
            console.log(error)
        })
    }

    let removeUserFromTeamSpace = async function (event) {
        event.preventDefault();
        await axios.post(`${BASE_SERVER_URL}/removeUserFromTeamSpaceByID`, {
            "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
            "userID": itemID
        }).then(response => {
            console.log(response);
            window.location.href = window.location.href
        }).catch(error => {
            console.log(error);
        })
    }


    const handleDelete = async function (event) {
        console.log('event', event)
        event.preventDefault();
        switch (type) {
            case "Spending Category":
                await deleteSpendingCategory(event);
                break;
            case "Transaction Item":
                await deleteTransaction(event);
                break;
            case "User":
                await removeUserFromTeamSpace(event);
                break;
            default:
                break;
        }
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="flex max-w-sm p-6 bg-theme-cornsilk border border-theme-cornsilk rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
                <IoCloseSharp className="absolute top-0 right-0 mr-4 mt-4 cursor-pointer" size={20} onClick={onClose} />
                <div className="flex flex-col relative">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Confirm Delete
                    </h5>
                    <hr className="border-gray-400 my-2" />
                    <p className="py-2 font-normal text-gray-700 dark:text-gray-400">
                        Are you sure you want to delete {type}: <b>{itemName}</b>?
                    </p>
                    <hr className="border-gray-400 my-2" />
                    <div className="flex space-x-2 justify-end">
                        <button
                            className="px-4 py-2 bg-theme-ecru text-gray-800 rounded-lg hover:bg-theme-ecrudark"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-theme-coral text-white rounded-lg hover:bg-theme-bittersweet"
                            onClick={(event) => handleDelete(event)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
