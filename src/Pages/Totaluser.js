// import React from 'react'

// const Totaluser = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Totaluser


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashbord from './Dashbord';

const Totaluser = () => {
  const [users, setUsers] = useState([]);
  const [, setMessage] = useState('');

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

  return (
    <div>
      <Dashbord />
      <h2>User Profiles</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
             <div
             key={user._id}
             style={{
               padding: '10px',
               border: '1px solid #ddd',
               borderRadius: '8px',
             }}
           >
            <li key={user._id}>
              <h5>Name: {user.name}</h5>
              <p1>Email: {user.email}</p1>
            </li>
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
