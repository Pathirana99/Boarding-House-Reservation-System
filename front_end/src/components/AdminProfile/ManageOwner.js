// ManageOwner.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell,InputLabel, TableContainer, TableSortLabel, TableHead, TableRow, Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';

const ManageOwner = ({ setActiveMenuItem }) => {
  const [owners, setOwners] = useState([]);
  const [newOwner, setNewOwner] = useState({ name: '', email: '', phone: [''] });
  const [openAddOwner, setOpenAddOwner] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/loginuser/owners')
      .then(response => {
        setOwners(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the owners!", error);
      });
  }, []);

  const handleViewBoardingPlaces = () => {
    setActiveMenuItem('Manage Boarding Places'); // Navigate to "Manage Boarding Places"
  };

  const handleAddOwner = () => {
    setNewOwner({ name: '', email: '', phone: [''] }); // Reset new user details
    setOpenAddOwner(true); // Open add user dialog
  };

  const handleNewOwnerInputChange = (e) => {
    const { name, value } = e.target;
    setNewOwner((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...newOwner.phone];
    updatedPhones[index] = value;
    setNewOwner((prev) => ({ ...prev, phone: updatedPhones }));
  };

  const addPhoneField = () => setNewOwner((prev) => ({ ...prev, phone: [...prev.phone, ''] }));
  const removePhoneField = (index) => setNewOwner((prev) => ({ ...prev, phone: prev.phone.filter((_, i) => i !== index) }));

  const handleSaveNewOwner = () => {
    // Check for duplicate email
    const isDuplicate = owners.some((owner) => owner.email === newOwner.email);
    if (isDuplicate) {
      alert("This email is already associated with an existing boarding owner.");
      return;
    }
    // Add the new user to the list
    const newOwnerData = { id: owners.length + 1, ...newOwner }; // Assign a new ID
    setOwners((prevOwners) => [...prevOwners, newOwnerData]);

    setOpenAddOwner(false); // Close the dialog after saving
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '20px' }}>
      <Button variant="contained" color="primary" onClick={handleAddOwner} sx={{ margin: '10px', fontSize: '18px', backgroundColor: '#72d6c9', padding: '10px 20px', '&:hover': { backgroundColor: '#3DC0B9' } }}>
        + New Boarding Owner
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '24px' }}>#</TableCell>
              <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '24px' }}>
                <TableSortLabel>Name</TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '24px' }}>
                <TableSortLabel>Email</TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '24px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {owners.map((owner) => (
              <TableRow key={owner.id}>
                <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '20px' }}>{owner.id}</TableCell>
                <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '20px' }}>{owner.name}</TableCell>
                <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '20px' }}>{owner.email}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={handleViewBoardingPlaces} sx={{ margin: '5px', backgroundColor: '#72d6c9', '&:hover': { backgroundColor: '#3DC0B9' } }}>View Boarding Places</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Owner Dialog */}
      <Dialog open={openAddOwner} onClose={() => setOpenAddOwner(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontSize: "32px", fontWeight: '600', color: '#3DC0B9', fontFamily: '"Josefin Sans", sans-serif' }}>
          Add New Boarding Owner
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            margin="dense"
            name="name"
            type="text"
            fullWidth
            variant="outlined"
            value={newOwner.name}
            onChange={handleNewOwnerInputChange}
            sx={{ marginBottom: '16px', fontSize: '24px' }}
          />
          <TextField
            label="Email"
            margin="dense"
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            value={newOwner.email}
            onChange={handleNewOwnerInputChange}
            sx={{ marginBottom: '16px', fontSize: '24px' }}
          />
          <TextField
            label="Password"
            margin="dense"
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            value={newOwner.password}
            onChange={handleNewOwnerInputChange}
            sx={{ marginBottom: '16px', fontSize: '24px' }}
          />
          <InputLabel shrink sx={{ fontSize: "24px", fontWeight: '600', fontFamily: '"Josefin Sans", sans-serif' }}>
            Phone Numbers
          </InputLabel>
          {newOwner.phone.map((phone, index) => (
            <Box display="flex" alignItems="center" key={index}>
              <TextField
                margin="dense"
                type="text"
                fullWidth
                variant="outlined"
                value={phone}
                onChange={(e) => handlePhoneChange(index, e.target.value)}
                sx={{ marginBottom: '8px' }}
              />
              <IconButton onClick={() => removePhoneField(index)} disabled={newOwner.phone.length === 1}>
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={addPhoneField} startIcon={<AddIcon />} sx={{ marginTop: '10px', fontSize: '16px', color: '#3DC0B9' }}>
            Add Phone Number
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddOwner(false)} sx={{ margin: '5px', fontSize: '16px', color: 'black', '&:hover': { backgroundColor: '#C8C8C8' } }}>
            Cancel
          </Button>
          <Button onClick={handleSaveNewOwner} sx={{ margin: '5px', fontSize: '16px', color: 'black', '&:hover': { backgroundColor: '#C8C8C8' } }}>
            Add Owner
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageOwner;
