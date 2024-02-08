import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';
import Login from './Login';
import SignUp from './SignUp';
import Navbar from './Navbar';
import ParticlesBackground from './ParticlesBackground';

const Backdrop = ({ onClick }) => {
  return <div className="backdrop" onClick={onClick}></div>;
};

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false); 

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

  const handleShowLogin = () => {
    setShowLogin(true);
    setIsSignUpMode(false); 
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

  const handleSignUpLinkClick = () => {
    setShowLogin(false); // Close the login modal
    setIsSignUpMode(true); // Set signup mode to true
    setShowSignUp(true); // Show the signup modal
  };

  return (
    


      <div className="content-container">
        <ParticlesBackground />
        <Navbar />
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
        </div>

        <button className="login-button" onClick={handleShowLogin}>
          Login
        </button>

        {showLogin && (
          <>
            <Backdrop onClick={handleCloseLogin} />
            <div className="login-overlay">
              <div className="login-modal">
                <Login onClose={handleCloseLogin} />
                {!isSignUpMode && (
                  <p className="signup-link" onClick={handleSignUpLinkClick}>
                    Don't have an account? Click here!
                  </p>
                )}
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
      </div>

  );
};

export default HomePage;
