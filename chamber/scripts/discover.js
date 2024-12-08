import {places} from '../data/places.mjs'
console.log(places);


const showPlaces = document.querySelector("#image-gallery")

function displayImages(places) {
    places.forEach(x => {
    
        const imageCard = document.createElement('div')

        const discoverImage = document.createElement('img')
        discoverImage.src = `images/${x.photo_url}`
        discoverImage.alt = x.name
        discoverImage.setAttribute('loading', 'lazy');
        imageCard.appendChild(discoverImage)

        const imageTitle = document.createElement('h2')
        imageTitle.innerText = x.name
        imageCard.appendChild(imageTitle)

        const discAddress = document.createElement('address')
        discAddress.innerText = x.address
        imageCard.appendChild(discAddress)

        const imageDesc = document.createElement('p')
        imageDesc.innerText = x.description
        imageCard.appendChild(imageDesc)

        showPlaces.appendChild(imageCard)
    })
}

displayImages(places)

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
