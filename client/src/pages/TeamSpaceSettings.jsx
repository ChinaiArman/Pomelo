import { useState, useEffect } from 'react';
import axios from 'axios';

import UserListCard from '../components/UserListCard';
import TeamSpaceDetailsCard from '../components/TeamSpaceDetailsCard';
import CategoryListCard from '../components/CategoryListCard';

const BASE_SERVER_URL = "https://pomelo-server.vercel.app";


const TeamSpaceSettings = () => {
    const [teamSpaceUsers, setTeamSpaceUsers] = useState([]);
    const [teamSpaceName, setTeamSpaceName] = useState('');
    const [totalBudget, setTotalBudget] = useState('');
    const [teamSpaceCategories, setTeamSpaceCategories] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await axios.get(`${BASE_SERVER_URL}/getAllTeamSpaceUsers`, { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                let userList = response.data.data.filter(user => user.userID !== window.localStorage.getItem("userID"));
                setTeamSpaceUsers(userList);
            }).catch(error => {
                console.log(error);
            });
        await axios.get(`${BASE_SERVER_URL}/getTeamSpaceByID`, { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
            .then(response => {
                setTeamSpaceName(response.data.data.teamSpaceName);
                setTotalBudget(response.data.data.totalBudget);
                if (response.data.data.teamSpaceLeaderUserID !== window.localStorage.getItem("userID")) {
                    window.location.href = '/404';
                }
            }).catch(error => {
                console.log(error);
            });
        await axios.get(`${BASE_SERVER_URL}/getAllSpendingCategories`, { params: { "teamSpaceID": window.localStorage.getItem("teamSpaceID") } })
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
                    userList={teamSpaceUsers}
                />

                <CategoryListCard
                    categoryList={teamSpaceCategories}
                />
            </div>
        </div>
    );
}

export default TeamSpaceSettings;