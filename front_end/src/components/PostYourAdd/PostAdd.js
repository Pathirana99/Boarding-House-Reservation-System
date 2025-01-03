import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './postAdd.css'; // Import the CSS file
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Autocomplete,Step,Stepper,StepLabel } from '@mui/material'; // Using Material-UI components
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AddApartment from './AddApartment';
import AddRoom from './AddRoom';
import AddAnnex from './AddAnnex';
import AddOther from './AddOther';
import SuccessPopup from './SuccessPopup';
import AdditionalDetails from './AdditionalDetails';


const citiesByProvince = [
  { city: 'Colombo', province: 'Western' },
  { city: 'Gampaha', province: 'Western' },
  { city: 'Kaluthara', province: 'Western' },
  { city: 'Kandy', province: 'Central' },
  { city: 'Matale', province: 'Central' },
  { city: 'Nuwara Eliya', province: 'Central' },
  { city: 'Galle', province: 'Southern' },
  { city: 'Matara', province: 'Southern' },
  { city: 'Hambantota', province: 'Southern' },
  { city: 'Jaffna', province: 'Northern' },
  { city: 'Kilinochchi', province: 'Northern' },
  { city: 'Mannar', province: 'Northern' },
  { city: 'Vavuniya', province: 'Northern' },
  { city: 'Mullaitivu', province: 'Northern' },
  { city: 'Anuradhapura', province: 'North Central' },
  { city: 'Polonnaruwa', province: 'North Central' },
  { city: 'Ratnapura', province: 'Sabaragamuwa' },
  { city: 'Kegalle', province: 'Sabaragamuwa' }
];

const university =['University of Ruhuna', 'University of Colombo',
  'University of Kelaniya',
  'University of Moratuwa',
  'University of Peradeniya',
  'Eastern University',
  'Rajarata University',
  'Sabaragamuwa University',
  'University of Sri Jayawardenapura',
  'Wayamba University',
  'University of Vavuniya'
]
const steps = ['Basic Infomation', 'Boarding Place Details', 'Additional Details'];

const PostAdd = () => {
  // State to manage the current step

  const [currentStep, setCurrentStep] = useState(0);
  const [openPopup, setOpenPopup] = useState(false); // For success popup
  const navigate = useNavigate();
  const [location, setLocation] = useState({ lat: 6.9271, lng: 79.8612 }); // Default location (Colombo)
  const [loadingLocation, setLoadingLocation] = useState(false); // For loading state when fetching location
  const [isImageValid, setIsImageValid] = useState(false); // Track if image validation passes

  // Map container styles
  const mapContainerStyle = {
    height: '300px',
    width: '100%',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  };


  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phoneNumbers: [''],
    placeType: 'Apartment', // Default selection
    city: '',
    street: '',
    university: '',
    distance: 0,
    latitude: '', // New field for latitude
    longitude: '', // New field for longitude
    // Add more fields as needed for each form
    apartmentDetails: {},
    roomDetails: {},
    annexDetails: {},
    otherDetails: {},
    additionalDetails: [],
  });
  const [errors, setErrors] = useState({});

  // Get current location using browser geolocation and update the map center and form fields
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude }); // Update the map center and marker
          setFormData({ ...formData, latitude, longitude }); // Auto-fill latitude and longitude fields
          setLoadingLocation(false); // Stop loading after fetching location
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLoadingLocation(false);
          alert('Could not retrieve current location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Handle input changes
  const handleChange = (e, index) => {
    if (index !== undefined) {
      const updatedPhoneNumbers = [...formData.phoneNumbers];
      updatedPhoneNumbers[index] = e.target.value;
      setFormData({ ...formData, phoneNumbers: updatedPhoneNumbers });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    let formErrors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      formErrors.email = 'Please enter a valid email address';
    }
    if (!formData.name) {
      formErrors.name = 'Name is required';
    }

    // First phone number is required
    if (!formData.phoneNumbers[0].match(/^\d{10}$/)) {
      formErrors[`phone0`] = 'Please enter a valid 10-digit phone number';
    }

    if(!formData.city){
      formErrors.city = 'required field';
    }
    if(!formData.street){
      formErrors.street = 'required field';
    }
    if(!formData.university){
      formErrors.university= 'required field';
    }
    // Validate distance to university (must be numeric and required)
    if (!formData.distance) {
      formErrors.distance = 'Please enter a valid distance (numeric value required)';
    }

    if (!isImageValid) {
      alert('Please upload at least 5 images.');
      return;
    }

    // Validate additional phone numbers only if they are provided
    formData.phoneNumbers.slice(1).forEach((phone, index) => {
      if (phone && !phone.match(/^\d{10}$/)) {
        formErrors[`phone${index + 1}`] = 'Please enter a valid 10-digit phone number';
      }
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Submit the form if no errors
      console.log('Form submitted:', formData); // Here you can replace this with API call or another action
      // Show success popup
      setOpenPopup(true);

      // Simulate submission and navigate after popup
      setTimeout(() => {
        setOpenPopup(false); // Close popup
        navigate('/ownerprofile'); // Redirect to the OwnerProfile page
      }, 3000);
    }
  };

  // Add new phone number field
  const addPhoneNumber = () => {
    setFormData({ ...formData, phoneNumbers: [...formData.phoneNumbers, ''] });
  };

  // Handle place type change
  const handlePlaceTypeChange = (event) => {
    setFormData({ ...formData, placeType: event.target.value });
  };

  // Go to the next form step
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Go to the previous form step
  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const renderForm = () => {
    switch (formData.placeType) {
      case 'Apartment':
        return <AddApartment formData={formData.apartmentDetails} updateFormData={updateFormData} />;
      case 'Room':
        return <AddRoom formData={formData.roomDetails} updateFormData={updateFormData} />;
      case 'Annex':
        return <AddAnnex formData={formData.annexDetails} updateFormData={updateFormData} />;
      case 'Other':
        return <AddOther formData={formData.otherDetails} updateFormData={updateFormData} />;
      default:
        return <AddApartment formData={formData.apartmentDetails} updateFormData={updateFormData} />;
    }
  };


  return (
    <div className="postadd">
      <div className="stepper">
      <Stepper activeStep={currentStep} alternativeLabel className="custom-stepper">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>

      {currentStep === 0 && (
        <div className="container">


      <h1>Register Your Boarding Place</h1>
      <img
        src='/images/2.1.png'
        alt="boarding place icon"
        className="icon"
      />
      <div className="post-add-container">
      <form onSubmit={handleSubmit}>
        {/* Email, Name, Phone Number Section */}
        <div className="form-section">
          
            <label>E-mail</label>
            <TextField
              name="email"
              type="text"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
            />
  
            <label>Name</label>   
            <TextField
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              placeholder="Your Name"
              fullWidth
              required
            />
  
            <label>Add Your Phone Number(s)</label>
            {formData.phoneNumbers.map((phone, index) => (
              <div key={index} className="phone-number-row">
                <TextField
                  placeholder={`Phone Number ${index + 1}`}
                  name={`phone${index}`}
                  type="text"
                  value={phone}
                  onChange={(e) => handleChange(e, index)}
                  error={!!errors[`phone${index}`]}
                  helperText={errors[`phone${index}`]}
                  fullWidth
                  required={index === 0} 
                  inputProps={{ maxLength: 10 }}
                />
              </div>
            ))}
            <div className="add-phone-link" onClick={addPhoneNumber}>
              <span>+</span> Add another phone number
            </div>
      </div>
  
        {/* Boarding Place Type Section */}
        <div className="form-section">
          <label>Boarding Place Type</label>
          <div className="boarding-place-type-section">
            <RadioGroup
              row
              name="placeType"
              value={formData.placeType}
              onChange={handlePlaceTypeChange}
            >
              <FormControlLabel
                value="Apartment"
                control={<Radio className="custom-radio" />}
                label="Apartment"
                className="radio-button"
              />
              <FormControlLabel
                value="Annex"
                control={<Radio className="custom-radio" />}
                label="Annex"
                className="radio-button"
              />
              <FormControlLabel
                value="Room"
                control={<Radio className="custom-radio" />}
                label="Room"
                className="radio-button"
              />
              <FormControlLabel
                value="Other"
                control={<Radio className="custom-radio" />}
                label="Other"
                className="radio-button"
              />
            </RadioGroup>
          </div>
        </div>
  
        {/* Location and Map Section */}
        <div className="form-section">
          <label>Location</label>
          <div className="location-section">
            <Autocomplete
              options={citiesByProvince.map(item => item.city)}
              value={formData.city}
              onChange={(event, newValue) => {
                setFormData({ ...formData, city: newValue || '' });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  fullWidth
                  variant="outlined"
                  error={!!errors.city}
                  helperText={errors.city}
                  required
                />
              )}
              style={{ marginTop: '16px' }}
            />
  
            <div style={{ marginTop: '16px' }}>
              <TextField
                label="Street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                error={!!errors.street}
                helperText={errors.street}
                fullWidth
                required
              />
            </div>
          </div>
  
          {/* Google Maps Section */}
          <div className="mapSection">
            <LoadScript googleMapsApiKey="AIzaSyAZVdMOfQEqb3T04P_-HTMR_Vg4aTIoVz8">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={location}
                zoom={15}
              >
                <Marker position={location} />
              </GoogleMap>
            </LoadScript>
          </div>
  
          {/* Get Current Location Button */}
          <Button
            variant="outlined"
            startIcon={<MyLocationIcon />}
            className="currentLocationButton"
            onClick={handleGetCurrentLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? 'Loading...' : 'Get Current Location'}
          </Button>

          {/* Latitude and Longitude Fields */}
          <div className="form-section">
              <TextField
                label="Latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                error={!!errors.university}
                helperText={errors.university}
                required
                fullWidth
                disabled
              />
              <TextField
                label="Longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                error={!!errors.university}
                helperText={errors.university}
                required
                fullWidth
                disabled
                style={{ marginTop: '16px' }}
              />
            </div>
        </div>

        <div className="form-section">
          
          <label>Select the Nearest University</label>
          <Autocomplete
              options={university.map(item => item)}
              value={formData.university}
              onChange={(event, newValue) => {
                setFormData({ ...formData, university: newValue || '' });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  placeholder='Nearest University'
                  error={!!errors.university}
                  helperText={errors.university}
                  required
                />
              )}
              style={{ marginTop: '16px' }}
            />
             <label>Distance to University (in kilometers)</label>
            <div style={{ marginTop: '16px' }}>
              <TextField
                name="distance"
                type='number'
                value={formData.distance}
                placeholder="Distance to University"
                onChange={handleChange}
                error={!!errors.distance}
                helperText={errors.distance}
                fullWidth
                required
                inputProps={{ min: "0", step: 1,}} // Ensures no negative numbers
              />
            </div>
        </div>
        </form>
        </div>
        </div>
      )}
        
        {currentStep === 1 && (
        <div >
          {renderForm()}
        </div>
      )}

      {currentStep === 2 && (
        <div>
          {/* Render AddOther form component here on the third page */}
          <AdditionalDetails formData={formData.additionalDetails} updateFormData={updateFormData} setIsImageValid={setIsImageValid} 
          showRoomSection={formData.placeType === 'Apartment' || formData.placeType === 'Other' || formData.placeType === 'Room'} // Pass the showRooms prop
          />
        </div>
      )}

       

        {/* Navigation buttons */}
        <div className="buttonSection">
        {currentStep > 0 && (
        <Button
          type="back"
          variant="contained" 
          color="primary"
          onClick={handleBack}
          style={{ marginTop: '20px' }}
        >
          Back
        </Button>
        )}
        
        {currentStep < steps.length - 1 && (

        <Button
          type="continue"
          variant="contained" 
          color="primary"
          onClick={handleNext}
          style={{ marginTop: '20px' }}
        >
          Continue
        </Button>
        )}
        

        {currentStep === steps.length - 1 && (
          <Button 
            type="submit"
            onClick={handleSubmit} 
            variant="contained"
            style={{ marginTop: '20px' }}
            >
            Submit
          </Button>
        )}
      
        </div>

      {/* Success Popup */}
      <SuccessPopup open={openPopup} onClose={() => setOpenPopup(false)} />
    </div>
  );
  
};

export default PostAdd;
