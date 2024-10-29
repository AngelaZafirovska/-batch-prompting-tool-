import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { generateTemplate } from "../../action/promptAction";
import { saveInputData } from "../../store/actions";
import { isAuth } from "../../action/authAction";

const PromptForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ apiKey: '', fs1: '', fs2: '', vs1: '', vs2: '', vs3: '', promptNote: '', promptText: '', templateName: ''});
    const [errors, setErrors] = useState({ apiKey: '', fs1: '', fs2: '', vs1: '', vs2: '', vs3: '', promptNote: '', promptText: '', templateName: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let tempErrors = { apiKey: '', fs1: '', fs2: '', vs1: '', vs2: '', vs3: '', promptNote: '', promptText: '', templateName: '' };
        let isValid = true;

        if (!formData.apiKey) {
            tempErrors.apiKey = 'ApiKey is required.';
            isValid = false;
        }

        if (!formData.fs1) {
          tempErrors.fs1 = 'FixedSeed1 is required.';
          isValid = false;
        } 
        // else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(formData.fs1)) {
        //     tempErrors.fs1 = 'fs1 is not valid.';
        //     isValid = false;
        // }

        // if (!formData.fs2) {
        //   tempErrors.fs2 = 'FixedSeed2 is required.';
        //   isValid = false;
        // }

        if (!formData.vs1) {
          tempErrors.vs1 = 'VariableSeed1 is required.';
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

  const handleNext = async (e) => {
    e.preventDefault();
    if (validate()) {
        console.log('Form submitted successfully!', formData);
        // Handle form submission (e.g., send to API)
        setFormData({ apiKey: '', fs1: '', fs2: '', vs1: '', vs2: '', vs3: '', promptNote: '', promptText: '', templateName: '' }); // Reset form
        setErrors({ apiKey: '', fs1: '', fs2: '', vs1: '', vs2: '', vs3: '', promptNote: '', promptText: '', templateName: '' }); // Clear errors

        const dataToSend = { vs1: formData.vs1, vs2: formData.vs2, vs3: formData.vs3, promptNote: formData.promptNote, promptText: formData.promptText, templateName: formData.templateName,};
        // const dataToSend = { vs1: 'asdfadsf', promptNote: '', promptText: '', TemplateName: '' };
        dispatch(saveInputData(formData));

        const userData = isAuth()
        const data = { userId: userData._id, ...formData }
        generateTemplate(data)

        history.push('/user/AdminFetch', { data: dataToSend });
    }
    
    // const response = await sendPromptRequest(
    //   formData.apiKey,
    //   formData.fs1,
    //   formData.fs2,
    //   formData.vs1.split(","),
    //   formData.vs2,
    //   formData.vs3,
    //   formData.promptNote,
    //   formData.promptText,
    //   formData.templateName,
    // );
    // const parameterValue = "123"; 
    // if (response) {
    //   // alert("Prompts processed successfully!");
    // } else {
    //   alert("Error processing prompts.");
    // }
  };
  
  return (
    <div className="prompt-form mt-5"style={{ padding: '12px' }}  >
      <h2 className="text-center mb-10 ml-10">Submit Your URLs and Keywords</h2>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <form className="card p-4 shadow">
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">open AI secret key (required)</label>
              </div>
              <div className="col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      name="apiKey"
                      placeholder="Enter ApiKey"
                      value={formData.apiKey}
                      onChange={handleChange}
                    />
                    {errors.apiKey && <span style={{ color: 'red' }}>{errors.apiKey}</span>}
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">fixed seed1 (required)</label>
              </div>
              <div className="col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      name="fs1"
                      placeholder="Enter fs1(URL)"
                      value={formData.fs1}
                      onChange={handleChange}
                    />
                    {errors.fs1 && <span style={{ color: 'red' }}>{errors.fs1}</span>}
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">fixed seed2 (required)</label>
              </div>
              <div className="col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      name="fs2"
                      placeholder="Enter fixedSeed1(URL)"
                      value={formData.fs2}
                      onChange={handleChange}
                    />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">variable seed1 (required)</label>
              </div>
              <div className="col-md-6">
                    <textarea
                      className="form-control"
                      type="text"
                      name="vs1"
                      placeholder="Enter VariableSeed1(URL)"
                      value={formData.vs1}
                      onChange={handleChange}
                    />
                    {errors.vs1 && <span style={{ color: 'red' }}>{errors.vs1}</span>}
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">variable seed2 (required)</label>
              </div>
              <div className="col-md-6">
                    <textarea
                      className="form-control"
                      type="text"
                      name="vs2"
                      placeholder="Enter VariableSeed1(URL)"
                      value={formData.vs2}
                      onChange={handleChange}
                    />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">variable seed3 (required)</label>
              </div>
              <div className="col-md-6">
                    <textarea
                      className="form-control"
                      type="text"
                      name="vs3"
                      placeholder="Enter VariableSeed1(URL)"
                      value={formData.vs3}
                      onChange={handleChange}
                    />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">prompt note</label>
              </div>
              <div className="col-md-6">
                    <textarea
                      className="form-control"
                      type="text"
                      name="promptNote"
                      placeholder="Enter PromptNote(URL)"
                      value={formData.promptNote}
                      onChange={handleChange}
                    />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">prompt text</label>
              </div>
              <div className="col-md-6">
                    <textarea
                      className="form-control"
                      type="text"
                      name="promptText"
                      placeholder="Enter PromptText(URL)"
                      value={formData.promptText}
                      onChange={handleChange}
                    />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">template name</label>
              </div>
              <div className="col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      name="templateName"
                      placeholder="Enter TemplateName(URL)"
                      value={formData.templateName}
                      onChange={handleChange}
                    />
              </div>
            </div>
            <button onClick={handleNext} className="btn btn-primary w-100">Submit</button>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default PromptForm;
