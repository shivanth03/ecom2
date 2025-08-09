// Enhanced Templates Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeTemplateFilters();
    initializeSortingAndView();
    initializeTemplateInteractions();
    initializeAnimations();
});

// Template Filter Functionality
function initializeTemplateFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const templateCards = document.querySelectorAll('.template-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter template cards
            filterTemplates(category, templateCards);
        });
    });
}

function filterTemplates(category, templateCards) {
    templateCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            // Show card with staggered animation
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            // Hide card
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Sort and View Functionality
function initializeSortingAndView() {
    const sortSelect = document.getElementById('sort-templates');
    const viewBtns = document.querySelectorAll('.view-btn');
    const templatesContainer = document.querySelector('.templates-container');
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            sortTemplates(sortValue);
        });
    }
    
    // View toggle
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const viewType = this.getAttribute('data-view');
            toggleView(viewType, templatesContainer);
        });
    });
}

function sortTemplates(sortValue) {
    const templatesContainer = document.querySelector('.templates-container');
    const templateCards = Array.from(document.querySelectorAll('.template-card'));
    
    templateCards.sort((a, b) => {
        switch(sortValue) {
            case 'newest':
                return new Date(b.dataset.date || '2024-01-01') - new Date(a.dataset.date || '2024-01-01');
                
            case 'price-low':
                const priceA = parseFloat(a.querySelector('.price-current').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.price-current').textContent.replace('$', ''));
                return priceA - priceB;
                
            case 'price-high':
                const priceA2 = parseFloat(a.querySelector('.price-current').textContent.replace('$', ''));
                const priceB2 = parseFloat(b.querySelector('.price-current').textContent.replace('$', ''));
                return priceB2 - priceA2;
                
            case 'rating':
                const ratingA = parseFloat(a.querySelector('.template-rating span').textContent);
                const ratingB = parseFloat(b.querySelector('.template-rating span').textContent);
                return ratingB - ratingA;
                
            default: // popular
                const reviewsA = parseInt(a.querySelector('.template-rating span').textContent.match(/\((\d+)/)[1]);
                const reviewsB = parseInt(b.querySelector('.template-rating span').textContent.match(/\((\d+)/)[1]);
                return reviewsB - reviewsA;
        }
    });
    
    // Clear and re-append sorted cards with animation
    templatesContainer.innerHTML = '';
    templateCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        templatesContainer.appendChild(card);
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function toggleView(viewType, container) {
    if (viewType === 'list') {
        container.classList.add('list-view');
    } else {
        container.classList.remove('list-view');
    }
}

// Template Interactions
function initializeTemplateInteractions() {
    const templateCards = document.querySelectorAll('.template-card');
    
    templateCards.forEach(card => {
        // Download/Add to Cart functionality
        const downloadBtn = card.querySelector('.download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleAddToCart(this, card);
            });
        }

        // Preview functionality - removed to prevent conflicts with modal system
        // The templates_modal.js handles all preview functionality
        
        // Card hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function handleAddToCart(button, card) {
    const templateName = card.querySelector('h4').textContent;
    const price = card.querySelector('.price-current').textContent;
    
    // Visual feedback
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    button.style.color = 'white';
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.background = '';
        button.style.color = '';
    }, 2000);
    
    // Add to cart logic (you can expand this)
    console.log(`Added to cart: ${templateName} - ${price}`);
    
    // Optional: Show toast notification
    showNotification(`${templateName} added to cart!`, 'success');
}

// handlePreview function removed to prevent conflicts with modal system
// The templates_modal.js now handles all preview functionality
/*
function handlePreview(card) {
    const templateName = card.querySelector('h4').textContent;
    const templateImage = card.querySelector('.template-image img').src;
    
    // Create preview modal (basic implementation)
    const modal = document.createElement('div');
    modal.className = 'preview-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Preview: ${templateName}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <img src="${templateImage}" alt="${templateName}" style="width: 100%; border-radius: 8px;">
                    <p>This is a preview of the ${templateName} template. Click download to get the full template.</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-btn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            document.body.removeChild(modal);
        }
    });
}
*/

// Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe template cards
    document.querySelectorAll('.template-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe other animated elements
    document.querySelectorAll('.fade-in-top, .fade-in-top-delay-1, .fade-in-top-delay-2, .fade-in-top-delay-3, .fade-in-top-delay-4').forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Stats Counter (if stats section exists)
function initializeStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const countUp = (element, target) => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    };
    
    // Trigger counter when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                countUp(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}
