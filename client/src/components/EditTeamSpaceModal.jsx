import { IoCloseSharp } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios';

const BASE_SERVER_URL = "https://pomelo-server.vercel.app";

const EditTeamSpaceModal = ({ onClose, currentTeamName, currentTotalBudget }) => {
  const [newTeamSpaceName, setNewTeamSpaceName] = useState(currentTeamName);
  const [newTotalBudget, setNewTotalBudget] = useState(currentTotalBudget);

  let editTeamSpace = async function (event) {
    event.preventDefault();
    await axios.post(`${BASE_SERVER_URL}/editTeamSpace`, {
      "teamSpaceID": window.localStorage.getItem("teamSpaceID"),
      "newTeamSpaceName": newTeamSpaceName,
      "newTotalBudget": Number(newTotalBudget)
    }).then(response => {
    }).catch(error => {
      console.log(error)
    })
  }

  const handleSubmit = async function (event) {
    event.preventDefault();
    await editTeamSpace(event);
    window.location.href = window.location.href
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-theme-cornsilk p-6 rounded-lg mt-1 relative max-w-md w-full">
        <IoCloseSharp className="absolute top-0 right-0 mr-4 mt-4 cursor-pointer" size={35} onClick={onClose} />
        <h1 className="mb-4 text-lg font-bold">Edit Team Space</h1>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Team Name</label>
            <input
              type="text"
              placeholder="Enter the name of your Team Space"
              onChange={(e) => setNewTeamSpaceName(e.target.value)}
              value={newTeamSpaceName}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-theme-oldlace focus:border-theme-mantis focus:ring-theme-mantisdark"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Total Budget</label>
            <input
              type="number"
              step="0.01"
              placeholder="Enter the Team's Total Budget"
              onChange={(e) => setNewTotalBudget(e.target.value)}
              value={newTotalBudget}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-theme-oldlace focus:border-theme-mantis focus:ring-theme-mantisdark"
              required
            />
          </div>
          <button className="bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTeamSpaceModal;