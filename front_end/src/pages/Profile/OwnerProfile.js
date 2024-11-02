import React,{useState} from 'react';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import OwnerContent from '../../components/OwnerProfile/OwnerContent';
import {Avatar,Typography} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import './ownerProfile.css';

const OwnerProfile = () => {
  const userId = localStorage.getItem('userId');
  const [activeMenuItem, setActiveMenuItem] = useState('Posted Adds');
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };


  return (
    <div className="ownerprofile">
      {/* Navigation bar at the top */}
      <div className="nav">
        <NavigationBar />
      </div>

      {/* Menu icon for small screens */}
      <div className="menu-icon" onClick={toggleSidebar}>
        <MenuIcon />
      </div>

      {/* Main container with sidebar and content */}
      <div className="ownerprofile-container">
        {/* Sidebar Section */}
        <div className={`ownerprofile-sidebar ${isSidebarVisible ? 'show-sidebar' : ''}`}>
        <div className="sidebar-header">
          <Avatar className="avatar" />
          <Typography variant="h6" className="sidebar-title"sx={{margin:'2px',fontFamily:'"Josefin Sans", sans-serif'}} >Owner</Typography>
        </div>
          <ul className="sidebar-menu">
              <li
                className={`sidebar-menu-item ${activeMenuItem === 'Posted Adds' ? 'active' : ''}`}
                onClick={() => setActiveMenuItem('Posted Adds')}
              >
                <AddCircleOutlineIcon className="menu-icon" />
                <span className="menu-text">Posted Adds</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeMenuItem === 'Chats' ? 'active' : ''}`}
                onClick={() => setActiveMenuItem('Chats')}
              >
                <ChatBubbleOutlineIcon className="menu-icon" />
                <span className="menu-text">Chats</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeMenuItem === 'Ratings' ? 'active' : ''}`}
                onClick={() => setActiveMenuItem('Ratings')}
              >
                <StarOutlineIcon className="menu-icon" />
                <span className="menu-text">Ratings</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeMenuItem === 'Profile' ? 'active' : ''}`}
                onClick={() => setActiveMenuItem('Profile')}
              >
                <PersonOutlineIcon className="menu-icon" />
                <span className="menu-text">Profile</span>
              </li>
            </ul>
      </div>
    
        {/* Main Content Section */}
        <div className="ownerprofile-content">
          {/* Content can go here */}
          <OwnerContent 
          userId={userId}
          activeMenuItem={activeMenuItem} 
          setActiveMenuItem={setActiveMenuItem} 
        />
      </div>
    </div>
    <div className='footer'>
    <Footer/>
    </div>
    </div>
  );
};
export default OwnerProfile;
