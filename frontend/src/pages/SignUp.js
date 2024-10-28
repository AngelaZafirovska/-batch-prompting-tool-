import React from "react";
import SignupComponent from "../component/SignUpComponet";
const SignUp = () => {
  return (
    <React.Fragment>
      <div className="row d-flex justify-content-center w-100">
      <h2 className="text-center pt-4 pb-4">SignUp</h2>
      <div className="row d-flex justify-content-center w-100">
          <SignupComponent />
      </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
