import { useEffect } from "react";
import "./style/GetStarted.css"; // Import your CSS file
import { SendRequest } from "./functions/SendRequest";
import { useNavigate } from "react-router-dom";

const apiurl = process.env.REACT_APP_USER_API_URL || "";

const SignupSignin: React.FC = () => {
  const navigate = useNavigate();
  const tologin = () => {
    navigate("/");
  };
  const checkSessionAndLogin = async () => {
    const session = sessionStorage.getItem("session");
    if (session) {
      const senddata = { request: "session", session: session };
      try {
        const response = await SendRequest(apiurl, "POST", senddata);
        const { statusCode } = response;
        if (statusCode !== 200) {
          tologin();
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
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <div className="sign-in-form">
            <h1 className="title">Unlock Your WordPress Hosting Experience</h1>
            <h2></h2>
            <p className="description">
              Start building your dream website today with our fast and reliable
              WordPress hosting solutions! Whether you're just starting out or
              you're a seasoned developer, our hosting plans are tailored to fit
              your needs. Enjoy seamless management, robust performance, and
              exceptional support every step of the way.
            </p>
            <button className="btn">Get Started Now</button>
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Ready to Elevate Your Online Presence?</h3>
            <p>
              Join us today and unleash your potential with our premium
              WordPress hosting services! Sign up now and watch your ideas take
              flight!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSignin;
