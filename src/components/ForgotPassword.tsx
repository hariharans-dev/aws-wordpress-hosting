import { useEffect, useState } from "react";
import "./style/ForgetPassword.css"; // Import your CSS file
import { SendRequest } from "./functions/SendRequest";
import { useNavigate } from "react-router-dom";

const apiurl =
  "https://vzo16sqfhl.execute-api.ap-south-1.amazonaws.com/stage1/user";

const SignupSignin: React.FC = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");

  const [emailresponse, setemailresponse] = useState("");
  const [emailresponsetype, setemailresponsetype] = useState("");

  const tologin = () => {
    navigate("/");
  };

  const sendverification_code = async () => {
    var senddata = { request: "forget_password", email: email };

    try {
      const response = await SendRequest(apiurl, "POST", senddata);
      console.log(response);
      const { statusCode, body } = response;
      setemailresponse(body);
      if (statusCode === 200) {
        setemailresponsetype("success");
      } else {
        setemailresponsetype("error");
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
            <h1 className="title">Forget Password</h1>
            <h2></h2>
            <p className="description">
              Please enter the email address associated with your account, and
              we'll send you a link to create a new password.
            </p>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                name="email" // Change "Email" to "email"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="button-box">
              <button className="btn" onClick={() => sendverification_code()}>
                Send Link
              </button>
              <button className="btn" onClick={() => tologin()}>
                Back
              </button>
            </div>

            {emailresponse && (
              <div className={`response-message ${emailresponsetype}`}>
                {emailresponse}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Unlock Your WordPress Hosting but Forgot Your Password?</h3>
            <p>No worries! We're here to help you reset it.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSignin;
