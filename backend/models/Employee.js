const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  idNumber: { type: String, required: true, unique: true },
  employeeId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);


