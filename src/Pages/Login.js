import React, { useState } from 'react';
import axios from 'axios';
import { json, Link, useNavigate } from 'react-router-dom';
import Dashbord from './Dashbord'
// import { useState } from 'react';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:3001/users/login', {
  //       email,
  //       password,
  //     });
  //     if(response.data)
  //     localStorage.setItem('userToken', response.data.token); 
  //     localStorage.setItem('userData',JSON.stringify(response.data.data))
  //     navigate('/login_Then_Issuebook'); 
  //   } catch (error) {
  //     console.error('Error logging in',error)
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        email,
        password,
      });
  
      if (response.data.token) {
        // Successful login
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.data));
        navigate('/login_Then_Issuebook');
      } else {
        // Handle case where login fails but no error is thrown (e.g. wrong credentials)
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      // Error handling
      if (error.response && error.response.status === 400) {
        // 401 Unauthorized: email or password do not match
        setErrorMessage('Invalid email or password');
      } else {
        // Other errors (e.g., network issues)
        setErrorMessage('An error occurred. Please try again.');
      }
      console.error('Error logging in', error);
    }
  };
  return (
    <div>
      <Dashbord/>
      {/* <button style={{borderRadius:'20px', marginTop:'280px',position:'absolute'}}  >update</button> */}
      <h2>User Login</h2>
      <form onSubmit={handleLogin} >
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
        <button type="submit" style={{borderRadius:'20px'}}  >Login</button> 
        <Link to='/forgotPassword' style={{marginLeft:'150px'}}>Forgot password</Link>  
      </form>
      
    </div>
  );
};
export default Login;

