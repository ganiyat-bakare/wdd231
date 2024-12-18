document.addEventListener("DOMContentLoaded", () => {  
    apiFetch();  
});  


// Function to check and display the last visit message
function displayVisitMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();

    if (!lastVisit) {
        // First visit
        document.getElementById('visitor-message').innerText = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate the difference in time
        const differenceInMilliseconds = currentVisit - lastVisit;
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

        if (differenceInDays < 1) {
            // Less than a day since last visit
            document.getElementById('visitor-message').innerText = "Back so soon! Awesome!";
        } else {
            // More than a day since last visit
            const dayText = differenceInDays === 1 ? "day" : "days";
            document.getElementById('visitor-message').innerText = `You last visited ${differenceInDays} ${dayText} ago.`;
        }
    }

    // Store the current visit time
    localStorage.setItem('lastVisit', currentVisit);
}

// Call the function to check visit history
displayVisitMessage();


let currentDate = new Date();

function generateCalendar(year, month) {
    const calendarBody = document.querySelector("#calendar tbody");
    calendarBody.innerHTML = ""; // Clear previous content

    // Update the displayed month and year
    document.getElementById('current-month-year').innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    const date = new Date(year, month, 1);
    const firstDay = date.getDay(); // Day of the week for the first day of the month
    const totalDays = new Date(year, month + 1, 0).getDate(); // Total days in the month

    let row = document.createElement("tr");

    // Fill in the first week with empty cells
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= totalDays; day++) {
        if (row.children.length === 7) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }

        const cell = document.createElement("td");
        cell.innerText = day;

        // Check if the day is today
        if (day === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
            cell.classList.add("today"); // Add a special class to highlight today's date
        }

        row.appendChild(cell);
    }

    // Append the last row if it has cells
    if (row.children.length > 0) {
        calendarBody.appendChild(row);
    }
}

// Function to change the month
function changeMonth(increment) {
    currentDate.setMonth(currentDate.getMonth() + increment);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

// Event listeners for buttons
document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
document.getElementById('next-month').addEventListener('click', () => changeMonth(1));

// Generate the initial calendar on load
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());


const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const tempMax = document.querySelector('#temp-max');
const tempMin = document.querySelector('#temp-min');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=9.06&lon=7.50&appid=3b8e49e1c7833a396d7ecc85f676d123&units=imperial';

async function apiFetch() {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            displayResults(data);
        } else {
            throw new Error(`Weather API response error: ${response.text()}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function convertUnixToHHMM(unixTime) {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let mornOrAft = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${mornOrAft}`;
}

function displayResults(data) {
    currentTemp.textContent = data.main.temp;
    tempMax.textContent = data.main.temp_max;
    tempMin.textContent = data.main.temp_min;
    humidity.textContent = data.main.humidity;
    sunrise.textContent = convertUnixToHHMM(data.sys.sunrise);
    sunset.textContent = convertUnixToHHMM(data.sys.sunset);
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('alt', data.weather[0].description);
    weatherIcon.setAttribute('src', iconsrc);
}



// Sample weather condition  
const weatherCondition = "cold";

// Function to get suggested recipes based on the weather condition  
function getSuggestedRecipes(recipes, weather) {  
    let suggestedRecipes = [];  

    if (weather === "cold") {  
        // Suggest warm recipes  
        suggestedRecipes = recipes.filter(recipe => recipe.tags.includes("warm"));  
    } else if (weather === "hot") {  
        // Suggest light recipes  
        suggestedRecipes = recipes.filter(recipe => recipe.tags.includes("light"));  
    } else {  
        // Default to any recipe  
        suggestedRecipes = recipes;  
    }  

    return suggestedRecipes.slice(0, 4);  
}  

// Function to get featured recipes (e.g., first four recipes)  
function getFeaturedRecipes(recipes) {  
    return recipes.slice(0, 4); // Adjust the number as needed  
}  

// Function to display recipes  
function displayRecipes(recipes, containerId) {  
    const container = document.getElementById(containerId);  
    container.innerHTML = ''; // Clear existing content  

    recipes.forEach(recipe => {  
        const recipeDiv = document.createElement('div');  
        recipeDiv.className = 'recipe-card'; // Add the recipe-card class  
        recipeDiv.innerHTML = `   
            <h3>${recipe.label}</h3>  
            <img src="images/${recipe.image}" alt="${recipe.label}">
            <h4>${recipe.healthLabels}</h4>
            <p>${recipe.description}</p>  
        `;  
        container.appendChild(recipeDiv);  
    });  
}  

// Fetch the recipe data  
fetch('data/recipedata.json')  
    .then(response => {  
        if (!response.ok) {  
            throw new Error('Network response was not ok');  
        }  
        return response.json();  
    })  
    .then(data => {  
        const suggestedRecipes = getSuggestedRecipes(data, weatherCondition);  
        const featuredRecipes = getFeaturedRecipes(data);  

        // Display the recipes  
        displayRecipes(suggestedRecipes, 'suggested-recipes');  
        displayRecipes(featuredRecipes, 'featured-recipes');  
    })  
    .catch(error => {  
        console.error('There has been a problem with your fetch operation:', error);  
    });


// Function to show nutrition tips in a dialog  
function showNutritionTips() {  
    const tipsList = document.getElementById('nutrition-tips');  

    // Clear any existing content  
    tipsList.innerHTML = `  
        <button id="closeModal">❌</button>  
        <h2>Nutrition Tips</h2>  
        <ul>  
            <li>Eat a variety of foods to ensure you get all the nutrients.</li>  
            <li>Incorporate more vegetables and fruits into your diet.</li>  
            <li>Stay hydrated – aim for 8 glasses of water a day.</li>  
            <li>Choose whole grains over refined grains.</li>  
            <li>Limit added sugars and saturated fats.</li>  
            <li>Practice mindful eating to prevent overeating.</li>  
            <li>Start your day with a healthy breakfast for better concentration and energy.</li>  
            <li>Plan meals ahead of time to make healthier choices.</li>  
            <li>Include nuts and seeds for healthy fats and proteins.</li>  
            <li>Be aware of portion sizes, and don't skip meals.</li>  
        </ul>  
    `;  

    // Show the modal dialog  
    tipsList.showModal();  

    // Close modal when close button is clicked  
    const closeModal = document.getElementById('closeModal');  
    closeModal.addEventListener('click', () => {  
        tipsList.close();  
    });  

    // Close modal when clicking outside of it  
    tipsList.addEventListener('click', (event) => {  
        if (event.target === tipsList) {  
            tipsList.close();  
        }  
    });  
}  

// Event listener for the "Learn More" button  
document.getElementById('learnMoreBtn').addEventListener('click', (event) => {  
    event.preventDefault(); // Prevent default anchor behavior  
    showNutritionTips(); // Call the function to display the nutrition tips  
});
 
