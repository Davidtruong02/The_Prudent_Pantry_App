
# Prudent Pantry App

## Table of Contents 
- [Features](#features)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API Integration](#api-integration)
- [Contributors](#contributors)
- [Deployment](#deployment)
- [License](#license)

The Prudent Pantry App is a web application designed to help users discover and save recipes. It allows users to search for recipes based on ingredients, save their favorite recipes, and manage a shopping list.

## Features

 **Recipe Search:** Users can search for recipes based on ingredients they have or want to use.
 **Recipe Saving:** Users can save their favorite recipes to revisit later.
 **Shopping List:** Users can manage a shopping list based on the ingredients required for their saved recipes.

## Installation

 Clone the repository:

   ```bash
   git clone https://github.com/Davidtruong02/The_Prudent_Pantry_App.git
   ```

 Install dependencies:

   ```bash
   npm install
   ```

 Set up environment variables:
   Create a `.env` file in the root directory of the project and add the following variables:

   ```plaintext
   PORT=3000
   SESSION_SECRET=your_session_secret
   APP_ID=your_edamam_app_id
   APP_KEY=your_edamam_app_key
   ```

   Replace `your_session_secret`, `your_edamam_app_id`, and `your_edamam_app_key` with appropriate values.

 Start the server:

   ```bash
   npm start
   ```

 Open your browser and navigate to `http://localhost:3000` to access the application.

## Dependencies

 express
 express-handlebars
 axios
 bcrypt
 connect-flash
 connect-session-sequelize
 dotenv
 handlebars
 passport
 passport-local
 sequelize
 mysql2
 tailwindcss
 @handlebars/allow-prototype-access

## Usage

 Search for recipes by entering ingredients in the search bar.
 Save recipes by clicking on the "Save Recipe" button.
 View saved recipes on the "Saved Recipes" page.
 Manage your shopping list on the "Shopping List" page.

## API Integration

This application integrates with the Edamam Recipe API to provide recipe search functionality. Sign up for an account on the [Edamam API website](https://developer.edamam.com/edamam-recipe-api) to obtain your `APP_ID` and `APP_KEY`. Add these credentials to your `.env` file as described in the installation steps.

## Contributors

- [David Truong](https://github.com/Davidtruong02)
- [Alex Kaye](https://github.com/akayer19)
- [Damon Storie](https://github.com/dstorie80)
- [Camrin Davis](https://github.com/KingCamrin)

## Deployment

The application is deployed on Heroku and uses JawsDB for the database. You can access it [here](https://the-prudent-pantry-app-cd8c3bb4b9ad.herokuapp.com).

## Images

![alt text](assets\images\LoginSS.png)
![Alt text](assets\images\recipedata.png)
![Alt text](assets\images\RecipeSearchPage.png)
![Alt text](assets\images\RecipeStore.png)
![Alt text](assets\images\SavedRecipe.png)
![Alt text](assets\images\ShoppingList.png)
## License

MIT License

Copyright (c) 2024 David Truong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
