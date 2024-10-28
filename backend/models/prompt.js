// server/models/Template.js

const mongoose = require('mongoose');

// Define the schema
const promptSchema = new mongoose.Schema({
    template_id: {
        type: Number, // Assuming template_id is a string, adjust if necessary
        required: true
    },
    prompt_id: {
        type: Number, // Assuming prompt_id is also a string
        required: true
    },
    target_url: {
        type: String,
        required: true
    },
    content_url: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
        required: true
    },
    prompt_text: {
        type: String,
        required: true
    },
    prompt_note: {
        type: String,
        required: false // Optional field
    },
    is_fetched: {
        type: Boolean,
        default: false // Default value set to false
    },
    is_exported: {
        type: Boolean,
        default: false // Default value set to false
    },
    date: {
        type: Date,
        default: Date.now, // Automatically set to current date
        required: true
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the model
const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;
