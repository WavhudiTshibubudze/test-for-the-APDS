const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^\d{13}$/.test(v), // South African ID number format (13 digits)
      message: (props) => `${props.value} is not a valid South African ID number!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^\d{10}$/.test(v), // 10-digit account number
      message: (props) => `${props.value} is not a valid account number!`,
    },
  },
});

module.exports = mongoose.model('User', UserSchema);
