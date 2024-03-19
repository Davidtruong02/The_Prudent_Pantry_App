// Import required modules
const express = require('express'); // Import the express module
const bodyParser = require('body-parser'); // Import the body-parser module
const session = require('express-session'); // Import the express-session module
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Import the connect-session-sequelize module
const passport = require('./config/passport'); // Import the passport module
const flash = require('connect-flash'); // Import the connect-flash module
const { engine } = require('express-handlebars'); // Import the express-handlebars module
const morgan = require('morgan'); // Import the morgan module
const sequelize = require('./config/connection'); // Import the connection module
const authRoutes = require('./routes/authRoutes'); // Import the authRoutes module
const recipeRoutes = require('./routes/api/recipeRoutes'); // Import the recipeRoutes module
const Recipe = require('./models/Recipe'); // Import the Recipe model
const RecipeStore = require('./models/RecipeStore'); // Import the RecipeStore model
const recipeStoreRouter = require('./routes/api/recipeStoreRoute');
const ingredientRoutes = require('./routes/api/ingredientRoutes'); // Import the ingredientRoutes module
const shoppingListRoutes = require('./routes/api/shoppinglistRoutes'); // Import the shoppingListRoutes module
const ShoppingList = require('./models/shoppinglist'); // Import the ShoppingList model
const Ingredients = require('./models/Ingredients'); // Import the Ingredients model


// Create Express app
const app = express(); // Create an instance of the express module

// Middleware setup
app.use(bodyParser.json()); // Use the body-parser middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false })); // Use the body-parser middleware to parse the request body
app.use(morgan('dev')); // Use the morgan middleware to log HTTP requests
app.use(express.static('public')); // Use the express.static middleware to serve static files from the public directory
app.use(express.json())

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && user.validPassword(password)) {
        req.session.userId = user.id; // Set userId in the session
        console.log('Here is the userId: ', req.session.userId)
        // res.redirect('/shoppingList');
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});


// Custom session store with customization to exclude recipeImage
class CustomSessionStore extends SequelizeStore {
    async createSession(sessionId, data) {
        // Exclude recipeImage from session data
        const newData = { ...data };
        delete newData.recipeImage;

        return super.createSession(sessionId, newData);
    }
}

// Session setup
const sess = {
    secret: process.env.SESSION_SECRET || 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new CustomSessionStore({
        db: sequelize,
    }),
};
app.use(session(sess)); // Use the express-session middleware with the session options
app.use(flash()); // Use the connect-flash middleware to display flash messages
// Set up session middleware


// Passport initialization
app.use(passport.initialize()); // Use the passport middleware to initialize passport
app.use(passport.session()); // Use the passport middleware to initialize passport session


// Handlebars setup
app.engine('handlebars', engine({ // Set the handlebars engine options
    defaultLayout: 'main', // Set the handlebars default layout
    layoutsDir: __dirname + '/views/layouts/', // Set the handlebars layout directory
}));
app.set('view engine', 'handlebars'); // Set the view engine to handlebars

// Global middleware for session and authentication status
app.use((req, res, next) => { // Use a middleware to log the session ID and authentication status
    console.log("Session ID:", req.sessionID); // Log the session ID
    console.log("Authenticated:", req.isAuthenticated()); // Log the authentication status
    res.locals.isLoggedIn = req.isAuthenticated(); // Set the isLoggedIn local variable to the authentication status
    next(); // Call the next middleware
});


// Routes setup
app.use('/auth', authRoutes); // Use the authRoutes module for authentication-related routes
app.get('/', (req, res) => res.render('home', { title: 'Welcome to The Prudent Pantry' })); // Home page route
app.get('/recipe', isAuthenticated, (req, res) => res.render('recipe', { title: 'Recipe Search', isRecipePage: true })); // Recipe search page route
app.get('/recipesaved', isAuthenticated, (req, res) => res.render('recipesaved', { title: 'Saved Recipes', isRecipeSavedPage: true })); // Recipe saved page route
app.post('/api/recipesave', saveRecipe); // Save recipe route
app.get('/recipestore', getRecipeStore); // Recipe store page route
app.post('/api/store-search-results', storeSearchResults); // Store search results route
app.get('/api/display-search-results', displaySearchResults); // Display search results route
app.get('/api/clear-search-results', clearSearchResults); // Clear search results route
// app.get('/shoppingList', isAuthenticated, (req, res) => res.render('shoppingList', { title: 'Shopping List', isShoppingListPage: true })); // Shopping list page route
app.use('/shoppinglist', require('./routes/api/shoppingListRoutes')); // Use the shoppingListRoutes module for shopping list-related routes



app.use('/api', recipeRoutes); // Recipe-related APIs
app.use('/api', recipeStoreRouter);
app.use(ingredientRoutes); // Ingredient-related APIs
app.use('/api', shoppingListRoutes); // Shopping list-related APIs

app.delete('/api/recipe/:id', async (req, res) => {
    const recipeId = req.params.id; // Get the recipe ID from the request parameters

    try {
        const deletedRows = await RecipeStore.destroy({
            where: {
                id: recipeId
            }
        });

        if (deletedRows === 0) {
            // If no rows were deleted, the recipe with the specified ID was not found
            return res.status(404).json({ error: 'Recipe not found' });
        }

        // Send a success response if the recipe is successfully deleted
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error('Error deleting recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001; // Set the server port
sequelize.sync({ force: true }).then(() => { // Sync the database and start the server
    app.listen(PORT, () => { // Start the server
        console.log(`Server is running on port ${PORT}. Visit http://localhost:${PORT} in your browser.`); // Log a message to the console
    });
});

// Graceful server shutdown
process.on('SIGINT', () => { // Listen for the SIGINT signal
    console.log('Server is shutting down...'); // Log a message to the console
    process.exit(); // Exit the process
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) { // Middleware to check if the user is authenticated
    if (req.isAuthenticated()) { // If the user is authenticated
        return next(); // Call the next middleware
    }
    req.flash('error', 'Please log in to access this page.'); // Display an error message
    res.redirect('/auth/login'); // Redirect the user to the login page
}

// Route handler to save a recipe to the recipestore table
async function saveRecipe(req, res) {
    try {
        const { id } = req.body;
        const recipe = await Recipe.findByPk(id);
        if (recipe) {
            const clonedRecipeData = { ...recipe.toJSON(), id: null };
            const savedRecipe = await RecipeStore.create(clonedRecipeData);
            // Set success flash message
            req.flash('success', 'Recipe saved successfully');
            res.status(200).json({ message: 'Recipe saved successfully', savedRecipe });
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).json({ error: 'An error occurred while saving the recipe' });
    }
}


// // Route handler to render the recipe store page
async function getRecipeStore(req, res) {
    try {
        console.log('Fetching recipes from RecipeStore...');

        const recipesaved = await RecipeStore.findAll();
        console.log('Fetched recipes:', recipesaved);

        const searchResults = req.session.searchResults;
        const data = {
            recipesaved,
            searchResults,
            title: 'Recipe Store',
            isRecipeStorePage: true
        };
        res.render('recipestore', data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('An error occurred while fetching recipes');
    }
}

// Route handler to store search results in session
function storeSearchResults(req, res) {
    const { searchResults } = req.body;
    req.session.searchResults = searchResults;
    res.json({ message: 'Search results stored successfully' });
}

// Route handler to display stored search results
function displaySearchResults(req, res) {
    if (req.session.searchResults) {
        res.json({ searchResults: req.session.searchResults });
    } else {
        res.json({ message: 'No stored search results found' });
    }
}

// Route handler to clear stored search results
function clearSearchResults(req, res) {
    req.session.searchResults = null;
    res.json({ message: 'Stored search results cleared successfully' });
}

