// passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Op } = require('sequelize'); // Import Op for complex queries
const User = require('../models/User'); // Adjust the path as necessary to match your project structure

passport.use(new LocalStrategy({
    usernameField: 'login', // Adjust if your input field has a different name
    passwordField: 'password', // No need to change if your password field is named 'password'
  },
  async (login, password, done) => {
    try {
      // Find user by username or email in the database
      const user = await User.findOne({ 
        where: {
          [Op.or]: [{ username: login }, { email: login }]
        } 
      });

      // If user not found or password is incorrect, return error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: 'Invalid login credentials' });
      }

      // If user found and password is correct, return user object
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Find user by ID in the database
    const user = await User.findByPk(id);

    // If user found, return user object
    if (user) {
      done(null, user);
    } else {
      done(new Error('User not found'));
    }
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
