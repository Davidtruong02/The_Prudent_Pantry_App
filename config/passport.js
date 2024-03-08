const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      // Find user by username in the database
      const user = await User.findOne({ where: { username } });
  
      // If user not found or password is incorrect, return error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: 'Invalid username or password' });
      }
  
      // If user found and password is correct, return user object
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
  
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
