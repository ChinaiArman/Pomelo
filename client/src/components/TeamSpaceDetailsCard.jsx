import { useEffect, useState } from 'react';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import EditTeamSpaceModal from "./EditTeamSpaceModal";
import { currencyFormatter } from '../utils';
import logo from "../assets/logo_icon.png";

const BASE_SERVER_URL = "https://pomelo-server.vercel.app/";

const TeamSpaceDetailsCard = ({ teamSpaceName, totalBudget }) => {
  const [isEditTeamSpaceModalOpen, setIsEditTeamSpaceModalOpen] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    getJoinCode();
  })

  const getJoinCode = async function () {
    await axios.get(`${BASE_SERVER_URL}/getJoinCode`, {
      params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") }
    }).then(response => {
      setJoinCode(response.data.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const openEditTeamSpaceModal = () => {
    setIsEditTeamSpaceModalOpen(true);
  };

  const closeEditTeamSpaceModal = () => {
    setIsEditTeamSpaceModalOpen(false);
  };

  return (
    <div className="w-full max-w-sm bg-theme-cornsilk border border-theme-cornsilk rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <img src={logo} alt="Pomelo Logo" className="mt-2 h-20" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{teamSpaceName}</h5>
        <h4 className="mb-1 text-l font-medium text-gray-600 dark:text-white">Total Budget: {currencyFormatter.format(totalBudget)}</h4>
        <span className="flex items-center my-1">
          <h4 className="mb-1 mr-2 text-base font-medium text-gray-600 dark:text-white">Team Join Code: </h4>
          <input
            type="text"
            readOnly={true}
            defaultValue={joinCode}
            className="w-24 border border-gray-300 rounded-lg px-2 py-2 text-xs bg-theme-oldlace focus:border-theme-mantis focus:ring-theme-mantisdark"
          />
        </span>
        <div className="flex mt-4 md:mt-6">
          <button
            className="bg-theme-mantis hover:bg-theme-mantisdark focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center mr-2"
            onClick={openEditTeamSpaceModal}
          >
            <span className="flex items-center">
              <CiEdit className="mr-1" />
              Edit Team Space
            </span>
          </button>
        </div>


        {isEditTeamSpaceModalOpen && (
          <EditTeamSpaceModal
            onClose={closeEditTeamSpaceModal}
            currentTeamName={teamSpaceName}
            currentTotalBudget={totalBudget}
          />
        )}
      </div>
    </div>
  )
}

export default TeamSpaceDetailsCard;