// Navbar.tsx
import { Link } from "react-router-dom";
import "../style/home/Navbar.css"; // Add some styling for the navbar
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const onlogout = () => {
    sessionStorage.removeItem("session");
    navigate("/");
  };
  return (
    <nav className="navbar">
      <div className="nav-container">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/home/hosting">Hosting</Link>
          </li>
          <li className="nav-item">
            <Link to="/home/pricing">Pricing</Link>
          </li>
          <li className="nav-item">
            <Link to="/home/account">Account</Link>
          </li>
        </ul>
        <div className="logout-button" onClick={onlogout}>
          Logout
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
