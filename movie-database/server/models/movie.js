const mongoose = require('mongoose');
const Artist = require('./artist');
const User = require('./user');

const movieSchema = new mongoose.Schema({
    genre: {
        type: String
    },

    actors: {
        type: [String]
    },

    producer: {
        type: String
    },

    music: {
        type: [String]
    },

    title: {
        type: String,
        unique: true
    },

    productionDate: {
        type: Date
    },

    studio: {
        type: String
    },

    description: {
        type: String
    },

    rating: {
        type: Number
    },

    posterURL: {
        type: String
    },

    trailerURL: {
        type: String
    },

    duration: {
        type: String
    },

    country: {
        type: String
    },

    ratingIMDB: {
        type: String
    },

    language: {
        type: String
    },

    characters: {
        type: [Object]
    },

    awards: {
        type: [String]
    },

    viewers: {
        type: [String]
    },

    keywords: {
        type: [String]
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;