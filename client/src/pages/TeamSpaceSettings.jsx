import { useState, useEffect } from 'react';
import axios from 'axios';

import UserListCard from '../components/UserListCard';
import TeamSpaceDetailsCard from '../components/TeamSpaceDetailsCard';
import CategoryListCard from '../components/CategoryListCard';


const TeamSpaceSettings = () => {
    const [teamSpaceUsers, setTeamSpaceUsers] = useState([]);
    const [teamSpaceName, setTeamSpaceName] = useState('');
    const [totalBudget, setTotalBudget] = useState('');
    const [teamSpaceCategories, setTeamSpaceCategories] = useState([]);


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
            await axios.get('http://localhost:5000/getAllSpendingCategories', { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                let categoryList = response.data.data;
                setTeamSpaceCategories(categoryList);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="team-space-settings">
            <div className='flex flex-col flex-wrap items-center justify-center mt-5 mb-5 space-y-5'>
                <TeamSpaceDetailsCard 
                    teamSpaceName={teamSpaceName}
                    totalBudget={totalBudget}
                />
                
                <UserListCard 
                    teamSpaceName={teamSpaceName}
                    userList={teamSpaceUsers}
                />

                <CategoryListCard 
                    teamSpaceName={teamSpaceName}
                    categoryList={teamSpaceCategories}
                />
            </div>
        </div>
    );
}

export default TeamSpaceSettings;