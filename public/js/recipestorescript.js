console.log('Script started executing.');

document.addEventListener('DOMContentLoaded', async function() {
    // Check for success flash message
    const successFlash = document.querySelector('.success-flash');
    if (successFlash) {
        // Display success flash message
        alert(successFlash.textContent);
    }

    // Check for error flash message
    const errorFlash = document.querySelector('.error-flash');
    if (errorFlash) {
        // Display error flash message
        alert(errorFlash.textContent);
    }

    // Fetch saved recipes from the server
    try {
        const response = await fetch('/api/recipestore');
        if (!response.ok) {
            throw new Error('Failed to fetch saved recipes');
        }
        const data = await response.json();
        renderSavedRecipes(data);
    } catch (error) {
        console.error('Error fetching saved recipes:', error);
    }
});


function renderSavedRecipes(SavedRecipeStoreRecipes) {
    const recipeCardsContainer = document.getElementById('SavedRecipeStoreRecipes'); 

    // Clear the container before rendering new recipes
    recipeCardsContainer.innerHTML = '';

    if (SavedRecipeStoreRecipes.length === 0) {
        // If there are no saved recipes, display a message and return
        recipeCardsContainer.innerHTML = '<p>No saved recipes yet.</p>';
        return;
    }

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
            <img src="${recipe.recipeImage}" alt="${recipe.title}">
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

                    // If there are no more saved recipes, display a message
                    if (SavedRecipeStoreRecipes.length === 0) {
                        recipeCardsContainer.innerHTML = '<p>No saved recipes yet.</p>';
                    }
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
