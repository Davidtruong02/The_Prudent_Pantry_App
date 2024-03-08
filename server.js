// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const exphbs = require('express-handlebars');

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set up Handlebars view engine
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'handlebars');

// Mount authentication routes
app.use('/auth', authRoutes);

// Define a simple route
app.get('/', (req, res) => {
    res.render('login'); // Render the login.handlebars file
});

// Define a port for the server to listen on
const PORT = process.env.PORT || 3001;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} in your browser to access the application.`);
});

// Handle server shutdown
process.on('SIGINT', () => {
    console.log('Server is shutting down...');
    server.close(() => {
        console.log('Server has shut down.');
        process.exit(0);
    });
});
