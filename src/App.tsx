import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css"; // Any global styles

import GetStarted from "./components/getstarted"; // Ensure the correct path to the component
import SignupSignin from "./components/SignupSignin";
import HomePage from "./components/HomePage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignupSignin />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
