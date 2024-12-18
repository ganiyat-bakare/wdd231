import { recipes } from './mealsdata.js';  


document.addEventListener("DOMContentLoaded", () => {  
    const generateMealPlanButton = document.getElementById("generate-meal-plan-button");  
    const mealPlanList = document.getElementById("meal-plan-list");  
    const dietaryPreferenceSelect = document.getElementById("dietary-preference");  
    const mealDurationSelect = document.getElementById("meal-duration");  
    const clearMealPlanButton = document.getElementById("clear-meal-plan-button");  

    generateMealPlanButton.addEventListener("click", () => {  
        console.log("Generate Meal Plan button clicked");
        const duration = mealDurationSelect.value;  
        const dietaryPreference = dietaryPreferenceSelect.value;  

        // Clear previous meal plan  
        mealPlanList.innerHTML = "";  

        const numberOfDays = duration === "daily" ? 1 : 7; // 1 day for daily, 7 days for weekly
        const availableRecipes = recipes.filter(recipe =>  
            dietaryPreference === "no-preference" || recipe.diet === dietaryPreference  
        );  

        if (availableRecipes.length === 0) {  
            mealPlanList.innerHTML = "<p>No recipes available for the selected dietary preference.</p>";  
            return;  
        }  

        // Create a table
        const table = document.createElement('table');  
        table.innerHTML = `  
            <thead>  
                <tr>  
                    <th>Day</th>  
                    <th>Breakfast</th>  
                    <th>Lunch</th>  
                    <th>Dinner</th>  
                </tr>  
            </thead>  
            <tbody>  
            </tbody>  
        `;  

        const tbody = table.querySelector('tbody');  
        const daysOfWeek = duration === "daily" ? ["Monday"] : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        // Populate meal plan for each day
        daysOfWeek.forEach(day => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${day}</td>`;
            
            for (let i = 0; i < 3; i++) { // For Breakfast, Lunch, Dinner
                const randomIndex = Math.floor(Math.random() * availableRecipes.length);
                const selectedRecipe = availableRecipes[randomIndex];

                row.innerHTML += `<td>
                    <strong>${selectedRecipe.label}</strong><br>
                    <strong>Ingredients:</strong> ${selectedRecipe.ingredients.join(", ")}<br>
                    <strong>Calories:</strong> ${selectedRecipe.calories}<br>
                    <strong>Prep time:</strong> ${selectedRecipe.preparationTime}
                </td>`;
            }

            tbody.appendChild(row);
        });

        mealPlanList.appendChild(table);
    });  

    clearMealPlanButton.addEventListener("click", () => {  
        mealPlanList.innerHTML = "";
    });  
});