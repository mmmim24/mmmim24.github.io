// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('back-to-top');
const navbar = document.getElementById('navbar');

// Theme Toggle
const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? '' : 'dark';

    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update icon
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
};

// Initialize theme
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.querySelector('i').className = 'fas fa-sun';
        }
    }
};

// Mobile Navigation Toggle
const toggleNav = () => {
    navLinks.classList.toggle('show');
};

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('show');

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button
const handleScroll = () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    // Add shadow to navbar when scrolled
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 2px 10px var(--shadow-color)';
    } else {
        navbar.style.boxShadow = 'none';
    }
};

// Section Reveal Animation
const revealSections = () => {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Initialize section animations
const initSectionAnimations = () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
};

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
navToggle.addEventListener('click', toggleNav);
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
window.addEventListener('scroll', handleScroll);
window.addEventListener('scroll', revealSections);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSectionAnimations();
    handleScroll();
    revealSections();
});