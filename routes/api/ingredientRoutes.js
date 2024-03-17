const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Ingredients } = require('../../models');

const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;

// GET /api/ingredients
router.get('/ingredients', async (req, res) => {
    // console.log('Save ingredients route handler called')
    //const uri  = req.query.uri;
    const uri = encodeURIComponent(req.query.uri);
    console.log('Here is the uri: ',uri);

    try {
        const url = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${uri}&app_id=${APP_ID}&app_key=${APP_KEY}&field=ingredients`;

        const response = await axios.get(url);
        console.log('Here is the encoded URI: ',url);

        // Extract the required fields from the API response and create an array of objects
        const ingredientsData = response.data.hits[0].recipe.ingredients;
        if (!ingredientsData) {
            console.error('Ingredients not found');
            return res.status(404).json({ error: 'Ingredients not found' });
        }
        const ingredients = ingredientsData.map(ingredient => ({
            food: ingredient.food,
            measure: ingredient.measure,
            quantity: ingredient.quantity,
        }));

        // Insert each ingredient into the database
        for (const ingredient of ingredients) {
            await Ingredients.create({
                name: ingredient.food,
                measure: ingredient.measure,
                quantity: ingredient.quantity,
                user_id: req.user.id,
                recipe_id: req.query.recipe_id,
            });
        }


        res.json(ingredients);
        console.log(ingredients);


    } catch (error) {
        console.error(error); // Log the error to the console
        return res.status(500).json({ error: 'Error fetching ingredients' });
    }
});

module.exports = router;






    


