import React, { useEffect, useState } from "react";
import { fetchResults } from "../../action/promptAction";

const FetchResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      const data = await fetchResults();
      setResults(data);
    };
    getResults();
  }, []);

  return (
    <div className="fetch-results mt-5">
      <h2 className="text-center mb-4">Fetched Results</h2>
      {results.length > 0 ? (
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
      )}
    </div>
  );
};

export default FetchResults;
