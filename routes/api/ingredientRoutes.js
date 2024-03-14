app.post('/save-ingredients', (req, res) => {
  let recipeId = req.body.id;

  // Find the recipe with the given ID
  let recipe = recipes.find(r => r.id === recipeId);

  if (recipe) {
      // Parse out the ingredients
      let ingredients = recipe.ingredientLines;

      // Save the ingredients to the ingredients table in the database
      db.run('INSERT INTO ingredients (name, quantity, measure, recipe_id) VALUES (?, ?, ?, ?)', [name, quantity, measure, recipeId], function(err) {
          if (err) {
              res.status(500).json({ error: 'Failed to save ingredients' });
          }
      });
      // Replace the comment below with your own code to save the ingredients
      // saveIngredientsToDatabase(ingredients);

      res.json({ success: true });
  } else {
      res.status(404).json({ error: 'Recipe not found' });
  }
});