const axios = require('axios');
require('dotenv').config();  // Load environment variables

// Function to fetch data from an external API with retries and enhanced error handling
async function fetchDataFromAPI(apiUrl, params = {}, retries = 3, timeout = 5000) {
    try {
        const response = await axios.get(apiUrl, {
            params: params,  // Optional query parameters
            timeout: timeout  // Set the timeout duration
        });
        return response.data;  // Return the data for further processing
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying API request to ${apiUrl} (${retries} attempts left)...`);
            return fetchDataFromAPI(apiUrl, params, retries - 1, timeout);  // Retry the request
        } else {
            console.error(`Error fetching data from API: ${error.message}`);
            if (error.response) {
                console.error(`Response status: ${error.response.status}`);
                console.error(`Response data: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error(`No response received. Check your network or API availability.`);
            }
            console.error(`Failed URL: ${apiUrl}`);
            console.error(`Parameters: ${JSON.stringify(params)}`);
            throw error;  // Rethrow the error after retries are exhausted
        }
    }
}

// Example usage function to handle API calls and responses
async function exampleAPIFetch() {
    const apiUrl = `https://superheroapi.com/api/${process.env.SUPERHERO_API_KEY}/search/character-id`;  // Use the environment variable for the API key
    const queryParams = { limit: 40, page: 17 };  // Example query parameters

    try {
        const data = await fetchDataFromAPI(apiUrl, queryParams);  // Fetch with query params
        console.log('Data fetched successfully:', data);
    } catch (error) {
        console.error('Failed to fetch data after retries:', error.message);
    }
}

// Execute example usage
exampleAPIFetch();

module.exports = { fetchDataFromAPI };
