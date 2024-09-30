import React, { useState } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import Dashbord from './Dashbord'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        email,
        password,
      });
      setMessage(response.data.message);
      localStorage.setItem('userToken', response.data.token); 
      localStorage.setItem('userData',JSON.stringify(response.data.data))
      navigate('/login_Then_Issuebook'); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error logging in');
    }
  };
  return (
    <div>
      <Dashbord/>
      <h2>User Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;

