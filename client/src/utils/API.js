const apiKey = process.env.API_KEY;
const apiURL = `https://api.rawg.io/api/games?key=9cdfe8e7af674d6d825da9805c8c6545`

const getAllGames = async () => {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

getAllGames();