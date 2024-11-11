import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';  // Import the login utility function

const Login = () => {
  const navigate = useNavigate();  
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login function
      const res = await loginUser(idNumber, accountNumber, password);  

      // If the response contains a token, store it and user info
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        // Navigate to the home page after successful login
        navigate('/home');
      } else {
        setLoginError(true);
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(true);
      alert('Login error. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ color: '#003f5c' }}>Login</h2>
      {loginError && <div style={{ color: 'red' }}>Invalid credentials. Please try again.</div>}
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        {/* ID Number input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>ID Number:</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
            pattern="\d{13}"  // Validate ID number (13 digits)
            title="ID number should be 13 digits"
            style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Account Number input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
            pattern="\d{10}"  // Validate Account number (10 digits)
            title="Account number should be 10 digits"
            style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
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
            style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
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
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
