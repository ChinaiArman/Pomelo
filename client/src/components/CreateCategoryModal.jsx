import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { useState } from 'react';

const BASE_SERVER_URL = "http://pomelo-server.vercel.app/";

const CreateCategoryModal = ({ onClose }) => {
  const [newSpendingCategory, setNewSpendingCategory] = useState('');
  const [newSpendingCategoryBudgetLimit, setNewSpendingCategoryBudgetLimit] = useState('');

  let createNewSpendingCategory = async function (event) {
    event.preventDefault();
    await axios.get(`${BASE_SERVER_URL}/getTeamSpaceByID`, { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
      .then(async response => {
        if (response.data.data.teamSpaceLeaderUserID === window.localStorage.getItem("userID")) {
          await axios.post(`${BASE_SERVER_URL}/createSpendingCategory`, {
            "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
            "spendingCategoryName": newSpendingCategory,
            "budgetLimit": Number(newSpendingCategoryBudgetLimit)
          }).then(response => {
            console.log(response);
            window.location.href = window.location.href
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

  const handleSubmit = async function (event) {
    event.preventDefault();
    await createNewSpendingCategory(event);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-theme-cornsilk p-6 rounded-lg mt-1 relative max-w-md w-full">
        <IoCloseSharp className="absolute top-0 right-0 mr-4 mt-4 cursor-pointer" size={35} onClick={onClose} />
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
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-theme-oldlace focus:border-theme-mantis focus:ring-theme-mantisdark"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Budget Limit</label>
            <input
              type="number"
              step="0.01"
              placeholder="Enter a budget limit"
              onChange={(e) =>
                setNewSpendingCategoryBudgetLimit(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-theme-oldlace focus:border-theme-mantis focus:ring-theme-mantisdark"
              required
            />
          </div>
          <button className="bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Create Spending Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
