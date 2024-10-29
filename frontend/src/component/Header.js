import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuth, signout } from "../action/authAction";
import { withRouter } from "react-router-dom";

const Header = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <a className="navbar-brand nav-brand" href="#">Batch Prompting Tool</a>
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
      {/* <Navbar color="light" light expand="md" className="px-4">
        <NavbarBrand href="/" className="nav-brand">Batch Prompting Tool</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="d-flex flex-row-reverse">
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link
                    to="/signup"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    Signup
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/signin"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    Signin
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link
                  to="/user"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  {`${isAuth().name}'s Dashboard`}
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link
                  to="/admin"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  {`${isAuth().name}'s Dashboard`}
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => signout(() => history.push("/signin"))}
                >
                  SignOut
                </span>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar> */}
    </div>
  );
};

export default withRouter(Header);
