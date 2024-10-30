import React, { useEffect, useState } from "react";
import { fetchResults } from "../../action/promptAction";
const data= [];
const FetchResult = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      const data ={};
      setResults(data);
    };
    getResults();
  }, []);

  return (
    <div className="fetch-results mt-5 text-cneter col-md-8" style={{margin: "auto"}}>
      <h2 className="text-center mb-4">OpenAI API FAQ Prompts</h2>
      <h5 className="text-center mb-4" style={{color: "#ff4500"}}>Note: Each gpt-4 API call can take up to 30 seconds.</h5>
      <p className="text-center">Content for https://newsBlinds.co.uk/extra-wide-electric-roller-blinds
        <br />
        Target URL: https://newsBlinds.co.uk/perfect-fit-blinds/perfect-fit-roller-blinds
      </p>
      <div className="text-center mt-5 mb-5" style={{height: "1px", background: "#bbbbbb"}}></div>

      {/* {results.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No results yet.</p>
      )} */}
      <div className="faqItem">
        <div className="text-left" style={{fontSize: "20px",  color: "#444444", marginBottom: "25px"}}>Question: Can I get Perfect Fit Roller Blinds in extra-wide sizes?</div>
        <p className="text-left text-justify" style={{fontSize: "20px",  color: "#444444", marginBottom: "25px"}}>Answer: While we specialize in a range of blinds, our Extra Wide Electric Roller Blinds
        do not come in the <a
        href='https://newblinds.co.uk/perfect-fit-blinds/perfect-fit-roller-blinds'>Perfect Fit Roller
        Blinds</a> design. However, we offer other styles and fittings that are tailored to cover
        large windows or doors effectively. These are customizable to meet your specific
        requirements, including choices of colour, pattern, and control options. Please check
        our website for the available options.
        </p>
      </div>
      <div className="text-center"  style={{height: "1px", background: "#bbbbbb", marginBottom: "50px"}}></div>
      <div className="text-center" style={{color: "#ff4400"}}>There are 35 Prompts left to be fetched.
        <br />
        The page will autoload until your close this window.
      </div>
    </div>
  );
};

export default FetchResult;
