const express = require('express');
const { generatePromptResponse, fetchAllPrompt, fetchResult, getAllDomains } = require('../controllers/promptFetchController');

const router = express.Router();

// Route to handle OpenAI request
router.post('/prompt/fetchAll', fetchAllPrompt);
router.post('/prompt/getAllDomains', getAllDomains);
router.post('/prompt/generate', generatePromptResponse);
router.post('/prompt/fetchResult', fetchResult);

module.exports = router;