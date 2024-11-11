import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [payeeAccount, setPayeeAccount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Retrieve token from localStorage
  const token = localStorage.getItem('token');

  // Function to validate payment details
  const validatePaymentDetails = () => {
    return (
      /^\d+$/.test(amount) && // Ensure amount is a number
      swiftCode.length === 8 && // SWIFT code is typically 8 characters
      payeeAccount.length === 10 // Ensure payee account number is 10 digits
    );
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validatePaymentDetails()) {
      alert('Please enter valid payment details.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/payments/payment',
        {
          amount,
          currency,
          swiftCode,
          payeeAccount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        }
      );

      if (response.status === 201) {
        setPaymentSuccess(true);
        alert('Payment Successful!');
        setErrorMessage('');

        setTimeout(() => {
          navigate('/home');
        }, 1000); // Redirect to home after 3 seconds
      }
    } catch (error) {
      console.error('Payment failed', error.response || error.message);
      setErrorMessage(error.response?.data?.msg || 'Payment failed. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ color: '#003f5c' }}>Make a Payment</h2>
      {paymentSuccess && <div style={{ color: 'green' }}>Payment Successful!</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handlePayment} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Amount:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Currency:</label>
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
            style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>SWIFT Code:</label>
          <input
            type="text"
            value={swiftCode}
            onChange={(e) => setSwiftCode(e.target.value)}
            required
            style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Payee Account Number:</label>
          <input
            type="text"
            value={payeeAccount}
            onChange={(e) => setPayeeAccount(e.target.value)}
            required
            style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#003f5c',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default Payments;
