import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAutheticated, signout } from "./helper";

const Navbar = ({ history }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 py-8 collapseOnSelect">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MERN
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              <Link className="nav-link" to="/">
                Home
              </Link>

              {!isAutheticated() && (
                <Fragment>
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </Fragment>
              )}
              {isAutheticated() && (
                <Link className="nav-link" to="/user/dashboard">
                  UserDashboard
                </Link>
              )}

              {isAutheticated() && (
                <span
                  className="nav-link text-warning"
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  Signout
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
