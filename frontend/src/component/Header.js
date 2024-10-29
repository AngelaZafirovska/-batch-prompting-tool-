import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuth, signout } from "../action/authAction";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavbarBrand } from "reactstrap";
import { withRouter } from "react-router-dom";

const Header = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" className="px-4">
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
      </Navbar>
    </div>
  );
};

export default withRouter(Header);
