import React from "react";
import { Link } from "react-router-dom";
import { isAuth, signout } from "../action/authAction";
import { withRouter } from "react-router-dom";

const Header = ({ history }) => {

  return (
    <div>
      <nav className="navbar navbar-define navbar-expand-lg navbar-light bg-light px-4">
        <a className="navbar-brand nav-brand" href="/">Batch Prompting Tool</a>
        <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            {!isAuth() && (
              <>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signin"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    Signin
                  </Link>
                </li>
              </>
            )}

            {isAuth() && isAuth().role === 0 && (
              <li className="nav-item">
                <Link
                  to="/user"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  {`${isAuth().name}'s Dashboard`}
                </Link>
              </li>
            )}

            {isAuth() && isAuth().role === 1 && (
              <li className="nav-item">
                <Link
                  to="/admin"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  {`${isAuth().name}'s Dashboard`}
                </Link>
              </li>
            )}

            {isAuth() && (
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => signout(() => history.push("/signin"))}
                >
                  SignOut
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Header);
