import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import EmployeeLogin from './components/EmployeeLogin';  // Import the EmployeeLogin component
import Register from './components/Register';
import Payments from './components/Payments';
import EmployeeDashboard from './components/EmployeeDashboard'; // Adjust path if needed

function App() {
  // Initialize authToken from localStorage on app mount
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [employeeToken, setEmployeeToken] = useState(localStorage.getItem('employeeToken')); // New state for employee token

  // Update localStorage when authToken changes
  useEffect(() => {
    if (authToken) {
      localStorage.setItem('token', authToken);
    } else {
      localStorage.removeItem('token');
    }
  }, [authToken]);

  // Update localStorage when employeeToken changes
  useEffect(() => {
    if (employeeToken) {
      localStorage.setItem('employeeToken', employeeToken);
    } else {
      localStorage.removeItem('employeeToken');
    }
  }, [employeeToken]);

  // Helper component to protect routes that require authentication
  const ProtectedRoute = ({ children, type }) => {
    if (type === 'user' && !authToken) {
      return <Navigate to="/login" />;
    }
    if (type === 'employee' && !employeeToken) {
      return <Navigate to="/employeelogin" />;
    }
    return children; // Render children if authenticated
  };

  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
          <Route path="/employeelogin" element={<EmployeeLogin setEmployeeToken={setEmployeeToken} />} /> 
          <Route path="/register" element={<Register setAuthToken={setAuthToken} />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute type="user">
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute type="user">
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employeedashboard"
            element={
              <ProtectedRoute type="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          {/* Default Route: Show Register Page First */}
          <Route path="/" element={<Navigate to="/register" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
