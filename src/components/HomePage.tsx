// HomePage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./Home/Navbar";
import "./style/Home.css"; // Import your CSS file
import { SendRequest } from "./functions/SendRequest";

const apiEndpoint =
  "https://vzo16sqfhl.execute-api.ap-south-1.amazonaws.com/stage1/user";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/"); // Updated to use hash routing
  };

  const validateSession = async () => {
    const session = sessionStorage.getItem("session");
    if (session) {
      const requestData = { request: "session", session: session };
      try {
        const response = await SendRequest(apiEndpoint, "POST", requestData);
        const { statusCode } = response;
        console.log(response);
        if (statusCode !== 200) {
          redirectToLogin();
          sessionStorage.removeItem("session");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      redirectToLogin();
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <div className="homepage">
      <Navbar /> {/* The navbar will stay on top */}
      <div className="content">
        <Outlet />{" "}
        {/* Subpages like Hosting, Pricing, Account will render here */}
      </div>
    </div>
  );
};

export default HomePage;
