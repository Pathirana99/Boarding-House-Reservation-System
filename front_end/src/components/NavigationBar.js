import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navigationBar.css';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout'; // Import the Logout icon
import Button from '@mui/material/Button';

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu on mobile
  const [showNavBar, setShowNavBar] = useState(true); // State to manage visibility of navbar
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const [role, setRole] = useState(null); // State to store user role
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the role from localStorage and set it
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNavBar(false); // Hide navbar when scrolling down
      } else {
        setShowNavBar(true); // Show navbar when scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up event listener
    };
  }, [lastScrollY]); // Include lastScrollY in the dependency array

  const handleProfileClick = () => {
    // Check the role and navigate to the appropriate profile page
    if (role === 'User') {
      navigate('/userprofile');
    } else if (role === 'Owner') {
      navigate('/ownerprofile');
    } else if (role === 'Admin') {
      navigate('/adminprofile');
    } else {
      navigate('/login'); // Redirect to login if no role is found
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage and navigate to the login page
    localStorage.removeItem('role');
    localStorage.removeItem('token'); // Clear any token if stored
    setRole(null); // Update state
    navigate('/login'); // Redirect to login
  };

  const handlePostYourAddClick = () => {
    if (role) {
      // User is authenticated, navigate to PostYourAdd page
      navigate('/postyouradd');
    } else {
      localStorage.setItem('redirectAfterLogin', '/postyouradd'); // Store intended route
      navigate('/login');
    }
  };

  return (
    <nav className={`nav ${showNavBar ? '' : 'hidden'}`}>
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <MenuIcon />
      </div>

      <div className="navbarlogo">
        <img src="/images/1.png" alt="logo" />
      </div>

      <ul className={`navbarLinks ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
        {/* Profile icon with role-based navigation */}
        <li>
          <PersonOutlineIcon className="loginIcon" onClick={handleProfileClick} />
        </li>
        {/* Logout icon shown if a user role is present */}
        {role && (
          <li>
            <LogoutIcon className="logoutIcon" onClick={handleLogout} />
          </li>
        )}
        <li><Button variant="contained" onClick={handlePostYourAddClick}>Post Your Add</Button></li>
      </ul>
    </nav>
  );
}
