import React, { useEffect, useState } from "react";
import { isAuth, signup } from "../action/authAction";
import { withRouter } from "react-router-dom";

const SignUpComponet = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });
  

  const { name, email, password, error, loading, message, showForm } = values;
  useEffect(() => {
    isAuth() && history.push("/");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ name, email, password, error, loading, message, showForm });

    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    try {
      signup(user).then((data) => {
        try {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
            console.log("server error");
          } else {
            setValues({
              ...values,
              name: "",
              email: "",
              password: "",
              error: "",
              loading: false,
              message: data.message,
              showForm: false,
            });
          }
        } catch (err) {
          console.log(err);
        }
      });
    } catch (error) {
      console.log("error something");
    }
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLaoding = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signupForm = () => {
    return (
      <>
        <form className="form-div" onSubmit={handleSubmit}>
          <p className="signin-quest">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
          <p className="signup-header">Create an account</p>
          <div className="form-group">
            <label className="mb-1" style={{fontSize: "14px"}}>User Name</label>
            <input
              value={name}
              onChange={handleChange("name")}
              type="text"
              className="form-control sign-form mb-4"
              placeholder="Type your name"
            />
            <label className="mb-1" style={{fontSize: "14px"}}>Email Address</label>
            <input
              value={email}
              onChange={handleChange("email")}
              type="email"
              className="form-control sign-form mb-4"
              placeholder="Type your email"
            />
            <label className="mb-1" style={{fontSize: "14px"}}>Password</label>
            <input
              value={password}
              onChange={handleChange("password")}
              type="password"
              className="form-control sign-form mb-4"
              placeholder="Type your password"
            />
            <div className="mb-5">
              <input type="checkbox"></input>
              <label> &nbsp;You accept the privacy policy and terms of use</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary  signup-button">
            SignUp
          </button>
        </form>
      </>
    );
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
      {showLaoding()}
      {showError()}
      {showMessage()}
      {showForm && signupForm()}
      </div>
    </div>
  );
};

export default withRouter(SignUpComponet);
