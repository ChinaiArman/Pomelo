import { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import EditTeamSpaceModal from "./EditTeamSpaceModal";
import { currencyFormatter } from '../utils';
import logo from "../assets/logo_icon.png";

const TeamSpaceDetailsCard = ({teamSpaceName, totalBudget}) => {
    const [isEditTeamSpaceModalOpen, setIsEditTeamSpaceModalOpen] = useState(false);

    const openEditTeamSpaceModal = () => {
        setIsEditTeamSpaceModalOpen(true);
      };
  
      const closeEditTeamSpaceModal = () => {
        setIsEditTeamSpaceModalOpen(false);
      };
    
    return (
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-end px-4 pt-4">
        </div>
        <div class="flex flex-col items-center pb-10">
            <img src={logo} alt="Pomelo Logo" className="mt-2 h-10" />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{teamSpaceName}</h5>
            <h4 class="mb-1 text-l font-medium text-gray-600 dark:text-white">Total Budget: {currencyFormatter.format(totalBudget)}</h4>
            <div class="flex mt-4 md:mt-6">
                <button 
                    className="bg-gray-500 hover:bg-gray-400 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center mr-2"
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