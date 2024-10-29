const express = require('express');
const { generatePromptResponse } = require('../controllers/promptFetchController');

const router = express.Router();

// Route to handle OpenAI request
router.post('/prompt/generate', generatePromptResponse);

module.exports = router;