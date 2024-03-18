
document.addEventListener('click', function (event) {
    if (event.target.matches('.save-ingredients')) {
        let recipeId = event.target.dataset.recipeId;

        fetch('/save-ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: recipeId }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle response here
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});

// Add a click event listener to the delete button
document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('delete-ingredient')) {
        const ingredientId = event.target.getAttribute('data-ingredient-id');
        console.log("This is the ingredientId :", ingredientId)
        const response = await fetch('/shoppingList/delete/' + ingredientId, {
            method: 'DELETE'
        });
        if (response.ok) {
            event.target.closest('.card').remove();
        }
    }
});