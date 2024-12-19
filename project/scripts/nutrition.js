document.addEventListener('DOMContentLoaded', async function () { 
    const searchInput = document.getElementById('searchInput');  
    const searchButton = document.getElementById('searchButton');  
    const recipeSelect = document.getElementById('recipeSelect');  
    const ingredientSelect = document.getElementById('ingredientSelect');  
    const recipeList = document.getElementById('recipe-list');  
    const ingredientQuantity = document.getElementById('ingredientQuantity');  
    const analyzeButton = document.getElementById('analyzeButton');  

    
    // Load recipe data on page load  
    const recipes = await loadRecipeData();  
    populateRecipeSelect(recipes);  
    populateIngredientSelect(recipes);

    searchButton.addEventListener('click', function () {  
        const query = searchInput.value.toLowerCase();  
        searchRecipes(query, recipes);  
    });  

    // Change event for the recipe dropdown  
    recipeSelect.addEventListener('change', function () {  
        const selectedRecipeId = recipeSelect.value;  
        const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);  
        displayNutritionForRecipe(selectedRecipe);  
    });  

    // Change event for the ingredient dropdown  
    analyzeButton.addEventListener('click', function () {  
        const selectedIngredient = ingredientSelect.value;  
        const quantity = parseFloat(ingredientQuantity.value) || 1; // Default quantity to 1 if empty  
        displayNutritionForIngredient(selectedIngredient, quantity, recipes);  
    });  

    // Load recipes from JSON  
    async function loadRecipeData() {  
        const response = await fetch('data/recipedata.json'); // Update with the correct file path  
        const data = await response.json();  
        return data;  
    }  

    // Populate the recipe select dropdown  
    function populateRecipeSelect(recipes) {  
        recipes.forEach(recipe => {
            const option = document.createElement('option');  
            option.value = recipe.id; // Using recipe ID  
            option.textContent = recipe.label;  
            recipeSelect.appendChild(option);
        });  
    }  

    // Populate the ingredient select dropdown  
    function populateIngredientSelect(recipes) {  
        const ingredientsSet = new Set();  
        recipes.forEach(recipe => {  
            recipe.ingredients.forEach(ingredient => {  
                ingredientsSet.add(ingredient);  
            });  
        });  

        ingredientsSet.forEach(ingredient => {  
            const option = document.createElement('option');  
            option.value = ingredient;  
            option.textContent = ingredient;  
            ingredientSelect.appendChild(option);  
        });  
    }  

    // Search recipes based on the input query  
    function searchRecipes(query, recipes) {  
        const filteredRecipes = recipes.filter(recipe =>  
            recipe.label.toLowerCase().includes(query) ||  
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))  
        );  
        displayRecipes(filteredRecipes);  
    }  

    // Display the filtered recipes  
    function displayRecipes(recipes) {  
        recipeList.innerHTML = '';  
        if (recipes.length === 0) {  
            recipeList.innerHTML = '<li>No recipes found.</li>';  
            return;  
        }  
        recipes.forEach(recipe => {  
            const li = document.createElement('li');  
            li.innerHTML = `  
                <h3>${recipe.label}</h3>  
                <img src="${recipe.image}" alt="${recipe.label}" />  
                <p><strong>Calories</strong>: ${recipe.calories}</p>  
                <p><strong>Ingredients</strong>: ${recipe.ingredients.join(', ')}</p>  
                <p><strong>Health Labels</strong>: ${recipe.healthLabels.join(', ')}</p>  
            `;  
            recipeList.appendChild(li);  
        });  
    }  

    function displayNutritionForRecipe(recipe) {  
        if (recipe) {  
            const recipeInfo = ` 
                <div class="associated-recipe recipe-card">
                    <h2>${recipe.label}</h2>  
                    <img src="images/${recipe.image}" alt="${recipe.label}"  height="200" width="300" loading="lazy">
                    <p><strong>Calories</strong>: ${recipe.calories}</p>  
                    <p><strong>Serving Size</strong>: ${recipe.servingSize || 'N/A'}</p>  
                    <p><strong>Ingredients</strong>: ${recipe.ingredients.join(', ')}</p>  
                    <p><strong>Health Labels</strong>: ${recipe.healthLabels.join(', ')}</p>
                    <h4>Ingredients Used:</h4>
                    <p>${recipe.ingredients.join(', ')}</p> 
                </div> 
            `;  
            recipeList.innerHTML = recipeInfo; // Display just the selected recipe  
        }  
    }
    

    // Display nutrition for the selected ingredient based on the quantity  
    function displayNutritionForIngredient(ingredient, quantity, recipes) {  
         // Find all recipes that contain the selected ingredient  
        const ingredientRecipes = recipes.filter(recipe => recipe.ingredients.includes(ingredient));  

        if (ingredientRecipes.length > 0) {  
            // Assuming the ingredient has fixed nutrition values 
            const nutrition = ingredientRecipes[0].nutrition.find(item => item.ingredient === ingredient); // Extract hypothetical nutrition object for the ingredient  

            if (nutrition) {  
                const totalCalories = nutrition.calories * quantity;   
                const totalCarbohydrates = nutrition.carbohydrates * quantity;   
                const totalFat = nutrition.fat * quantity;   
                const totalProtein = nutrition.protein * quantity;   

                const nutritionDisplay = ` 
                        <div class="associated-recipe">  
                            <h2>Nutritional Information for ${ingredient} (${quantity} units)</h2>  
                            <p><strong>Calories</strong>: ${totalCalories.toFixed(2)} kcal</p>  
                            <p><strong>Carbohydrates</strong>: ${totalCarbohydrates.toFixed(2)} g</p>  
                            <p><strong>Fat</strong>: ${totalFat.toFixed(2)} g</p>  
                            <p><strong>Protein</strong>: ${totalProtein.toFixed(2)} g</p>
                            <p><strong>Recipes that use this ingredient include...</strong></p>
                        </div>  
                    `; 
                recipeList.innerHTML = nutritionDisplay;  
                displayAvailableRecipes(ingredientRecipes); // Call the function to show available recipes  
            } else {  
                recipeList.innerHTML = `<p>No nutritional information available for ${ingredient}.</p>`;  
            }  
        } else {  
            recipeList.innerHTML = `<p>No recipes found containing ${ingredient}.</p>`;  
        }  
    }  

    // Function to display available recipes that include the selected ingredient in cards  
    function displayAvailableRecipes(recipes) {  
        const availableRecipesHtml = recipes.map(recipe =>   
            `<div class="recipe-card">  
                <h2>${recipe.label}</h2>  
                <img src="images/${recipe.image}" alt="${recipe.label}"  height="200" width="300" loading="lazy">  
                <p><strong>Calories</strong>: ${recipe.calories}</p>  
                <p><strong>Ingredients</strong>: ${recipe.ingredients.join(', ')}</p>  
                <p><strong>Health Labels</strong>: ${recipe.healthLabels.join(', ')}</p>  
            </div>`  
        ).join('');  

        recipeList.innerHTML += availableRecipesHtml; // Append the available recipes to the existing nutrition display  
    }  
      
});


const timestampInput = document.getElementById("timestamp");
const currentDateTime = new Date();
// Format the timestamp as an ISO string (e.g., "2024-11-16T15:30:45.123Z")
timestampInput.value = currentDateTime.toISOString();


// nutrition.js - Integration of Recipes and Meal Planning Functionality  

// Recipe data  
const recipes = [  
    { label: "Vegan Tacos", ingredients: ["Tortillas", "Black beans", "Avocado", "Tomatoes"], diet: "vegan", preparationTime: "20 minutes", servings: 2 },  
    { label: "Keto Salad", ingredients: ["Lettuce", "Olive oil", "Cheese", "Chicken"], diet: "keto", preparationTime: "10 minutes", servings: 2 },  
    { label: "Vegetarian Stir Fry", ingredients: ["Vegetables", "Soy sauce", "Rice"], diet: "vegetarian", preparationTime: "15 minutes", servings: 4 },  
    { label: "Paleo Chili", ingredients: ["Beef", "Tomatoes", "Beans"], diet: "paleo", preparationTime: "1 hour", servings: 6 },  
    { label: "Gluten-Free Pasta", ingredients: ["Gluten-free pasta", "Tomato sauce", "Basil"], diet: "gluten-free", preparationTime: "30 minutes", servings: 4 },  
    { label: "Quinoa Salad", ingredients: ["Quinoa", "Cucumbers", "Feta", "Olive oil"], diet: "vegetarian", preparationTime: "25 minutes", servings: 4 },  
    { label: "Zucchini Noodles", ingredients: ["Zucchini", "Garlic", "Olive oil", "Parmesan"], diet: "keto", preparationTime: "15 minutes", servings: 2 },  
    { label: "Stuffed Peppers", ingredients: ["Bell peppers", "Rice", "Ground turkey", "Cheese"], diet: "paleo", preparationTime: "40 minutes", servings: 4 },  
    { label: "Chickpea Curry", ingredients: ["Chickpeas", "Coconut milk", "Curry powder", "Spinach"], diet: "vegan", preparationTime: "30 minutes", servings: 3 },  
    { label: "Eggplant Parmesan", ingredients: ["Eggplant", "Marinara sauce", "Mozzarella", "Basil"], diet: "vegetarian", preparationTime: "1 hour", servings: 4 },  
    { label: "Keto Cauliflower Fried Rice", ingredients: ["Cauliflower", "Peas", "Carrots", "Eggs"], diet: "keto", preparationTime: "20 minutes", servings: 2 },  
    { label: "Paleo Chicken Stir Fry", ingredients: ["Chicken", "Broccoli", "Bell peppers", "Soy sauce"], diet: "paleo", preparationTime: "25 minutes", servings: 4 },  
    { label: "Gluten-Free Pancakes", ingredients: ["Gluten-free flour", "Milk", "Eggs", "Maple syrup"], diet: "gluten-free", preparationTime: "15 minutes", servings: 2 },  
    { label: "Vegan Lentil Soup", ingredients: ["Lentils", "Carrots", "Celery", "Vegetable broth"], diet: "vegan", preparationTime: "40 minutes", servings: 4 },  
    { label: "Vegetarian Pizza", ingredients: ["Pizza dough", "Tomato sauce", "Mushrooms", "Cheese"], diet: "vegetarian", preparationTime: "35 minutes", servings: 2 },  
];  

// Run the following code when the DOM is fully loaded  
document.addEventListener("DOMContentLoaded", () => {  
    const generateMealPlanButton = document.getElementById("generate-meal-plan-button");  
    const mealPlanList = document.getElementById("meal-plan-list");  
    const dietaryPreferenceSelect = document.getElementById("dietary-preference");  
    const mealDurationSelect = document.getElementById("meal-duration");  
    const clearMealPlanButton = document.getElementById("clear-meal-plan-button");  

    // Handle meal plan generation  
    generateMealPlanButton.addEventListener("click", () => {  
        console.log("Generate Meal Plan button clicked"); // Debugging log  
        const duration = mealDurationSelect.value;  
        const dietaryPreference = dietaryPreferenceSelect.value;  

        // Clear previous meal plan  
        mealPlanList.innerHTML = "";  

        // Determine the number of meals based on duration  
        let numberOfMeals = duration === "daily" ? 3 : 21; // 3 meals for daily, 21 for weekly  
        const availableRecipes = recipes.filter(recipe =>  
            dietaryPreference === "no-preference" || recipe.diet === dietaryPreference  
        );  

        // Check if there are available recipes  
        if (availableRecipes.length === 0) {  
            mealPlanList.innerHTML = "<p>No recipes available for the selected dietary preference.</p>";  
            return;  
        }  

        // Randomly select meals  
        for (let i = 0; i < numberOfMeals; i++) {  
            const randomIndex = Math.floor(Math.random() * availableRecipes.length);  
            const selectedRecipe = availableRecipes[randomIndex];  

            const li = document.createElement("li");  
            li.innerHTML = `${selectedRecipe.label}: Ingredients - ${selectedRecipe.ingredients.join(", ")} | Preparation Time: ${selectedRecipe.preparationTime} | Servings: ${selectedRecipe.servings}`;  
            mealPlanList.appendChild(li);  
        }  
    });  

    // Clear meal plan  
    clearMealPlanButton.addEventListener("click", () => {  
        mealPlanList.innerHTML = ""; // Clear all items in the meal plan list  
    });  
});