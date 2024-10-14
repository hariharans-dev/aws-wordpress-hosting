import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style/SignupSignin.css"; // Import your CSS file
import { SendRequest } from "./functions/SendRequest";

const apiurl =
  "https://vzo16sqfhl.execute-api.ap-south-1.amazonaws.com/stage1/user";

const SignupSignin: React.FC = () => {
  const navigate = useNavigate();

  const checkSessionAndLogin = async () => {
    const session = sessionStorage.getItem("session");
    if (session) {
      const senddata = { request: "session", session: session };
      try {
        const response = await SendRequest(apiurl, "POST", senddata);
        const { statusCode } = response;
        if (statusCode === 200) {
          onlogin();
        } else {
          sessionStorage.removeItem("session");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  useEffect(() => {
    checkSessionAndLogin();
  }, []);

  const onlogin = () => {
    navigate("/home");
  };
  const onsignup = () => {
    navigate("getstarted");
  };

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpResponse, setsignUpResponse] = useState<string>("");
  const [signInResponse, setsignInResponse] = useState<string>("");

  const [signUpStatusCode, setsignUpStatusCode] = useState<number>(0);
  const [signInStatusCode, setsignInStatusCode] = useState<number>(0);

  const handleSignUp = () => {
    const container = document.querySelector(".container");
    if (container) {
      container.classList.add("sign-up-mode");
    }
  };
  const handleSignIn = () => {
    const container = document.querySelector(".container");
    if (container) {
      container.classList.remove("sign-up-mode");
    }
  };

  const handleSignUpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };
  const handleSignInInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var senddata = { ...signUpData, request: "create" };

    try {
      const response = await SendRequest(apiurl, "POST", senddata);
      const { statusCode } = response; // Ensure statusCode is a number
      setsignUpStatusCode(statusCode); // Set statusCode properly
      if (statusCode === 201) {
        setsignUpResponse("User added");
        sessionStorage.setItem("session", response["session"]);
        onsignup();
      } else if (statusCode === 409) {
        setsignUpResponse("Email already exists.");
      } else {
        setsignUpResponse("Unexpected error: Please try again.");
      }
    } catch (error) {
      setsignUpResponse("Unexpected error occurred.");
      setsignUpStatusCode(500); // Default error code for unexpected errors
    }
  };
  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var senddata = { ...signInData, request: "login" };

    try {
      const response = await SendRequest(
        apiurl, // Replace with the correct API URL
        "POST",
        senddata
      );
      const { statusCode } = response;
      setsignInStatusCode(statusCode);
      if (statusCode === 201) {
        setsignInResponse("Login Success");
        onlogin();
        sessionStorage.setItem("session", response["session"]);
      } else if (statusCode === 401) {
        setsignInResponse("User Not Found");
      } else {
        setsignInResponse("Internal Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const forgetpassword = () => {};

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSignInSubmit} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                name="email" // Change "Email" to "email"
                value={signInData.email}
                onChange={handleSignInInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="password"
                placeholder="Password"
                name="password" // This is already correct
                value={signInData.password}
                onChange={handleSignInInputChange}
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <a className="forget-password" onClick={() => forgetpassword()}>
              Forget Password
            </a>

            {signInResponse && (
              <p
                className={`response-message ${
                  signInStatusCode === 201 ? "success" : "error"
                }`}
              >
                {signInResponse}
              </p>
            )}
          </form>

          <form onSubmit={handleSignUpSubmit} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signUpData.email}
                onChange={handleSignUpInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signUpData.password}
                onChange={handleSignUpInputChange}
              />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            {signUpResponse && (
              <p
                className={`response-message ${
                  signUpStatusCode === 201 ? "success" : "error"
                }`}
              >
                {signUpResponse}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              Don't have an account yet? Sign up and get access to all our
              services.
            </p>
            <button className="btn transparent" onClick={handleSignUp}>
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>
              Already made an account here? Sign in and get access to all our
              services.
            </p>
            <button className="btn transparent" onClick={handleSignIn}>
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignupSignin;
