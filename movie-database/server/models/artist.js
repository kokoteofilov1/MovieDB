const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    profession: {
        type: String
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    birthDate: {
        type: Date
    }

});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;