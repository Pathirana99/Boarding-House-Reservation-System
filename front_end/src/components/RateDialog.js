// src/components/RateDialog.js
import React, { useState } from 'react';
import {Dialog,DialogActions,DialogContent,DialogTitle,Button,Typography,TextField,Rating,Radio,RadioGroup,FormControlLabel} from '@mui/material';

const RateDialog = ({ open, onClose, onSubmit }) => {
  const [userRating, setUserRating] = useState(0);  // For capturing rating value
  const [stayStatus, setStayStatus] = useState(''); // For capturing Yes/No if they stayed
  const [fullname, setFullname] = useState(''); // For capturing the user's full name

  const handleRateSubmit = async () => {
    const ratingData = {
      rating: userRating,
      stayed: stayStatus,
      fullname: fullname,
    };

    try {
      // Send the data to the backend
      const response = await fetch('/api/rateBoardingHouse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Rating submitted successfully:", result);
        onSubmit(ratingData); // Optionally pass the data back to parent component
        onClose(); // Close the dialog
      } else {
        console.error("Failed to submit rating");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rate this Boarding House</DialogTitle>
      <DialogContent>
        {/* Ask if the user stayed at the boarding house */}
        <Typography variant="h6" sx={{ fontSize: '18px', fontFamily: '"Josefin Sans", sans-serif' }}>
          Did you stay at this boarding house?
        </Typography>
        <RadioGroup
          value={stayStatus}
          onChange={(e) => setStayStatus(e.target.value)}
        >
          <FormControlLabel
            value="yes"
            control={<Radio sx={{ '&.Mui-checked': { color: '#00BFB4' } }} />}
            label="Yes"
          />
          <FormControlLabel
            value="no"
            control={<Radio sx={{ '&.Mui-checked': { color: '#00BFB4' } }} />}
            label="No"
          />
        </RadioGroup>

        {/* Full name field */}
        <Typography variant="h6" sx={{ fontSize: '18px', fontFamily: '"Josefin Sans", sans-serif' }}>Full Name</Typography>
        <TextField
          fullWidth
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Enter your full name here"
          variant="outlined"
        />

        {/* Rating input */}
        <Typography variant="h6" sx={{ fontSize: '18px', fontFamily: '"Josefin Sans", sans-serif' }}>Your Rating</Typography>
        <Rating
          name="user-rating"
          value={userRating}
          onChange={(e, newValue) => setUserRating(newValue)}
          max={5}
          size="large"
          sx={{ color: '#FFD700' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: 'black', '&:hover': { color: '#00BFB4' } }}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRateSubmit}
          sx={{ backgroundColor: '#00BFB4', color: 'white', '&:hover': { backgroundColor: '#00aba2' } }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RateDialog;
