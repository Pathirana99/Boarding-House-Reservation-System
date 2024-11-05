import React, { useState } from 'react';
import { Button, Table, TableRow, TableCell, TableBody, TableHead } from '@mui/material';

const ManageRating = () => {
  const [pendingRatings, setPendingRatings] = useState([
    { id: 1, placeid: '5', userName: 'R.M.Jayarathna', stayed: 'Yes', rating: 4 },
    { id: 2, placeid: '1', userName: 'L.L.Kusuma', stayed: 'No', rating: 3},
    { id: 3, placeid: '5', userName: 'P.K.K.Karuna', stayed: 'Yes', rating: 4 },
    { id: 4, placeid: '3', userName: 'S.K.Diyantha', stayed: 'Yes', rating: 5 },
    { id: 5, placeid: '2', userName: 'P.K.L.Nadun', stayed: 'No', rating: 2 },
    { id: 6, placeid: '1', userName: 'S.H.Perera', stayed: 'Yes', rating: 3 }
  ]);

  const handleApprove = (id) => {
    setPendingRatings(pendingRatings.filter(rating => rating.id !== id)); // Remove from the list
  };

  const handleReject = (id) => {
    setPendingRatings(pendingRatings.filter(rating => rating.id !== id)); // Remove from the list
  };
  /*useEffect(() => {
    const fetchPendingRatings = async () => {
      try {
        const response = await axios.get('/api/pending-ratings'); // Replace with backend endpoint
        setPendingRatings(response.data);
      } catch (error) {
        console.error('Error fetching pending ratings:', error);
      }
    };
    fetchPendingRatings();
  }, []);

  const handleApprove = async (id) => {
    await axios.put(`/api/ratings/${id}/approve`);
    setPendingRatings(pendingRatings.filter(rating => rating.id !== id)); // Remove from the list
  };

  const handleReject = async (id) => {
    await axios.put(`/api/ratings/${id}/reject`);
    setPendingRatings(pendingRatings.filter(rating => rating.id !== id)); // Remove from the list
  }; */

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>#</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>PlaceId</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>User</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>Stayed</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>Rating</TableCell>
            <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingRatings.map((rating, index) => (
            <TableRow key={rating.id}>
              <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{index + 1}</TableCell>
              <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{rating.placeid}</TableCell>
              <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{rating.userName}</TableCell>
              <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{rating.stayed}</TableCell>
              <TableCell sx={{fontFamily:'"Josefin Sans", sans-serif',fontSize:'20px'}}>{rating.rating}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => handleApprove(rating.id)} sx={{margin:'5px',backgroundColor:'#72d6c9','&:hover': {backgroundColor:'#3DC0B9'}}}>
                  Approve
                </Button>
                <Button variant="contained" onClick={() => handleReject(rating.id)} sx={{margin:'5px',backgroundColor:'red','&:hover': {backgroundColor:'#AB3448'}}}>
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageRating;
