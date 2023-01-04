const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdTests: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Test",
        },
    ],
    passedTests: [
        {
            type: Object,
            required: true,
        },
    ],
});

module.exports = mongoose.model("User", userSchema);
