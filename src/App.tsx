import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // Any global styles

import GetStarted from "./components/getstarted"; // Ensure the correct path to the component
import SignupSignin from "./components/SignupSignin";
import HomePage from "./components/HomePage";
import HostingPage from "./components/Home/HostingPage";
import PricingPage from "./components/Home/PricingPage";
import AccountPage from "./components/Home/AccountPage";
import DashboardPage from "./components/Home/Dashboard";
import ErrorPage from "./components/ErrorPage";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignupSignin />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<HomePage />}>
            <Route index element={<DashboardPage />} />
            <Route path="hosting" element={<HostingPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
