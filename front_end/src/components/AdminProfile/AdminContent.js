import React from 'react';
import { Typography } from '@mui/material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js'; // Include Filler
import './adminContent.css';
import ManageUser from './ManageUser';
import ManageOwner from './ManageOwner';
import ManagePlaces from './ManagePlaces';
import ManageRating from './ManageRating';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);


const AdminContent = ({ activeMenuItem, cardData,setActiveMenuItem}) => {

  // Sample hard-coded data for each chart
  const userActivityData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'User Logins',
        data: [65, 59, 80, 81, 56],
        borderColor: '#72d6c9',
        backgroundColor: 'rgba(114, 214, 201, 0.2)',
        fill: true,
      },
    ],
  };

  const listingsData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'New Listings',
        data: [5, 10, 15, 10, 20],
        backgroundColor: '#ffab40',
      },
    ],
  };

  const ratingsData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        data: [5, 10, 25, 30, 15],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
      },
    ],
  };

  const userActivityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: '#555' } },
      y: { ticks: { color: '#555' } },
    },
  };
  
  const listingsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: '#555' } },
      y: { ticks: { color: '#555' } },
    },
  };
  
  const ratingsOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  

    // Map each menu item to its corresponding image path
  const getTitleImage = (menuItem) => {
    switch (menuItem) {
      case 'Dashboard':
        return '/images/2.7.png'; // Dashboard icon
      case 'Manage User':
        return '/images/4.1.png'; // Replace with the correct image path for "Manage User"
      case 'Manage Boarding Owner':
        return '/images/4.2.png'; // Replace with the correct image path for "Manage Boarding Owner"
      case 'Manage Boarding Places':
        return '/images/4.3.png'; // Replace with the correct image path for "Manage Boarding Places"
      case 'Manage Ratings':
        return '/images/4.4.png'; // Replace with the correct image path for "Manage Ratings"
      default:
        return '/images/2.7.png'; // Default image if no match is found
    }
  };

  return (
    <div className="admin-content">

        <div className="admin-title-container">
                <img
                 src={getTitleImage(activeMenuItem)} 
                 alt={`${activeMenuItem} Icon`} // Descriptive alt text based on the title
                 className="admin-title-image"
                />
                 <Typography 
                 variant="h4" 
                 className="admin-title" 
                 gutterBottom 
                 sx={{marginBottom:'64px',fontFamily:'"Josefin Sans", sans-serif',fontSize:'43px',fontWeight:'bold',color:'gray'}}>
                    {activeMenuItem}
                </Typography>
         </div>
     

      {activeMenuItem === 'Dashboard' && (
        <>
        <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => setActiveMenuItem('Manage User')}>
        <div className="card-content">
              <Typography variant="h4" className="card-number">{cardData.totalUsers}</Typography>
              <Typography variant="h4" className="admin-card-label">Total Users</Typography>
              <img
                src="/images/2.9.png" 
                alt="card-user-icon"
                className="admin-card-icon"
                />
            </div>
          </div>
          <div className="dashboard-card" onClick={() => setActiveMenuItem('Manage Boarding Owner')}>
            <div className="card-content">
              <Typography variant="h4" className="card-number">{cardData.totalBoardingOwners}</Typography>
              <Typography variant="h4" className="admin-card-label">Total Boarding Owners</Typography>
             
              <img
                src="/images/2.10.png" 
                alt="card-owner-icon"
                className="admin-card-icon"
                />
            </div>
          </div>

          <div className="dashboard-card" onClick={() => setActiveMenuItem('Manage Boarding Places')}>
            <div className="card-content">
              <Typography variant="h4" className="card-number">{cardData.totalBoardingPlaces}</Typography>
              <Typography variant="h4" className="admin-card-label">Total Boarding</Typography>
              <img
                src="/images/2.8.png" 
                alt="card-boarding-icon"
                className="admin-card-icon"
                />
            </div>
          </div>
        </div>

        <div className="analytics-overview">
            <Typography variant="h5" className="analytics-title"
             sx={{marginBottom:'32px',fontFamily:'"Josefin Sans", sans-serif',fontSize:'32px',fontWeight:'bold',color:'gray'}}
            >
              Analytics Overview
            </Typography>
            <div className="analytics-charts">
              <div className="chart-box">
                <Typography 
                variant="h6" 
                className="chart-title"
                sx={{marginBottom:'16px',fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px',fontWeight:'bold'}}
                >User Activity</Typography>
                <Line data={userActivityData} options={{ userActivityOptions }} />
              </div>
              <div className="chart-box" >
                <Typography 
                variant="h6" 
                className="chart-title"
                sx={{marginBottom:'16px',fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px',fontWeight:'bold'}}
                >New Listings</Typography>
                <Bar data={listingsData} options={{ listingsOptions }} width={200} height={100}/>
              </div>
              <div className="chart-box">
                <Typography 
                variant="h6" 
                className="chart-title"
                sx={{marginBottom:'16px',fontFamily:'"Josefin Sans", sans-serif',fontSize:'24px',fontWeight:'bold'}}
                > System Ratings Distribution</Typography>
                <Pie data={ratingsData} options={{ ratingsOptions}} />
              </div>
            </div>
          </div>
        </>
      )}

      {activeMenuItem === 'Manage User' && (
        <Typography variant="body1"><ManageUser/></Typography>
      )}

      {activeMenuItem === 'Manage Boarding Owner' && (
        <Typography variant="body1"><ManageOwner setActiveMenuItem={setActiveMenuItem}/></Typography>
      )}

      {activeMenuItem === 'Manage Boarding Places' && (
        <Typography variant="body1"><ManagePlaces/></Typography>
      )}

      {activeMenuItem === 'Manage Ratings' && (
        <Typography variant="body1"><ManageRating/></Typography>
      )}
    </div>
  );
};

export default AdminContent;
