// server/models/form.js

const mongoose = require('mongoose');

// Define the schema
const formSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", // Reference to User model, if applicable
    },
    apiKey: {
        type: String,
    },
    fs1: {
        type: String,
    },
    fs2: {
        type: String,
    },
    vs1: {
        type: String,
        required: true
    },
    vs2: {
        type: String
    },
    vs3: {
        type: String
    },
    promptText: {
        type: String,
        required: true
    },
    promptNote: {
        type: String,
        required: false
    },
    templateName: {
        type: String,
        required: false
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the model
const Form = mongoose.model('Form', formSchema);

module.exports = Form;
