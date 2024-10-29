// server/controllers/TemplateController.js

const OpenAI = require("openai");
const Template = require("../models/template"); // Import your Template model
const Prompt = require("../models/prompt");

async function getContent(apiKey, prompt) {
  try {
    const openai = new OpenAI({
      apiKey: apiKey ?? process.env.OPENAI_API_KEY, // Ensure your OpenAI API key is in your environment variables
    });
  
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    // Extract the content from the response
    const responseContent = aiResponse.choices[0].message.content;
    return responseContent;
  } catch (error) {
    console.error(`OpenAI error: ${error.message}`);
    return null;
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

    const apiKey = template.api_key;
    const content = `${template.prompt_text} #Note ${template.prompt_note}`
    const result = await getContent(apiKey, content);

    if (result) {
      const newPrompt = new Prompt({
        user_id: userId,
        template_id: templateId,
        content: result,
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
module.exports = { generatePromptResponse };
