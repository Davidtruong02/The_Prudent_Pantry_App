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