import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for routing
import image from '../Img/logo.png';

function MenuBar() {
  const handleLogout = () => {
    // Clear session token
    localStorage.removeItem('sessionToken'); 
    localStorage.removeItem('email');
    localStorage.removeItem('companyName');
    // Redirect to home page
    window.location.href = '/'; // Assuming '/' is your home page route
  };

  return (
    <div className='mainmenu'>
      <img src={image} alt='img' />
      <div className='logout'>
      <NavLink to="/logout" onClick={handleLogout}>Logout</NavLink>
      </div>
      
    </div>
  );
}

export default MenuBar;
