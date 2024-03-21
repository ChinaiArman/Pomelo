import { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import axios from 'axios';

import EditTeamSpaceModal from '../components/EditTeamSpaceModal';
import UserListCard from '../components/UserListCard';


const TeamSpaceSettings = () => {
    const [teamSpaceUsers, setTeamSpaceUsers] = useState([]);
    const [teamSpaceName, setTeamSpaceName] = useState('');
    const [totalBudget, setTotalBudget] = useState('');

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

    const openEditTeamSpaceModal = () => {
        setIsEditTeamSpaceModalOpen(true);
      };
  
      const closeEditTeamSpaceModal = () => {
        setIsEditTeamSpaceModalOpen(false);
      };

    return (
        <div className="team-space-settings">
            <div className='flex flex-wrap items-center justify-center mt-5 mb-5'>
                <UserListCard 
                    teamSpaceName={teamSpaceName}
                    userList={teamSpaceUsers}
                />
            </div>
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