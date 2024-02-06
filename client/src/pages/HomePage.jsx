import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';
import Login from './Login';
import SignUp from './SignUp';

// Backdrop component for modals
const Backdrop = ({ onClick }) => {
  return <div className="backdrop" onClick={onClick}></div>;
};

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [showLogin, setShowLogin] = useState(false); // State to manage login modal visibility
  const [showSignUp, setShowSignUp] = useState(false); // State to manage sign-up modal visibility

  useEffect(() => {
    const getAllGames = async () => {
      const apiURL = `https://api.rawg.io/api/games?key=9cdfe8e7af674d6d825da9805c8c6545&dates=2023-08-01,2024-02-01&ordering=-added`;

      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllGames();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  // Event handler to show  modals
  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  
  const handleShowSignUp = () => {
    setShowSignUp(true);
  };

 
  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <Slider {...settings}>
          {games.map((game) => (
            <div key={game.id}>
              <img src={game.background_image} alt={game.name} style={{ width: '100%', height: 'auto' }} />
            </div>
          ))}
        </Slider>
      </div>

      {showLogin && (
        <>
          <Backdrop onClick={handleCloseLogin} />
          <div className="login-overlay">
            <div className="login-modal">
              <Login onClose={handleCloseLogin} />
            </div>
          </div>
        </>
      )}


      {showSignUp && (
        <>
          <Backdrop onClick={handleCloseSignUp} />
          <div className="signup-overlay">
            <div className="signup-modal">
              <SignUp onClose={handleCloseSignUp} />
            </div>
          </div>
        </>
      )}


      <button className="login-button" onClick={handleShowLogin}>
        Login
      </button>
      <button className="signup-button" onClick={handleShowSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default HomePage;
