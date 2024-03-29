// shoppingRoutes.js
const express = require('express');
const router = express.Router();
const { Ingredients } = require('../../models'); // Replace '../models' with the actual path to your models



async function getIngredients(req) {
    const userId = req.user?.id || req.body?.user?.id; // Get userId from the session
    // console.log('Here is the userId: ', userId)
    return await Ingredients.findAll({
        where: {
            user_id: userId
        },
        attributes: ['id', 'name']
    });
}

router.get('/', async (req, res) => {
    try {
        const ingredients = await getIngredients(req); // Pass req to getIngredients
        const ingredientsWithOwnProperties = ingredients.map(ingredient => ({ ...ingredient.dataValues }));
        // Check if the request is from a web browser
        if (req.headers['user-agent'].includes('Mozilla')) {
            // Render a view for web browsers
            res.render('shoppinglist', { ingredients: ingredientsWithOwnProperties });
        } else {
            // Return JSON for API clients
            res.json({ ingredients: ingredientsWithOwnProperties });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const numDeleted = await Ingredients.destroy({
            where: {
                id: req.params.id
            }
        });

        if (numDeleted) {
            return res.status(200).json('Item deleted!');
        } else {
            return res.status(404).json('Item not found');
        }
    } catch (err) {
        console.log(err)
        res.status(500).json('Server Error');
    }
});


module.exports = router;


