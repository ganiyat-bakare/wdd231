const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]


// Set the current year and last modified date  
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = ` ${currentYear}`;

let text = document.lastModified;
document.getElementById("lastModified").innerHTML = text

// Hamburger menu functionality
const mainnav = document.querySelector('.nav');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('open');
    hambutton.classList.toggle('open');
});

// Function to display courses
function displayCourses(filter) {
    const courseList = document.getElementById('course-cards');
    const totalCredits = document.getElementById('total-credits');
    const creditDisplay = document.getElementById('credit-display');
    courseList.innerHTML = '';

    let filteredCourses;
    if (filter === 'CSE') {
        filteredCourses = courses.filter(course => course.subject === 'CSE');
    } else if (filter === 'WDD') {
        filteredCourses = courses.filter(course => course.subject === 'WDD');
    } else {
        filteredCourses = courses;
    }

    const credits = filteredCourses.reduce((total, course) => total + course.credits, 0);


    filteredCourses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.className = course.completed ? 'completed' : 'not-completed';
        courseDiv.innerHTML = `<h3>${course.subject} ${course.number}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p>${course.completed ? 'Completed': 'Not Completed'}</p>`;

        // Add click event to show course details
        courseDiv.onclick = () => showCourseDetails(course);

        courseList.appendChild(courseDiv);
        // credits += course.credits;
    });

    totalCredits.textContent = credits;
}

// Function to show course details when clicked
function showCourseDetails(course) {
    const courseDialog = document.getElementById('courseDetails');
    const courseDetails = document.getElementById('courseDetails');

    // Set the dialog content
    courseDetails.innerHTML = `
    <strong>Course:</strong> ${course.subject} ${course.number}<b>
    <strong>Title:</strong> ${course.title}<b>
    <strong>Credits:</strong> ${course.credits}<b>
    <strong>Description: </strong> ${course.description}<b>
    <strong>Technology:</strong> ${course.technology.join(',')}<b>
    <strong>Completed:</strong> ${course.completed ? 'Yes' : 'No'}         
    `;

    // Show the dialog
    courseDialog.showModal();
}

// Event listener for closing the dialog
document.getElementById('closeButton').addEventListener('click', function() {
    const courseDialog = document.getElementById('courseDialog');
    courseDialog.closest();
});

// Function to filter courses based on the button clicked
function filterCourses(subject) {
    displayCourses(subject);
}

//Initial display of all courses
displayCourses('all');
