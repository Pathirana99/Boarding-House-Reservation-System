import React from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './contact.css';

const Contact = () => {
  return (
    <Container maxWidth="md" className="contactus-container">
      <Box className="contactus-header">
        <Typography variant="h4" gutterBottom sx={{fontFamily: '"Josefin Sans", sans-serif', fontSize:"43px"}}>
          Contact Us
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {/* Left side: Contact Information */}
        <Grid item xs={12} md={6}>
          <Box className="contactus-info">
            <Box className="contactus-item">
              <LocationOnIcon className="contactus-icon" />
              <Typography variant="body1" fontWeight="bold" fontSize="20px" sx={{fontFamily: '"Josefin Sans", sans-serif'}}>Address</Typography>
            </Box>
            <Typography variant="body2" className="contactus-text" fontSize="18px" fontWeight="600" sx={{fontFamily: '"Josefin Sans", sans-serif'}}>No.64, Main Street, Matata</Typography>

            <Box className="contactus-item">
              <PhoneIcon className="contactus-icon" />
              <Typography variant="body1" fontWeight="bold" fontSize="20px" sx={{fontFamily: '"Josefin Sans", sans-serif'}}>Phone</Typography>
            </Box>
            <Typography variant="body2" className="contactus-text" fontSize="18px" fontWeight="600" sx={{fontFamily: '"Josefin Sans", sans-serif'}}>(+94) 718 535 288</Typography>

            <Box className="contactus-item">
              <EmailIcon className="contactus-icon" />
              <Typography variant="body1" fontWeight="bold" fontSize="20px" sx={{fontFamily: '"Josefin Sans", sans-serif'}}>Email</Typography>
            </Box>
            <Typography variant="body2" className="contactus-text" fontSize="18px" fontWeight="600" sx={{fontFamily: '"Josefin Sans", sans-serif'}}>Bdoor@gmail.com</Typography>
          </Box>
        </Grid>

        {/* Right side: Send Message Form */}
        <Grid item xs={12} md={6}>
          <Box component="form" noValidate autoComplete="off" className="contactus-send-message-form">
            <Typography variant="h5" gutterBottom textAlign="center" sx={{fontFamily: '"Josefin Sans", sans-serif'}}>
              Feedback
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Type your Message"
              variant="outlined"
              multiline
              rows={4}
              margin="normal"
            />
            <Box textAlign="center" mt={2}>
              <Button variant="contained" color="primary" endIcon={<SendIcon />} className="contactus-send-button">
                Send
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
