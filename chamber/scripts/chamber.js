document.addEventListener("DOMContentLoaded", () => { 
    fetchMembers(); 
    loadWeatherData();  
    loadThreeDayForecast();
    loadSpotlightMembers(); 
    
    const timestampInput = document.getElementById("timestamp");
    const currentDateTime = new Date();
    // Format the timestamp as an ISO string (e.g., "2024-11-16T15:30:45.123Z")
    timestampInput.value = currentDateTime.toISOString();
});


// Membership information object  
const membershipInfo = {  
    np: {  
        title: 'Non Profit (No Fee Benefits)',  
        price: 'Free',  
        benefits: [  
            'Free entry to all chamber events',  
            'Monthly newsletters with updates',  
            'Access to networking events with local businesses'  
        ]  
    },  
    bronze: {  
        title: 'Bronze (Basic Benefits)',  
        price: '₦10,000',  
        benefits: [  
            'All NP Membership benefits',  
            '10% discount on events and workshops',  
            'Profile listing on the chamber’s website'  
        ]  
    },  
    silver: {  
        title: 'Silver (Enhanced Benefits)',  
        price: '₦20,000',  
        benefits: [  
            'All Bronze membership benefits',  
            '20% discount on events and workshops',  
            'Priority access to networking events',  
            'Monthly feature in newsletters'  
        ]  
    },  
    gold: {  
        title: 'Gold (Premium Benefits)',  
        price: '₦35,000',  
        benefits: [  
            'All Silver Membership benefits',  
            '30% discount on events and workshops',  
            'Dedicated account manager',  
            'Spotlight feature on the chamber’s website'  
        ]  
    }  
}; 

document.querySelectorAll('.membership-card').forEach(card => {  
    card.classList.add('show');  
});

// Display membership information  
function displayMembershipDetails(membershipLevel) {  
    const membershipInfoDialog = document.getElementById('membership-info');  

    // Clear previous content  
    membershipInfoDialog.innerHTML = '';  

    // Get membership details based on the selected level  
    const membership = membershipInfo[membershipLevel];  

    // Construct the dialog content  
    membershipInfoDialog.innerHTML = `  
        <button id="closeModal"> ❌</button>  
        <h2>Membership: ${membership.title}</h2>  
        <p><strong>Price:</strong> ${membership.price}</p>  
        <p><strong>Benefits:</strong></p>  
        <ul>${membership.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>  
    `;  

    membershipInfoDialog.showModal();  

    // Close modal when close button is clicked  
    const closeModal = document.getElementById('closeModal');  
    closeModal.addEventListener('click', () => {  
        membershipInfoDialog.close();  
    });  

    // Close modal when clicking outside of it  
    membershipInfoDialog.addEventListener('click', (event) => {  
        if (event.target === membershipInfoDialog) {  
            membershipInfoDialog.close();  
        }  
    });  
}  

document.addEventListener('DOMContentLoaded', () => {  
    // Add 'show' class to all membership cards for initial animation  
    document.querySelectorAll('.membership-card').forEach(card => {  
        card.classList.add('show');  

        // Add a slight delay for button appearance  
        const button = card.querySelector('a'); // Find the button inside the card  
        if (button) {  
            setTimeout(() => {  
                button.style.opacity = 1; // Make the button visible  
            }, 300);  
        }  
    });  

    // Array of color classes to rotate through  
    const colorClasses = ['color-1', 'color-2'];  
    let currentIndex = 0;  

    // Function to change card colors  
    function changeCardColors() {  
        document.querySelectorAll('.membership-card').forEach(card => {  
            // Remove the current color class  
            card.classList.remove(colorClasses[currentIndex]);  

            // Update to the next color class  
            currentIndex = (currentIndex + 1) % colorClasses.length;  
            card.classList.add(colorClasses[currentIndex]);  
        });  
    }  

    // Change colors every 30 seconds (20000 milliseconds)  
    setInterval(changeCardColors, 20000);  

    // Event listeners for membership cards  
    document.querySelectorAll('.modal-open').forEach(link => {  
        link.addEventListener('click', function(event) {  
            event.preventDefault();  
            const membershipLevel = this.closest('.membership-card').id.replace('-card', '');  
            displayMembershipDetails(membershipLevel);  
        });  
    }); 
   
    
    // Function to get URL parameters  
    function getUrlParams() {  
        const params = new URLSearchParams(window.location.search);  
        return {  
            first: params.get('first'),  
            last: params.get('last'),  
            email: params.get('email'),  
            phone: params.get('phone'),  
            businessName: params.get('business-name'),  
            timestamp: params.get('timestamp')  
        };  
    }  

    // Get the parameters from the URL  
    const formData = getUrlParams();  

    // Display the data in the corresponding HTML elements  
    document.getElementById('displayFirstName').textContent = formData.first;  
    document.getElementById('displayLastName').textContent = formData.last;  
    document.getElementById('displayEmail').textContent = formData.email;  
    document.getElementById('displayMobile').textContent = formData.phone;  
    document.getElementById('displayBusinessName').textContent = formData.businessName;  
    document.getElementById('displayTimestamp').textContent = new Date(formData.timestamp).toLocaleString();
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
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"
            alt="Weather icon representing ${capitalizeWords(data.weather[0].description)}" loading="lazy">
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
