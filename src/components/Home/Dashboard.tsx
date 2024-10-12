import "../style/home/Dashboard.css"; // Import your CSS file

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-heading">Dashboard</h1>
        <p className="dashboard-subheading">
          Welcome to your dashboard! Manage your hosting settings and view your
          account information.
        </p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2 className="card-title">Your Websites</h2>
          <ul className="website-list">
            <li className="website-item">Site 1: example1.com</li>
            <li className="website-item">Site 2: example2.com</li>
          </ul>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Usage Statistics</h2>
          <p>
            Disk Space Used: <strong>2GB</strong>
          </p>
          <p>
            Bandwidth: <strong>10GB</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
