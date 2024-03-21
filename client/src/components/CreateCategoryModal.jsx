import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { useState } from 'react';

const CreateCategoryModal = ({ onClose, fetchData }) => {
  const [newSpendingCategory, setNewSpendingCategory] = useState('');
  const [newSpendingCategoryBudgetLimit, setNewSpendingCategoryBudgetLimit] = useState('');
  
  let createNewSpendingCategory = async function (event) {
    event.preventDefault();
    await axios.get('http://localhost:5000/getTeamSpaceByID', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
        .then(async response => {
            if (response.data.data.teamSpaceLeaderUserID === window.localStorage.getItem("userID")) {
                await axios.post('http://localhost:5000/createSpendingCategory', {
                    "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
                    "spendingCategoryName": newSpendingCategory,
                    "budgetLimit": Number(newSpendingCategoryBudgetLimit)
                }).then(response => {
                    console.log(response);
                    fetchData();
                }).catch(error => {
                    console.log(error);
                });
            } else {
                alert("You are not the leader of this team space")
            }
        }).catch(error => {
            console.log(error);
        });
}

  const handleSubmit = async function(event) {
    event.preventDefault();
    await createNewSpendingCategory(event);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ml-5 mr-5">
      <div className="bg-white p-6 rounded-lg mt-1 relative max-w-md w-full">
        <IoCloseSharp className="absolute top-0 right-0 mr-4 mt-4 cursor-pointer"size={35} onClick={onClose}/>
        <h1 className="mb-4 text-lg font-bold">Create Spending Category</h1>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter the name of the spending category"
              onChange={(e) => setNewSpendingCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Budget Limit</label>
            <input
              type="text"
              placeholder="Enter a budget limit"
              onChange={(e) =>
                setNewSpendingCategoryBudgetLimit(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>
          <button className="bg-primary-500 hover:bg-primary-700 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Create Spending Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
