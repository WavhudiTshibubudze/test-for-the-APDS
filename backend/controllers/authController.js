const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
exports.register = async (req, res) => {
  const { fullName, idNumber, password, accountNumber } = req.body;

  try {
    // Check if user with the same ID number exists
    let user = await User.findOne({ idNumber });
    if (user) {
      return res.status(400).json({ msg: 'A user with this ID number already exists' });
    }

    // Check if the account number already exists
    const existingAccount = await User.findOne({ accountNumber });
    if (existingAccount) {
      return res.status(400).json({ msg: 'Account number already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      fullName, 
      idNumber,
      password: hashedPassword,
      accountNumber,
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) { // MongoDB duplicate key error code
      return res.status(400).json({ error: 'Account number or ID number already exists' });
    }
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Login existing user
exports.login = async (req, res) => {
  const { idNumber, accountNumber, password } = req.body;

  try {
    // Check if user exists by ID number
    const user = await User.findOne({ idNumber });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials, user not found' });
    }

    // Verify account number match
    if (user.accountNumber !== accountNumber) {
      return res.status(400).json({ msg: 'Invalid credentials, account number does not match' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials, incorrect password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token and user info back
    res.json({
      token,
      user: {
        id: user.id,
        idNumber: user.idNumber,
        accountNumber: user.accountNumber,
      },
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
