const passport = require('passport');

// Display login form
exports.getLogin = (req, res) => {
  // Pass any error messages if necessary
  const errorMessages = req.flash('error');
  res.render('login', { title: 'Login', errorMessages: errorMessages.length > 0 ? errorMessages : null });
};

// Process login form submission
exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/', // Adjusted to redirect to the homepage or dashboard after login
    failureRedirect: '/auth/login', // Adjusted to reflect the path prefixed with /auth
    failureFlash: true // Enable flash messages for displaying login errors
  })(req, res, next);
};

// Handle logout
exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(() => {
        res.clearCookie('connect.sid', { path: '/' }); // Ensures the session cookie is cleared
        res.redirect('/auth/login'); // Redirects to the login page after logging out
    });
  });
};

// Display signup form
exports.getSignup = (req, res) => {
  // Pass any success messages if necessary
  const successMessages = req.flash('success');
  res.render('signup', { title: 'Sign Up', successMessages: successMessages.length > 0 ? successMessages : null });
};
