const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    threatScoreHarmless: {
        type: String,
        required: true
    },
    threatScoreMalicious: {
        type: String,
        required: true
    },
    threatScoreSuspicious: {
        type: String,
        required: true
    },
    threatScoreUndetected: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
