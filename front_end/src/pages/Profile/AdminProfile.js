import React, { useState } from 'react';
import { Avatar, Typography} from '@mui/material';
import AdminContent from '../../components/AdminProfile/AdminContent';
import './adminProfile.css'; // Import the CSS file
//import axios from 'axios'; 

const AdminProfile = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');


  // Hard-coded data for the cards
  const cardData = {
    totalUsers: 12, // Hard-coded value for total users
    totalBoardingOwners: 3, // Hard-coded value for total boarding owners
    totalBoardingPlaces: 6, // Hard-coded value for total boarding places
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }} className='adminprofile'>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <Avatar className="avatar" />
          <Typography variant="h6" className="sidebar-title"sx={{margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}} >ADMIN</Typography>
          <Typography variant="body2" color="textSecondary" sx={{margin:'2px',fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px'}} className='sidebar-email'>admin@example.com</Typography>
        </div>
          <ul className="sidebar-menu">
          <li 
            className={`sidebar-menu-item ${activeMenuItem === 'Dashboard' ? 'active' : ''}`}
            onClick={() => setActiveMenuItem('Dashboard')}
          >
            Admin Dashboard
          </li>
          <li 
            className={`sidebar-menu-item ${activeMenuItem === 'Manage User' ? 'active' : ''}`}
            onClick={() => setActiveMenuItem('Manage User')}
          >
            Manage User
          </li>
          <li 
            className={`sidebar-menu-item ${activeMenuItem === 'Manage Boarding Owner' ? 'active' : ''}`}
            onClick={() => setActiveMenuItem('Manage Boarding Owner')}
          >
            Manage Boarding Owner
          </li>
          <li 
            className={`sidebar-menu-item ${activeMenuItem === 'Manage Boarding Places' ? 'active' : ''}`}
            onClick={() => setActiveMenuItem('Manage Boarding Places')}
          >
            Manage Boarding Places
          </li>
          <li 
            className={`sidebar-menu-item ${activeMenuItem === 'Manage Ratings' ? 'active' : ''}`}
            onClick={() => setActiveMenuItem('Manage Ratings')}
          >
            Manage Ratings
          </li>
        </ul>

      </div>

      {/* Main Content */}
      <div className="main-content">
        <AdminContent 
        activeMenuItem={activeMenuItem} 
        cardData={cardData} // Pass the hard-coded data as props
        setActiveMenuItem={setActiveMenuItem} // Pass the setter function here
        />
      </div>
    </div>
  );
};

export default AdminProfile;
