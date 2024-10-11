document.addEventListener('DOMContentLoaded', () => {
    // Fight Log Scroll: Automatically scrolls to the most recent log entry
    const fightLogElement = document.getElementById('fight-log');
    if (fightLogElement) {
        scrollFightLog();
    }

    // Event listener for 'Simulate Another Fight' button
    const fightAgainButton = document.querySelector('.btn-fight-again');
    if (fightAgainButton) {
        fightAgainButton.addEventListener('click', () => {
            window.location.href = '/fights';  // Redirect to the fight simulation page
        });
    }

    // Mobile menu toggle for hamburger menu
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('header nav ul');
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');  // Toggle navigation visibility on mobile
            burger.classList.toggle('toggle');  // Animate the burger lines to X shape
        });
    }
});

// Function to automatically scroll the fight log to the bottom
function scrollFightLog() {
    const fightLogElement = document.getElementById('fight-log');
    if (fightLogElement) {
        fightLogElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// Optional: Form validation for creating or editing characters
const characterForm = document.getElementById('characterForm');
if (characterForm) {
    characterForm.addEventListener('submit', (event) => {
        const nameInput = document.getElementById('name');
        const universeInput = document.getElementById('universe');
        
        if (!nameInput.value || !universeInput.value) {
            event.preventDefault();  // Prevent form submission if fields are empty
            alert('Please fill in both the name and universe fields.');
        }
    });
}

const images = document.querySelectorAll('img');
images.forEach(img => {
    img.setAttribute('loading', 'lazy');
});
