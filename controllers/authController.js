const passport = require('passport'); // Importing Passport.js for authentication

// Display login form
exports.getLogin = (req, res) => { // Defining a new controller method for displaying the login form
  // Pass any error messages if necessary
  const errorMessages = req.flash('error'); // Extracting error messages from the request
  res.render('login', { title: 'Login', errorMessages: errorMessages.length > 0 ? errorMessages : null }); // Rendering the login template with error messages
};

// Process login form submission
exports.postLogin = (req, res, next) => { // Defining a new controller method for processing login form submission
  passport.authenticate('local', { // Using the local strategy for authentication
    successRedirect: '/', // Adjusted to redirect to the homepage or dashboard after login
    failureRedirect: '/auth/login', // Adjusted to reflect the path prefixed with /auth
    failureFlash: true // Enable flash messages for displaying login errors
  })(req, res, next); // Invoking the passport.authenticate method with the request, response, and next function
};

// Handle logout
exports.logout = (req, res) => { // Defining a new controller method for handling logout
  req.logout(function(err) {   // Logging out the user
    if (err) { return next(err); } // Handling logout error
    req.session.destroy(() => {  // Destroying the session
        res.clearCookie('connect.sid', { path: '/' }); // Ensures the session cookie is cleared
        res.redirect('/auth/login'); // Redirects to the login page after logging out
    });
  });
};

// Display signup form
exports.getSignup = (req, res) => { // Defining a new controller method for displaying the signup form
  // Pass any success messages if necessary
  const successMessages = req.flash('success'); // Extracting success messages from the request
  res.render('signup', { title: 'Sign Up', successMessages: successMessages.length > 0 ? successMessages : null }); // Rendering the signup template with success messages
};
