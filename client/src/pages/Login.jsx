import { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = async function (event) {
        event.preventDefault();
        await axios.post('http://localhost:5000/login', { username, password })
            .then(response => {
                console.log(response.data.data.userID)
                window.localStorage.setItem("userID", response.data.data.userID)
                console.log(window.localStorage.getItem("userID"))
            })
            .catch(error => { console.log(error) });
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