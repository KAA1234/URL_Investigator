const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    threatScore: {
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
