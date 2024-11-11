const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  idNumber: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: (v) => /^\d{13}$/.test(v), 
      message: (props) => `${props.value} is not a valid South African ID number!`,
    },
  },
  employeeId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);
