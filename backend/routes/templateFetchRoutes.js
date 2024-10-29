const express = require('express');
const { generateTemplateResponse, getTemplates } = require('../controllers/templateController');

const router = express.Router();

// Route to handle OpenAI request
router.post('/template/generate', generateTemplateResponse);
router.post('/template/fetch', getTemplates);

module.exports = router;