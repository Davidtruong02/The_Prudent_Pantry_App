const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Recipe } = require('../../models');

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;


// GET /api/recipe
router.get('/recipe', async (req, res) => {
    const {q} = req.query;

    try {
        const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${app_id}&app_key=${app_key}&imageSize=REGULAR&field=label&field=image&field=url&field=ingredientLines`);

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
            });
        }

        // Render the template with the recipes
        res.render('recipe', { recipes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from Edamam API');
    }
});

// router.post('/clearRecipes', async (req, res) => {
//     try {
//         await Recipe.destroy({ where: {}, truncate: false });
//         res.json({ success: true });
//     } catch (err) {
//         console.error(err);
//         res.json({ success: false });
//     }
// });





module.exports = router;



