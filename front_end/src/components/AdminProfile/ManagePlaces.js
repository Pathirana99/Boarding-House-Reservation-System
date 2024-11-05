import React, { useState, useEffect } from 'react';
import { Button, Dialog,DialogActions,RadioGroup,FormControlLabel,Radio,Checkbox, DialogTitle,TextField, DialogContent,TableHead, Typography, Table, TableRow, TableCell, TableBody } from '@mui/material';
//import axios from 'axios';

const ManagePlaces = () => {
  const [boardingPlaces, setBoardingPlaces] = useState([]); // Data from the backend
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete confirmation dialog
  const [placeToDelete, setPlaceToDelete] = useState(null);
  const [openNewPlaceDialog, setOpenNewPlaceDialog] = useState(false);
  const [newPlace, setNewPlace] = useState({
    title: '',
    city: '',
    ownerName: '',
    phone: '',
    imageUrls: [],
    type: '',
    facilities: [],
    rooms: [], // Add a room structure for the new place
  });

  // List of available facilities
  const facilitiesList = ['Wi-Fi', 'Air Conditioning', 'Heating', 'Pool', 'Garage'];


  useEffect(() => {
    const fetchData = async () => {
      const mockData = [
        {
          id: 1,
          ownerId:1,
          title: 'Araliya apartment near Ruhuna University',
          city: 'Matara',
          ownerName: 'Saman Kumara',
          phone: ["0711982521", "0771234567"],
          facilities: ['Wi-Fi', 'Air Conditioning', 'Heating'],
          rating:3,
          rooms: [
            {
              title: "Room 1",
              capacity: 2,
              status: "Available Now",
            },
            {
              title: "Room 2",
              capacity: 1,
              status: "Available Soon",
            },
          ],
          imageUrls: [
            "/images/3.4.jpg",
            "/images/3.5.jpg",
            "/images/3.5.jpg",
            "/images/3.5.jpg",
            "/images/3.5.jpg",
            "/images/3.5.jpg"
          ],
          beds: 3,
          baths: 2,
          sqft: 1000,
        },
        {
          id: 2,
          ownerId:5,
          placeName: 'Sunset Villa',
          city: 'Colombo',
          ownerName: 'Deshan Anurudda',
          rating:5,
          phone: '0718532411',
          facilities: ['Pet Allowed', 'Balcony', 'Free Wifi'],
          rooms: [
            {
              title: "Room 1",
              capacity: 2,
              status: "Available Now",
            },
          ],
          imageUrls: [
            "/images/3.2.jpg",
            "/images/3.3.jpeg",
            "/images/3.3.jpeg",
            "/images/3.3.jpeg",
            "/images/3.3.jpeg",
            "/images/3.3.jpeg",
            "/images/3.5.jpg",
            "/images/3.5.jpg",
            "/images/3.5.jpg",
            "/images/3.5.jpg",
            "/images/3.5.jpg"
          ],
          beds: 1,
          baths: 1,
          sqft: 500
        },
          {
            id: 3,
            ownerId: 2,
            title: 'Lotus Villa near Peradeniya University',
            city: 'Kandy',
            ownerName: 'Nimal Perera',
            phone: ["0711122334", "0778765432"],
            facilities: [' Free Wi-Fi', 'Study Area', 'Washing Machine'],
            rating: 4,
            rooms: [
              {
                title: "Room 1",
                capacity: 3,
                status: "Available Now",
              },
              {
                title: "Room 2",
                capacity: 2,
                status: "Available Soon",
              },
            ],
            imageUrls: [
              "/images/5.1.jpeg",
            "/images/5.5.jpeg",
            "/images/5.5.jpeg",
            "/images/5.5.jpeg",
            "/images/5.5.jpeg",
            "/images/5.5.jpeg"
            ],
            beds: 5,
            baths: 3,
            sqft: 1200,
          },
          {
            id: 4,
            ownerId: 3,
            title: 'Greenwood Residencies near Jaffna University',
            city: 'Jaffna',
            ownerName: 'Kumar Ratnayake',
            phone: ["0723456789", "0765432109"],
            facilities: [' Free Wi-Fi', 'Kitchen', 'Laundry','Pet Allowed'],
            rating: 4.5,
            rooms: [
              {
                title: "Double Room",
                capacity: 2,
                status: "Available Now",
              },
              {
                title: "Single Room",
                capacity: 1,
                status: "Not Available",
              },
            ],
            imageUrls: [
             "/images/5.2.jpeg",
            "/images/5.6.jpeg",
            "/images/5.6.jpeg",
            "/images/5.6.jpeg",
            "/images/5.6.jpeg",
            "/images/5.6.jpeg"
            ],
            beds: 4,
            baths: 2,
            sqft: 900,
          },
          {
            id: 5,
            ownerId: 4,
            title: 'Rosewood Apartments near Colombo University',
            city: 'Colombo',
            ownerName: 'Ruwan Silva',
            phone: ["0712345678", "0770987654"],
            facilities: ['Free Wi-Fi', 'Meal Service', 'Garbage Removal'],
            rating: 4.7,
            rooms: [
              {
                title: "Double Room",
                capacity: 2,
                status: "Available Now",
              },
              {
                title: "Single Room",
                capacity: 1,
                status: "Available Soon",
              },
            ],
            imageUrls: [
              "/images/5.3.jpeg",
            "/images/5.7.jpeg",
            "/images/5.7.jpeg",
            "/images/5.7.jpeg",
            "/images/5.7.jpeg",
            "/images/5.7.jpeg"
            ],
            beds: 3,
            baths: 2,
            sqft: 950,
          },
          {
            id: 6,
            ownerId: 5,
            type:'Apartment',
            title: 'Blue Sky Apartments near Moratuwa University',
            city: 'Moratuwa',
            ownerName: 'Sunil Jayasinghe',
            phone: ["0751122334", "0776677889"],
            facilities: [' Free Wi-Fi', 'Ac Room', 'CCTV'],
            rating: 3.9,
            rooms: [
              {
                title: "Room 1",
                capacity: 2,
                status: "Available Now"
              },
              {
                title: "Room 2",
                capacity : 1,
                status: "Not Available",
              },
              {
                title: "Room 2",
                capacity: 1,
                status: "Not Available",
              }
            ],
            imageUrls: [
              "/images/5.4.jpeg",
              "/images/5.8.jpeg",
              "/images/5.8.jpeg",
              "/images/5.8.jpeg",
              "/images/5.8.jpeg",
              "/images/5.8.jpeg"
            ],
            beds: 4,
            baths: 2,
            sqft: 1100,
          },
        ];

      try {
        // Simulate an API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setBoardingPlaces(mockData); // Use mock data instead of API call
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  // Set the selected boarding place for viewing more details
  const handleMoreDetails = (place) => {
    setSelectedPlace(place); // Set the selected place directly
  };

  // Handle opening the large image dialog
  const handleImageClick = (url) => {
    setSelectedImage(url);
  };
  // Open delete confirmation dialog
  const handleDeleteClick = (placeId) => {
    setPlaceToDelete(placeId); // Store the place ID to delete
    setOpenDeleteDialog(true); // Open the confirmation dialog
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    setBoardingPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== placeToDelete)
    );
    setOpenDeleteDialog(false); // Close the dialog
    setPlaceToDelete(null); // Clear the stored place ID
  };

  // Cancel delete action
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false); // Close the dialog
    setPlaceToDelete(null); // Clear the stored place ID
  };
  const handleNewPlace = () => {
    setOpenNewPlaceDialog(true);
  };

  // Close the new place dialog
  const handleCloseNewPlaceDialog = () => {
    setOpenNewPlaceDialog(false);
    setNewPlace({
      title: '',
      city: '',
      ownerName: '',
      phone: '',
      imageUrls: [],
      type: '',
      facilities: [],
      rooms: [],
    }); // Reset form fields
  };

   // Handle input changes for the new place form
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlace((prev) => ({ ...prev, [name]: value }));
  };

  // Handle room input changes
  const handleRoomChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRooms = [...newPlace.rooms];
    updatedRooms[index] = { ...updatedRooms[index], [name]: value };
    setNewPlace((prev) => ({ ...prev, rooms: updatedRooms }));
  };

  // Add a new room field
  const addRoom = () => {
    setNewPlace((prev) => ({
      ...prev,
      rooms: [...prev.rooms, { title: '', capacity: '', status: '' }],
    }));
  };

  // Handle facility checkbox change
  const handleFacilityChange = (facility) => {
    setNewPlace((prev) => {
      const facilities = prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility];
      return { ...prev, facilities };
    });
  };

  // Handle boarding type change
  const handleTypeChange = (e) => {
    setNewPlace((prev) => ({ ...prev, type: e.target.value }));
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setNewPlace((prev) => ({ ...prev, imageUrls: urls }));
  };

  // Filtered boarding places based on search term
  const filteredPlaces = boardingPlaces.filter((place) => {
    const searchLower = searchTerm.toLowerCase();
    return (
        place.city?.toLowerCase().includes(searchLower) ||
        place.ownerName?.toLowerCase().includes(searchLower) ||
        place.rooms?.some(room => room.title?.toLowerCase().includes(searchLower) || room.status?.toLowerCase().includes(searchLower))
    );
  });

  const highlightText = (text, keyword) => {
    if (!text) return ''; // Return an empty string if no text
    const textString = typeof text === 'string' ? text : JSON.stringify(text); // Convert to string if not already
    if (!keyword) return textString; // Return original text if no keyword
    const regex = new RegExp(`(${keyword})`, 'gi'); // Case-insensitive regex
    const parts = textString.split(regex); // Split text into parts
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>{part}</span>
      ) : part
    );
  };
  
  const handleSubmitNewPlace = () => {
    // Logic to add new place, typically you would send this to your backend
    setBoardingPlaces((prev) => [...prev, { ...newPlace, id: prev.length + 1 }]); // Add the new place with an ID
    handleCloseNewPlaceDialog(); // Close dialog after adding
  };

  return (
    <div>
         <Button variant="contained" color="primary" onClick={handleNewPlace}  sx={{ margin: '10px',fontSize:'18px',backgroundColor:'#72d6c9',padding:'10px 20px','&:hover': {backgroundColor:'#3DC0B9'} }}>
        + New Boarding Place
         </Button> 
        <TextField
        placeholder="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
      />
      <Table>
      <TableHead>
          <TableRow>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>PlaceId</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>Owner</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>City</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>Room Title</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>Capacity</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>Status</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPlaces.map((place) => (
            place.rooms.map((room, index) => (
                <TableRow key={`${place.id}-${index}`}>
                  <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>
                    {index === 0 ?(place.id):''}
                  </TableCell>
                  <TableCell  sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>
                    {index === 0 ? highlightText( place.ownerName,searchTerm) : ''}
                  </TableCell>
                  <TableCell  sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>
                    {index === 0 ? highlightText(place.city,searchTerm) : ''}
                  </TableCell>
                  <TableCell  sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>
                    {highlightText(room.title,searchTerm)}
                  </TableCell>
                  <TableCell  sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>
                    {highlightText(room.capacity,searchTerm)}
                  </TableCell>
                  <TableCell  sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>
                    {highlightText(room.status,searchTerm)}
                  </TableCell>
                  <TableCell>
                    {index === 0 && (
                      <>
                        <Button variant="contained" onClick={() => handleMoreDetails(place)} sx={{margin:'5px',backgroundColor:'#72d6c9','&:hover': {backgroundColor:'#3DC0B9'}}} >
                          More </Button>
                        <Button variant="contained" onClick={() => handleDeleteClick(place.id)} sx={{margin:'5px',backgroundColor:'red','&:hover': {backgroundColor:'#AB3448'}}}>
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
          ))}
        </TableBody>
      </Table>

     {/* Dialog for more details */}
     {selectedPlace && (
        <Dialog open={Boolean(selectedPlace)} onClose={() => setSelectedPlace(null)}>
          <DialogTitle sx={{fontSize:"32px",fontWeight:'600',color:'#3DC0B9',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>{selectedPlace.title} - Details</DialogTitle>
          <DialogContent>
            {Object.entries(selectedPlace).map(([key, value]) => {
              if (key === "imageUrls") {
                return (
                  <div key={key}>
                    <strong>Images:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {value.map((url, index) => (
                        <img key={index} src={url} alt={`Img ${index + 1}`} style={{ width: '100px', height: '100px', margin: '5px',cursor: 'pointer' }} 
                        onClick={() => handleImageClick(url)} // Handle image click
                        />
                      ))}
                    </div>
                  </div>
                );
              }

              // Check if the key is "rooms" and handle it as a special case
                if (key === "rooms") {
                    return (
                    <div key={key}>
                        <strong>Rooms:</strong>
                        {value.map((room, index) => (
                        <div key={index} style={{ margin: '10px 0' }}>
                            <Typography><strong>Room Title:</strong> {room.title}</Typography>
                            <Typography><strong>Capacity:</strong> {room.capacity}</Typography>
                            <Typography><strong>Status:</strong> {room.status}</Typography>
                        </div>
                        ))}
                    </div>
                    );
                }
              return (
                <Typography key={key}>
                  <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</strong> {Array.isArray(value) ? value.join(", ") : value}
                </Typography>
              );
            })}
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle sx={{fontSize:"32px",fontWeight:'600',color:'#3DC0B9',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this boarding place?</Typography>
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={handleCancelDelete} 
          sx={{fontSize:'16px',fontFamily:'"Josefin Sans", sans-serif',color:'black','&:hover': {backgroundColor:'#C8C8C8'}}}
          >Cancel
          </Button>

          <Button 
          onClick={handleConfirmDelete} 
          sx={{fontSize:'16px',fontFamily:'"Josefin Sans", sans-serif',color:'red','&:hover': {backgroundColor:'#C8C8C8'}}}
          > Delete
          </Button>
          </DialogActions>
        </Dialog>

      {/* Dialog for viewing large image */}
      {selectedImage && (
        <Dialog open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)}>
          <DialogTitle>Image Preview</DialogTitle>
          <DialogContent>
            <img src={selectedImage} alt="Large view" style={{ width: '100%', height: 'auto' }} />
          </DialogContent>
        </Dialog>
      )}

     {/* New Place Dialog */}
     <Dialog open={openNewPlaceDialog} onClose={handleCloseNewPlaceDialog}>
        <DialogTitle sx={{fontSize:"32px",fontWeight:'600',color:'#3DC0B9',marginBottom:'0',fontFamily:'"Josefin Sans", sans-serif'}}>Add New Boarding Place</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            fullWidth
            value={newPlace.title}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            name="city"
            label="City"
            fullWidth
            value={newPlace.city}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            name="ownerName"
            label="Owner Name"
            fullWidth
            value={newPlace.ownerName}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            name="phone"
            label="Phone"
            fullWidth
            value={newPlace.phone}
            onChange={handleInputChange}
            margin="normal"
          />
          <div>
            <Typography variant="subtitle1">Type:</Typography>
            <RadioGroup value={newPlace.type} onChange={handleTypeChange}>
              <FormControlLabel value="Apartment" control={<Radio />} label="Apartment" />
              <FormControlLabel value="House" control={<Radio />} label="House" />
              <FormControlLabel value="Villa" control={<Radio />} label="Villa" />
            </RadioGroup>
          </div>
          <div>
            <Typography variant="subtitle1">Facilities:</Typography>
            {facilitiesList.map((facility) => (
              <FormControlLabel
                key={facility}
                control={
                  <Checkbox
                    checked={newPlace.facilities.includes(facility)}
                    onChange={() => handleFacilityChange(facility)}
                  />
                }
                label={facility}
              />
            ))}
          </div>
          <div>
            <Typography variant="subtitle1">Rooms:</Typography>
            {newPlace.rooms.map((room, index) => (
              <div key={index}>
                <TextField
                  name="title"
                  label="Room Title"
                  value={room.title}
                  onChange={(e) => handleRoomChange(index, e)}
                  margin="normal"
                />
                <TextField
                  name="capacity"
                  label="Capacity"
                  type="number"
                  value={room.capacity}
                  onChange={(e) => handleRoomChange(index, e)}
                  margin="normal"
                />
                <TextField
                  name="status"
                  label="Status"
                  value={room.status}
                  onChange={(e) => handleRoomChange(index, e)}
                  margin="normal"
                />
              </div>
            ))}
            <Button variant="contained" onClick={addRoom} sx={{ marginTop: '10px' }}>
              + Add Room
            </Button>
          </div>
          <div>
            <Typography variant="subtitle1">Upload Images:</Typography>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div>
              {newPlace.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Uploaded preview ${index}`} style={{ width: '100px', margin: '5px' }} />
              ))}
            </div>
          </div>
        </DialogContent>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button label="Cancel" onClick={handleCloseNewPlaceDialog} />
          <Button label="Add Place" onClick={handleSubmitNewPlace} />
        </div>
      </Dialog>
    </div>
  );
};

export default ManagePlaces;
