// import React from 'react'
// import Dashbord from './Dashbord';
// const Issuebook = () => {
//   return (
//     <div style={{marginTop:'0px'}}>
//       <Dashbord/>
//         <ul>
//         jihih

//         </ul>
     
//     </div>
//   )
// }

// export default Issuebook

import React, { useState } from 'react';
import axios from 'axios';
import Dashbord from './Dashbord';
const IssueBook = () => {
  const [bookId, setBookId] = useState('');
  const [message, setMessage] = useState('');

  const handleIssueBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3001/books/issue',
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setMessage(response.data.message);
      alert('Book issued successfully!'); // Show alert on success
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error issuing book');
    }
  };

  return (
    <div>
      <Dashbord/>
      <h2>Issue Book</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleIssueBook}>
        <div>
          <label>Book ID:</label>
          <input
            type="text"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Issue Book</button>
      </form>
    </div>
  );
};

export default IssueBook;

