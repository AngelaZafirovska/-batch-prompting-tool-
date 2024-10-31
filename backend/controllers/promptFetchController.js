// server/controllers/TemplateController.js
const OpenAI = require("openai");
const Template = require("../models/template"); // Import your Template model
const Prompt = require("../models/prompt");
const async = require('async');
const { getDomain } = require('../utils');
const mongoose = require('mongoose');

// Tasks related part
let blockedUserIds = new Set();

const taskQueue = async.queue(async (task) => {
  try {
    const { data, userId } = task;
    const template = data.template
    console.log(`Processing task for user ${userId}`);

    if (blockedUserIds.has(userId)) {
      console.log(`Skipping task for blocked user ${userId}`);
      return; // Mark task as done without processing
    }

    // Get content from openai API
    const result = await getContent(template.api_key, template.prompt_text, template.prompt_note);

    const templateId = template._id;
    const domain = getDomain(template.target_url);

    if (result) {
      const newPrompt = new Prompt({
        user_id: userId,
        template_id: templateId,
        domain: domain,
        uniqueTargetUrls: 1,
        content: result,
        fetched_count: 0,
        exported_count: 0,
        is_fetched: true,
        is_exported: false,
        date: new Date(),
      });

      // Save data to template collection
      await newPrompt.save();
    }

    console.log(`Completed task for user ${userId}`);
  } catch (error) {
    console.error(`Queue task error: ${error.message}`);
  }
}, 1);

const addTask = (data, userId) => {
  taskQueue.push({ data, userId }, (err) => {
    if (err) console.error(`Error processing task for user ${userId}:`, err);
  });
};

// Block tasks for a specific userId
const blockTasksByUserId = (userId) => {
  blockedUserIds.add(userId);
  console.log(`Blocked tasks for user ${userId}`);
};

// End task related part

async function getContent(apiKey, content, note) {
  try {
    const openai = new OpenAI({
      apiKey: apiKey ?? process.env.OPENAI_API_KEY,
    });

    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          "role": "system",
          "content": note
        },
        {
          "role": "user",
          "content": content
        }
      ],
    });

    // Extract the content from the response
    const responseContent = aiResponse.choices[0].message.content;
    return responseContent;
  } catch (error) {
    console.error(`OpenAI error: ${error.message}`);
    return null;
  }
}

const cancelTaskByUserId = async (req, res) => {
  try {
    const formData = req.body;
    const userId = formData.userId

    // Run cancel task by userId
    blockTasksByUserId(userId)

  } catch (error) {
    console.log("Error with communicating", error.message);
    res.status(500).json({ error: "Error communicating" });
  }
}

const fetchAllPrompt = async (req, res) => {
  try {
    const formData = req.body;
    const userId = formData.userId

    // Get all templates from db
    const prompts = await Prompt.find({ user_id: userId }).exec();
    const excludedTemplateIds = prompts.map(prompt => prompt.template_id);

    const templates = await Template.find({
      user_id: userId,
      _id: { $nin: excludedTemplateIds }
    }).exec();
    
    // Process tasks
    templates.forEach(template => {
      addTask({ template }, userId);
    });

    res.status(200).json({ message: "ok" });

  } catch (error) {
    console.log("Error with communicating", error.message);
    res.status(500).json({ error: "Error communicating" });
  }
}

const getAllDomains = async (req, res) => {
  try {
    const formData = req.body;
    const userId = formData.userId

    // Get all templates from db
    const prompts = await Prompt.aggregate([
      {
        $match: { user_id: mongoose.Types.ObjectId(userId) }
      },
      {
        $group: {
          _id: "$domain",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const templates = await Template.aggregate([
      {
        $match: { user_id: mongoose.Types.ObjectId(userId) }
      },
      {
        $group: {
          _id: "$domain",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const domains = templates.map(template => {
      const promptDomain = prompts.find(prompt => prompt._id === template._id)
      const prompts_fetched = promptDomain ? promptDomain.count : 0;
      const prompts_tobe_fetched = promptDomain ? (template.count >= promptDomain.count ? (template.count - promptDomain.count) : 0) : template.count;

      return { domain: template._id, prompts_fetched, prompts_tobe_fetched }
    })

    const exported_count = 0;
    const unique_target_urls = 0;
    const allDomains = domains.map(val => {
      return { unique_target_urls, exported_count, ...val }
    })

    res.status(200).json({ allDomains });
  } catch (error) {
    console.log("Error with communicating", error.message);
    res.status(500).json({ error: "Error communicating" });
  }
}

const generatePromptResponse = async (req, res) => {
  const formData = req.body;

  try {
    const templateId = formData.templateId;
    const userId = formData.userId;

    const template = await Template.findOne({ _id: templateId }).exec();
    if (!template) {
      return res.status(400).json({
        error: "Template doesn't exist",
      });
    }

    const domain = getDomain(template.target_url);
    const apiKey = template.api_key;
    const result = await getContent(apiKey, template.prompt_text, template.prompt_note);


    if (result) {
      const newPrompt = new Prompt({
        user_id: userId,
        template_id: templateId,
        domain: domain,
        uniqueTargetUrls: 1,
        content: result,
        fetched_count: 0,
        exported_count: 0,
        is_fetched: true,
        is_exported: false,
        date: new Date(),
      });

      // Save data to template collection
      await newPrompt.save();

      res.status(200).json({ message: "ok" });
    } else {
      res.status(400).json({ message: "OpenAI error" });
    }

  } catch (error) {
    console.log("Error with communicating", error.message);
    res.status(500).json({ error: "Error communicating" });
  }
};
module.exports = { generatePromptResponse, fetchAllPrompt, cancelTaskByUserId, getAllDomains };
