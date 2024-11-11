import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginEmployee } from '../api'; // Import the employee login function

const EmployeeLogin = ({ setEmployeeToken }) => { // Receive setEmployeeToken as a prop
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error
    setError('');

    try {
      // Call the loginEmployee API function
      const data = await loginEmployee(employeeId, password);
      
      if (data.token) {
        // If successful, save the token to localStorage
        localStorage.setItem('employeeToken', data.token);
        setEmployeeToken(data.token); // Update employee token state
             // Redirect to the employee dashboard
        navigate('/employeedashboard'); // Redirect to employee dashboard or home
      }
    } catch (error) {
      setError(error.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ color: '#003f5c' }}>Employee Login</h2>
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        {/* Employee ID input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Employee ID:</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            style={{
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
            }}
          />
        </div>

        {/* Password input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
            }}
          />
        </div>

        {/* Submit button */}
        <button 
          type="submit" 
          style={{
            backgroundColor: '#003f5c',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default EmployeeLogin;
