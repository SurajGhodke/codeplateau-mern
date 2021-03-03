import React from "react";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login, authenticate, isAutheticated } from "./helper/index";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const user = isAutheticated();
  console.log(user);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      //.catch(console.log("sigin request failed"));
      .catch((err) => {
        console.log("signin request failed", err);
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 0) {
        return <Redirect to="/user/dashboard" />;
      } else {
        return <Redirect to="/login" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h4>Loading...</h4>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="login-form">
        <form>
          <h2 className="text-center">Log in</h2>
          <div className="form-group">
            <input
              onChange={handleChange("email")}
              value={email}
              type="email"
              className="form-control control-login"
              placeholder="email"
              required="required"
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("password")}
              value={password}
              type="password"
              className="form-control"
              placeholder="Password"
              required="required"
            />
          </div>
          <div className="form-group">
            <button onClick={onSubmit} className="btn btn-primary btn-block">
              Log In
            </button>
          </div>
          <div className="clearfix">
            <label htmlFor="" className="pull-left checkbox-inline">
              <input type="checkbox" />
              Remember me
            </label>
            <a to="#" className="pull-right">
              Forgot Password?
            </a>
          </div>
          {loadingMessage()}
          {errorMessage()}
          {performRedirect()}
        </form>
        <p className="text-center">
          <a to="/signup">Create an Account</a>
        </p>
      </div>
    </>
  );
};

export default Login;
