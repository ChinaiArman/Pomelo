import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { useState } from 'react';

const AddTransactionModal = ({ onClose, spendingCategories, fetchData }) => {
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
    await axios.post('http://localhost:5000/createTransaction', {
        "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
        "spendingCategoryID": newTransactionSpendingCategoryID,
        "spendingCategoryName": newTransactionSpendingCategoryName,
        "userID": window.localStorage.getItem("userID"),
        "username": window.localStorage.getItem("username"),
        "transactionName": newTransactionName,
        "transactionAmount": Number(newTransactionAmount)
    }).then(response => {
        console.log(response);
        fetchData();
    }).catch(error => {
        console.log(error);
    })
}
  
    const handleSubmit = async function(event) {
      event.preventDefault();
      await createNewTransaction(event);
      onClose();
    }
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ml-5 mr-5">
        <div className="bg-white p-6 rounded-lg mt-1 relative max-w-md w-full">
          <IoCloseSharp className="absolute top-0 right-0 mr-4 mt-4 cursor-pointer"size={35} onClick={onClose}/>
          <h1 className="mb-4 text-lg font-bold">Add Transaction</h1>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Select Spending Category for Transaction</label>
              <select
                onChange={(e) => setNewTransactionSpendingCategoryName(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
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
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Transaction Item Amount/Cost</label>
              <input
                type="text"
                placeholder="Enter item amount/cost"
                onChange={(e) =>
                    setNewTransactionAmount(e.target.value)
                }
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                required
              />
            </div>
            <button className="bg-primary-500 hover:bg-primary-700 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddTransactionModal;
  