document.addEventListener('DOMContentLoaded', async function () {  
    fetchRecipes(); 
    loadFeaturedRecipes();
});

const cards = document.querySelector('#recipes');

async function fetchRecipes() {  
    try {  
        const response = await fetch('data/recipedata.json');  
        const recipes = await response.json();  
        displayRecipes(recipes);  
    } catch (error) {  
        console.error('Error fetching members:', error);  
    }  
}  

const displayRecipes = (recipes) => {  
    cards.innerHTML = '';  

    recipes.forEach((recipe) => {  
        let card = document.createElement('div'); // Use div for cards  
        card.classList.add("recipe-card");  

        let label = document.createElement('h3');  
        let calories = document.createElement('p');  
        let prepTime = document.createElement('p');  
        let ingredients = document.createElement('p');  
        let image = document.createElement('img');  
        let healthLabels = document.createElement('p');  

        label.textContent = recipe.label;  
        calories.textContent = `Calories: ${recipe.calories}`;  
        prepTime.textContent = `Prep Time: ${recipe.prepTime}`;  
        ingredients.textContent = `Ingredients: ${recipe.ingredients.join(', ')}`;  
        healthLabels.textContent = `${recipe.healthLabels.join(', ')}`;    

        image.setAttribute('src', `images/${recipe.image}`);  
        image.setAttribute('alt', recipe.label);  
        image.setAttribute('loading', 'lazy');  
        image.setAttribute('width', '300');  
        image.setAttribute('height', '200');  

        
        card.appendChild(label);  
        card.appendChild(image);
        card.appendChild(healthLabels);  
        card.appendChild(calories);  
        card.appendChild(prepTime);  
        card.appendChild(ingredients);  

        cards.appendChild(card);  
    });  
}

// Toggle view functionality 
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#recipes");

gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}

async function loadSpotlightRecipes() {  
    try {  
        const response = await fetch('data/recipedata.json');  
        const recipes = await response.json();  

        const spotlightrecipes = recipes.filter(recipe => recipe.recipe <= 2);  
        const selectedrecipes = spotlightRecipes.sort(() => Math.random() - Math.random()).slice(0, 3);  

        const recipesContainer = document.getElementById('recipes-container');  
        recipessContainer.innerHTML = '';
    
            const recipeCard = `  
                <div class="recipe-card"> 
                    <h2>${recipe.label}</h2>  
                    <img src=./images/${recipe.image} alt="${recipe.label}" loading="lazy" class="recipe-image">  
                    <p>${recipe.healthLabels}</p>  
                    <p>Ingredients: ${recipe.ingredients}</p>  
                    <p>Prep time: ${recipe.prepTime}</p> 
                </div>  
            `; 

            recipesContainer.innerHTML += recipeCard;  
    } 
    catch (error) {  
        console.error('Error fetching recipes data:', error);  
        document.getElementById('recipes-container').innerHTML = '<p>Error loading recipes data.</p>';  
    }  
} 
