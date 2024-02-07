import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          <li><Link to="/feed">Feed</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
