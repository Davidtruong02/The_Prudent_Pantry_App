// Import required modules
const express = require('express');
const dotenv = require('dotenv').config();
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('./config/passport');
const flash = require('connect-flash');
const { engine } = require('express-handlebars');
const sequelize = require('./config/connection');
const authRoutes = require('./routes/authRoutes'); // Import authRoutes.js
const recipeRoutes = require('./routes/api/recipeRoutes');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));

// Session setup
const sess = {
    secret: process.env.SESSION_SECRET || 'Super secret secret', // Use an environment variable for production
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

app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}));
app.set('view engine', 'handlebars');

// Apply authRoutes middleware to handle authentication-related routes
app.use('/auth', authRoutes); // Mount authRoutes.js before other routes

app.use((req, res, next) => {
    console.log("Authenticated:", req.isAuthenticated()); // Debugging line
    res.locals.isLoggedIn = req.isAuthenticated();
    next();
});

// A simple route for testing the session secret
app.get('/test-session-secret', (req, res) => {
    const sessionSecret = process.env.SESSION_SECRET || 'Super secret secret';
    res.send(`Session Secret: ${sessionSecret}`);
});

// Route for handling the recipe search
// app.get('/recipe', async (req, res) => {
//     const { q } = req.query;

//     try {
//         // Forward the request to your recipe search route or controller
//         // Here, you can call your recipe search function or API
//         // For now, let's send a simple response
//         res.send(`Searching for recipes with query: ${q}`);
//     } catch (error) {
//         console.error('Error searching recipes:', error);
//         res.status(500).send('Error searching recipes');
//     }
// });

// A simple route for the homepage or landing page
app.get('/', (req, res) => {
    res.render('home', { title: 'Welcome to The Prudent Pantry' }); // Rendering 'home.handlebars' for homepage
});

app.get('/recipe', (req, res) => {
    res.render('recipe');
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
