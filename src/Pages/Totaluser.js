import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashbord from './Dashbord';
import { useNavigate } from 'react-router-dom';
const Totaluser = () => {
  const [users, setUsers] = useState([]);
  const [, setMessage] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/allUser');
        setUsers(response.data.data);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error fetching user profiles');
      }
    };
    fetchUsers();
  }, []);
const handleDelete = async(id) =>{
try{
  const response = await axios.delete('http://localhost:3001/users/deleteUser', 
    { params: {id: id}});

if(response.success){
  setUsers(users.filter((deleteUser)=>deleteUser._id !== id))
  navigate('/totaluser')
}
}
catch (error) {
  setMessage(error.response?.data?.message || 'delete user error');
}
}
  return (
    <div>
      <Dashbord />
      <h2>User Profiles</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <div
              key={user._id}
            >
              <div style={{
                width: '23%',
                height: 'auto',
                padding: '10px',
                margin: '5px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                alignItems: "center"
              }} key={user._id}>
                <h5>Name: {user.name}</h5>
                <p1>Email: {user.email}</p1><br />
                <button style={{ borderRadius: "40px", marginLeft: '350px', marginBottom: '5px' }} onClick={() => handleDelete(user._id)}>Delete</button>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default Totaluser;
