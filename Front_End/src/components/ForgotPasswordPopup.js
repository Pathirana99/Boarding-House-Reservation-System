import React, { useState } from 'react';
import '../pages/login.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

export default function ForgotPasswordPopup({ onClose, onNext, setEmail }) {
  const [emailInput, setEmailInput] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailInputValue = e.target.value;
    setEmailInput(emailInputValue);
    setIsEmailValid(validateEmail(emailInputValue));
  };


  const handleConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:8080/loginuser/forgotPassword', { tomail: emailInput});
      setSuccess(response.data.message); // Assuming the response returns a success message
      setEmail(emailInput);
      onNext(); // Move to the next step (EnterCodePopup)
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <CloseIcon className="close-popup" onClick={onClose} />
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={emailInput}
          onChange={handleEmailChange}
          className="input-field"
        />
        <button
          className={`confirm-button ${isEmailValid ? 'active' : ''}`} // Conditional class
          onClick={handleConfirm}
          disabled={!isEmailValid} // Disable button if email is invalid
        >
          Confirm
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </div>
  );
}
