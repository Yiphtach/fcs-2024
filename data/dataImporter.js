const axios = require('axios');
const mongoose = require('mongoose');
const Character = require('../models/character');
require('dotenv').config();

// Connecting MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ${mongoose.connection.name}.`))
  .catch(err => console.log(`Connection error: ${err}`));

// MongoDB Connection Event Handlers
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB database ${mongoose.connection.name}.`);
});
mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});

// Function to fetch and save character data
async function fetchAndStoreCharacter(characterId) {
  try {
    const response = await axios.get(`https://superheroapi.com/api/${process.env.SUPERHERO_API_KEY}/${characterId}`);
    const data = response.data;

    const character = new Character({
      name: data.name,
      universe: data.biography.publisher || 'Unknown',
      stats: {
        strength: data.powerstats.strength || 0,
        speed: data.powerstats.speed || 0,
        durability: data.powerstats.durability || 0,
        power: data.powerstats.power || 0,
        combat: data.powerstats.combat || 0,
        intelligence: data.powerstats.intelligence || 0,
      },
      abilities: data.work.occupation ? data.work.occupation.split(', ') : ['Unknown'],
      imageUrl: data.image.url || '',
      comicBookAppearances: data.appearance ? data.appearance.total : 0,
    });

    await character.save();
    console.log(`Saved character: ${character.name}`);
  } catch (error) {
    console.error(`Error fetching character with ID ${characterId}: ${error.message}`);
  }
}

// Fetch and save multiple characters
async function fetchMultipleCharacters() {
  const characterIds = [1, 2, 3, 4, 5]; // Add more IDs as needed

  try {
    // Fetch all characters in parallel using Promise.all()
    const fetchPromises = characterIds.map(id => fetchAndStoreCharacter(id));
    await Promise.all(fetchPromises);  // Wait for all fetches to complete
    console.log('All characters fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching multiple characters:', error.message);
  } finally {
    mongoose.connection.close();  // Gracefully close the MongoDB connection after the operation
    console.log('MongoDB connection closed.');
  }
}

// Execute the data fetching
fetchMultipleCharacters();
