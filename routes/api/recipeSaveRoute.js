const Recipe = require('../models/Recipe');
const RecipeStore = require('../models/RecipeStore');

app.post('/api/recipesave', async (req, res) => {
    // Fetch the recipe from the Recipe table using the id
    const recipe = await Recipe.findByPk(req.body.id);

    if (!recipe) {
        return res.status(404).json({ error: 'No recipe found with this id!' });
    }

    // Use the fetched data to create a new record in the RecipeStore table
    const storedRecipe = await RecipeStore.create({
        title: recipe.title,
        ingredients: recipe.ingredients,
        recipeImage: recipe.recipeImage,
        url: recipe.url,
        uri: recipe.uri,
        user_id: req.user.id
        // Other fields...
    });

    res.json(storedRecipe);
});
    