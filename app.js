// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const methodOverride = require('method-override');
const app = express();

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Routes
const indexRoutes = require('./routes/index');
const characterRoutes = require('./routes/characters');
const fightRoutes = require('./routes/fights');

app.use('/', indexRoutes);
app.use('/characters', characterRoutes);
app.use('/fights', fightRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
