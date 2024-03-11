// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const recipe = require('./routes/api/recipeRoutes');
const exphbs = require('express-handlebars');
const app = express();

const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const models = require('./models');

const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  app.use(session(sess));


// Load environment variables from .env file
dotenv.config();



// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Set up Handlebars view engine
const hbs = exphbs.create({/* define your options here */});
app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');

// Mount authentication routes
app.use('/auth', authRoutes);
app.use(recipe);

// Define a simple route
// app.get('/', (req, res) => {
//     res.render('login'); // Render the login.handlebars file
// });

app.get('/', (req, res) => {
    res.render('recipe'); // Render the login.handlebars file
});

// turn on routes
// app.use(routes);

// Define a port for the server to listen on
const PORT = process.env.PORT || 3001;

// Start the server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log('-------------------------------------------------------------------------'); // Line of dashes for visual separation
        console.log(`Server is running on port ${PORT}`);
        console.log(`Visit http://localhost:${PORT} in your browser to access the application.`);
    });
});

// const server = app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     console.log(`Visit http://localhost:${PORT} in your browser to access the application.`);
// });

// Handle server shutdown
process.on('SIGINT', () => {
    console.log('Server is shutting down...');
    server.close(() => {
        console.log('Server has shut down.');
        process.exit(0);
    });
});
