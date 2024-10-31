import React, { useEffect, useState } from "react";
import { fetchResults } from "../../action/promptAction";
import { isAuth } from "../../action/authAction";
import { useHistory } from "react-router-dom";


const FetchResult = () => {
  const [results, setResults] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!isFetched) {
      const getResults = async () => {
        const userData = isAuth();
        const paramData = { userId: userData._id };

        const data = await fetchResults(paramData);
        setResults(data);

        setIsFetched(true);
      };
      getResults();
    }
  }, [isFetched]);

  const handleContent = (content) => {
    if (content) {
      // Extract the question and answer using regular expressions
      let formattedText = content.replace(/\*\*Question:\*\*/g, 'Question:');
      formattedText = formattedText.replace(/\*\*Answer:\*\*/g, '\nAnswer:');

      return formattedText;
    }
  }

  const handleStep = (step) => {
    switch (step) {
      case 1:
        history.push("/user");
        break;
      case 2:
        history.push("/user/AdminFetch");
        break;
      case 3:
        history.push("/user/ManagementWindow");
        break;
      case 4:
        history.push("/user/FetchResult");
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="fetch-results mt-5 text-cneter col-md-8" style={{ margin: "auto" }}>      
      <div className="row">
        <ul id="progressbar">
          <li onClick={() => handleStep(1)} id="form"><strong>Form</strong></li>
          <li onClick={() => handleStep(2)} id="template"><strong>Template ManagementTool</strong></li>
          <li onClick={() => handleStep(3)} id="prompt"><strong>Prompts</strong></li>
          <li onClick={() => handleStep(4)} className="active" id="fetchresult"><strong>Fetch Result</strong></li>
        </ul>
      </div>

      <h2 className="text-center mb-4">OpenAI API FAQ Prompts</h2>
      <h5 className="text-center mb-4" style={{ color: "#ff4500" }}>Note: Each gpt-4 API call can take up to 30 seconds.</h5>

      {
        isFetched ?
          <>
            <p className="text-center">Content for {results.prompts?.template_data?.content_url}
              <br />
              Target URL: {results.prompts?.template_data?.target_url}
            </p>
            <div className="text-center mt-5 mb-5" style={{ height: "1px", background: "#bbbbbb" }}></div>

            <div className="faqItem py-4">
              {handleContent(results.prompts?.content)}
            </div>
            <div className="text-center" style={{ height: "1px", background: "#bbbbbb", marginBottom: "50px" }}></div>
            <div className="text-center" style={{ color: "#ff4400" }}>
              {
                results.toBeFetched > 0 ? `There are ${results.toBeFetched} Prompts left to be fetched.` : ""
              }
              <br />
              The page will autoload until you close this window.
            </div>
          </>
          :
          <div className="alert alert-primary" role="alert">
            Loading...
          </div>
      }
    </div>
  );
};

export default FetchResult;
