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
                const response = await axios.get('http://localhost:3001/book/books');
                // Check if response.data.books is an array before setting state
                if (Array.isArray(response.data.data)) {
                    setBooks(response.data.data);
                } else {
                    setMessage('Invalid book data format');
                }
            } catch (error) {
                setMessage(error.response?.data?.message || 'Error fetching books');
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        const userToken = localStorage.getItem('userToken')
        if (!userToken) {
            navigate('/login_Then_Issuebook')
        }
    }, [navigate])

    const handleIssueBook = async (bookId) => {
        try {
            const response = await axios.post(
                'http://localhost:3001/users/issued',
                { bookId },
                {
                    headers: { Authorization: `Bearer ${userToken}` }, // Send token in headers
                }
            );
            setMessage(response.data.message || 'Book issued successfully');
            console.log('1')
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error issuing book');
        }
    };

    const handleReturnBook = async (bookId) => {
        try {
            const response = await axios.post(
                'http://localhost:3001/users/returned',
                { bookId },
                {
                    headers: { Authorization: `Bearer ${userToken}` }, // Send token in headers
                }
            );
            setMessage(response.data.message || 'Book returned successfully');
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
                    <div style={{ display: 'flex' }}
                        key={book._id}
                    >
                        <div
                            style={{
                                width: '23%',
                                height: 'auto',
                                padding: '10px',
                                margin: '5px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                // alignItems: "center"
                            }}
                        >
                            <h5>Book Name: {book.bookName}</h5>
                            <p1>Category: {book.category}</p1>
                            <p1>Rent per Day: {book.rentPerDay}</p1>
                        </div>

                         {book.bookissues ? (
                            //   <button onClick={() => handleReturnBook(book._id)} style={{ marginLeft: '10px' }}>
                            //     Return Book
                            //   </button>
                            <></>
                        ) : (
                            <button onClick={() => handleIssueBook(book._id)} style={{borderRadius:'20px', height:'40px',width:'100px',marginTop:'20px'}}>Issue </button>
                        )}

                        {book.bookreturns ? (
                            <></>
                        ) : (
                            <button onClick={() => handleReturnBook(book._id)} style={{borderRadius:'20px',height:'40px',width:'100px',marginTop:'20px'}}>Return </button>
                        )}
                        {book.bookissues || book.bookreturns === book ? (
                            <button > Issued</button>
                        ) : book.bookreturns === book ? (
                            <button > Returned</button>
                        ) : null}   
                    </div>
                ))}
            </ul>
        </div>
    );
};
export default Login_Then_Issuebook;
