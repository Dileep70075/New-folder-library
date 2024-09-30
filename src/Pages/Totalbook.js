

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashbord from './Dashbord';
const Totalbook = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/book/books'); 
        setBooks(response.data.data);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error fetching books');
      }
    };

    fetchBooks();
  }, []);

  return (
    <div >
      <Dashbord/>
      <h2>Books List</h2>
      {message && <p>{message}</p>}
      <ul>
         {books.map((book) => (
    <div
      key={book._id}
      style={{
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <div>
        <h5>Book Name : {book.bookName}</h5>
        <p1>Category : {book.category}</p1><br/>
        <p1>Rent per Day : {book.rentPerDay}</p1>
      </div>
    </div>
  ))}
      </ul>
    </div>
  );
};

export default Totalbook;
