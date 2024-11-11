import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Checkbox, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [verifiedTransactions, setVerifiedTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // New state for submission success

  // Get token from localStorage
  const token = localStorage.getItem('employeeToken');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if no token is found
    if (!token) {
      navigate('/employeelogin');
    }

    // Disable back navigation to login page by manipulating the history
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href); // Keep the user on the current page
    };

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/payments/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Error fetching transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token, navigate]);

  const handleVerify = async (transactionId) => {
    try {
      await axios.put(`http://localhost:5000/api/payments/verify/${transactionId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVerifiedTransactions([...verifiedTransactions, transactionId]);
    } catch (error) {
      console.error('Error verifying transaction:', error);
      setError('Error verifying transaction');
    }
  };

  const handleSubmitToSwift = async () => {
    try {
      await axios.post('http://localhost:5000/api/payments/submit-to-swift', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Submitted to SWIFT');
      setVerifiedTransactions([]); // Reset verified transactions after submission
      setSubmissionSuccess(true); // Set success message

      // Fetch updated transactions from the database
      const response = await axios.get('http://localhost:5000/api/payments/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(response.data); // Update transactions to reflect the new statuses
    } catch (error) {
      console.error('Error submitting to SWIFT:', error);
      setError('Error submitting to SWIFT');
      setSubmissionSuccess(false); // Clear success message on error
    }
  };

  const isVerified = (transactionId) => verifiedTransactions.includes(transactionId);

  // Filter out payments that are neither verified nor submitted
  const filteredTransactions = transactions.filter(transaction => 
    transaction.status !== 'verified' && transaction.status !== 'submitted'
  );

  return (
    <div>
      <h1>Employee Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {submissionSuccess && <p style={{ color: 'green' }}>Payments successfully submitted to SWIFT!</p>}
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payee Account</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>SWIFT Code</TableCell>
                <TableCell>Verify</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(transaction => (
                  <TableRow key={transaction._id}>
                    <TableCell>{transaction.payeeAccount}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.currency}</TableCell>
                    <TableCell>{transaction.swiftCode}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={isVerified(transaction._id)}
                        onChange={() => handleVerify(transaction._id)}
                        color="primary"
                        disabled={isVerified(transaction._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                    No unverified or unsubmitted transactions available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitToSwift}
        disabled={verifiedTransactions.length === 0}
        style={{ marginTop: '20px' }}
      >
        Submit to SWIFT
      </Button>
    </div>
  );
};

export default EmployeeDashboard;
