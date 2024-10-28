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

// export const fetchResults = async () => {
//   try {
//     const response = await fetch("/api/results");
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Fetch results error:", error);
//     return [];
//   }
// };

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
