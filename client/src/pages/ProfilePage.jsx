import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaystation, faXbox, faWindows } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { ADD_TO_WISHLIST } from '../utils/mutations';
import { ADD_TO_CURRENTLY_PLAYING } from '../utils/mutations';



import { useMutation } from '@apollo/client';
import Navbar from './Navbar';



// Profile page function
const ProfilePage = () => {
  const [searchGames, setSearchedGames] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [wishlist, setWishlist] = useState([]); 
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);

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
      return platforms.map((platform, index) => {
        let icon = null;
        switch (platform.name) {
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
      console.log(game);
      if (!game) {
        throw new Error('Game not found');
      }
  
      // Convert gameId to a string and map platforms to an array of strings
      const input = {
        gameId: game.id.toString(), // Convert gameId to a string
        name: game.name,
        image: game.background_image,
        platforms: game.platforms.map(platform => platform.name), // Map platforms to an array of strings
        rating: game.rating,
        releaseDate: game.released,
      };
  
      // Call the addToWishlist mutation with the correct variable name
      const { data } = await addToWishlist({
        variables: {
          gameData: input, // Use the correct variable name as defined in your GraphQL schema
        },
      });
  
      setWishlist([...wishlist, data.addToWishlist]);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };
  

  const [addToCurrentlyPlaying] = useMutation(ADD_TO_CURRENTLY_PLAYING);

  const handleAddToCurrentlyPlaying = async (gameId) => {
    try {
      const { data } = await addToCurrentlyPlaying({ variables: { gameId } });
      setCurrentlyPlaying([...currentlyPlaying, data.addToCurrentlyPlaying]);
    } catch (error) {
      console.error('Error adding to currently playing:', error);
    }
  };
  
  
  

  return (
    <div className='container'>
      <Navbar />
      <header className='my-4'>
        <h1>Welcome, User!</h1>
      </header>

      <div className='row'>
        <div className='col-md-4'>
          {/* Profile Pic */}
          <img
            src='https://via.placeholder.com/150' // Replace with the actual URL of the profile picture
            alt='Profile'
            className='img-fluid rounded-circle mb-3'
          />
        </div>
        <div className='col-md-8'>
          <h2>Currently Playing:</h2>
          <div className='container'>
        <div className='row'>
          {currentlyPlaying.map((game) => (
            <div className='col-lg-3 col-md-6 col-sm-12' key={game.id}>
              <div className='item'>
                <img
                  src={game.background_image}
                  alt={game.name}
                  style={{ width: '100%', height: 'auto' }}
                />
                <h3>{game.name}</h3>
                <p>{getPlatformIcons(game.parent_platforms)}</p>
                <p> Rating: {game.rating}</p>
                <p>Released: {game.released}</p>
                <button onClick={() => handleAddToWishlist(game.id)}>Add to Wishlist</button>
                <button onClick={() => handleAddToCurrentlyPlaying(game.id)}>Currently Playing</button>
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
      </div>

      <section className='my-4'>
        <h2>Wishlist</h2>
        <div className='container'>
        <div className='row'>
          {wishlist.map((game) => (
            <div className='col-lg-3 col-md-6 col-sm-12' key={game.id}>
              <div className='item'>
                <img
                  src={game.background_image}
                  alt={game.name}
                  style={{ width: '100%', height: 'auto' }}
                />
                <h3>{game.name}</h3>
                <p>{getPlatformIcons(game.parent_platforms)}</p>
                <p> Rating: {game.rating}</p>
                <p>Released: {game.released}</p>
                <button onClick={() => handleAddToWishlist(game.id)}>Add to Wishlist</button>
                <button onClick={() => handleAddToCurrentlyPlaying(game.id)}>Currently Playing</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>
      {/* Search Bar */}
      <div className='input-group mb-3'>
        <input
          type='text'
          placeholder='Search for games...'
          value={searchGames}
          onChange={(e) => setSearchedGames(e.target.value)}
        />
        <button onClick={handleGameSearch}>Search</button>
      </div>
      <Link to='/blog'>Forums</Link>
      <div className='container'>
        <div className='row'>
          {searchResults.map((game) => (
            <div className='col-lg-3 col-md-6 col-sm-12' key={game.id}>
              <div className='item'>
                <img
                  src={game.background_image}
                  alt={game.name}
                  style={{ width: '100%', height: 'auto' }}
                />
                <h3>{game.name}</h3>
                <p>{getPlatformIcons(game.parent_platforms)}</p>
                <p> Rating: {game.rating}</p>
                <p>Released: {game.released}</p>
                <button onClick={() => handleAddToWishlist(game.id)}>Add to Wishlist</button>
                <button onClick={() => handleAddToCurrentlyPlaying(game.id)}>Currently Playing</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
