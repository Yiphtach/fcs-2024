const Character = require('../models/character');

// List all characters
exports.listCharacters = async (req, res) => {
  try {
    const characters = await Character.find({}, 'name universe stats');  // Fetch only necessary fields
    res.render('characters', { title: 'All Characters', characters });
  } catch (error) {
    console.error('Error listing characters:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Show form to create a new character
exports.showCreateForm = (req, res) => {
  res.render('characterForm', { title: 'Create New Character' });
};

// Create a new character with detailed validation
exports.createCharacter = async (req, res) => {
  try {
    // Input validation
    if (!req.body.name || !req.body.universe || !req.body.stats) {
      return res.status(400).send('Bad Request: Missing required fields (name, universe, stats).');
    }

    // Validate stats object structure
    const { strength, speed, durability, intelligence } = req.body.stats;
    if (
      typeof strength !== 'number' || typeof speed !== 'number' || 
      typeof durability !== 'number' || typeof intelligence !== 'number'
    ) {
      return res.status(400).send('Bad Request: Invalid stats. Each stat must be a number.');
    }

    const character = new Character(req.body);
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
    // Input validation
    if (!req.body.name || !req.body.universe || !req.body.stats) {
      return res.status(400).send('Bad Request: Missing required fields for character update (name, universe, stats).');
    }

    // Validate stats object structure
    const { strength, speed, durability, intelligence } = req.body.stats;
    if (
      typeof strength !== 'number' || typeof speed !== 'number' || 
      typeof durability !== 'number' || typeof intelligence !== 'number'
    ) {
      return res.status(400).send('Bad Request: Invalid stats. Each stat must be a number.');
    }

    const character = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
