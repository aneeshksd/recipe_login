import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import "./LoginPage.css";

const LoginPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleEmailInputChange = (event) => {
    setValues({ ...values, email: event.target.value });
  };

  const handlePasswordInputChange = (event) => {
    setValues({ ...values, password: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.email === "Aneesh" && values.password === "1234") {
      setValid(true);
      history.push("/recipe_dashboard");
    }
    setSubmitted(true);
  };

  return (
    <div className="main">
      {submitted && valid ? (
        <div className="success-message">
          {alert("Successfully Logged in!!!")}
        </div>
      ) : null}

      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <FaUserAlt />
            </div>
          </div>
          <div>
            <div>
              <h3 className="text">Login</h3>
              <input
                type="text"
                placeholder="user name"
                className="name"
                onChange={handleEmailInputChange}
                value={values.email}
              />
              <br></br>
              {submitted && !values.email ? (
                <span className="enter-email">Please enter the email</span>
              ) : null}
              <br></br>
            </div>
            <div className="second-input">
              <h3 className="text">Password</h3>
              <input
                type="password"
                placeholder="password"
                className="name"
                onChange={handlePasswordInputChange}
                value={values.password}
              />
              <br></br>
              {submitted && !values.password ? (
                <span className="enter-password">Enter the password</span>
              ) : null}
              <br></br>
            </div>
            {submitted && !values.submitted ? (
              <span className="enter-correct-details">
                Please enter the correct email and password
              </span>
            ) : null}
            <br></br>
            <div className="login">
              <button className="login-button" onClick={handleSubmit}><span className="login-name">Log in</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
