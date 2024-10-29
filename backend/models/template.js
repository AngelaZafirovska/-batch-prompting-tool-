const mongoose = require("mongoose");

// Define the schema
const templateSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to User model, if applicable
    },
    api_key: {
      type: String,
    },
    template_name: {
      type: String,
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
      default: Date.now, // Set the default value to the current date
      required: true,
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Create the model
module.exports = mongoose.model("Template", templateSchema);
