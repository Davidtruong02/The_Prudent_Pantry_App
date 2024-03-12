// authRoutes.js

// Import required modules
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User'); // Adjust the import path as necessary

// Registration route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      req.flash('error', 'Email already in use');
      return res.redirect('/auth/signup');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Add a flash message for successful registration
    req.flash('success', 'You have successfully registered. You may now log in.');

    // Redirect to the login page
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Registration error:', error);
    res.redirect('/auth/signup');
  }
});

// Login page route
router.get('/login', (req, res) => {
  // Optional: Pass any messages if necessary
  const messages = req.flash('error');
  console.log('Flash Messages:', messages); // Add this line to check flash messages
  res.render('login', { messages: messages.length > 0 ? messages : null });
});

// Process the login form
router.post('/login', passport.authenticate('local', {
  successRedirect: '/recipe', // Redirect to the recipe page on successful login
  failureRedirect: '/auth/login', // Redirect back to the login page if there's an error
  failureFlash: true // Enable flash messages for login failures
}));

// Signup page route
router.get('/signup', (req, res) => {
  // Optional: Pass any messages if necessary
  const messages = req.flash('success');
  res.render('signup', { messages: messages.length > 0 ? messages : null });
});

// New route for the recipe page
router.get('/recipe', (req, res) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // If authenticated, render the recipe page
    res.render('recipe');
  } else {
    // If not authenticated, redirect to the login page
    res.redirect('/auth/login');
  }
});

// Export the router
module.exports = router;
