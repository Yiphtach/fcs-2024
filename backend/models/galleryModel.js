const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String },
    category: { type: String }
});

module.exports = mongoose.model('GalleryItem', GallerySchema);