const axios = require('axios');

// Function to fetch data from an external API with retries
async function fetchDataFromAPI(apiUrl, params = {}, retries = 3, timeout = 5000) {
    try {
        const response = await axios.get(apiUrl, {
            params: params,  // Optional query parameters
            timeout: timeout  // Set the timeout duration
        });
        return response.data;  // Return the data for further processing
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying API request (${retries} attempts left)...`);
            return fetchDataFromAPI(apiUrl, params, retries - 1, timeout);  // Retry the request
        } else {
            console.error(`Error fetching data from API: ${error.message}`);
            if (error.response) {
                console.error(`Response status: ${error.response.status}`);
                console.error(`Response data: ${JSON.stringify(error.response.data)}`);
            }
            throw error;  // Rethrow the error after retries are exhausted
        }
    }
}

// Example usage
(async () => {
    const apiUrl = 'https://api.example.com/characters';  // Replace with actual API
    const queryParams = { limit: 10, page: 2 };  // Example query parameters

    try {
        const data = await fetchDataFromAPI(apiUrl, queryParams);  // Fetch with query params
        console.log('Data fetched successfully:', data);
    } catch (error) {
        console.error('Failed to fetch data after retries:', error.message);
    }
})();
