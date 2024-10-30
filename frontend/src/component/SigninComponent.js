import { signin, autheticate, isAuth } from "../action/authAction";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const SigninComponent = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && history.push("/");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.table({ name, email, password, error, loading, message, showForm });

    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      try {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          //save user token to cookie
          //save user info to localStroage
          //authenticate user
          autheticate(data, () => {
            if (isAuth()) {
              if (isAuth().role === 1) {
                history.push("/admin");
              } else {
                history.push("/user");
              }
            } else {
              history.push("/signin");
            }
            // history.push("/admin");
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
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

  const signinForm = () => {
    return (
      <>
        <form className="form-div" onSubmit={handleSubmit}>
          <p className="signin-quest">
            Don't have an account? <Link
              to="/signup"
              style={{ cursor: "pointer", color: "#0D6EFD" }}
            >
              Create one!
            </Link>
          </p>
          <p className="signup-header">Sign in to your account</p>
          <div className="form-group">
            <label className="mb-1" style={{ fontSize: "14px" }}>Email Address</label>
            <input
              value={email}
              onChange={handleChange("email")}
              type="email"
              className="form-control sign-form mb-4"
              placeholder="Type your email"
            />
            <label className="mb-1" style={{ fontSize: "14px" }}>Password</label>
            <input
              value={password}
              onChange={handleChange("password")}
              type="password"
              className="form-control sign-form mb-4"
              placeholder="Type your password"
            />
          </div>
          <button className="btn btn-primary signup-button">SignIn</button>
        </form>
      </>
    );
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="col-md-6">
          {showLaoding()}
          {showError()}
          {showMessage()}
          {showForm && signinForm()}
        </div>
      </div>
    </div>
  );
};

export default withRouter(SigninComponent);
