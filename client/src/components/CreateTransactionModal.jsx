import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { useState } from 'react';

const BASE_SERVER_URL = "https://pomelo-server.vercel.app/";

const CreateTransactionModal = ({ onClose, spendingCategories }) => {
  const [newTransactionName, setNewTransactionName] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [newTransactionSpendingCategoryName, setNewTransactionSpendingCategoryName] = useState('');

  let createNewTransaction = async function (event) {
    event.preventDefault();
    for (let i = 0; i < spendingCategories.length; i++) {
      if (newTransactionSpendingCategoryName === spendingCategories[i].spendingCategoryName) {
        var newTransactionSpendingCategoryID = spendingCategories[i].spendingCategoryID;
      }
    }
    await axios.post(`${BASE_SERVER_URL}/createTransaction`, {
      "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
      "spendingCategoryID": newTransactionSpendingCategoryID,
      "spendingCategoryName": newTransactionSpendingCategoryName,
      "userID": window.localStorage.getItem("userID"),
      "username": window.localStorage.getItem("username"),
      "transactionName": newTransactionName,
      "transactionAmount": Number(newTransactionAmount)
    }).then(async response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  const handleSubmit = async function (event) {
    event.preventDefault();
    await createNewTransaction(event);
    onClose();
    window.location.href = window.location.href
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-theme-cornsilk p-6 rounded-lg mt-1 relative max-w-md w-full">
        <IoCloseSharp className="absolute top-0 right-0 mr-4 mt-4 cursor-pointer" size={35} onClick={onClose} />
        <h1 className="mb-4 text-lg font-bold">Add Transaction</h1>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Select Spending Category for Transaction</label>
            <select
              onChange={(e) => setNewTransactionSpendingCategoryName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-theme-oldlace focus:border-theme-mantis focus:ring-theme-mantisdark"
              required
            >
              <option value="">Select a category</option>
              {spendingCategories.map((category, index) => (
                <option key={index} value={category.spendingCategoryName}>{category.spendingCategoryName}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Transaction Item Name</label>
            <input
              type="text"
              placeholder="Enter item name"
              onChange={(e) =>
                setNewTransactionName(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-theme-oldlace focus:border-theme-mantis focus:ring-theme-mantisdark"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Transaction Item Amount/Cost</label>
            <input
              type="number"
              step="0.01"
              placeholder="Enter item amount/cost"
              onChange={(e) =>
                setNewTransactionAmount(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-theme-oldlace focus:border-theme-mantis focus:ring-theme-mantisdark"
              required
            />
          </div>
          <button className="bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTransactionModal;
