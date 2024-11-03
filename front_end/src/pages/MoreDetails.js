import React,{useState, useRef} from 'react';
import { Typography, Button,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Rating} from '@mui/material';
import { useLocation,useNavigate } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './moreDetails.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import ChatPopup from '../components/ChatPopup';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import RateDialog from '../components/RateDialog';

export default function MoreDetails() {
  const { state } = useLocation();
  const { place } = state || {};
  const navigate = useNavigate(); 

  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const isAuthenticated = localStorage.getItem('token') !== null;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAZVdMOfQEqb3T04P_-HTMR_Vg4aTIoVz8', // Add your API key here
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRef = useRef();

  if (!place) {
    return <Typography>Place not found</Typography>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const mapCenter = {
    lat: place.latitude || 6.0241, // Default latitude (Matara for example)
    lng: place.longitude || 80.2168, // Default longitude (Matara for example)
  };


  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % place.imageUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + place.imageUrls.length) % place.imageUrls.length
    );
  };

  const scrollLeft = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  const handleOpenChat = () => {
    if (isAuthenticated) {
      setIsChatOpen(true);
    } else {
      localStorage.setItem('redirectAfterLogin', window.location.pathname); // Store current path
      navigate('/login');
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleOpenRateDialog = () => {
    if (isAuthenticated) {
      setIsRateDialogOpen(true);
    } else {
      localStorage.setItem('redirectAfterLogin', window.location.pathname); // Store current path
      navigate('/login'); 
    }
  };

  const handleCloseRateDialog = () => {
    setIsRateDialogOpen(false);
  };

  const handleRateSubmit = (ratingData) => {
    console.log("Rating Submitted:", ratingData);
    // Here add logic to save the rating data to your backend
  };

  return (
    <div className="moredetails">  
      <div className='navbar'>
        <NavigationBar/>
      </div>
      <div className="more-details-container">
        {/* Main Content with Image Slider and Details */}
        <div className="content-section">
          <div className="left-section">
            <div className="image-slider">
            <Paper elevation={3} className="slider-container">
                <img
                  src={place.imageUrls[currentIndex]}
                  alt={`Img ${currentIndex + 1}`}
                  className="main-image"
                />
                <div className="slider-controls">
                  <Button onClick={handlePrev} disabled={place.imageUrls.length <= 1}>
                    &lt;
                  </Button>
                  <Button onClick={handleNext} disabled={place.imageUrls.length <= 1}>
                    &gt;
                  </Button>
                </div>
              </Paper>

              {/* Thumbnail Images with Horizontal Scroll */}
              <div className="thumbnail-slider">
                <Button onClick={scrollLeft}>&lt;</Button>
                <div className="thumbnail-container" ref={thumbnailRef}>
                  {place.imageUrls.map((imageUrl, index) => (
                    <Paper
                      elevation={2}
                      key={index}
                      className={`thumbnail-image ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <img src={imageUrl} alt={`Thumbnail ${index + 1}`} />
                    </Paper>
                  ))}
                </div>
                <Button onClick={scrollRight}>&gt;</Button>
              </div>
            </div>

            {/* Property Info */}
            <div className="property-info">
              <Typography variant="h4"sx={{fontSize:'32px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>{place.title}</Typography>
              <Typography variant="subtitle1" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>{place.area}</Typography>
              <Typography variant="body2" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>Posted Date: {place.date}</Typography>
            </div>

            {/* Facilities */}
            <div className="facilities-section">
              <Typography variant="h6" sx={{fontSize:'24px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>Facilities:</Typography>
              <ul className="facilities-list" >
                {place.facilities.map((facility, index) => (
                  <li key={index}>
                    <Typography sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}> -: {facility}</Typography> 
                  </li>
                ))}
              </ul>
            </div>
            {/* Description */}
            <div className="description-section">
              <Typography variant="h6" sx={{fontSize:'24px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>Description:</Typography>
              <Typography variant="body2" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif',fontWeight:'normal',color:'gray'}}>{place.description}</Typography>
            </div>

                 <div className="room-section">   {/* Room Details Table */}
                <Typography variant="h6" sx={{fontSize:'24px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>Room Details:</Typography>
                {place.rooms && place.rooms.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontSize: '20px',fontFamily:'"Josefin Sans", sans-serif' }}>Room Title</TableCell>
                          <TableCell sx={{ fontSize: '20px',fontFamily:'"Josefin Sans", sans-serif' }}>Capacity</TableCell>
                          <TableCell sx={{ fontSize: '20px',fontFamily:'"Josefin Sans", sans-serif' }}>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {place.rooms.map((room, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontSize: '20px',fontFamily:'"Josefin Sans", sans-serif' }}>{room.title}</TableCell>
                            <TableCell sx={{ fontSize: '20px',fontFamily:'"Josefin Sans", sans-serif' }}>{room.capacity}</TableCell>
                            <TableCell sx={{ fontSize: '20px',fontFamily:'"Josefin Sans", sans-serif' }}>{room.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2">No rooms available.</Typography>
                )}
                </div>  
          </div>

          {/* Right Section - Contact and Price Details */}
          <div className="right-section">
                <div className="contact-details">
                          {/* Loop through the array of phone numbers */}
              {place.phone?.map((phoneNumber, index) => (
                <Typography variant="body1" key={index} sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>
                  <CallIcon/>  {phoneNumber}
                </Typography>
              ))}

              {/* Email */}
              <Typography variant="body1" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}><EmailIcon/> {place.email}</Typography>

              <div className="contact-buttons">
                {/* Chat Button */}
                <Button variant="contained" className="chat-button" onClick={handleOpenChat}>Chat</Button>
              </div>
            </div>

            {/* Chat Popup */}
              <ChatPopup open={isChatOpen} handleClose={handleCloseChat} ownerName={place.email.split('@')[0]} />

            <div className="price-details">
              <Typography variant="h6" sx={{fontSize:'24px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>Price Details</Typography>
              <Typography variant="body1" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>LKR {place.price.toLocaleString()} { place.rentDuration}</Typography>
              <Typography variant="body2" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}} >No Prepayment Required</Typography>
              {place.advancePayment && place.advancePaymentDuration !== 'None' ? (
                <>
                  <Typography variant="body2"  sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}} >Advance Payment: Rs. {place.advancePayment}</Typography>
                  <Typography variant="body2"  sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}} >Advance Payment Duration: {place.advancePaymentDuration}</Typography>
                </>
              ) : (
                <Typography variant="body2"  sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}} >No Advance Payment</Typography>
              )}
              {place.billsIncluded === 'Yes' && (
                <Typography variant="body2" sx={{fontSize:'20px',margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}}>Bills Included</Typography>
              )}
            </div>

            {/* Display the rating, showing 5 stars by default */}
            <div className="ratings-section">
              <Rating
                name="read-only"
                value={place.rating || 0}  // If no rating, show 0 (empty stars)
                readOnly
                size="large"
                max={5}
              />

              {/* Rate Button */}
              <div className='rate-form-button'>
              <Button variant="contained" color="primary" onClick={handleOpenRateDialog} sx={{backgroundColor:'#00BFB4',color:'white','&:hover':{backgroundColor:'#00aba2'}}}>
                  RATE
                </Button>
                </div>

            </div>

            {/* Google Map */}
            <div className="map-section">
              <Typography variant="h6">Map:</Typography>
              <GoogleMap
                center={mapCenter}
                zoom={15}
                
              >
                {/* Marker for the location */}
                <Marker position={mapCenter} />
              </GoogleMap>
            </div>
          </div>
        </div>
        <div className='footer'>
        <Footer/>
      </div>

      {/* RateDialog Component */}
      <RateDialog
          open={isRateDialogOpen}
          onClose={handleCloseRateDialog}
          onSubmit={handleRateSubmit} // Pass the submit handler
        />

      </div>
     
    </div>
  );
}
