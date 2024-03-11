const express = require('express');
const router = express.Router();
const axios = require('axios');

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

// GET /api/recipe
router.get('/recipe', async (req, res) => {
    const {q} = req.query;

    try {
        const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${app_id}&app_key=${app_key}&imageSize=REGULAR&field=label&field=image&field=url&field=ingredientLines`);
        
        // Extract the required fields
        const recipes = response.data.hits.map(hit => ({
            label: hit.recipe.label,
            image: hit.recipe.image,
            url: hit.recipe.url,
            ingredientLines: hit.recipe.ingredientLines
        }));

        // Render the template with the recipes
        res.render('recipe', { recipes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from Edamam API');
    }
});

module.exports = router;



