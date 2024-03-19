import { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    let handleSignUp = async function (event) {
        event.preventDefault();
        await axios.post('http://localhost:5000/signup', {username, email, password})
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    }

    let handleVerify = async function (event) {
        event.preventDefault();
        await axios.post('http://localhost:5000/verify', {username, verificationCode})
            .then(async response => {
                if (response.data.status == 202) {
                    handleLogin(event)
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    let handleLogin = async function (event) {
        event.preventDefault();
        await axios.post('http://localhost:5000/login', { username, password })
            .then(async response => {
                window.localStorage.setItem("userID", response.data.data.userID)
                window.localStorage.setItem("username", username)
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
                if (response.data.status == 201 && response.data.data.teamSpaceID != null) {
                    window.localStorage.setItem("teamSpaceID", response.data.data.teamSpaceID)
                    window.location.replace('/')
                } else {
                    console.log("no team space attached to user.")
                    window.location.replace('/')
                }
            }).catch(error => {
                console.log(error)
            });
    }

    return (
        <div className="sign-up">
            <div>
                <h1>SignUp</h1>
                <form onSubmit={handleSignUp}>
                    <div>
                        <label>Username</label>
                        <input type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)}required />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}required />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder="Enter Passowrd" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button>SignUp</button>
                </form>
                <form onSubmit={handleVerify}>
                    <div>
                        <label>Verification Code</label>
                        <input type="text" placeholder="Enter Verification Code" onChange={e => setVerificationCode(e.target.value)}required />
                    </div>
                    <button>Verify</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;