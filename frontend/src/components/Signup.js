import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "./helper/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, phone, password, error, success } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, phone, password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            phone: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log(error));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/login">Login Here</Link>
          </div>
        </div>
      </div>
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
            User already exists
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="signup-form">
        <form>
          <h2>Sign Up</h2>
          <p>Please fill in this form to create an account!</p>
          <hr />
          <div className="form-group">
            <div className="row">
              <div className="col-xs-6">
                <input
                  onChange={handleChange("name")}
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Your Name"
                  required="required"
                  value={name}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("email")}
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              required="required"
              value={email}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("phone")}
              type="number"
              className="form-control"
              name="phone"
              placeholder="Phone no must be 6 to 10 digit"
              required="required"
              value={phone}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              required="required"
              value={password}
            />
          </div>

          <div className="form-group">
            <label htmlFor="" className="checkbox-inline">
              <input type="checkbox" /> I accept the
              <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
            </label>
          </div>
          <div className="form-group">
            <button onClick={onSubmit} className="btn btn-primary btn-lg">
              Sign Up
            </button>
          </div>
          {successMessage()}
          {errorMessage()}
        </form>
        <div className="hint-text">
          Already have an account? <a href="/login">Login Here</a>
        </div>
      </div>
    </>
  );
};

export default Signup;
