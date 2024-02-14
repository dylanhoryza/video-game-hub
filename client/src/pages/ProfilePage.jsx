import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlaystation,
  faXbox,
  faWindows,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { ADD_TO_WISHLIST } from '../utils/mutations';
import {
  ADD_TO_CURRENTLY_PLAYING,
  REMOVE_FROM_CURRENTLY_PLAYING,
  REMOVE_FROM_WISHLIST,
} from '../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';
import './Profile.css';

import { useMutation } from '@apollo/client';
import Navbar from './Navbar';
import wishlistIcon from '../assets/gift-solid.svg';
import currentlyPlayingIcon from '../assets/gamepad-solid.svg';

// Profile page function
const ProfilePage = () => {
  const [searchGames, setSearchedGames] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);
  const [userId, setUserId] = useState(null);
  // const [userData, setUserData] = useState(null);
  console.log(QUERY_ME);
  const { loading, data } = useQuery(QUERY_ME);
  console.log(data);
  const userData = data?.me || {};

  // useEffect(() => {
  //   if (data && data.me) {
  //     setUserData(data.me);
  //   }
  // }, [data]);

  // API call for all games
  useEffect(() => {
    const getAllGames = async () => {
      const apiURL = `https://api.rawg.io/api/games?key=9cdfe8e7af674d6d825da9805c8c6545&dates=2023-08-01,2024-02-01&ordering=-added`;

      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllGames();
  }, []);

  // Function to handle searching a game in API
  const handleGameSearch = async () => {
    const searchURL = `https://api.rawg.io/api/games?key=9cdfe8e7af674d6d825da9805c8c6545&dates=2017-01-01,2024-01-01&added&page_size=9&search=-${searchGames}&search_precise`;

    try {
      const response = await fetch(searchURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.results);
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching game', error);
    }
  };

  // Function to turn platform names into images
  const getPlatformIcons = (platforms) => {
    // Check if platforms is defined and is an array
    if (Array.isArray(platforms)) {
      return platforms.map((platformData, index) => {
        // Access the platform name from the nested object
        const platformName = platformData.platform.name;

        let icon = null;
        switch (platformName) {
          case 'PlayStation':
            icon = <FontAwesomeIcon icon={faPlaystation} />;
            break;
          case 'Xbox':
            icon = <FontAwesomeIcon icon={faXbox} />;
            break;
          case 'PC':
            icon = <FontAwesomeIcon icon={faWindows} />;
            break;
          default:
            icon = null;
        }
        return <span key={index}>{icon}</span>;
      });
    }
    // Return an empty array or a default value if platforms is not an array
    return [];
  };

  const [addToWishlist] = useMutation(ADD_TO_WISHLIST);

  const handleAddToWishlist = async (gameId) => {
    try {
      // Find the game object using the gameId
      const game = searchResults.find((game) => game.id === gameId);
      console.log(game.name);
      if (!game) {
        throw new Error('Game not found');
      }

      const input = {
        gameId: game.id.toString(), // Convert gameId to a string
        name: game.name,
        image: game.background_image,
        platforms: game.platforms.map((platform) => platform.name),
        rating: game.rating,
        releaseDate: game.released,
      };

      // Call the addToWishlist mutation with the correct variable name
      const { data } = await addToWishlist({
        variables: {
          gameData: input,
        },
      });

      setWishlist([...wishlist, data.addToWishlist]);
      // setWishlist(prevState => [...prevState, data.addToWishlist]);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const [addToCurrentlyPlaying] = useMutation(ADD_TO_CURRENTLY_PLAYING);

  const handleAddToCurrentlyPlaying = async (gameId) => {
    try {
      // Find the game object using the gameId
      const game = searchResults.find((game) => game.id === gameId);
      console.log(game.id);
      if (!game) {
        throw new Error('Game not found');
      }

      const input = {
        gameId: game.id.toString(), // Convert gameId to a string
        name: game.name,
        image: game.background_image,
        platforms: game.platforms.map((platform) => platform.name),
        rating: game.rating,
        releaseDate: game.released,
      };

      // Call the addToWishlist mutation with the correct variable name
      const { data } = await addToCurrentlyPlaying({
        variables: {
          gameData: input,
        },
      });

      setCurrentlyPlaying([...currentlyPlaying, data.addToCurrentlyPlaying]);
      // setWishlist(prevState => [...prevState, data.addToWishlist]);
    } catch (error) {
      console.error('Error adding to currently playing:', error);
    }
  };

  // Function to handle removing a game from the wishlist
  const [removeFromWishlist] = useMutation(REMOVE_FROM_WISHLIST);
  const handleRemoveFromWishlist = async (gameId) => {
    try {
      const { data } = await removeFromWishlist({
        variables: { gameId },
      });
      setWishlist(data.deleteFromWishlist.wishlist);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const [removeFromCurrentlyPlaying] = useMutation(
    REMOVE_FROM_CURRENTLY_PLAYING
  );
  const handleRemoveFromCurrentlyPlaying = async (gameId) => {
    try {
      // Find the game object using the gameId
      const game = userData.find((game) => game.id === gameId);
      console.log(game.id);
      if (!game) {
        throw new Error('Game not found');
      }

      const input = {
        gameId: game.id.toString(), // Convert gameId to a string
        name: game.name,
        image: game.background_image,
        platforms: game.platforms.map((platform) => platform.name),
        rating: game.rating,
        releaseDate: game.released,
      };

      // Call the addToWishlist mutation with the correct variable name
      const { data } = await removeFromCurrentlyPlaying({
        variables: {
          gameData: input,
        },
      });

      removeFromCurrentlyPlaying([...currentlyPlaying, data.removeFromCurrentlyPlaying]);
      // setWishlist(prevState => [...prevState, data.addToWishlist]);
    } catch (error) {
      console.error('Error adding to currently playing:', error);
    }
  };

  return (
    <div className='container'>
      <Navbar />
      <header className='my-4'>
        <h1 className='username-title'>Welcome, {userData.username}!</h1>
      </header>

      <div className='row'>
        <div className='my-4'>
          <h2 className='currently-playing-title'>
          Currently Playing
            <span className='icon'>
              <img className='icon-image' src={currentlyPlayingIcon} alt='Icon' />
            </span>
            
          </h2>

          <div className='container'>
            <div className='row'>
              {userData.currentlyPlaying?.map((game) => (
                <div className='col-lg-5 col-md-8 col-sm-12' key={game.gameId}>
                  <div className='item'>
                    <div className='image-container'>
                      <img
                        className='game-image'
                        src={game.image}
                        alt={game.name}
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <div className='overlay'>
                        <h3 className='game-name'>{game.name}</h3>
                        <p className='platforms'>
                          {getPlatformIcons(game.platform)}
                        </p>
                        <div className='rating-container'>
                          <p className='rating-label'>Rating:</p>
                          <p className='rating'>⭐️{game.rating}</p>
                        </div>
                        <div className='released-container'>
                          <p className='released-label'>Released:</p>
                          <p className='released'>{game.releaseDate}</p>
                        </div>
                        <div className='button-container'>
                          <img
                            src={wishlistIcon}
                            alt='Add to Wishlist'
                            onClick={() => handleAddToWishlist(game.id)}
                            className='wishlist-button'
                            style={{ cursor: 'pointer' }}
                          />
                          <img
                            src={currentlyPlayingIcon}
                            alt='Currently Playing'
                            onClick={() =>
                              handleRemoveFromCurrentlyPlaying(game.gameId)
                            }
                            className='currently-playing-button'
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className='my-4'>
      <h2 className='wishlist-title'>
           Wishlist
            <span className='icon'>
              <img className='icon-image-2' src={wishlistIcon} alt='Icon' />
            </span>
            
          </h2>
        <div className='container'>
          <div className='row'>
            {userData.wishlist?.map((game) => (
              <div className='col-lg-5 col-md-8 col-sm-12' key={game._id}>
                <div className='item'>
                  <div className='image-container'>
                    <img
                      className='game-image'
                      src={game.image}
                      alt={game.name}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <div className='overlay'>
                      <h3 className='game-name'>{game.name}</h3>
                      <p className='platforms'>
                        {getPlatformIcons(game.platform)}
                      </p>
                      <div className='rating-container'>
                        <p className='rating-label'>Rating:</p>
                        <p className='rating'>⭐️{game.rating}</p>
                      </div>
                      <div className='released-container'>
                        <p className='released-label'>Released:</p>
                        <p className='released'>{game.releaseDate}</p>
                      </div>
                      <div className='button-container'>
                        <img
                          src={wishlistIcon}
                          alt='Add to Wishlist'
                          onClick={() => handleRemoveFromWishlist(game.id)}
                          className='wishlist-button'
                          style={{ cursor: 'pointer' }}
                        />
                        <img
                          src={currentlyPlayingIcon}
                          alt='Currently Playing'
                          onClick={() => handleAddToCurrentlyPlaying(game.id)}
                          className='currently-playing-button'
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Search Bar */}
      <div className='input-group mb-3 search-group'>
        <input
          className='search-bar'
          type='text'
          placeholder='Search for games...'
          value={searchGames}
          onChange={(e) => setSearchedGames(e.target.value)}
        />
        <button className='search-button' onClick={handleGameSearch}>
          Search
        </button>
      </div>
      <div className='container'>
        <div className='row'>
          {searchResults.map((game) => (
            <div className='col-lg-5 col-md-6 col-sm-12' key={game.id}>
              <div className='item'>
                <div className='image-container'>
                  <img
                    className='game-image'
                    src={game.background_image}
                    alt={game.name}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <div className='overlay'>
                    <h3 className='game-name'>{game.name}</h3>
                    <p className='platforms'>
                      {getPlatformIcons(game.parent_platforms)}
                    </p>
                    <div className='rating-container'>
                      <p className='rating-label'>Rating:</p>
                      <p className='rating'>⭐️{game.rating}</p>
                    </div>
                    <div className='released-container'>
                      <p className='released-label'>Released:</p>
                      <p className='released'>{game.released}</p>
                    </div>
                    <div className='button-container'>
                      <img
                        src={wishlistIcon}
                        alt='Add to Wishlist'
                        onClick={() => handleAddToWishlist(game.id)}
                        className='wishlist-button'
                        style={{ cursor: 'pointer' }}
                      />
                      <img
                        src={currentlyPlayingIcon}
                        alt='Currently Playing'
                        onClick={() => handleAddToCurrentlyPlaying(game.id)}
                        className='currently-playing-button'
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
