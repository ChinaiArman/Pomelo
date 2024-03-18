import { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = async function (event) {
        event.preventDefault();
        await axios.post('http://localhost:5000/login', { username, password })
            .then(async response => {
                window.localStorage.setItem("userID", response.data.data.userID)
                console.log(window.localStorage.getItem("userID"))
                if (response.data.status == 201) {
                    await getTeamSpaceID(response.data.data.userID)
                } else {
                    console.log("invalid login")
                }
            })
            .catch(error => { console.log(error) });
    }

    let getTeamSpaceID = async function (userID) {
        await axios.get('http://localhost:5000/getTeamSpaceByUserID', { params: { "userID": userID } })
            .then(response => {
                window.localStorage.setItem("teamSpaceID", response.data.data.teamSpaceID)
                if (response.data.status == 201) {
                    console.log(window.localStorage.getItem("teamSpaceID"))
                    console.log("Success!")
                } else {
                    console.log("no team space attached to user.")
                }
            }).catch(error => {
                console.log(error)
            });
    }

    return (
        <div className="login">
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder="Enter Passowrd" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;