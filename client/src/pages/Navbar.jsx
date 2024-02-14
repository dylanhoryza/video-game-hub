import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track authentication state
  const [showNotification, setShowNotification] = useState(false); // Track notification state
  const menuRef = useRef(null);

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Update authentication state
  };

  // Function to show notification
  const showLoginNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Hide the notification after 3 seconds
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.classList.contains('menu-toggle')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState); // Toggle isOpen
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`hamburger ${isOpen ? 'open' : ''}`}></div>
        <div className={`hamburger ${isOpen ? 'open' : ''}`}></div>
        <div className={`hamburger ${isOpen ? 'open' : ''}`}></div>
        <div className={`hamburger ${isOpen ? 'open' : ''}`}></div>
      </div>
      {isOpen && (
        <ul className="menu-items" ref={menuRef}>
          <li className='background-nav-container'><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li className='background-nav-container'><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
          <li className='background-nav-container'><Link to="/blog" onClick={closeMenu}>Forum</Link></li>
          <li className='background-nav-container'><Link to="/news" onClick={closeMenu}>News</Link></li>
          {isLoggedIn && (
            <li><button onClick={handleLogout}>Logout</button></li>
          )}
        </ul>
      )}
      {showNotification && (
        <div className="notification">
          <p>User is not logged in!</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
