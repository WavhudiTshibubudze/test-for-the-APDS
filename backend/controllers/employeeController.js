const Employee = require('../models/Employee'); // Import the Employee model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new employee (Registration)
exports.createEmployee = async (req, res) => {
  const { fullName, idNumber, employeeId, password } = req.body;

  try {
    // Check if employee with the same ID number or employee ID exists
    const existingEmployee = await Employee.findOne({ $or: [{ idNumber }, { employeeId }] });
    if (existingEmployee) {
      return res.status(400).json({ msg: 'Employee with this ID number or employee ID already exists' });
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new employee object
    const newEmployee = new Employee({
      fullName,
      idNumber,
      employeeId,
      password: hashedPassword, // Store hashed password
    });

    // Save the employee data in the database
    await newEmployee.save();

    // Generate a token for the new employee
    const token = jwt.sign({ employeeId: newEmployee.employeeId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the response back with the created employee and token
    res.status(201).json({
      msg: 'Employee created successfully',
      employee: newEmployee,
      token,  // Include the token in the response
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


// Employee Login
exports.loginEmployee = async (req, res) => {
  const { employeeId, password } = req.body;

  try {
    // Find employee by Employee ID
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      console.log('Employee not found for ID:', employeeId); // Debugging log
      return res.status(400).json({ msg: 'Invalid Employee ID or Password' });
    }

    console.log('Employee found:', employee); // Debugging log
    
    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      console.log('Password does not match for employee ID:', employeeId); // Debugging log
      return res.status(400).json({ msg: 'Invalid Employee ID or Password' });
    }

    console.log('Password match successful for employee ID:', employeeId); // Debugging log

    // Generate a token with employeeId
    const token = jwt.sign({ employeeId: employee.employeeId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send back the employee and token
    res.json({ msg: 'Login successful', employee, token });
  } catch (error) {
    console.error('Error during login:', error.message); // Debugging log
    res.status(500).send('Server error');
  }
};


// Get all employees (for example, for admin use)
exports.getEmployees = async (req, res) => {
  try {
    // Retrieve all employees from the database
    const employees = await Employee.find();

    // Return the list of employees in the response
    res.json(employees);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
