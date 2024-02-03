import React, { useEffect } from 'react';

const HomePage = () => {
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
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default HomePage