import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';
import Login from './Login'; 

// Define the Backdrop component
const Backdrop = ({ onClick }) => {
  return <div className="backdrop" onClick={onClick}></div>;
};

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [showLogin, setShowLogin] = useState(false); // State to manage login modal visibility

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

  // Event handler to show the login modal
  const handleShowLogin = () => {
    setShowLogin(true);
  };

  // Event handler to hide the login modal
  const handleCloseLogin = () => {
    setShowLogin(false);
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

      {/* Conditionally render the login modal and the backdrop */}
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

      {/* Button to open the login modal */}
      <button className="login-button" onClick={handleShowLogin}>Login</button>
    </div>
  );
};

export default HomePage;
