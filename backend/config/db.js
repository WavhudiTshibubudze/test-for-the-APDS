const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Verify that MongoDB URI is set in the environment variables
    if (!process.env.MONGO_URI) {
      console.error('MongoDB URI not found in environment variables.');
      return;
    }

    // Connect to MongoDB without SSL/TLS configuration
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Connection error:', err.message);
    process.exit(1);  // Exit process on connection failure
  }
};

module.exports = connectDB;
