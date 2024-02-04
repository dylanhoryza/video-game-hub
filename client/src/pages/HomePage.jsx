import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css'

const HomePage = () => {
  const [games, setGames] = useState([]);

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
    speed: 1000, // Rotate every 8 seconds
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Set to the same value as speed
    pauseOnHover: true,
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
    </div>
  );
};

export default HomePage;
