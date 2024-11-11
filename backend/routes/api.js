// routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const { payment, verifyPayment, submitToSwift,getPayments } = require('../controllers/paymentController');

// Route to create a payment
router.post('/payment', payment);

// Route to verify a payment by ID
router.put('/verify/:id', verifyPayment);

// Route to submit verified payments to SWIFT
router.post('/submit-to-swift', submitToSwift);
// GET all payments
router.get('/', getPayments);

module.exports = router;
