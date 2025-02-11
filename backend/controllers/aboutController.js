const asyncHandler = require('express-async-handler');

// @desc    Get about page information
// @route   GET /api/about
// @access  Public
const getAboutInfo = asyncHandler(async (req, res) => {
    try {
        const aboutInfo = {
            appName: "Fight Combat Simulator",
            established: 2024,
            description: "An immersive combat simulation platform for strategic battle planning",
            mission: "To provide an engaging and realistic combat simulation experience",
            features: [
                "Real-time Combat",
                "Strategic Planning",
                "Character Customization",
                "Battle Statistics"
            ],
            contact: {
                email: "support@fightsimulator.com",
                website: "www.fightsimulator.com",
                support: "24/7 Online Support",
                version: "1.0.0"
            }
        };
        
        res.status(200).json(aboutInfo);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving about information" });
    }
});

module.exports = {
    getAboutInfo
};