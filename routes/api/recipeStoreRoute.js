const express = require('express');
const router = express.Router();
const { RecipeStore } = require('../../models');


// GET /api/recipestore endpoint to fetch recipes from the recipestore table
router.get('/recipestore', async (req, res) => {
    try {
        console.log('Fetching recipes from recipestore...'); // Log before fetching recipes

        // Fetch all recipes from the recipestore table
        const SavedRecipeStoreRecipes = await RecipeStore.findAll();

        console.log('Fetched recipes:', SavedRecipeStoreRecipes); // Log fetched recipes

        // Render the recipestore template with the fetched recipes
        res.render('recipestore', { title: 'Recipe Store', SavedRecipeStoreRecipes });

        console.log('Recipes rendered successfully.'); // Log after rendering
    } catch (error) {
        console.error('Error fetching recipes from recipestore:', error); // Log error if fetching fails
        res.status(500).send('Error fetching recipes from recipestore');
    }
});

module.exports = router;
