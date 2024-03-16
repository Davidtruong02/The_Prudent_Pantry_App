// shoppingRoutes.js
const express = require('express');
const router = express.Router();
const { Ingredients } = require('../../models'); // Replace '../models' with the actual path to your models



async function getIngredients(req) {
    const userId = req.session.userId; // Get userId from the session
    console.log('Here is the userId: ', userId)
    return await Ingredients.findAll({
        where: {
            user_id: 1
        },
        attributes: ['name']
    });
}

router.get('/', async (req, res) => {
    try{
        const ingredients = await getIngredients(req); // Pass req to getIngredients
        const ingredientsWithOwnProperties = ingredients.map(ingredient => ({...ingredient.dataValues}));
        res.render('shoppingList', { ingredients: ingredientsWithOwnProperties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
 

