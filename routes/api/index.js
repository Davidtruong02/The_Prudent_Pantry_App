const router = require('express').Router();
const recipe = require('./recipeRoutes');


router.use('/recipe', recipe);