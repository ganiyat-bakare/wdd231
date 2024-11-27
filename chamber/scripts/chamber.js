document.addEventListener("DOMContentLoaded", () => { 
    fetchMembers(); 
    loadWeatherData();  
    loadThreeDayForecast();
    loadSpotlightMembers();  
});  

// Hamburger functionality
const hamburgerElement = document.querySelector('#ham');
const navElement = document.querySelector('#animate');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
})

const cards = document.querySelector('#members');

async function fetchMembers() {  
    try {  
        const response = await fetch('data/members.json');  
        const members = await response.json();  
        displayMembers(members);  
    } catch (error) {  
        console.error('Error fetching members:', error);  
    }  
}  

const displayMembers = (members) => {
    cards.innerHTML = '';

    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add("member-card");

        let name = document.createElement('h3');
        let address = document.createElement('address');
        let number = document.createElement('p');
        let website = document.createElement('a');
        let image = document.createElement('img');
        let membership_level = document.createElement('p')

        name.textContent = member.name;
        address.textContent = member.address;  
        number.textContent = member.phone;  
        website.textContent = member.website;  
        website.href = member.website;  
        membership_level.textContent = `Membership Level: ${member.membership_level}`; 
        website.target = "_blank";  

        image.setAttribute('src',`images/${member.image}`);
        image.setAttribute('alt', `Image of member ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '200');

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(membership_level);
        card.appendChild(address);
        card.appendChild(number);
        card.appendChild(website);

        cards.appendChild(card);
    });
}

// Toggle view functionality 
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#members");

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

async function loadWeatherData() {  
    const apiKey = '3b8e49e1c7833a396d7ecc85f676d123';
    const city = 'Abuja';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;  

    try {  
        const response = await fetch(url);  
        const data = await response.json();  
        let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
 
        const weatherInfo = `<h2>Current Weather in ${data.name}</h2>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
            <p>${capitalizeWords(data.weather.map(w => w.description).join(', '))}</p>
            <p><strong>${Math.round(data.main.temp)}&deg;F</strong></p>  
            <p> Feels like ${Math.round(data.main.feels_like)}&deg;F</p>
            <p>High: <strong>${Math.round(data.main.temp_max)}&deg;F</strong></p>  
            <p>Low: <strong>${Math.round(data.main.temp_min)}&deg;F</strong></p>  
            <p>Humidity: <strong>${data.main.humidity}%</strong></p>
            <p>Sunrise: <strong>${sunrise}</strong></p>
            <p>Sunset: <strong>${sunset}</strong></p>
        `;  
        document.getElementById('weather-info').innerHTML = weatherInfo;  
    } catch (error) {  
        console.error('Error fetching weather data:', error);  
        document.getElementById('weather-info').innerHTML = '<p>Error loading weather data.</p>';  
    }  
}  

async function loadThreeDayForecast() {  
    const apiKey = '3b8e49e1c7833a396d7ecc85f676d123'; 
    const city = 'Abuja';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;  

    try {  
        const response = await fetch(url);  
        const data = await response.json();  
        console.log(data);
        
        // Prepare to store the temperature for each day  
        const forecast = {};  
        let uniqueDaysCount = 0;  
        const uniqueDaysSet = new Set();
    
        data.list.forEach(entry => {  
            if (uniqueDaysCount < 3) { 
                const date = new Date(entry.dt * 1000);
                const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });  
    
                // Check if this day has already been processed  
                if (!uniqueDaysSet.has(dayOfWeek)) {  
                    // If this day is new, add it to the set and increment count  
                    uniqueDaysSet.add(dayOfWeek);  
                    uniqueDaysCount++;  
                } else {  
                    return; 
                }  
    
                const temp = Math.round(entry.main.temp);
    
                // If the date is not already in the forecast, add it  
                if (!forecast[dayOfWeek]) {  
                    forecast[dayOfWeek] = {  
                        temperatures: [],  
                        avgTemp: 0, 
                    };  
                }  
    
                // Push the temperature to the appropriate day  
                forecast[dayOfWeek].temperatures.push(temp);  
            }   
        });  
    
        // Calculate the average temperature for each day  
        for (let day in forecast) {  
            const temperatures = forecast[day].temperatures;  
            forecast[day].avgTemp = (temperatures.reduce((a, b) => a + b, 0) / temperatures.length).toFixed(0);  
        }  
    
        // Prepare HTML output  
        displayForecast(forecast);  
    } catch (error) {  
        console.error('Error fetching weather forecast:', error);  
        document.getElementById('forecast-info').innerHTML = '<p>Error loading forecast data.</p>';  
    }    
}  

function displayForecast(forecast) {  
    const forecastContainer = document.getElementById('forecast-info');  
    forecastContainer.innerHTML = '';

    const days = Object.keys(forecast);  
    days.forEach(day => {  
        const dailyForecast = `  
            <div class="forecast-day">  
                <h4>${day}</h4>
                <p>Average Temp: ${forecast[day].avgTemp}&deg;F</p>  
                <p>Temperatures: ${forecast[day].temperatures.join(', ')}°F</p>  
            </div>  
        `;  
        forecastContainer.innerHTML += dailyForecast;  
    });  
}


function capitalizeWords(str) {  
    return str.replace(/\b\w/g, char => char.toUpperCase());  
}  


async function loadSpotlightMembers() {  
    try {  
        const response = await fetch('data/members.json');  
        const members = await response.json();  

        const spotlightMembers = members.filter(member => member.membership_level <= 2);  
        const selectedMembers = spotlightMembers.sort(() => Math.random() - Math.random()).slice(0, 3);  

        const membersContainer = document.getElementById('members-container');  
        membersContainer.innerHTML = '';

        selectedMembers.forEach(member => {
            // Determine the membership level text  
            let membershipLevelText = '';  
            if (member.membership_level === 1) {  
                membershipLevelText = 'Gold';  
            } else if (member.membership_level === 2) {  
                membershipLevelText = 'Silver';  
            } else {  
                membershipLevelText = 'Unknown';  
            }  

            // const imageUrl = "../images/abj.jpg"
            const memberCard = `  
                <div class="member-card"> 
                    <h2>${member.name}</h2>  
                    <img src=./images/${member.image} alt="${member.name}" class="member-image">  
                    <p>${member.address}</p>  
                    <p>Phone: ${member.phone}</p>  
                    <p>Website: <a href="http://${member.website}" target="_blank">${member.website}</a></p>  
                    <p>${membershipLevelText} Member</p> 
                </div>  
            `; 

            membersContainer.innerHTML += memberCard;  
        });  
    } catch (error) {  
        console.error('Error fetching members data:', error);  
        document.getElementById('members-container').innerHTML = '<p>Error loading members data.</p>';  
    }  
}  

