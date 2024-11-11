import axios from 'axios';

// Create an Axios instance with the base URL for the API
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Utility function for user registration
export const registerUser = async (fullName, idNumber, accountNumber, password) => {
  try {
    const response = await api.post('/users/register', {
      fullName,
      idNumber,
      accountNumber,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Utility function for user login
export const loginUser = async (idNumber, accountNumber, password) => {
  try {
    const response = await api.post('/users/login', {
      idNumber,
      accountNumber,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;  // Return the specific error response from the server
  }
};

// Utility function for employee login
export const loginEmployee = async (employeeId, password) => {
  try {
    const response = await api.post('/employees/login', {
      employeeId,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;  // Return the specific error response from the server
  }
};

// Utility function for making payments
export const makePayment = async (amount, currency, swiftCode, payeeAccount) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve stored token
    const response = await api.post('/payments/payment', {
      amount,
      currency,
      swiftCode,
      payeeAccount,
    }, {
      headers: { Authorization: `Bearer ${token}` } // Include token in request
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
