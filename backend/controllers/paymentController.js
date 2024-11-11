const Payment = require('../models/Payment');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Verify a Payment
exports.verifyPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    payment.verified = true;
    await payment.save();

    res.json({ msg: 'Payment verified successfully', payment });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Submit Verified Payments to SWIFT
exports.submitToSwift = async (req, res) => {
  try {
    const verifiedPayments = await Payment.find({ verified: true, status: 'pending' });

    if (verifiedPayments.length === 0) {
      return res.status(400).json({ msg: 'No verified payments to submit' });
    }

    // Placeholder for SWIFT submission API call
    // e.g., await submitToSwiftAPI(verifiedPayments);

    await Payment.updateMany({ verified: true, status: 'pending' }, { $set: { status: 'submitted' } });

    res.json({ msg: 'Verified payments submitted to SWIFT', verifiedPayments });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Create Payment
exports.payment = async (req, res) => {
  const { amount, currency, swiftCode, payeeAccount } = req.body;

  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const payment = new Payment({
      userId: user._id,
      amount,
      currency,
      swiftCode,
      payeeAccount,
    });

    await payment.save();
    res.status(201).json({ msg: 'Payment created successfully', payment });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Function to get all payments
// Get unverified and pending payments
exports.getPayments = async (req, res) => {
  try {
    // Retrieve only unverified or pending payments
    const payments = await Payment.find({ verified: false, status: 'pending' });
    res.json(payments); // Send the payments as a JSON response
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching payments', error: err.message });
  }
};

