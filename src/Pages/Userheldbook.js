import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dashbord from './Dashbord';
const Userheldbook = () => {
  const [booksHeldTime, setBooksHeldTime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooksHeld = async () => {
      try {
        const response = await fetch('http://localhost:3001/users/heldBook'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooksHeldTime(data.booksHeldTime);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooksHeld();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
< Dashbord />
      <h1>Books Held by Users</h1>
      <div style={styles.container}>
        {booksHeldTime.map((book, index) => (
          <div key={index} style={styles.row}>
            <div style={styles.cell}>Name : {book.userName}</div>
            <div style={styles.cell}>bookName : {book.bookName}</div>
            <div style={styles.cell}>IssueDate : {new Date(book.issueDate).toLocaleString()}</div>
            <div style={styles.cell}>ReturnDate : {book.returnDate ? new Date(book.returnDate).toLocaleString() : 'Not Returned'}</div>
            <div style={styles.cell}>TotalTimeHeld : {book.totalTimeHeld.toFixed(2)}</div>
          </div>
        ))}
      </div>
      <Link to = '/'>Home</Link>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    borderTop:'1px solid #ccc'
  },
  cell: {
    flex: 1,
    padding: '5px',
  },
};

export default Userheldbook;
