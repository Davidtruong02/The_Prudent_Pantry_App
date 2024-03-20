// JavaScript to get the next 20 recipes
const form = document.getElementById('searchForm');
const nextButton = document.getElementById('nextPage');

nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    form.submit();
});



// JavaScript code for saving recipes
document.addEventListener('DOMContentLoaded', function() { // Wait for the DOM to load
    const saveRecipeButtons = document.querySelectorAll('.save-recipe'); // Get all "Save Recipe" buttons

    saveRecipeButtons.forEach(function(button) { // Add an event listener to each "Save Recipe" button
        button.addEventListener('click', function() { // When the button is clicked
            const recipeId = this.getAttribute('data-recipe-id'); // Get the recipe ID from the button's data-recipe-id attribute

            fetch('/api/recipesave', { // Send a POST request to the /api/recipesave endpoint
                method: 'POST', // Use the POST method
                headers: { // Set the request headers
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify({ id: recipeId }), // Set the request body to the recipe ID
            })
            .then(response => response.json()) // Parse the JSON response
            .then(data => { // Log the response data to the console
                console.log('Received response:', data); // Log the response data to the console
                alert(data.message); // Display the response message in an alert dialog
                // Redirect to recipestore.handlebars after saving
                //window.location.href = '/recipestore'; // Redirect to the recipestore page
            })
            .catch(error => console.error('Error:', error)); // Log any errors to the console
        });
    });
});

//---------------------------------------------------------------------------------------------------------------//
//                                     JavaScript code for saving ingredients                                    //  
//---------------------------------------------------------------------------------------------------------------//

document.addEventListener('DOMContentLoaded', (event) => {
    const saveIngredientsButton = document.querySelectorAll('.save-ingredients');

    saveIngredientsButton.forEach(button => {
        button.addEventListener('click', async(e) => {
            alert('Ingredients have been added to the shopping list');
            try{
                let uri = button.getAttribute("data-ingredient-id");
                let response = await fetch(`/ingredients?uri=${encodeURIComponent(uri)}`);
                let data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});
