import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OwnerAccount = ({userId}) => {
  const [email,setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editMode, setEditMode] = useState(false); 
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
        const { email, name,contact_no } = response.data;
        setEmail(email);
        setName(name);
        setPhoneNumbers(Array.isArray(contact_no) ? contact_no : contact_no.split(',').map(num => num.trim()));
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


  const handleEditDetails = () => {
    setEditMode(!editMode);
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    // Additional validation can be added here
    setEditMode(false);
  };

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
        Owner Account
      </Typography>

      {/* Display owner details */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" >Owner ID: {userId}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Email: {email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Name: {name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Phone Numbers: {phoneNumbers.join(', ')}</Typography>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleEditDetails} style={{ marginTop: '20px', backgroundColor: '#72d6c9' }}>
        {editMode ? 'Cancel Edit' : 'Edit Details'}
      </Button>

      {editMode && (
        <form onSubmit={handleSubmitDetails} style={{ marginTop: '20px' }}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Phone Numbers (comma separated)"
            fullWidth
            margin="normal"
            value={phoneNumbers.join(', ')}
            onChange={(e) => setPhoneNumbers(e.target.value.split(',').map(num => num.trim()))}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: '#72d6c9' }}>
            Save Changes
          </Button>
        </form>
      )}

      <Typography variant="h6" style={{ marginTop: '20px', color: '#72d6c9' }}>Change Password</Typography>
      <form onSubmit={handleChangePassword}>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
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

export default OwnerAccount;
