console.log('Script started executing.');

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
    const recipeCardsContainer = document.getElementById('SavedRecipeStoreRecipes'); 

    if (SavedRecipeStoreRecipes.length === 0) {
        recipeCardsContainer.innerHTML = '<p>No saved recipes yet.</p>';
        return;
    }

    // Clear the container before rendering new recipes
    recipeCardsContainer.innerHTML = '';

    SavedRecipeStoreRecipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Parse the ingredients string into a JavaScript array
        const ingredientsArray = JSON.parse(recipe.ingredients);

        // Render the ingredients as list items
        const ingredientsList = ingredientsArray.map(ingredient => `<li>${ingredient}</li>`).join('');

        // Add recipe content to the card
        card.innerHTML = `
            <h1 class="title">${recipe.title}</h1>
            <img src="${recipe.image}" alt="${recipe.title}">
            <h2 class="card">${recipe.title}</h2>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
            <button class="delete-btn">&times;</button> <!-- Add delete button with X icon -->
            <p class="ingredients">Ingredients:</p>
            <ol class="ingredientLines">
            ${ingredientsList}
            </ol>
        `;

        // Add click event listener to delete button
        const deleteBtn = card.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            try {
                fetch(`/api/recipe/${recipe.id}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete recipe');
                    }
                    // Remove the card from the UI
                    card.remove();
                })
                .catch(error => {
                    console.error('Error deleting recipe:', error);
                    // Handle error
                });
            } catch (error) {
                console.error('Error deleting recipe:', error);
                // Handle error
            }
        });

        recipeCardsContainer.appendChild(card);
    });
}
