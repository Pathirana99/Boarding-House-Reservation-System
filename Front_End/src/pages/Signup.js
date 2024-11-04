import axios from 'axios'; // Import axios
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleLogin } from '@react-oauth/google';
import './Signup.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleSignin = () => {
    navigate('/login');
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google sign-up successful:', response);
    localStorage.setItem('authToken', 'google-auth-token');
    navigate('/');
  };

  const handleGoogleFailure = (error) => {
    console.log('Google sign-up failed:', error);
  };

  // Updated handleSignup function
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send the signup data to the backend
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/loginuser/saveLoginUser`, {
        name,
        email,
        password,
        role: "User"
      });

      console.log('Sign up successful:', response.data);

      // Assuming the response includes a token, save it in localStorage
      localStorage.setItem('authToken', response.data.token);

      navigate('/');
    } catch (error) {
      console.error('Sign up failed:', error);
      setError('Sign up failed. Please try again.');
      return;
    }
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <div className="signup-left">
          <img src="/images/1.png" alt="logo" className="logo" />
          <p className="signin-text">Already have an account?</p>
          <button className="signin-button" onClick={handleSignin}>SIGN IN</button>
        </div>
        <div className="signup-right">
          <CloseIcon className="close-icon" onClick={handleClose} />
          <div className="signup-right-signin">
            <p className="signin-text">Already have an account?</p>
            <button className="signin-button" onClick={handleSignin}>SIGN IN</button>
          </div>
          <h2 className="signup-header">Sign up Here</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSignup}>
            <div className="input">
              <input
                type="text"
                placeholder="Name"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <PersonOutlineIcon className="icon" />
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MailOutlineIcon className="icon" />
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LockIcon className="icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <LockIcon className="icon" />
            </div>
            <button type="submit" className="signup-button">SIGN UP</button>
          </form>
          <div className="or-divider"><span>OR</span></div>
          <div className="google-signup">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              render={({ onClick, disabled }) => (
                <button onClick={onClick} disabled={disabled} className="google-signup-button">
                  <img src="/images/1.2.png" alt="Google logo" className="googlelogo" />
                  Google
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
