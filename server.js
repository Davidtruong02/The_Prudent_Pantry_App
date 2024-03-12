// server.js

// Import required modules
const express = require('express');
const dotenv = require('dotenv').config();
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('./config/passport');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/api/recipeRoutes');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));

// Session setup
const sess = {
    secret: 'Super secret secret', // Use an environment variable for production
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

app.use(flash());
// Passport and flash messages middleware
app.use(passport.initialize());
app.use(passport.session());


// Middleware to parse JSON bodies and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up Handlebars as the view engine
const hbs = exphbs.create({ /* your configuration here */ });
app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');

// Apply authRoutes middleware to handle authentication-related routes
app.use('/auth', authRoutes);

// Direct route to /recipe for authenticated users
app.get('/recipe', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('recipe'); // Ensure you have a 'recipe.handlebars' view ready
    } else {
        res.redirect('/login'); // Redirect unauthenticated users to login
    }
});

// A simple route for the homepage or landing page
app.get('/', (req, res) => {
    res.render('login'); // Ensure you have a 'home.handlebars' or adjust as needed
});

// Apply recipeRoutes middleware to handle recipe-related APIs
app.use('/api', recipeRoutes);

// Define a port for the server to listen on
const PORT = process.env.PORT || 3001;

// Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}. Visit http://localhost:${PORT} in your browser.`);
    });
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
    console.log('Server is shutting down...');
    process.exit();
});
