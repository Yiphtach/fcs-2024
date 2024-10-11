// Function to calculate win percentage for a character
function calculateWinPercentage(wins, totalFights) {
    if (totalFights === 0) return 0;
    return parseFloat(((wins / totalFights) * 100).toFixed(2));  // Return as a number, not a string
}

// Function to format character name (e.g., capitalize first letter of each word)
// Handles extra spaces and edge cases
function formatCharacterName(name) {
    return name
        .trim()  // Remove any extra leading or trailing spaces
        .split(/\s+/)  // Split by one or more spaces to avoid issues with multiple spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize each word
        .join(' ');  // Rejoin the words into a single string
}

// Example usage
const winPercentage = calculateWinPercentage(5, 10);
console.log(`Win Percentage: ${winPercentage}%`);

const formattedName = formatCharacterName('  peter   parker  ');
console.log(`Formatted Name: ${formattedName}`);
