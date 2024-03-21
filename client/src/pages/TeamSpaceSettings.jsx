import { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import axios from 'axios';

import RemoveUserModal from '../components/RemoveUserModal';
import EditTeamSpaceModal from '../components/EditTeamSpaceModal';


const TeamSpaceSettings = () => {
    const [teamSpaceUsers, setTeamSpaceUsers] = useState([]);
    const [teamSpaceName, setTeamSpaceName] = useState('');
    const [totalBudget, setTotalBudget] = useState('');

    const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState(false);
    const [isEditTeamSpaceModalOpen, setIsEditTeamSpaceModalOpen] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await axios.get('http://localhost:5000/getAllTeamSpaceUsers', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                let userList = response.data.data.filter(user => user.userID !== window.localStorage.getItem("userID"));
                setTeamSpaceUsers(userList);
            }).catch(error => {
                console.log(error);
            });
        await axios.get('http://localhost:5000/getTeamSpaceByID', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                setTeamSpaceName(response.data.data.teamSpaceName);
                setTotalBudget(response.data.data.totalBudget);
            }).catch(error => {
                console.log(error);
            });
    }
    const openRemoveUserModal = () => {
        setIsRemoveUserModalOpen(true);
    };
  
      const closeRemoveUserModal = () => {
        setIsRemoveUserModalOpen(false);
    };

    const openEditTeamSpaceModal = () => {
        setIsEditTeamSpaceModalOpen(true);
      };
  
      const closeEditTeamSpaceModal = () => {
        setIsEditTeamSpaceModalOpen(false);
      };

    return (
        <div className="team-space-settings">
            <button
                className="bg-primary-500 hover:bg-primary-700 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={openRemoveUserModal}
                >
                Remove User
            </button>
            {isRemoveUserModalOpen && (
                <RemoveUserModal 
                onClose={closeRemoveUserModal}
                userList={teamSpaceUsers}
                />
            )}
            <button 
                className="bg-gray-500 hover:bg-gray-400 focus:ring-4 px-5 py-2.5 rounded-lg text-sm text-white font-medium text-center mr-2"
                style={{ position: "absolute", right: 0 }}
                onClick={openEditTeamSpaceModal}
                >
                <span className="flex items-center">
                    <CiEdit className="mr-1" />
                        Edit Team Space
                </span>
            </button>

          {isEditTeamSpaceModalOpen && (
            <EditTeamSpaceModal 
              onClose={closeEditTeamSpaceModal}
              currentTeamName={teamSpaceName}
              currentTotalBudget={totalBudget}
            />
          )}
        </div>
    );
}

export default TeamSpaceSettings;