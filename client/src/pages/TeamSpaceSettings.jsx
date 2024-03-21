import { useState, useEffect } from 'react';
import axios from 'axios';

import RemoveUserModal from '../components/RemoveUserModal';


const TeamSpaceSettings = () => {
    const [teamSpaceUsers, setTeamSpaceUsers] = useState([]);

    const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await axios.get('http://localhost:5000/getAllTeamSpaceUsers', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                setTeamSpaceUsers(response.data.data);
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
        </div>
    );
}

export default TeamSpaceSettings;