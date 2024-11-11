const express = require('express');
const router = express.Router();
const { createEmployee, getEmployees, loginEmployee } = require('../controllers/employeeController');

// Route to create, get and login a new employee
router.post('/create', createEmployee);
router.post('/login', loginEmployee);
router.get('/', getEmployees);


module.exports = router;
