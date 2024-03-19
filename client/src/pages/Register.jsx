import { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
    const [teamSpaceName, setTeamSpaceName] = useState('');
    const [teamSpaceJoinCode, setTeamSpaceJoinCode] = useState('');

    let handleCreateTeamSpace = async function (event) {
        event.preventDefault();
        await axios.post('http://localhost:5000/createTeamSpace', {teamSpaceName, teamSpaceLeaderUserID: window.localStorage.getItem("userID"), teamSpaceLeaderUsername: window.localStorage.getItem("username")})
            .then(response => {
                console.log(response.data)
                window.localStorage.setItem("teamSpaceID", response.data.data.teamSpaceID)
                window.location.replace('/')
            })
            .catch(error => {
                console.log(error)
            });
    }

    let handleJoinTeamSpace = async function (event) {
        event.preventDefault();
        await axios.post('http://localhost:5000/addUserToTeamSpace', {teamSpaceJoinCode, userID: window.localStorage.getItem("userID"), username: window.localStorage.getItem("username")})
            .then(response => {
                console.log(response.data)
                window.localStorage.setItem("teamSpaceID", response.data.data.teamSpaceID)
                window.location.replace('/')
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <div className="register">
            <div>
                <h1>Create a team</h1> 
                <form onSubmit={handleCreateTeamSpace}>
                    <div>
                        <label>Team Name</label>
                        <input type="text" placeholder="Enter a Team Name" onChange={e => setTeamSpaceName(e.target.value)}required />
                    </div>
                    <button>Create</button>
                </form>
            </div>
            <br>
            </br>
            <br>
            </br>
            <div>
                <h1>Create a team</h1> 
                <form onSubmit={handleJoinTeamSpace}>
                    <div>
                        <label>Join Code</label>
                        <input type="text" placeholder="Enter a join code" onChange={e => setTeamSpaceJoinCode(e.target.value)}required />
                    </div>
                    <button>Join</button>
                </form>
            </div>
            <p>Register</p>
        </div>
    );
}

export default Register;