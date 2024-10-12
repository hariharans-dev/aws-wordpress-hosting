import { useEffect, useRef, useState } from "react";
import "../style/home/Dashboard.css"; // Import your CSS file
import { SendRequest } from "../functions/SendRequest";

const DashboardPage: React.FC = () => {
  const apiurl_instance =
    "https://vzo16sqfhl.execute-api.ap-south-1.amazonaws.com/stage1/hosting";
  const apiurl_subscription =
    "https://vzo16sqfhl.execute-api.ap-south-1.amazonaws.com/stage1/subscription";

  const [instances, setInstances] = useState([]); // Use camelCase for state names
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const hasRun = useRef(false);
  const session = sessionStorage.getItem("session");

  const instancedata = async () => {
    const senddata = { request: "search", session: session };
    try {
      const response = await SendRequest(apiurl_instance, "POST", senddata);
      const { statusCode, body } = response;
      if (statusCode == 200 || statusCode == 201) {
        setInstances(body || []);
      }
      // Set instances to an empty array if body is undefined
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const subscriptiondata = async () => {
    const senddata = { request: "search", session: session };
    try {
      const response = await SendRequest(apiurl_subscription, "POST", senddata);
      const { statusCode, body } = response;
      if (statusCode == 200 || statusCode == 201) {
        setSubscriptions(body || []); // Set subscriptions to an empty array if body is undefined
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      setLoading(true); // Set loading to true before data fetch
      Promise.all([subscriptiondata(), instancedata()])
        .then(() => setLoading(false)) // Set loading to false after fetching
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); // Set loading to false even if there's an error
        });
      hasRun.current = true; // Mark that the effect has run
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-heading">Dashboard</h1>
        <p className="dashboard-subheading">
          Welcome to your dashboard! Manage your hosting settings and view your
          account information.
        </p>
      </div>

      {loading ? ( // Show loading state
        <p>Loading...</p>
      ) : (
        <div className="dashboard-content">
          <div className="dashboard-card">
            <h2 className="card-title">Your Websites</h2>
            {instances.length > 0 ? ( // Check if there are instances
              <ul className="website-list">
                {instances.map((instance, index) => (
                  <li key={index} className="instance-item">
                    <div className="instance-details">
                      <p className="instance-name">
                        <strong>Instance name: </strong>
                        {instance["instance"]}
                      </p>
                      <p className="instance-domain">
                        <strong>Domain: </strong>
                        {instance["domain"]}
                      </p>
                      <p className="instance-timestamp">
                        <strong>Created On: </strong>
                        {new Date(instance["timestamp"]).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No instances available.</p> // Message if no instances
            )}
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">Active Subscriptions</h2>
            {subscriptions.length > 0 ? (
              // Check if there are subscriptions
              (() => {
                // Filter subscriptions for those with 'running' status
                const runningSubscriptions = subscriptions.filter(
                  (subscription) => subscription["status"] === "running"
                );

                if (runningSubscriptions.length > 0) {
                  return (
                    <ul className="website-list">
                      {runningSubscriptions.map((subscription, index) => (
                        <li key={index} className="instance-item">
                          <div className="instance-details">
                            <p className="instance-name">
                              <strong>Status: </strong>
                              {subscription["status"]}
                            </p>
                            <p className="instance-domain">
                              <strong>Start date: </strong>
                              {new Date(
                                subscription["from_time"]
                              ).toLocaleString()}
                            </p>
                            <p className="instance-timestamp">
                              <strong>End date: </strong>
                              {new Date(
                                subscription["to_time"]
                              ).toLocaleString()}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  );
                } else {
                  // If there are no running subscriptions
                  return <p>No subscriptions available.</p>;
                }
              })()
            ) : (
              <p>No subscriptions available.</p> // Message if no subscriptions
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
