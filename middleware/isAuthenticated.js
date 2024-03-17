// isAuthenticated.js

module.exports = (req, res, next) => {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
      // User is authenticated, proceed to next middleware
      return next();
    } else {
      // User is not authenticated, redirect to login page or handle unauthorized access
      res.redirect('/login');
    }
  };
  

