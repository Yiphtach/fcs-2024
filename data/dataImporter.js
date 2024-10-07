// data/dataImporter.js
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
      universe: data.biography.publisher,
      stats: {
        strength: data.powerstats.strength,
        speed: data.powerstats.speed,
        durability: data.powerstats.durability,
        power: data.powerstats.power,
        combat: data.powerstats.combat,
        intelligence: data.powerstats.intelligence,
      },
      abilities: data.work.occupation.split(', '),
      imageUrl: data.image.url,
      comicBookAppearances: data.appearance.total,
    });

    await character.save();
    console.log(`Saved character: ${character.name}`);
  } catch (error) {
    console.error(`Error fetching character: ${error.message}`);
  }
}

// Fetch and save multiple characters
async function fetchMultipleCharacters() {
  const characterIds = [1, 2, 3, 4, 5]; // Add more IDs as needed
  for (let id of characterIds) {
    await fetchAndStoreCharacter(id);
  }
}

// Execute the data fetching
fetchMultipleCharacters();
