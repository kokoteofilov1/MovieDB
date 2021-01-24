const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    movie: {
        type: String
    },

    title: {
        type: String,
        unique: true
    },

    rating: {
        type: Number
    },

    description: {
        type: String,
    },

    user: {
        type: String,
    },

    date: {
        type: Date
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;