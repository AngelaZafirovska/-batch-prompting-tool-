import React, { useState } from "react";
import { sendPromptRequest } from "../../action/promptAction";

const AdminPromptForm = () => {
  const [urls, setUrls] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendPromptRequest(
      urls.split(","),
      keywords.split(",")
    );
    if (response) {
      alert("Prompts processed successfully!");
    } else {
      alert("Error processing prompts.");
    }
  };

  return (
    <div className="container mt-5" style={{ color: 'blue', padding: '20px', border: '2px solid black' }}>
      <h2 className="text-center mb-10 ml-10">Submit Your URLs and Keywords</h2>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="card p-4 shadow">
            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="urls" className="form-label">
                  open AI secret key(required) 
                </label>
              </div>
              <div className="col-md-6">
              <input
                className="form-control"
                id="urls"
                placeholder="Enter URLs (comma separated)"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                rows="3"
              />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="urls" className="form-label">
                  fixed seed1 (required) 
                </label>
              </div>
              <div className="col-md-6">
              <input
                className="form-control"
                id="urls"
                placeholder="Enter URLs (comma separated)"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                rows="3"
              />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="urls" className="form-label">
                  fixed seed2 (optional) 
                </label>
              </div>
              <div className="col-md-6">
              <input
                className="form-control"
                id="urls"
                placeholder="Enter URLs (comma separated)"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                rows="3"
              />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="urls" className="form-label">
                  variable seed1 (required) 
                  <br />
                  (one per line) 
                </label>
              </div>
              <div className="col-md-6">
              <textarea
                className="form-control"
                id="urls"
                placeholder="Enter URLs (comma separated)"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                rows="3"
              />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="urls" className="form-label">
                  variable seed2 (required) 
                  <br />
                  (one per line) 
                </label>
              </div>
              <div className="col-md-6">
              <textarea
                className="form-control"
                id="urls"
                placeholder="Enter URLs (comma separated)"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                rows="3"
              />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="urls" className="form-label">
                variable seed3 (required) 
                  <br />
                  (one per line) 
                </label>
              </div>
              <div className="col-md-6">
              <textarea
                className="form-control"
                id="urls"
                placeholder="Enter URLs (comma separated)"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                rows="3"
              />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="urls" className="form-label">
                  prompt note
                </label>
              </div>
              <div className="col-md-6">
              <textarea
                className="form-control"
                id="urls"
                placeholder="Enter URLs (comma separated)"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                rows="3"
              />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="urls" className="form-label">
                  prompt text
                </label>
              </div>
              <div className="col-md-6">
              <textarea
                className="form-control"
                id="urls"
                placeholder="Enter URLs (comma separated)"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                rows="3"
              />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="urls" className="form-label">
                  Terminal Name (optional)
                </label>
              </div>
              <div className="col-md-6">
              <input
                className="form-control"
                id="urls"
                placeholder="Enter URLs (comma separated)"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                rows="3"
              />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPromptForm;
