import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TableSortLabel, Button, Box, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, InputLabel, Select, MenuItem
} from '@mui/material';

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: '' });
    const [openAddUser, setOpenAddUser] = useState(false);

    // Fetch the list of users initially
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/loginuser/getAllLoginuser');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser({ ...user }); // Create a copy of the user for editing
        setOpen(true); // Open dialog
    };

    const handleSaveChanges = async () => {
        try {
            // Ensure selectedUser is not null and has the necessary data
            if (selectedUser && selectedUser.id) {
                await axios.put(`http://localhost:8080/loginuser/${selectedUser.id}`, selectedUser);
                fetchUsers(); // Refresh the user list after saving changes
                setOpen(false); // Close the dialog
            }
        } catch (error) {
            console.error("Error saving user changes:", error);
        }
    };

    const handleDelete = (userId) => {
        setUserIdToDelete(userId);
        setOpenDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/loginuser/${userIdToDelete}`);
            fetchUsers();
            handleCloseDeleteConfirm();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleCloseDeleteConfirm = () => {
        setOpenDeleteConfirm(false);
        setUserIdToDelete(null);
    };

    const handleAddUser = () => {
        setNewUser({ name: '', email: '', password: '', role: '' });
        setOpenAddUser(true);
    };

    const handleSaveNewUser = async () => {
        const isDuplicate = users.some((user) => user.email === newUser.email);
        if (isDuplicate) {
            alert("This email is already associated with an existing user.");
            return;
        }
        try {
            await axios.post('http://localhost:8080/loginuser', newUser);
            fetchUsers();
            setOpenAddUser(false);
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser((prevUser) => ({ ...prevUser, [name]: value })); // Update selectedUser state
    };

    const handleNewUserInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '20px' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddUser}
                sx={{ margin: '10px', fontSize: '18px', backgroundColor: '#72d6c9', padding: '10px 20px', '&:hover': { backgroundColor: '#3DC0B9' } }}
            >
                + New User
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '24px' }}>
                                <TableSortLabel>Name</TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '24px' }}>
                                <TableSortLabel>Email</TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '24px' }}>
                                <TableSortLabel>Role</TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '24px' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '20px' }}>{index + 1}</TableCell>
                                <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '20px' }}>{user.name}</TableCell>
                                <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '20px' }}>{user.email}</TableCell>
                                <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '20px' }}>{user.role}</TableCell>
                                <TableCell sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '20px' }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleEdit(user)}
                                        sx={{ margin: '5px', backgroundColor: '#72d6c9', '&:hover': { backgroundColor: '#3DC0B9' } }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleDelete(user.id)}
                                        sx={{ margin: '5px', backgroundColor: 'red', '&:hover': { backgroundColor: '#AB3448' } }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {/* Add/Edit/Delete Dialogs */}
            {/* Edit User Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <InputLabel>Name</InputLabel>
                    <TextField
                        margin="dense"
                        name="name"
                        type="text"
                        fullWidth
                        value={selectedUser?.name || ''}
                        onChange={handleInputChange}
                    />
                    <InputLabel>Email</InputLabel>
                    <TextField
                        margin="dense"
                        name="email"
                        type="email"
                        fullWidth
                        value={selectedUser?.email || ''}
                        onChange={handleInputChange}
                    />
                    <InputLabel>Password</InputLabel>
                    <TextField
                        margin="dense"
                        name="password"
                        type="password"
                        fullWidth
                        value={selectedUser?.password || ''}
                        onChange={handleInputChange}
                    />
                    <InputLabel>Role</InputLabel>
                    <Select
                        name="role"
                        fullWidth
                        value={selectedUser?.role || ''}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Owner">Owner</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm} fullWidth maxWidth="sm">
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this user?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Add User Dialog */}
            <Dialog open={openAddUser} onClose={() => setOpenAddUser(false)} fullWidth maxWidth="md">
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <InputLabel>Name</InputLabel>
                    <TextField
                        margin="dense"
                        name="name"
                        type="text"
                        fullWidth
                        value={newUser.name}
                        onChange={handleNewUserInputChange}
                    />
                    <InputLabel>Email</InputLabel>
                    <TextField
                        margin="dense"
                        name="email"
                        type="email"
                        fullWidth
                        value={newUser.email}
                        onChange={handleNewUserInputChange}
                    />
                    <InputLabel>Password</InputLabel>
                    <TextField
                        margin="dense"
                        name="password"
                        type="password"
                        fullWidth
                        value={newUser.password}
                        onChange={handleNewUserInputChange}
                    />
                    <InputLabel>Role</InputLabel>
                    <Select
                        name="role"
                        fullWidth
                        value={newUser.role}
                        onChange={handleNewUserInputChange}
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Owner">Owner</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddUser(false)}>Cancel</Button>
                    <Button onClick={handleSaveNewUser}>Add User</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ManageUser;
