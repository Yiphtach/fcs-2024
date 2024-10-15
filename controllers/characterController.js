const Character = require('../models/character');

// List all characters with pagination
exports.listCharacters = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
    const limit = 40;  // Set the limit to 40 characters per page
    const skip = (page - 1) * limit;  // Calculate the number of characters to skip

    // Fetch characters with pagination
    const characters = await Character.find({}, 'name universe stats')
      .skip(skip)
      .limit(limit);

    // Get total number of characters
    const totalCharacters = await Character.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalCharacters / limit);

    res.render('characters', {
      title: 'All Characters',
      characters,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error('Error listing characters:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Show form to create a new character
exports.showCreateForm = (req, res) => {
  res.render('characterForm', { title: 'Create New Character', character: null });
};

// Create a new character with detailed validation
exports.createCharacter = async (req, res) => {
  try {
    const { name, universe, stats } = req.body;

    // Input validation
    if (!name || !universe || !stats) {
      return res.status(400).send('Bad Request: Missing required fields (name, universe, stats).');
    }

    // Validate stats object structure
    const { strength, speed, durability, power, combat, intelligence } = stats;
    if (
      [strength, speed, durability, power, combat, intelligence].some(stat => typeof stat !== 'number')
    ) {
      return res.status(400).send('Bad Request: Invalid stats. Each stat must be a number.');
    }

    // Check for duplicate characters
    const existingCharacter = await Character.findOne({ name });
    if (existingCharacter) {
      return res.status(400).send(`Bad Request: Character with name "${name}" already exists.`);
    }

    // Create new character
    const character = new Character({ name, universe, stats });
    await character.save();

    res.redirect('/characters');
  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Show form to edit a character
exports.showEditForm = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).send('Character not found');
    }
    res.render('characterForm', { title: 'Edit Character', character });
  } catch (error) {
    console.error('Error fetching character for editing:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Update a character with detailed validation
exports.updateCharacter = async (req, res) => {
  try {
    const { name, universe, stats } = req.body;

    // Input validation
    if (!name || !universe || !stats) {
      return res.status(400).send('Bad Request: Missing required fields for character update (name, universe, stats).');
    }

    // Validate stats object structure
    const { strength, speed, durability, power, combat, intelligence } = stats;
    if (
      [strength, speed, durability, power, combat, intelligence].some(stat => typeof stat !== 'number')
    ) {
      return res.status(400).send('Bad Request: Invalid stats. Each stat must be a number.');
    }

    // Update character
    const character = await Character.findByIdAndUpdate(req.params.id, { name, universe, stats }, { new: true, runValidators: true });
    if (!character) {
      return res.status(404).send('Character not found');
    }

    res.redirect('/characters');
  } catch (error) {
    console.error('Error updating character:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a character
exports.deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    if (!character) {
      return res.status(404).send('Character not found');
    }
    res.redirect('/characters');
  } catch (error) {
    console.error('Error deleting character:', error);
    res.status(500).send('Internal Server Error');
  }
};
