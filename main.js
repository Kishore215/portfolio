import './style.css'

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Select elements to animate and apply class
document.querySelectorAll('.section').forEach(section => {
  section.classList.add('fade-in-section');
  observer.observe(section);
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-list');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}
