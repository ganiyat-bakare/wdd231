document.addEventListener("DOMContentLoaded", () => {  
 // Function to set the timestamp on page load
 window.onload = function() {
    const timestampInput = document.getElementById("timestamp");
    const currentDateTime = new Date();
    // Ensure the `currentDateTime` is valid
    if (!isNaN(currentDateTime.getTime())) {
        // Format the timestamp as an ISO string (e.g., "2024-11-16T15:30:45.123Z")
        timestampInput.value = currentDateTime.toISOString();
    } else {
        console.error("Error: Invalid Date");
    }
};

    // Load event listeners for "Learn More" buttons  
    document.querySelectorAll('.modal-open').forEach(link => {  
        link.addEventListener('click', function(event) {  
            event.preventDefault(); // Prevent default link behavior  
            const benefit = this.closest('.benefit-card').id.replace('-card', ''); // Get benefit type  
            displayCommunityBenefits(benefit); // Call function to display benefits  
        });  
    });  
});  

// Membership information object  
const communityInfo = {  
    tips: {  
        title: 'Nutrition Tips',  
        benefits: [  
            'Stay informed with the latest tips on nutrition, including meal prep ideas, portion control, and mindful eating strategies.',  
            'Our commitment is to help you develop a healthy relationship with food.'  
        ]  
    },  
    support: {  
        title: 'Community Support',  
        benefits: [  
            'Engage with a network of supportive individuals who share your health journey.',  
            'Share your experiences, get advice, and find motivation in a welcoming environment.'  
        ]  
    },  
    events: {  
        title: 'Exclusive Events',  
        benefits: [  
            'Participate in special events like group workouts, cooking classes, and health fairs.',  
            'These events promote not only wellness but also social interaction.'  
        ]  
    },  
    mealplan: {  
        title: 'Personalized Meal Plans',  
        benefits: [  
            'Receive expertly designed meal plans catering to your dietary preferences and health goals.',  
            'Enjoy meals that keep you energized and savor the goodness of healthy eating.'  
        ]  
    }  
};  

// Function to display community benefits in the dialog  
function displayCommunityBenefits(benefit) {  
    const communityInfoDialog = document.getElementById('community-benefit');  

    // Clear previous content  
    communityInfoDialog.innerHTML = '';  

    // Get membership details based on the selected benefit  
    const community = communityInfo[benefit];  

    // Construct the dialog content  
    communityInfoDialog.innerHTML = `  
        <button id="closeModal"> ❌</button>  
        <h2>${community.title}</h2>  
        <ul>${community.benefits.map(b => `<li>${b}</li>`).join('')}</ul>  
    `;  

    communityInfoDialog.showModal();  

    // Close modal when close button is clicked  
    document.getElementById('closeModal').addEventListener('click', () => {  
        communityInfoDialog.close();  
    });  
} 

// Add 'show' class to all membership cards for initial animation  
document.querySelectorAll('.benefit-card').forEach(card => {  
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
    document.querySelectorAll('.benefit-card').forEach(card => {  
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
        const benefit = this.closest('.benefit-card').id.replace('-card', '');  
        displayCommunityBenefits(benefit);  
    });  
}); 


// Function to get URL parameters  
function getUrlParams() {  
    const params = new URLSearchParams(window.location.search);  
    return {  
        first: params.get('first'),  
        last: params.get('last'),  
        email: params.get('email'),    
        timestamp: params.get('timestamp')  
    };  
}  
// Get the parameters from the URL  
const formData = getUrlParams();  
// Display the data in the corresponding HTML elements  
document.getElementById('displayFirstName').textContent = formData.first;  
document.getElementById('displayLastName').textContent = formData.last;  
document.getElementById('displayEmail').textContent = formData.email;  
document.getElementById('displayTimestamp').textContent = new Date(formData.timestamp).toLocaleString();