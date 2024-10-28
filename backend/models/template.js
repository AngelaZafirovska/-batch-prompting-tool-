
const mongoose = require('mongoose');

// Define the schema
const templateSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to User model, if applicable
    },

    template_name: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now, // Set the default value to the current date
        required: true
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the model
module.exports = mongoose.model("Template", templateSchema);
