// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cron = require('node-cron');
const app = express();
const dataImporter = require('./data/dataImporter'); // Import the data importer script

require('dotenv').config();

// Set the port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Connecting MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ${mongoose.connection.name}.`))
  .catch(err => console.log(`Connection error: ${err}`));

// MongoDB Connection Event Handlers
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB database ${mongoose.connection.name}.`);
});
mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Routes (import your routes as needed)
const indexRoutes = require('./routes/index');
const characterRoutes = require('./routes/characters');
const fightRoutes = require('./routes/fights');

app.use('/', indexRoutes);
app.use('/characters', characterRoutes);
app.use('/fights', fightRoutes);

// Schedule a cron job to fetch data daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running scheduled character data import...');
  await dataImporter.fetchMultipleCharacters(); // Calls the function from your data importer script
});

// Start Server
const PORT = port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
