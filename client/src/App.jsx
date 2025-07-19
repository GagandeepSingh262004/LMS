import React from "react";
import Login from "./components/Login/Login";
import Student from "./components/Student/Student";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import { useState } from "react";
import RefreshHandler from "./components/RefreshHandler/RefreshHandler";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };
  return (
    <Router>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/student"
          element={<PrivateRoute element={<Student />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
