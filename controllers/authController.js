// authController.js

const passport = require('passport');

// Display login form
exports.getLogin = (req, res) => {
  // Render the login form view
  res.render('login');
};

// Process login form submission
exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect to dashboard on successful login
    failureRedirect: '/login',      // Redirect back to login page on failure
    failureFlash: true             // Enable flash messages for displaying login errors
  })(req, res, next);
};

// Handle logout
exports.logout = (req, res) => {
  req.logout(); // Clear the session and log out the user
  res.redirect('/login'); // Redirect to login page
};
