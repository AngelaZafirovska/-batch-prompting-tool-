// server/models/Template.js

const mongoose = require('mongoose');

// Define the schema
const promptSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to User model, if applicable
    },
    template_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    fetched_count: {
      type: Number,
      required: false
    },
    exported_count: {
      type: Number,
      required: false
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
