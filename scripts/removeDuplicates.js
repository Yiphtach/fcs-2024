const mongoose = require('mongoose');
const Character = require('../models/character'); // Assuming the character model is in the models folder
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ${mongoose.connection.name}`))
  .catch(err => console.log(`Connection error: ${err}`));

// Function to remove duplicates
async function removeDuplicates() {
  try {
    // Find duplicate characters by name, grouping by name
    const duplicates = await Character.aggregate([
      {
        $group: {
          _id: { name: "$name" }, // Group by name field
          uniqueIds: { $addToSet: "$_id" }, // Add unique _id to array
          count: { $sum: 1 } // Count total documents with the same name
        }
      },
      {
        $match: { count: { $gt: 1 } } // Only return groups with more than one document
      }
    ]);

    // Iterate through each group of duplicates
    for (const duplicate of duplicates) {
      const idsToKeep = duplicate.uniqueIds[0]; // Keep the first _id
      const idsToDelete = duplicate.uniqueIds.slice(1); // All other _ids are duplicates

      // Delete the duplicates, keeping one record
      await Character.deleteMany({ _id: { $in: idsToDelete } });
      console.log(`Removed ${idsToDelete.length} duplicates for character: ${duplicate._id.name}`);
    }

    console.log('Duplicate removal process completed.');
  } catch (error) {
    console.error('Error removing duplicates:', error);
  } finally {
    mongoose.connection.close(); // Close the connection when done
  }
}

// Execute the function
removeDuplicates();
