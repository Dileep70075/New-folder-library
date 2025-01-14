import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashbord from './Dashbord'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            // API call to send OTP
            const response = await axios.post('http://localhost:3001/users/forgotPassword', {
                email,
            });
            const { detail } = response.data;
            setResponseMessage(response.data.message);
            setError('');
            navigate('/updatePassword', { state: { otp: detail.otp, email } });
           
    if (detail.otp) {
        Swal.fire({
            title: 'OTP Sent',
            text: `Your OTP is: ${detail.otp}`,
            icon: 'info',
            confirmButtonText: 'OK',
        });
    }
    // alert(`OTP Used: ${detail.otp}`);
        } catch (err) {
            if (err.response) {
                // Handle server error response
                setError(err.response.data.message || 'Failed to send OTP');
            } else {
                // Handle other errors
                setError('An error occurred. Please try again later.');
            }
            setResponseMessage('');
        }
    };

    return (
        <div>
            <Dashbord />
            <div style={{ padding: '20px' }}>
                <h2>Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <div>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit">Send OTP</button>
                </form>
                {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
