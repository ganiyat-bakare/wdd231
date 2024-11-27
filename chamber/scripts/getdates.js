
// Set copyright year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Set last modified date
const lastModifiedElement = document.getElementById("lastModified");
lastModifiedElement.innerHTML = document.lastModified;
