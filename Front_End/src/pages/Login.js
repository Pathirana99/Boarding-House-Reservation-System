import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ForgotPasswordPopup from '../components/ForgotPasswordPopup';
import EnterCodePopup from '../components/EnterCodePopup';
import ChangePasswordPopup from '../components/ChangePasswordPopup';
import './login.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [step, setStep] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const location = useLocation();
  const [error, setError] = useState('');

  const redirectTo = location.state?.from?.pathname || localStorage.getItem('redirectAfterLogin') || '/';
  localStorage.removeItem('redirectAfterLogin'); // Clear the path

  const openForgotPassword = () => setStep('forgot');
  const openEnterCode = () => setStep('code');
  const openChangePassword = () => setStep('change');
  const closePopup = () => setStep(null);

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google login successful:', response);
    localStorage.setItem('authToken', 'google-auth-token');
    navigate(redirectTo);
  };

  const handleGoogleFailure = (error) => {
    console.log('Google login failed:', error);
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`http://localhost:8080/SignInUser/SignIn`, {
        email,
        password,
      });
      const token = response.data.jwt;
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded token:', decodedToken);
      const { userId, role } = decodedToken;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', userId);

      navigate(-1);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError('Incorrect email or password');
        } else {
          setError('Login failed. Please try again.');
        }
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-left">
          <img src="/images/1.png" alt="logo" className="logo" />
          <p className="signup-text">Don't have an account?</p>
          <button className="signup-button" onClick={handleSignup}>SIGN UP</button>
          <img src="/images/1.1.png" alt="login vector" className='vectorimage1' />
        </div>

        <div className="login-right">
          <CloseIcon className="close-icon" onClick={handleClose} />
          <div className="login-right-signup">
            <p className="signup-text">Don't have an account?</p>
            <button className="signup-button" onClick={handleSignup}>SIGN UP</button>
          </div>
          <h2 className="signin-header">Sign in Here</h2>
          <form onSubmit={handleSignIn}>
            <div className="input">
              <input type="email" placeholder="Email" className="input-field" value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MailOutlineIcon className="icon" />
              <input type="password" placeholder="Password" className="input-field" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LockIcon className="icon" />
            </div>
            <div className="input-field-container">
              <button type="button" className="forgot-password" onClick={openForgotPassword}>Forget Your Password?</button>
            </div>
            <button type="submit" className="signin-button">SIGN IN</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="or-divider"><span>OR</span></div>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            render={({ onClick, disabled }) => (
              <button onClick={onClick} disabled={disabled} className="google-signin-button">
                <img src="/images/1.2.png" alt="Google logo" className="googlelogo" />
                Google
              </button>
            )}
          />
        </div>
      </div>

      {step === 'forgot' && <ForgotPasswordPopup onClose={closePopup} onNext={openEnterCode} setEmail={setEmail} />}
      {step === 'code' && <EnterCodePopup onClose={closePopup} onNext={openChangePassword} setCode={setCode} />}
      {step === 'change' && <ChangePasswordPopup onClose={closePopup} email={email} code={code} />}
    </div>
  );
}
