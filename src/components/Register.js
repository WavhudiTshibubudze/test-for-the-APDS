import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

const Register = () => {
  const navigate = useNavigate();  
  const [fullName, setfullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Validation functions
  const validateIdNumber = (idNumber) => /^[0-9]{13}$/.test(idNumber); // 13 digits
  const validateAccountNumber = (accountNumber) => /^[0-9]{10}$/.test(accountNumber); // 10 digits
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password); // At least 8 chars, with letters and numbers

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!validateIdNumber(idNumber)) {
      alert('Invalid ID number. Must be 13 digits.');
      return;
    }

    if (!validateAccountNumber(accountNumber)) {
      alert('Invalid account number. Must be 10 digits.');
      return;
    }

    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long, containing at least one letter and one number.');
      return;
    }

    try {
      // Send data to the backend as JSON
      const response = await axios.post('http://localhost:5000/api/users/register', {
        fullName, 
        idNumber,
        accountNumber,
        password,
      });

      // Check if registration was successful
      if (response.status === 201) {
        setRegistrationSuccess(true);
        setErrorMessage(''); // Clear any previous error message

        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect to login after 3 seconds
      }
    } catch (error) {
      // Handle any errors that occur during registration
      console.error('Error registering user:', error.response || error.message);
      setErrorMessage(error.response?.data?.msg || 'Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ color: '#003f5c' }}>Register</h2>

      {/* Display success message if registration is successful */}
      {registrationSuccess && <div style={{ color: 'green' }}>Registration Successful!</div>}

      {/* Display error message if registration fails */}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        {/* Full Name Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            required
            style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        {/* ID Number Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>ID Number:</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
            style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Account Number Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
            style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Password Input */}
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

        {/* Submit Button */}
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
