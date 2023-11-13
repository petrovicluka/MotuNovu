// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //   const handleLogin = () => {
    //     // Check the username and password against your database
    //     // For simplicity, let's assume you have an admin user with username 'admin' and password 'admin'
    //     if (username === 'admin' && password === 'admin') {
    //       onLogin('admin');
    //     } else {
    //       alert('Invalid credentials');
    //     }
    //   };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/login', {
                username,
                password,
            });

            if (response.data && response.data.success) {
                onLogin(username);
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error during login');
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
