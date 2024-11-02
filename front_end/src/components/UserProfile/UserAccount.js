import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserAccount = ({userId}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage

      try {
        // Make an API request to fetch user data using the passed userId prop
        const response = await axios.get(`http://localhost:8080/loginuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update the state with user data
        const { email, name } = response.data;
        setEmail(email);
        setName(name);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        if (error.response?.status === 401) {
          navigate('/login'); // Redirect to login on unauthorized error
        }
      }
    };

    if (userId) { // Ensure userId is defined before making the request
      fetchData();
    }
  }, [userId, navigate]);


  const handleChangePassword = (e) => {
    e.preventDefault();
    setError(''); // Clear previous error messages
    setSuccessMessage(''); // Clear previous success messages

    // Basic validation for password change
    if (!newPassword || !confirmPassword) {
      setError('Both password fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Reset form fields
    setNewPassword('');
    setConfirmPassword('');
    
    // Here you can add logic to update the password in the database
    setSuccessMessage('Password changed successfully!'); // Show success message
  };

  return (
    <Container maxWidth="sm" style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom style={{ color: 'gray',fontSize:'36px' }}>
        User Account
      </Typography>

      {/* Display owner details */}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" >User ID: {userId}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Email: {email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Name: {name}</Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" style={{ marginTop: '20px', color: '#72d6c9' }}>Change Password</Typography>
      <form onSubmit={handleChangePassword}>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && <Typography color="primary">{successMessage}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px', backgroundColor: '#72d6c9' }}>
          Change Password
        </Button>
      </form>
    </Container>
  );
};

export default UserAccount;