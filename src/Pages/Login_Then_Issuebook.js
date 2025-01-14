import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashbord from './Dashbord';
import { Link, useNavigate } from 'react-router-dom';

const Login_Then_Issuebook = () => {
    const [books, setBooks] = useState([]); // Initialize as an empty array
    const [message, setMessage] = useState('');
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken')); // Get user token
    const navigate = useNavigate()
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users/bookDetailAndIssueAndReturn',

                    {
                        headers: { Authorization: `Bearer ${userToken}` }, // Send token in headers
                    }
                );
                // Check if response.data.books is an array before setting state
                if (Array.isArray(response.data.groupedBooks)) {
                    setBooks(response.data.groupedBooks);
                } else {
                    setMessage('Invalid book data format');
                }
            } catch (error) {
                setMessage(error.response?.groupedBooks?.message || 'Error fetching books');
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const userToken = localStorage.getItem('userToken')
        if (!userToken) {
            navigate('/login')
        }
    }, [navigate])

    const handleIssueBook = async (bookId) => {
        try {
            const response = await axios.post(
                'http://localhost:3001/users/issued',
                { bookId: bookId },
                {
                    headers: { Authorization: `Bearer ${userToken}` }, // Send token in headers
                }
            );
            // Check the response status and show appropriate messages
            if (response.data.issue.message === 'Book already issued') {
                setMessage('Book already issued');
            } else {
                setMessage('Book issued successfully');
            }
            console.log('Issue request successful:', response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error issuing book');
            console.error('Error issuing book:', error);
        }
    };

    const handleReturnBook = async (bookId) => {
        try {
            const response = await axios.post(
                'http://localhost:3001/users/returned',
                { bookId: bookId },
                {
                    headers: { Authorization: `Bearer ${userToken}` }, // Send token in headers
                }
            );
            if (response.data.Bookreturn.message === 'Book returned successfully') {
                setMessage('Book already Bookreturn');
            } else {
                setMessage('Book Bookreturn successfully');
            }

            // setMessage(response.data.Bookreturn.message || 'Book returned successfully');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error returning book');
        }
    };

    const Logout = async () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('userToken');
        navigate('/');
    }
    return (
        <div>
            <Dashbord />
            <h2>Issue or Return Book</h2>
            <button onClick={Logout} style={{ height: '40px', width: '100px', color: 'black' }}>Logout</button>
            <br />
            {message && <p>{message}</p>}
            <ul>
                {books.map((book) => (
                    <div key={book._id}>
                        <div style={{ width: '23%', height: 'auto', padding: '10px', margin: '5px', border: '1px solid #ddd', borderRadius: '8px', }} >
                            <h5>Book Name: {book.book}</h5>
                            <p1>Category: {book.category}</p1><br />
                            <p1>Rent per Day: {book.rentPerDay}</p1>
                        </div>

                        {/* Conditional Buttons */}
                        {book.status === 'none' && (
                            <button
                                onClick={() => handleIssueBook(book._id)}
                                style={{
                                    borderRadius: '20px',
                                    height: '40px',
                                    width: '100px',
                                    marginTop: '20px',
                                    color: 'green'
                                }}
                            >
                                none
                            </button>
                        )}
                        {book.status === 'issued' && (
                            <button
                                onClick={() => handleReturnBook(book.issueBookId)}
                                style={{
                                    borderRadius: '20px',
                                    height: '40px',
                                    width: '100px',
                                    marginTop: '20px',
                                    color: 'red'
                                }}
                            >
                                issue
                            </button>

                        )}

                        {book.status === 'issued' && (
                            <button
                                disabled
                                style={{ borderRadius: '20px', height: '40px', width: '150px', marginTop: '20px', color: 'blue' }}
                            >
                                Already Issued
                            </button>
                        )}
                        {book.status === 'returned' && (
                            <button
                                style={{
                                    borderRadius: '20px',
                                    height: '40px',
                                    width: '100px',
                                    marginTop: '20px',
                                    
                                }}
                            >
                                Returned
                            </button>
                        )}



                    </div>
                ))}
            </ul>
        </div>
    );
};
export default Login_Then_Issuebook;
