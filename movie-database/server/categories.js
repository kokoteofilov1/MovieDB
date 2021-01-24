const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    genre: {
        type: String
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Artist;