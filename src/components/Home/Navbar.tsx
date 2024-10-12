// Navbar.tsx
import { Link } from "react-router-dom";
import "../style/home/Navbar.css"; // Add some styling for the navbar

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
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
    </nav>
  );
};

export default Navbar;
