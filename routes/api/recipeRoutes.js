const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Recipe } = require('../../models');

const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;

// GET /api/recipe
router.get('/recipe', async (req, res) => {
    const { q, nextHref } = req.query;

    try {
        
        // Delete existing recipes for the logged-in user
        await Recipe.destroy({
            where: {
                user_id: req.user.id
            }
        });
        
        let requestUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${APP_ID}&app_key=${APP_KEY}&imageSize=REGULAR&field=label&field=image&field=url&field=ingredientLines`;

        if (nextHref && !q) {
            requestUrl = nextHref;
        }

        const response = await axios.get(requestUrl);
        console.log(response.data);

        // Extract the required fields
        const recipes = response.data.hits.map(hit => ({
            label: hit.recipe.label,
            image: hit.recipe.image,
            url: hit.recipe.url,
            ingredientLines: hit.recipe.ingredientLines
        }));

        // Insert each recipe into the database
        for (const recipe of recipes) {
            await Recipe.create({
                title: recipe.label,
                url: recipe.url,
                ingredients: JSON.stringify(recipe.ingredientLines),
                user_id: req.user.id,
            });
        }

        // Render the template with the recipes
        res.render('recipe', { recipes, nextHref: response.data?._links?.next?.href });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from Edamam API');
    }
});

module.exports = router;
