// Hamburger functionality
const hamburgerElement = document.querySelector('#ham');
const navElement = document.querySelector('#animate');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
})


// Set copyright year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Set last modified date
const lastModifiedElement = document.getElementById("lastModified");
lastModifiedElement.innerHTML = document.lastModified;
