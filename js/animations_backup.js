// Page Load and Animation Handler
document.addEventListener('DOMContentLoaded', function() {
    // Always start from top on page load/refresh
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    // Add animation classes to elements
    addAnimationClasses();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Ensure page loads from top
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Add animation classes to page elements
function addAnimationClasses() {
    // Hero section animation - keep it simple
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Don't add animation class to prevent conflicts
        // heroSection.classList.add('hero-animate');
    }
    
    // Header animation
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('fade-in-top');
    }
    
    // Section animations with staggered delays (skip hero)
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach((section, index) => {
        section.classList.add('section-animate');
        section.style.animationDelay = (index * 0.2) + 's';
    });
    
    // Card animations
    const cards = document.querySelectorAll('.card, .featured-book-card, .post');
    cards.forEach((card, index) => {
        card.classList.add('card-animate');
    });
    
    // Button animations - but not hero buttons
    const buttons = document.querySelectorAll('button:not(.hero button), .btn');
    buttons.forEach((button, index) => {
        button.classList.add('fade-in-top-delay-2');
    });
}

// Initialize scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-top');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.carousel .card, .news-container .post, .featured-books .featured-book-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Handle page refresh and navigation
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Override browser scroll restoration
window.addEventListener('load', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);
});

// Smooth scroll for navigation links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation to dynamic content
function animateNewContent(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(-30px)';
    
    setTimeout(() => {
        element.style.transition = 'all 0.6s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Export function for use in other scripts
window.animateNewContent = animateNewContent;
