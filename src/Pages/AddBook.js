


import React, { useState } from 'react';
import axios from 'axios';
import Dashbord from './Dashbord';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [bookName, setBookName] = useState('');
  const [category, setCategory] = useState('');
  const [rentPerDay, setRentPerDay] = useState('');
  const [message, setMessage] = useState('');
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/book/books', {
        bookName,
        category,
        rentPerDay,
      });
      setMessage(response.data.message);
      navigate('/totalbook')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating book');
    }
  };

  return (
    <div>
      <Dashbord />
      <h2>Maximum 20 books can be entered</h2>
      <h2>Create a New Book</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book Name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rent per Day:</label>
          <input
            type="number"
            value={rentPerDay}
            onChange={(e) => setRentPerDay(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
