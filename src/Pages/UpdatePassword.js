
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpId, setOtpId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      // API call to update password
      const response = await axios.put('http://localhost:3001/users/updatePassword', {
        email,
        otp,
      
        newPassword,
      });
//       { {  detail.otp, email } }
// alert(`OTP Used: ${detail.otp}`);
      // Handle success
      const responseData = response.data;
      setResponseMessage(responseData.message);
      setError('');
      Swal.fire({
        title: 'Success',
        text: `Password updated successfully.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/login');
    } catch (err) {
      // Handle errors
      if (err.response) {
        setError(err.response.data.message || 'Error updating password.');
      } else {
        setError('An error occurred. Please try again later.');
      }
      setResponseMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
        
      <h2>Update Password</h2>
      <form onSubmit={handleUpdatePassword}>
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
        <div>
          <label>
            OTP:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Update Password</button>
      </form>
      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdatePassword;

