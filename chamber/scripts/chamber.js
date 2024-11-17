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
        let membership_level = document.createElement('level')

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


        // const card = document.createElement('div');
        // card.className = 'card';
        // card.innerHTML = `<img src="images/${member.image}" alt="${member.name}">
        // <h3>${member.name}</h3>
        // <p>${member.address}</p>
        // <p>${member.phone}</p>
        // <a href="${member.website}" target="_blank"> Visit Website</a>`;

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

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}


// Set the current year and last modified date  
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = ` ${currentYear}`;

let text = document.lastModified;
document.getElementById("lastModified").innerHTML = text




// document.getElementById('gridView').addEventListener('click', () => {  
//     cards.classList.remove('list');  
//     cards.classList.add('grid');  
// });  

// document.getElementById('listView').addEventListener('click', () => {  
//     cards.classList.remove('grid');  
//     cards.classList.add('list');  
// });  

fetchMembers();