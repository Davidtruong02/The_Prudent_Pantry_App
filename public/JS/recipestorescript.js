// recipestorescript.js //

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/api/recipestore'); // Fetch saved recipes from the server
        if (!response.ok) {
            throw new Error('Failed to fetch saved recipes');
        }
        const data = await response.json(); // Parse the JSON response
        renderSavedRecipes(data); // Render the saved recipes
    } catch (error) {
        console.error('Error fetching saved recipes:', error);
    }
});

function renderSavedRecipes(SavedRecipeStoreRecipes) {
    const recipeCardsContainer = document.getElementById('SavedRecipeStoreRecipes'); // Changed ID here

    if (SavedRecipeStoreRecipes.length === 0) {
        recipeCardsContainer.innerHTML = '<p>No saved recipes yet.</p>';
        return;
    }

    // Clear the container before rendering new recipes
    recipeCardsContainer.innerHTML = '';

    SavedRecipeStoreRecipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Add recipe content to the card
        card.innerHTML = `
            <h1 class="title">${recipe.title}</h1>
            <img src="${recipe.image}" alt="${recipe.title}">
            <h2 class="card">${recipe.title}</h2>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
            <p class="ingredients">Ingredients:</p>
            <ol class="ingredientLines">
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ol>
        `;

        recipeCardsContainer.appendChild(card);
    });
}
