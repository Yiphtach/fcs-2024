const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
const API_BASE_URL = `https://superheroapi.com/api/${process.env.SUPERHERO_API_KEY}`;
const MAX_RETRIES = 3; // Maximum retry attempts
const TIMEOUT = 5000; // Request timeout (milliseconds)

/**
 * Fetches data from the Superhero API with retry logic.
 * @param {string} url - API endpoint URL.
 * @param {number} retries - Number of retry attempts.
 * @returns {Promise<Object>} - Returns the API response data.
 */
async function fetchSuperheroData(url, retries = MAX_RETRIES) {
    try {
        const response = await axios.get(url, { timeout: TIMEOUT });
        return response.data;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying API request to ${url} (${retries} attempts left)...`);
            return fetchSuperheroData(url, retries - 1);
        } else {
            console.error(`Error fetching data from API: ${error.message}`);
            if (error.response) {
                console.error(`Response status: ${error.response.status}`);
                console.error(`Response data: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error(`No response received. Check API availability.`);
            }
            throw error; // Throw error after retries are exhausted
        }
    }
}

// 🔍 Search for a Character by Name
router.get('/search/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const data = await fetchSuperheroData(`${API_BASE_URL}/search/${name}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching character data' });
    }
});

// 🔹 Get Character Details by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchSuperheroData(`${API_BASE_URL}/${id}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching character data' });
    }
});

// 📊 Get Character Powerstats
router.get('/:id/powerstats', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchSuperheroData(`${API_BASE_URL}/${id}/powerstats`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching powerstats' });
    }
});

// 📜 Get Character Biography
router.get('/:id/biography', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchSuperheroData(`${API_BASE_URL}/${id}/biography`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching biography' });
    }
});

// 🎭 Get Character Appearance
router.get('/:id/appearance', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchSuperheroData(`${API_BASE_URL}/${id}/appearance`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching appearance' });
    }
});

// 🏢 Get Character Work (Occupation & Base)
router.get('/:id/work', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchSuperheroData(`${API_BASE_URL}/${id}/work`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching work details' });
    }
});

// 🔗 Get Character Connections
router.get('/:id/connections', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchSuperheroData(`${API_BASE_URL}/${id}/connections`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching connections' });
    }
});

// 🖼️ Get Character Image
router.get('/:id/image', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchSuperheroData(`${API_BASE_URL}/${id}/image`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching image' });
    }
});

module.exports = router;
