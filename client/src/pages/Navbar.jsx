import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track authentication state
  const [showNotification, setShowNotification] = useState(false); // Track notification state

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions (clear authentication state, redirect user, etc.)
    setIsLoggedIn(false); // Update authentication state
  };

  // Function to show notification
  const showLoginNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Hide the notification after 3 seconds
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle clicking on the Forum link
  const handleForumClick = () => {
    if (!isLoggedIn) {
      showLoginNotification(); // Show the login notification if user is not logged in
    }
  };

  return (
    <nav className="navbar">
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`hamburger ${isOpen ? 'open' : ''}`}></div>
        <div className={`hamburger ${isOpen ? 'open' : ''}`}></div>
        <div className={`hamburger ${isOpen ? 'open' : ''}`}></div>
      </div>
      {isOpen && (
        <ul className="menu-items">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li onClick={handleForumClick}><Link to="/forum">Forum</Link></li>
          {isLoggedIn && (
            <li><button onClick={handleLogout}>Logout</button></li>
          )}
        </ul>
      )}
      {showNotification && (
        <div className="notification">
          <p>Please log in or create a user first to access the forum.</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
