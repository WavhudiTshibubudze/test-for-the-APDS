// models/Payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  swiftCode: { type: Number, required: true },
  payeeAccount: { type: Number, required: true },
  verified: { type: Boolean, default: false }, 
  status: { type: String, default: 'pending' } 
});

module.exports = mongoose.model('Payment', PaymentSchema);
