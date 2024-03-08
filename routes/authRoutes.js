// Import required modules
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Import User model
const { User } = require('..db/models/');

// Create a new router instance
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    // Extract user input from request body
    const { username, email, password } = req.body;

    // Validate user input (e.g., check for required fields)
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the username or email is already in use
    const existingUser = await User.findOne({
      where: { $or: [{ username }, { email }] },
    });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already in use' });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Redirect the user to the login page or another appropriate page
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
