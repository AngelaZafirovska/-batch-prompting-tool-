import { API } from "../config/config"; 

export const sendPromptRequest = async (
  apiKey,
  fs1,
  fs2,
  vs1,
  vs2,
  vs3,
  promptNote,
  promptText,
  templateName
) => {
  try {
    const response = await fetch(`${API}/fetch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        apiKey,
        fs1,
        fs2,
        vs1,
        vs2,
        vs3,
        promptNote,
        promptText,
        templateName
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Prompt request error:", error);
    return false;
  }
};

export const fetchResults = async () => {
  try {
    const response = await fetch("/api/results");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch results error:", error);
    return [];
  }
};
