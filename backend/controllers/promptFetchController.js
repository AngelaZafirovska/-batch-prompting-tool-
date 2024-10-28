// server/controllers/TemplateController.js

const OpenAI = require('openai');
const Template = require('../models/template'); // Import your Template model
const Prompt = require('../models/prompt');

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY, // Ensure your OpenAI API key is in your environment variables
// });

// Function to handle the request
// const generatePromptResponse = async (req, res) => {
//     const { prompt_text } = req.body; // Get the prompt text from the request body

//     try {
//         // Send a request to OpenAI
//         const aiResponse = await openai.chat.completions.create({
//             model: 'gpt-4', // Specify the model you want to use
//             messages: [{ role: 'user', content: prompt_text }],
//         });

//         // Extract the content from the response
//         const responseContent = aiResponse.choices[0].message.content;

//         // Optionally, save the response or other data to your database
//         const newTemplate = new Template({
//             prompt_text,
//             // Include other fields as necessary
//             response: responseContent,
//             date: new Date(), // Save the current date
//         });
//         await newTemplate.save();

//         // Send the AI response back to the client
//         res.status(200).json({ response: responseContent });
//     } catch (error) {
//         console.error('Error communicating with OpenAI:', error);
//         res.status(500).json({ error: 'Error communicating with OpenAI' });
//     }
// };

const generatePromptResponse = async (req, res) => {
    console.log(req.body);
    const { prompt_text } = req.body.promptText;
    const { content_url } = req.body.fs1;
    const { target_url } = req.body.vs1;
    const {keyword} = req.body.vs2;
    
    console.log(formData.promptText);
    try{
        if(formData.templateName) {
            // console.log('sadfasdfasdfasdf');
            const newTemplate = new Template({
                template_name: formData.templateName,
                date: new Date(),
            }); 
            console.log(newTemplate)               
            await newTemplate.save(); 
            res.status(200).json({response: formData.promptText});
        } else {
            res.status(200).json({message: "no template!"});
        }
    } catch (error) {
        console.log('Error with communicating');
        res.status(500).json({error: 'Error communicating'})
    }
}
module.exports = { generatePromptResponse };
