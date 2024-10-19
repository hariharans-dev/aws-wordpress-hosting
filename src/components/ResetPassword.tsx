import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./style/ForgetPassword.css"; // Import your CSS file
import { SendRequest } from "./functions/SendRequest";
import { useNavigate } from "react-router-dom";

const apiurl_user =
  "https://vzo16sqfhl.execute-api.ap-south-1.amazonaws.com/stage1/user";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [password, setpassword] = useState("");
  const [repassword, setrepassword] = useState("");

  const [response, setresponse] = useState("");
  const [responsetype, setresponsetype] = useState("");

  const verification_key = searchParams.get("verification_key");

  const tologin = () => {
    navigate("/");
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
    setresponse(""); // Clear response when typing
  };

  const handleRepasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setrepassword(e.target.value);
    setresponse(""); // Clear response when typing
  };

  const checkverification_code = async () => {
    var senddata = {
      request: "reset_password",
      verification_key: verification_key,
      password: password,
    };
    if (password !== repassword) {
      setresponse("Passwords donot match");
      setresponsetype("error");
      return;
    } else if (password == "") {
      setresponse("password should not be empty");
      setresponsetype("error");
      return;
    } else if (verification_key == null) {
      setresponse("no verification key");
      setresponsetype("error");
      return;
    }
    try {
      const response = await SendRequest(apiurl_user, "POST", senddata);
      console.log(response);
      const { statusCode, body } = response;
      setresponse(body);
      if (statusCode === 201) {
        setresponse("Password Updated");
        setresponsetype("success");
      } else {
        setresponsetype("error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <div className="sign-in-form">
            <h1 className="title">Password Update</h1>
            <h2></h2>
            <p className="description">
              Please enter the email address associated with your account, and
              we'll send you a link to create a new password.
            </p>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="password"
                placeholder="Password"
                name="password" // This is already correct
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                name="password" // Change "Email" to "email"
                onChange={(e) => handleRepasswordChange(e)}
              />
            </div>
            <div className="button-box">
              <button className="btn" onClick={() => checkverification_code()}>
                Update
              </button>
              <button className="btn" onClick={() => tologin()}>
                Back
              </button>
            </div>

            {response && (
              <div className={`response-message ${responsetype}`}>
                {response}
              </div>
            )}

            {!response && password !== repassword && password !== "" && (
              <div className="response-message error">
                Passwords donot match
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Unlock Your WordPress Hosting by Updating Your Password?</h3>
            <p>
              Secure your account, empower your future. Update your password now
              and stay protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
