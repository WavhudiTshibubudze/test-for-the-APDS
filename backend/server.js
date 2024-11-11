

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const connectDB = require('./config/db');
const authRoutes = require('./routes/users');
const paymentRoutes = require('./routes/api');
const employeeRoutes = require('./routes/employee');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB without SSL/TLS
connectDB();

// Use routes
app.use('/api/employees', employeeRoutes);
app.use('/api/users', authRoutes);
app.use('/api/payments', paymentRoutes);

// Server setup
const PORT = process.env.PORT || 5000;

// Create HTTP server (no SSL)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
