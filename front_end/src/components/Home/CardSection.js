import React from 'react';
import { Card, CardMedia,Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './cardSection.css';

const universities = [
  { name: 'University of Ruhuna', image: '/images/1.9.jpeg' },
  { name: 'University of Kelaniya', image: '/images/1.10.jpg' },
  { name: 'University of Peradeniya', image: '/images/1.11.jpg' },
  { name: 'University of Moratuwa', image: '/images/1.12.png' },
  { name: 'University of Colombo', image: '/images/1.13.jpg' },
  { name: 'Sabaragamuwa University', image: '/images/1.14.jpg' }
];

const CardSection = () => {
  const navigate = useNavigate();
  const [visibleCards] = React.useState(6);

  const handleCardClick = (universityName) => {
    navigate('/list-places', {
      state: { selectedArea: { title: universityName, region: 'University' } },
    });
  };

  const focusSearchBar = (id) => {
    const searchInput = document.getElementById(id);
    if (searchInput) {
      searchInput.focus();
    }
  };

  return (
    <div className="card-section-container">
      <Typography variant="h4" className="card-section-title">
        Discover Your Ideal Boarding Place with Bdoor
      </Typography>
      <Typography variant="body1" className="card-section-description">
        Explore a wide range of boarding places located conveniently near your university.
        Choose your university below to get started!
      </Typography>

      <Grid container spacing={4} className="card-section-grid">
        {universities.slice(0, visibleCards).map((university, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="card" aria-labelledby={`card-label-${index}`} role="region"
               onClick={() => handleCardClick(university.name)} // Add onClick here
               style={{ cursor: 'pointer' }} // Change cursor to pointer
            >
              <div className="card-label" id={`card-label-${index}`}>
                {university.name}
              </div>
              <CardMedia
                component="img"
                height="368"
                image={university.image}
                alt={`Image of ${university.name}`} // Updated for better accessibility
              />
              
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button 
        variant="contained" 
        className="more-button" 
        onClick={() => focusSearchBar('area')}
        aria-label="Show more universities" // Added aria-label for accessibility
      >
        More
      </Button>
    </div>
  );
};

export default CardSection;
