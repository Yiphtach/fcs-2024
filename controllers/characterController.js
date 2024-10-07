// controllers/characterController.js
const Character = require('../models/character');

// List all characters
exports.listCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.render('characters', { characters });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Show form to create a new character
exports.showCreateForm = (req, res) => {
  res.render('characterForm');
};

// Create a new character
exports.createCharacter = async (req, res) => {
  try {
    const character = new Character(req.body);
    await character.save();
    res.redirect('/characters');
  } catch (error) {
    res.status(500).send(error);
  }
};

// Show form to edit a character
exports.showEditForm = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    res.render('characterForm', { character });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a character
exports.updateCharacter = async (req, res) => {
  try {
    await Character.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/characters');
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a character
exports.deleteCharacter = async (req, res) => {
  try {
    await Character.findByIdAndDelete(req.params.id);
    res.redirect('/characters');
  } catch (error) {
    res.status(500).send(error);
  }
};
