// server/controllers/templateController.js

const Template = require("../models/template"); // Import your Template model
const { splitArrayIntoChunks, getDomain } = require('../utils');

const generateTemplateResponse = async (req, res) => {
  const formData = req.body;

  try {
    const userId = formData.userId;
    const apiKey = formData.apiKey;
    const seed_content_required = formData.fs1;
    const seed_content_optional = formData.fs2;
    const instance_urls = formData.vs1;
    const keywords_first = formData.vs2;
    const keywords_second = formData.vs3;
    const prompt_note = formData.promptNote;
    const prompt_text = formData.promptText;
    const template_name = formData.templateName;

    // Get instance target urls to create template
    const instanceUrls = instance_urls && instance_urls
      .split(/[\n\s]+/) // Use regex to split by newline and space
      .filter(url => url.length > 0);

    let vs2Keywords = [];
    let vs3Keywords = [];
    const maxKeywords = 10;

    // Get variable keywords
    const keywords = keywords_first && keywords_first
      .split(/[\n\s]+/) // Use regex to split by newline and space
      .filter(url => url.length > 0);

    if (keywords.length > maxKeywords) {
      const cutKeywords = splitArrayIntoChunks(keywords);
      vs2Keywords = cutKeywords
    } else {
      vs2Keywords.push(keywords_first)
    }

    // Get optional keywords
    const optionalKeywords = keywords_second && keywords_second
      .split(/[\n\s]+/) // Use regex to split by newline and space
      .filter(url => url.length > 0);

    if (optionalKeywords.length > maxKeywords) {
      const cutKeywords = splitArrayIntoChunks(optionalKeywords);
      vs3Keywords = cutKeywords
    } else {
      vs3Keywords.push(keywords_second)
    }

    // Replace needed brackets in prompt text
    const seedText = prompt_text.replaceAll("[FS1]", seed_content_required)
    const seedOptional = seedText.replaceAll("[FS2]", seed_content_optional)
    const promptInstance = seedOptional.replaceAll("[VS1]", instance_urls)

    // Replace needed brackets in prompt note
    const noteSeed = prompt_note.replaceAll("[FS1]", seed_content_required)
    const noteOptional = noteSeed.replaceAll("[FS2]", seed_content_optional)
    const noteInstance = noteOptional.replaceAll("[VS1]", instance_urls)

    if (vs2Keywords.length > 0) {
      for (const vs2Keyword of vs2Keywords) {
        if (vs3Keywords.length > 0) {
          for (const vs3Keyword of vs3Keywords) {
            const noteKeywords = noteInstance.replaceAll("[VS2]", vs2Keyword)
            const promptNote = noteKeywords.replaceAll("[VS3]", vs3Keyword)

            const promptKeywords = promptInstance.replaceAll("[VS2]", keywords_first)
            const promptText = promptKeywords.replaceAll("[VS3]", keywords_second)

            instanceUrls.map(async (url) => {
              const domain = getDomain(url);
              const templateName = `${domain} (${template_name})`;

              const newTemplate = new Template({
                user_id: userId,
                api_key: apiKey,
                template_name: templateName,
                target_url: url,
                content_url: instance_urls,
                keyword: `[VS2]: ${vs2Keyword}, [VS3]:${vs3Keyword}`,
                prompt_text: promptText,
                prompt_note: promptNote,
                date: new Date(),
              });

              // Save data to template collection
              await newTemplate.save();
            });
          }

        } else {
          const promptNote = noteInstance.replaceAll("[VS2]", vs2Keyword)
          const promptText = promptInstance.replaceAll("[VS2]", vs2Keyword)

          instanceUrls.map(async (url) => {
            const domain = getDomain(url);
            const templateName = `${domain} (${template_name})`;

            const newTemplate = new Template({
              user_id: userId,
              api_key: apiKey,
              template_name: templateName,
              target_url: url,
              content_url: instance_urls,
              keyword: vs2Keyword,
              prompt_text: promptText,
              prompt_note: promptNote,
              date: new Date(),
            });

            // Save data to template collection
            await newTemplate.save();
          });
        }
      }

    }

    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log("Error with communicating");
    res.status(500).json({ error: "Error communicating" });
  }
};

const getTemplates = async (req, res) => {
  const formData = req.body;
  const user_id = formData.userId;

  try {
    const templates = await Template.find({ user_id }).exec();
    if (!templates) {
      return res.status(400).json({
        error: "User doesn't have templates",
      });
    }

    return res.json({ templates });
  } catch (error) {
    console.log("Error with communicating");
    res.status(500).json({ error: "Error communicating" });
  }
}

module.exports = { generateTemplateResponse, getTemplates };