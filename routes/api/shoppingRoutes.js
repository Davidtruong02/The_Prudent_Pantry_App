// shoppingRoutes.js
const express = require('express');
const router = express.Router();
const { Ingredients } = require('../../models');



router.get('/shoppinglist', async (req, res) => {
    try {
        const userId = req.user.id;
        const ingredients = await Ingredients.findAll({
            attributes: ['name'],
            where: {
                user_id: userId
            }
        });

        // Convert Sequelize instances to plain JavaScript objects
        const ingredientsPlain = ingredients.map(ingredient => ingredient.toJSON());
        console.log('Here are the ingredients', ingredientsPlain)

        res.render('shoppinglist', { ingredients: ingredientsPlain });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while trying to get the ingredients.' });
    }
});

module.exports = router;
 

