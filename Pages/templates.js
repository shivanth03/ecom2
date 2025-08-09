// Templates Page JavaScript - E-Commerce Templates Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeTemplateFilters();
    initializeStatsCounter();
    initializeTemplateAnimations();
    initializeTemplateInteractions();
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
    templateCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            // Show card with animation
            card.classList.remove('hidden');
            card.classList.add('show');
            setTimeout(() => {
                card.style.display = 'block';
            }, 50);
        } else {
            // Hide card with animation
            card.classList.add('hidden');
            card.classList.remove('show');
            setTimeout(() => {
                if (card.classList.contains('hidden')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Add stagger animation to visible cards
    const visibleCards = document.querySelectorAll('.template-card.show');
    visibleCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

// Stats Counter Animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.template-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with commas for large numbers
            const displayNumber = Math.floor(current).toLocaleString();
            stat.textContent = displayNumber;
            
            // Add percentage sign for satisfaction rate
            if (target === 99) {
                stat.textContent = Math.floor(current) + '%';
            }
        }, 16);
    });
}

// Template Animations on Scroll
function initializeTemplateAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-top, .fade-in-top-delay-1, .fade-in-top-delay-2, .fade-in-top-delay-3, .fade-in-top-delay-4, .fade-in-top-delay-5');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease-out';
        
        observer.observe(element);
    });
}

// Template Card Interactions
function initializeTemplateInteractions() {
    // Preview button functionality
    const previewButtons = document.querySelectorAll('.preview-btn');
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const templateCard = this.closest('.template-card');
            const templateName = templateCard.querySelector('h4').textContent;
            
            // Create modal or redirect to preview
            showTemplatePreview(templateName);
        });
    });

    // Download button functionality
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const templateCard = this.closest('.template-card');
            const templateName = templateCard.querySelector('h4').textContent;
            
            // Simulate download process
            initiateTemplateDownload(templateName);
        });
    });

    // Template card click interaction
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            const templateName = this.querySelector('h4').textContent;
            showTemplateDetails(templateName);
        });
    });

    // Hero buttons functionality
    const heroBrowseBtn = document.querySelector('.templates-hero .primary-btn');
    if (heroBrowseBtn) {
        heroBrowseBtn.addEventListener('click', function() {
            // Smooth scroll to templates section
            const templatesSection = document.querySelector('.templates-section');
            if (templatesSection) {
                templatesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    const heroWatchBtn = document.querySelector('.templates-hero .secondary-btn');
    if (heroWatchBtn) {
        heroWatchBtn.addEventListener('click', function() {
            // Open demo video modal or redirect
            showDemoVideo();
        });
    }
}

// Template Preview Modal
function showTemplatePreview(templateName) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'template-preview-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Template Preview: ${templateName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="preview-iframe-container">
                    <div class="preview-placeholder">
                        <i class="fas fa-desktop"></i>
                        <h4>Live Preview</h4>
                        <p>Interactive preview of ${templateName} template</p>
                        <div class="preview-features">
                            <span class="feature-badge">Responsive</span>
                            <span class="feature-badge">Interactive</span>
                            <span class="feature-badge">Full Preview</span>
                        </div>
                        <button class="start-preview-btn">
                            <i class="fas fa-play"></i> Start Preview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = `
        .template-preview-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        .modal-content {
            background: white;
            border-radius: 15px;
            width: 90%;
            max-width: 900px;
            max-height: 90%;
            overflow: hidden;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        .modal-body {
            padding: 20px;
            height: 500px;
        }
        .preview-iframe-container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f9fa;
            border-radius: 10px;
        }
        .preview-placeholder {
            text-align: center;
            color: #666;
        }
        .preview-placeholder i {
            font-size: 4rem;
            color: #6c5dd4;
            margin-bottom: 1rem;
        }
        .preview-features {
            margin: 1rem 0;
        }
        .feature-badge {
            background: rgba(108, 93, 212, 0.1);
            color: #6c5dd4;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 12px;
            margin: 0 4px;
        }
        .start-preview-btn {
            background: linear-gradient(135deg, #6c5dd4, #7c3aed);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            margin-top: 1rem;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;

    // Add styles to head
    const style = document.createElement('style');
    style.textContent = modalStyles;
    document.head.appendChild(style);

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });

    // Start preview button
    const startBtn = modal.querySelector('.start-preview-btn');
    startBtn.addEventListener('click', () => {
        alert('Opening live preview in new tab...');
        // Here you would open the actual preview
    });
}

// Template Download Simulation
function initiateTemplateDownload(templateName) {
    // Create download notification
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-download"></i>
            <div class="notification-text">
                <h4>Downloading ${templateName}</h4>
                <p>Your download will start shortly...</p>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add notification styles
    const notificationStyles = `
        .download-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            border-left: 4px solid #6c5dd4;
            min-width: 320px;
        }
        .notification-content {
            display: flex;
            align-items: center;
            padding: 20px;
            gap: 15px;
        }
        .notification-text h4 {
            margin: 0 0 5px 0;
            color: #131428;
            font-size: 14px;
        }
        .notification-text p {
            margin: 0 0 10px 0;
            color: #666;
            font-size: 12px;
        }
        .progress-bar {
            width: 200px;
            height: 4px;
            background: #eee;
            border-radius: 2px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(135deg, #6c5dd4, #7c3aed);
            width: 0%;
            animation: fillProgress 3s ease-out forwards;
        }
        .notification-close {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #999;
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fillProgress {
            to { width: 100%; }
        }
    `;

    const style = document.createElement('style');
    style.textContent = notificationStyles;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
            style.remove();
        }
    }, 4000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
        style.remove();
    });
}

// Show Template Details
function showTemplateDetails(templateName) {
    console.log(`Showing details for: ${templateName}`);
    // Here you could navigate to a detailed template page
    // or show a detailed modal with more information
}

// Show Demo Video
function showDemoVideo() {
    alert('Demo video functionality would be implemented here!');
    // Here you could open a video modal or navigate to demo page
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation for template images
document.addEventListener('DOMContentLoaded', function() {
    const templateImages = document.querySelectorAll('.template-image img');
    
    templateImages.forEach(img => {
        if (!img.complete) {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
});

// Search functionality (if search input is added)
function initializeTemplateSearch() {
    const searchInput = document.querySelector('#template-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const templateCards = document.querySelectorAll('.template-card');
            
            templateCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const features = Array.from(card.querySelectorAll('.feature-tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
                
                if (title.includes(query) || description.includes(query) || features.includes(query)) {
                    card.style.display = 'block';
                    card.classList.add('show');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('show');
                }
            });
        });
    }
}