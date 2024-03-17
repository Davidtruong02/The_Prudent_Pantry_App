// routes/api/recipeStoreRoute.js

const express = require('express');
const router = express.Router();
const { RecipeStore } = require('../../models');

router.get('/recipestore', async (req, res) => {
    try {
        console.log('Fetching recipes from recipestore...'); 
        const SavedRecipeStoreRecipes = await RecipeStore.findAll();
        console.log('Fetched recipes:', SavedRecipeStoreRecipes); 
        res.json(SavedRecipeStoreRecipes); // Send JSON response
    } catch (error) {
        console.error('Error fetching recipes from recipestore:', error); 
        res.status(500).json({ error: 'Error fetching recipes from recipestore' }); // Send JSON error response
    }
});

module.exports = router;

