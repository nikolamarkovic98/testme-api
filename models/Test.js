const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// required means it cant be null
const testSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    questions: [
        {
            type: Object,
            required: true
        }
    ],
    resources: {
        type: String
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    usersThatPassedTest: [
        {
            type: mongoose.Types.ObjectId,
            required: true
        }
    ]
}, {timestamps:true});

module.exports = mongoose.model('Test', testSchema);