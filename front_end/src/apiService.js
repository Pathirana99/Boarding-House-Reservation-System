import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Function to fetch a boarding place by ID
export const fetchBoardingPlaceById = async (id) => {
  try {
    const response = await api.get(`/boarding-places/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching boarding place ${id}:`, error);
    throw new Error(`Unable to fetch boarding place ${id}.`);
  }
};

// Change user password
export const changePassword = async (newPassword) => {
  const token = localStorage.getItem('token'); // Retrieve token
  const response = await api.put('/change-password', { password: newPassword }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Return success message or user data if needed
};

// Fetch user data
export const fetchUserData = async (token, userId) => {
  try {
    const response = await api.get(`/loginuser/{id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return user data
  } catch (error) {
    console.error('Error fetching user data:', error.response ? error.response.data : error.message);
    throw error; // Propagate the error for further handling
  }
};

export const getDecodedToken = (jwt) => {
    if (!jwt) {
        console.error('No token provided');
        throw new Error('No token provided');
    }
    
    console.log('Token to decode:', jwt);
    
    // Check if the token has three parts
    if (jwt.split('.').length !== 3) {
        console.error('Invalid token structure:', jwt);
        throw new Error('Invalid token structure');
    }

    try {
        return jwtDecode(jwt);
    } catch (error) {
        console.error('Error decoding token:', error);
        throw new Error('Invalid token');
    }
};

// Example function to fetch boarding places
export const fetchBoardingPlaces = async (filters) => {
  try {
      const response = await api.get('/boardingHouse/getAllBoarding', {
          params: filters, // Pass filters as query parameters
      });
      return response.data; // Return the data received from the API
  } catch (error) {
      console.error('Error fetching boarding places:', error);
      throw error; // Propagate the error for further handling
  }
};

// Example function to fetch images separately if you have a specific endpoint for it
export const fetchImages = async (imageIds) => {
  try {
      const response = await api.post('/fetch-images', { ids: imageIds });
      return response.data; // Return the image data
  } catch (error) {
      console.error('Error fetching images:', error);
      throw error; // Propagate the error for further handling
  }
};
// Other functions (create, update, delete) can be added similarly
 