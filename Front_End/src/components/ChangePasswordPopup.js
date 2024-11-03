import React, { useState } from 'react';
import '../pages/login.css';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

export default function ChangePasswordPopup({ onClose,email,code }) {
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');  

  // Function to check if passwords match
  const passwordsMatch = password === newPassword && password.length > 0;

  const handleReset = async () => {
    if (passwordsMatch) {
      try {
        const resetRequest = {
          email: email,
          code: code, 
          newPassword: password
        };
  
        console.log("Sending Reset Request:", resetRequest); // Log the payload
  
        const response = await axios.post('http://localhost:8080/loginuser/resetPassword', resetRequest);
        console.log(response); 
        setSuccess('Password has been reset successfully!');
        onClose(); // Close the popup after password change
      } catch (error) {
        console.error("Error during password reset:", error.response.data); // Log the error response
        setError('Failed to reset password. Please try again.');
      }
    } else {
      console.log("Passwords do not match or are empty.");
      setError('Passwords do not match');
      return;
    }
  };
  

  return (
    <div className="popup-container">
      <div className="popup">
        <CloseIcon className="close-popup" onClick={onClose} />
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input-field"
        />
        <button
          className={`confirm-button ${passwordsMatch ? 'active' : ''}`} // Conditional class
          onClick={handleReset}
          disabled={!passwordsMatch} // Disable button if passwords do not match
        >
          Reset Password
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </div>
  );
}
