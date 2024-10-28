import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPromptForm = () => {
  const inputData = useSelector((store) => store.inputData);
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState('yes');
  const [formData, setFormData] = useState({
    apiKey: "",
    fs1: "",
    fs2: "",
    vs1: "",
    vs2: "",
    vs3: "",
    promptNote: "",
    promptText: "",
    templateName: "",
  });
  const [errors, setErrors] = useState({
    apiKey: "",
    fs1: "",
    fs2: "",
    vs1: "",
    vs2: "",
    vs3: "",
    promptNote: "",
    promptText: "",
    templateName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    setFormData({
      apiKey: inputData.apiKey,
      fs1: inputData.fs1,
      fs2: inputData.fs2,
      vs1: inputData.vs1,
      vs2: inputData.vs2,
      vs3: inputData.vs3,
      promptNote: inputData.promptNote,
      promptText: inputData.promptText,
      templateName: inputData.templateName,
    });
  }, []);
  const validate = () => {
    let tempErrors = {
      apiKey: "",
      fs1: "",
      fs2: "",
      vs1: "",
      vs2: "",
      vs3: "",
      promptNote: "",
      promptText: "",
      templateName: "",
    };
    let isValid = true;

    if (!formData.apiKey) {
      tempErrors.apiKey = "TargetURL is required.";
      isValid = false;
    }

    // if (!formData.fs1) {
    //   tempErrors.fs1 = 'FixedSeed1 is required.';
    //   isValid = false;
    // } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(formData.fs1)) {
    //     tempErrors.fs1 = 'fs1 is not valid.';
    //     isValid = false;
    // }

    // if (!formData.fs2) {
    //   tempErrors.fs2 = 'FixedSeed2 is required.';
    //   isValid = false;
    // }

    if (!formData.vs1) {
      tempErrors.vs1 = "promptNote is required.";
      isValid = false;
    }
    // if (!formData.vs2) {
    //   tempErrors.vs2 = 'VariableSeed2 is required.';
    //   isValid = false;
    // }
    // if (!formData.vs3) {
    //   tempErrors.vs3 = 'VariableSeed3 is required.';
    //   isValid = false;
    // }
    // if (!formData.promptNote) {
    //   tempErrors.promptNote = 'PromptNote is required.';
    //   isValid = false;
    // }
    // if (!formData.promptText) {
    //   tempErrors.promptText = 'PromptText is required.';
    //   isValid = false;
    // }
    // if (!formData.templateName) {
    //   tempErrors.templateName = 'TemplateName is required.';
    //   isValid = false;
    // }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully!", formData);
      // Handle form submission (e.g., send to API)
      setFormData({
        apiKey: "",
        fs1: "",
        fs2: "",
        vs1: "",
        vs2: "",
        vs3: "",
        promptNote: "",
        promptText: "",
        templateName: "",
      }); // Reset form
      setErrors({
        apiKey: "",
        fs1: "",
        fs2: "",
        vs1: "",
        vs2: "",
        vs3: "",
        promptNote: "",
        promptText: "",
        templateName: "",
      }); // Clear errors
      try {
        const response = await fetch("http://localhost:8000/api/fetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Data saved:", data);
        // Optionally reset form fields
        setFormData("");
      } catch (error) {
        console.error("Error saving data:", error);
      }
      // const dataToSend  ={ fs1:  };
      history.push("/AdminFetch", {});
    }
  };
  const handleRadioChange = (value) =>{
    setSelectedOption(value)
  }
  console.log(formData, "FormData");
  return (
    <div className="prompt-form mt-5" style={{ padding: "12px" }}>
      <h2 className="text-center mb-10 ml-10">Submit Your URLs and Keywords</h2>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card p-4 shadow">
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">Target URL</label>
              </div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  type="text"
                  name="apiKey"
                  placeholder="Enter ApiKey"
                  defaultValue={formData.vs1}
                  onChange={handleChange}
                />
                {errors.apiKey && (
                  <span style={{ color: "red" }}>{errors.apiKey}</span>
                )}
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">
                  Anchor Text <br />
                  (One per line)
                </label>
              </div>
              <div className="col-md-6">
                <textarea
                  className="form-control"
                  type="text"
                  name="vs2"
                  placeholder="Enter fs1(URL)"
                  value={formData.vs2}
                  onChange={handleChange}
                />
                {errors.vs2 && (
                  <span style={{ color: "red" }}>{errors.vs2}</span>
                )}
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">
                  Power Page URLs <br />
                  (One per line)
                </label>
              </div>
              <div className="col-md-6">
                <textarea
                  className="form-control"
                  type="text"
                  name="vs3"
                  placeholder="Enter fixedSeed1(URL)"
                  value={formData.vs3}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">Prompt Note</label>
              </div>
              <div className="col-md-6">
                <textarea
                  className="form-control"
                  type="text"
                  name="promptNote"
                  placeholder="Enter VariableSeed1(URL)"
                  value={formData.promptNote}
                  onChange={handleChange}
                />
                {errors.vs1 && (
                  <span style={{ color: "red" }}>{errors.vs1}</span>
                )}
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">Prompt Text</label>
              </div>
              <div className="col-md-6">
                <textarea
                  className="form-control"
                  type="text"
                  name="promptText"
                  placeholder="Enter VariableSeed1(URL)"
                  value={formData.promptText}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">
                  Template Name (Optional): <br />{" "}
                  <p style={{ fontSize: "13px" }}>
                    Add a name to save the <br />
                    prompt as a template
                  </p>
                </label>
              </div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  type="text"
                  name="templateName"
                  placeholder="Enter VariableSeed1(URL)"
                  value={formData.templateName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">Create AI Prompt Queues</label>
              </div>
              <div className="col-md-6">
                <div >
                  <label style={{marginRight: "10px"}}>
                          <input
                            type="radio"
                            value="option1"
                            name="promptNote"
                            checked={selectedOption === "yes"}
                            onChange={()=>handleRadioChange("yes")}
                          />
                          y
                      </label>
                        <label>
                            <input
                              type="radio"
                              value="option2"
                              name="promptNote"
                              checked={selectedOption === "no"}
                              onChange={()=>handleRadioChange("yes")}
                            />
                            n
                        </label>
                  </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Process
            </button>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default AdminPromptForm;
