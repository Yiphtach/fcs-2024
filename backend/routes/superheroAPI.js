const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

const API_BASE_URL = `https://superheroapi.com/api/${process.env.SUPERHERO_API_KEY}`;

// 🔍 Search for a Character by Name
router.get('/search/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const response = await axios.get(`${API_BASE_URL}/search/${name}`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching character by name: ${error}`);
        res.status(500).json({ error: 'Error fetching character data' });
    }
});

// 🔹 Get Character Details by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching character details: ${error}`);
        res.status(500).json({ error: 'Error fetching character data' });
    }
});

// 📊 Get Character Powerstats
router.get('/:id/powerstats', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${API_BASE_URL}/${id}/powerstats`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching powerstats: ${error}`);
        res.status(500).json({ error: 'Error fetching powerstats' });
    }
});

// 📜 Get Character Biography
router.get('/:id/biography', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${API_BASE_URL}/${id}/biography`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching biography: ${error}`);
        res.status(500).json({ error: 'Error fetching biography' });
    }
});

// 🎭 Get Character Appearance
router.get('/:id/appearance', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${API_BASE_URL}/${id}/appearance`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching appearance: ${error}`);
        res.status(500).json({ error: 'Error fetching appearance' });
    }
});

// 🏢 Get Character Work (Occupation & Base)
router.get('/:id/work', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${API_BASE_URL}/${id}/work`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching work info: ${error}`);
        res.status(500).json({ error: 'Error fetching work details' });
    }
});

// 🔗 Get Character Connections
router.get('/:id/connections', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${API_BASE_URL}/${id}/connections`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching connections: ${error}`);
        res.status(500).json({ error: 'Error fetching connections' });
    }
});

// 🖼️ Get Character Image
router.get('/:id/image', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${API_BASE_URL}/${id}/image`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching character image: ${error}`);
        res.status(500).json({ error: 'Error fetching image' });
    }
});

module.exports = router;