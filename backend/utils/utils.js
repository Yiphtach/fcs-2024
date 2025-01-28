// Function to calculate win percentage for a character
function calculateWinPercentage(wins, totalFights) {
    if (totalFights === 0) return 0;
    return parseFloat(((wins / totalFights) * 100).toFixed(2));  // Return as a number, not a string
}

// Function to format character name (e.g., capitalize first letter of each word)
// Handles extra spaces and edge cases
function formatCharacterName(name) {
    if (!name || typeof name !== 'string') return '';  // Check for invalid or empty input
    return name
        .trim()  // Remove any extra leading or trailing spaces
        .split(/\s+/)  // Split by one or more spaces to avoid issues with multiple spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize each word
        .join(' ');  // Rejoin the words into a single string
}

// Function to calculate loss percentage for a character
function calculateLossPercentage(losses, totalFights) {
    if (totalFights === 0) return 0;
    return parseFloat(((losses / totalFights) * 100).toFixed(2));  // Return as a number
}

// Function to calculate draw percentage for a character (optional if applicable)
function calculateDrawPercentage(totalFights, wins, losses) {
    const draws = totalFights - (wins + losses);
    if (totalFights === 0) return 0;
    return parseFloat(((draws / totalFights) * 100).toFixed(2));
}

// Example usage
const winPercentage = calculateWinPercentage(5, 10);
console.log(`Win Percentage: ${winPercentage}%`);

const formattedName = formatCharacterName('  peter   parker  ');
console.log(`Formatted Name: ${formattedName}`);

const lossPercentage = calculateLossPercentage(3, 10);
console.log(`Loss Percentage: ${lossPercentage}%`);

const drawPercentage = calculateDrawPercentage(10, 5, 3);
console.log(`Draw Percentage: ${drawPercentage}%`);

module.exports = {
    calculateWinPercentage,
    calculateLossPercentage,
    calculateDrawPercentage,
    formatCharacterName
};
