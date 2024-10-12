import "../style/home/HostingPage.css"; // Import the CSS file for HostingPage

const HostingPage: React.FC = () => {
  return (
    <div className="hosting-container">
      <div className="hosting-header">
        <h1 className="hosting-heading">Hosting Services</h1>
        <p className="hosting-subheading">
          Manage your hosting plans and settings here.
        </p>
      </div>

      <div className="hosting-content">
        <div className="hosting-card">
          <h2 className="card-title">Active Hosting Plans</h2>
          <ul className="hosting-list">
            <li className="hosting-item">Plan 1: Basic Hosting</li>
            <li className="hosting-item">Plan 2: Advanced Hosting</li>
          </ul>
        </div>

        <div className="hosting-card">
          <h2 className="card-title">Hosting Statistics</h2>
          <p>
            Storage Used: <strong>5GB</strong>
          </p>
          <p>
            Uptime: <strong>99.9%</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostingPage;
