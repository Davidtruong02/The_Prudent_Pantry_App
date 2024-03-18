const express = require('express'); // Importing the Express framework
const router = express.Router(); // Creating a new router instance
const axios = require('axios'); // Importing the Axios library for making HTTP requests
const { Recipe } = require('../../models'); // Importing the Recipe model

const APP_ID = process.env.APP_ID; // Storing the Edamam API ID
const APP_KEY = process.env.APP_KEY; // Storing the Edamam API key

// GET /api/recipe endpoint to fetch recipes
router.get('/recipe', async (req, res) => { // Defining a new route for fetching recipes
    const { q, nextHref } = req.query; // Extracting query parameters from the request

    try {
        // Deleting existing recipes for the logged-in user before fetching new ones
        await Recipe.destroy({  // Deleting recipes from the database
            where: {       // Based on the user_id field
                user_id: req.user.id    // Matching the logged-in user's ID
            }
        });

        // Constructing the request URL for fetching recipes from the Edamam API
        let requestUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${APP_ID}&app_key=${APP_KEY}&imageSize=REGULAR&field=label&field=image&field=url&field=ingredientLines&field=uri`;
        
        // Handling pagination by checking if there's a nextHref and no specific query
        if (nextHref && !q) {   // If there's a nextHref and no specific query
            requestUrl = nextHref;  // Using the nextHref as the request URL
        }

        // Making a GET request to the Edamam API to fetch recipes
        const response = await axios.get(requestUrl);   // Using the request URL to fetch recipes

        // Extracting the required fields from the API response
        const recipes = response.data.hits.map(hit => ({    // Mapping over the hits array
            title: hit.recipe.label, // Including the title field
            label: hit.recipe.label,    // Including the label field
            image: hit.recipe.image,    // Including the image field
            url: hit.recipe.url,    // Including the url field
            uri: hit.recipe.uri,    // Including the uri field
            ingredientLines: hit.recipe.ingredientLines,    // Including the ingredientLines field
        }));
        

        const savedRecipes = [];    // Creating an empty array to store the saved recipes
        // Inserting each recipe into the database and collecting them in the savedRecipes array
        for (const recipe of recipes) { // Looping over the recipes array
            const savedRecipe = await Recipe.create({   // Creating a new recipe in the database
                title: recipe.title, // Using the title field for database insertion
                recipeImage: recipe.image, // Using the image field for database insertion
                url: recipe.url,    // Using the url field for database insertion
                ingredients: JSON.stringify(recipe.ingredientLines),    // Using the ingredientLines field for database insertion
                user_id: req.user.id,   // Using the logged-in user's ID for database insertion
                uri: recipe.uri,    // Using the uri field for database insertion
            });

            // Pushing the saved recipe data along with additional fields to the savedRecipes array
            savedRecipes.push({ ...savedRecipe.get({ plain: true }), image: recipe.image, ingredientLines: recipe.ingredientLines });   // Pushing the saved recipe data to the savedRecipes array
            console.log('Saved recipe:', savedRecipe.get({ plain: true }));  // Logging the saved recipe data
        }

        // Storing the savedRecipes array in the session for later use
        // req.session.savedRecipes = savedRecipes;    // Storing the savedRecipes array in the session

        // Rendering the template with the fetched recipes
        res.render('recipe', { recipes: savedRecipes, nextHref: response.data?._links?.next?.href });   // Rendering the recipe template with the fetched recipes
    } catch (error) {   
        // Handling errors if any occur during the process
        console.error(error);   // Logging the error to the console
        res.status(500).send('Error fetching data from Edamam API');
    }
});

module.exports = router; // Exporting the router containing the defined routes
