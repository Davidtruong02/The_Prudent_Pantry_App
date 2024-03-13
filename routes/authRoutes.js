// authRoutes.js

// Import required modules
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User'); // Adjust the import path as necessary
const authController = require('../controllers/authController'); // Ensure this path is correct

// Display login form
router.get('/login', authController.getLogin);

// Display signup form
router.get('/signup', authController.getSignup);

// Process registration
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      req.flash('error', 'Email already in use');
      return res.redirect('/auth/signup');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    req.flash('success', 'You have successfully registered. You may now log in.');
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Registration error:', error);
    req.flash('error', 'An error occurred during registration.');
    res.redirect('/auth/signup');
  }
});

// Process login form submission
router.post('/login', passport.authenticate('local', {
  successRedirect: '/recipe', // Redirect to the recipe page on successful login
  failureRedirect: '/auth/login', // Redirect back to the login page if there's an error
  failureFlash: true // Enable flash messages for login failures
}));

// Logout handler
router.post('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(() => {
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/auth/login');
    });
  });
});

// // Route for the recipe page, demonstrating authenticated access
// router.get('/recipe', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.render('recipe', { title: 'Recipe Search', isRecipePage: true });
//   } else {
//     // Redirects to the login page if the user is not authenticated
//     req.flash('error', 'Please log in to access the Recipe page.');
//     res.redirect('/auth/login');
//   }
// });

// Route for rendering the recipe store page
// router.get('/recipestore', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.render('recipestore', { title: 'Recipe Store', isRecipeStorePage: true });
//   } else {
//     // Redirects to the login page if the user is not authenticated
//     req.flash('error', 'Please log in to access the Recipe Store.');
//     res.redirect('/auth/login');
//   }
// });

// Route for rendering the shopping list page
// router.get('/shoppinglist', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.render('shoppinglist', { title: 'Shopping List', isShoppingListPage: true });
//   } else {
//     // Redirects to the login page if the user is not authenticated
//     req.flash('error', 'Please log in to access the Shopping list.');
//     res.redirect('/auth/login');
//   }
// });

// Export the router
module.exports = router;
