const Recipe = require('./Recipe');
const Ingredients = require('./Ingredients');
const User = require('./User');
const RecipeStore = require('./recipestore'); 


Recipe.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Recipe, { foreignKey: 'user_id' });
RecipeStore.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { Recipe, Ingredients, User, RecipeStore};

