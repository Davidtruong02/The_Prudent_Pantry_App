// Import the isAuthenticated middleware
const isAuthenticated = require('../middleware/isAuthenticated');

// Example route in userRoutes.js that requires authentication
router.get('/profile', isAuthenticated, (req, res) => {
  // Logic for authenticated user's profile
});

// Example route in mealRoutes.js that requires authentication
router.get('/meal-planner', isAuthenticated, (req, res) => {
  // Logic for authenticated user's meal planner
});