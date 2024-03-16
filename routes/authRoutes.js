// authRoutes.js

// Import required modules
const express = require('express'); // Importing Express framework
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing
const passport = require('passport'); // Importing Passport.js for authentication
const router = express.Router(); // Creating a new router instance
const User = require('../models/User'); // Importing the User model (adjust path if necessary)
const authController = require('../controllers/authController.js'); // Importing the authController

// Display login form
router.get('/login', authController.getLogin); // Defining a new route for displaying the login form

// Display signup form
router.get('/signup', authController.getSignup); // Defining a new route for displaying the signup form

// Process registration
router.post('/register', async (req, res) => { // Defining a new route for processing registration
  const { username, email, password } = req.body; // Extracting username, email, and password from request body
  try {
    const existingUser = await User.findOne({ where: { email } }); // Checking if the email already exists
    if (existingUser) {
      req.flash('error', 'Email already in use. Please sign in.'); // Flash error message if email is already in use
      return res.redirect('/auth/signup'); // Redirecting to signup page
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
    await User.create({ // Creating a new user with hashed password
      username, // Storing the username
      email, // Storing the email
      password: hashedPassword, // Storing the hashed password
    }); // Creating a new user with hashed password

    req.flash('success', 'You have successfully registered. You may now log in.'); // Flash success message for registration
    res.redirect('/auth/login'); // Redirecting to login page after successful registration
  } catch (error) {
    console.error('Registration error:', error); // Logging registration error
    req.flash('error', 'An error occurred during registration.'); // Flash error message for registration error
    res.redirect('/auth/signup'); // Redirecting to signup page in case of error
  }
});

// Process login form submission
router.post('/login', passport.authenticate('local', {
  successRedirect: '/recipe', // Redirect to the recipe page on successful login
  failureRedirect: '/auth/login', // Redirect back to the login page if there's an error
  failureFlash: true // Enable flash messages for login failures
}));



// Logout handler
router.post('/logout', (req, res) => { // Defining a new route for handling logout
  req.logout(function(err) { // Logging out the user
    if (err) { return next(err); } // Handling logout error
    req.session.destroy(() => { // Destroying the session
      res.clearCookie('connect.sid', { path: '/' }); // Clearing session and cookie
      res.redirect('/auth/login'); // Redirecting to login page after logout
    });
  });
});

// Export the router
module.exports = router; // Exporting the router containing the defined routes
