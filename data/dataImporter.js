const axios = require('axios');
const mongoose = require('mongoose');
const Character = require('../models/character');
require('dotenv').config();
const fs = require('fs'); // For logging errors

// Connecting MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ${mongoose.connection.name}`))
  .catch(err => console.log(`Connection error: ${err}`));

// Logging error to a file
function logError(errorMessage) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync('error.log', `${timestamp} - ${errorMessage}\n`, 'utf8');
}

// Helper function to add delay between API requests
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to process abilities and handle both string and object types
function processAbilities(abilitiesData) {
  if (!abilitiesData) return ['Unknown'];

  return abilitiesData.split(', ').map(ability => {
    // If it's a string, return it as is or process as object
    return typeof ability === 'string'
      ? {
          name: ability,
          type: 'Utility',  // Default type
          powerLevel: 50,   // Default power level (this could be adjusted)
          description: `Ability related to ${ability}`
        }
      : ability; // If it's already an object, return it as is
  });
}

// Function to fetch and save character data with retry logic and delay
async function fetchAndSaveCharacter(characterId) {
  const maxRetries = 3; // Set maximum retry attempts
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      // Make request to SuperHero API
      const response = await axios.get(`https://superheroapi.com/api/${process.env.SUPERHERO_API_KEY}/${characterId}`);
      const data = response.data;

      // Check if the API response was successful
      if (response.status !== 200 || !data) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      // Check if the character already exists in MongoDB (by name)
      const existingCharacter = await Character.findOne({ name: data.name });
      if (existingCharacter) {
        console.log(`Character ${data.name} already exists in the database. Skipping...`);
        return;  // Skip saving this character to avoid duplicates
      }

      // Process abilities to fit the model schema
      const abilities = processAbilities(data.work.occupation);

      // Prepare character data to store in MongoDB
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
        abilities,  // Pass processed abilities
        imageUrl: data.image.url || '',
        comicBookAppearances: data.appearance ? data.appearance.total : 0,
      });

      // Save character to MongoDB
      await character.save();
      console.log(`Saved character: ${character.name}`);

      return;  // Exit the function if the request was successful

    } catch (error) {
      attempt++;
      const errorMessage = `Error fetching character with ID ${characterId}: ${error.message} (Attempt ${attempt}/${maxRetries})`;

      // Log the error message to both the console and an error log file
      console.error(errorMessage);
      logError(errorMessage);

      // If max retries reached, log and skip this character
      if (attempt >= maxRetries) {
        console.error(`Failed to fetch character with ID ${characterId} after ${maxRetries} attempts.`);
        return;
      }

      // Wait for 2 seconds before retrying (rate limiting)
      await delay(2000);
    }
  }
}

// Fetch multiple characters with delays to avoid rate limiting
async function fetchMultipleCharacters() {
  const characterIds = Array.from({ length: 750 }, (_, i) => i + 1);  // Create an array of character IDs from 1 to 750

  for (let i = 0; i < characterIds.length; i++) {
    await fetchAndSaveCharacter(characterIds[i]);  // Wait for each character to be fetched
    await delay(1000);  // Add 1-second delay between each request
  }

  console.log('All characters fetched and saved successfully.');
  mongoose.connection.close();  // Close MongoDB connection after fetching
}

// Execute the data fetching
fetchMultipleCharacters();
