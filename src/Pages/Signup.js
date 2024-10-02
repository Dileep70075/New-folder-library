import Dashbord from './Dashbord'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const[user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    const handleChange = (e) => {
        setUser({
            ...user,[e.target.name]:e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/users/register',user);
            setMessage(response.data.message);
            navigate('/')
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error registering user');
        }
    };

    return (
        <div>
            <Dashbord />
            <h2>Maximum 5 users can be entered</h2>
            <h2>User Registration</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                    type='text'
                    name='name'
                    value={user.name}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                    type='text'
                    name='email'
                    value={user.email}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                    type='text'
                    name='password'
                    value={user.password}
                    onChange={handleChange}
                    />
                </div>
                <button type="submit" style={{ borderRadius: '40px' }}>Register</button>
            </form>
        </div>
    );
};

export default Signup;
