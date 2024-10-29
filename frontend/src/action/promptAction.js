// import { API } from "../config/config";

// export const sendPromptRequest = async (
//   apiKey,
//   fs1,
//   fs2,
//   vs1,
//   vs2,
//   vs3,
//   promptNote,
//   promptText,
//   templateName
// ) => {
//   try {
//     const response = await fetch(`${API}/fetch`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         apiKey,
//         fs1,
//         fs2,
//         vs1,
//         vs2,
//         vs3,
//         promptNote,
//         promptText,
//         templateName
//       }),
//     });
//     return response.ok;
//   } catch (error) {
//     console.error("Prompt request error:", error);
//     return false;
//   }
// };

export const fetchResults = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/api/template/fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch results error:", error);
    return [];
  }
};

export const loadData = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/api/prompt/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch results error:", error);
    return [];
  }
};

export const generateTemplate = async (data) => {
  try {
    const response = await fetch("http://localhost:8000/api/template/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch results error:", error);
    return [];
  }
};

export const saveData = (data) => {
  return async (dispatch) => {
    // dispatch({ type: SAVE_DATA_REQUEST });

    try {
      // Replace this with your API call
      const response = await fetch("https://api.example.com/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      // dispatch({ type: SAVE_DATA_SUCCESS, payload: result });
    } catch (error) {
      // dispatch({ type: SAVE_DATA_FAILURE, error: error.message });
    }
  };
};
