// Bundle Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeBundlePage();
    initializeFilterTabs();
    initializeViewToggle();
    initializeBundleCards();
    initializeModal();
    initializeCountdownTimers();
    initializeNewsletterForm();
    initializeScrollAnimations();
});

// Initialize Bundle Page
function initializeBundlePage() {
    console.log('Bundle page initialized');
    
    // Add loading states
    const bundleCards = document.querySelectorAll('.bundle-card');
    bundleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Filter Tabs Functionality
function initializeFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const bundleCards = document.querySelectorAll('.bundle-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter bundle cards
            filterBundles(filter, bundleCards);
            
            // Show filter notification
            showFilterNotification(filter);
        });
    });
}

// Filter Bundles
function filterBundles(filter, bundleCards) {
    bundleCards.forEach(card => {
        const category = card.dataset.category;
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update results count
    const visibleCards = document.querySelectorAll('.bundle-card[style*="block"]').length;
    updateResultsCount(visibleCards);
}

// Show Filter Notification
function showFilterNotification(filter) {
    const filterNames = {
        'all': 'All Bundles',
        'bestseller': 'Best Sellers',
        'new': 'New Arrivals',
        'limited': 'Limited Time Offers'
    };
    
    const notification = document.createElement('div');
    notification.className = 'filter-notification';
    notification.innerHTML = `
        <i class="fas fa-check"></i>
        Showing ${filterNames[filter]}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease forwards';
    }, 100);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// View Toggle Functionality
function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const bundlesGrid = document.getElementById('bundlesGrid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active button
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update grid view
            if (view === 'list') {
                bundlesGrid.classList.add('list-view');
            } else {
                bundlesGrid.classList.remove('list-view');
            }
        });
    });
}

// Bundle Cards Functionality
function initializeBundleCards() {
    const bundleCards = document.querySelectorAll('.bundle-card');
    
    bundleCards.forEach(card => {
        // Add to cart functionality
        const addToCartBtn = card.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                addToCart(card);
            });
        }
        
        // Wishlist functionality
        const wishlistBtn = card.querySelector('.btn-wishlist');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', function() {
                toggleWishlist(this, card);
            });
        }
        
        // Quick view functionality
        const quickViewBtn = card.querySelector('.quick-view-btn');
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', function() {
                openBundleModal(card);
            });
        }
        
        // Category card click
        if (card.classList.contains('category-card')) {
            card.addEventListener('click', function() {
                const category = this.dataset.category;
                filterByCategory(category);
            });
        }
    });
}

// Add to Cart Function
function addToCart(bundleCard) {
    const bundleName = bundleCard.querySelector('h3').textContent;
    const bundlePrice = bundleCard.querySelector('.current-price').textContent;
    
    // Add loading state
    const btn = bundleCard.querySelector('.add-to-cart');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        btn.innerHTML = '<i class="fas fa-check"></i> Added!';
        btn.style.background = '#10b981';
        
        // Show success notification
        showNotification(`${bundleName} added to cart for ${bundlePrice}`, 'success');
        
        // Update cart count
        updateCartCount();
        
        // Reset button after 2 seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 2000);
    }, 1000);
}

// Toggle Wishlist
function toggleWishlist(btn, bundleCard) {
    const icon = btn.querySelector('i');
    const bundleName = bundleCard.querySelector('h3').textContent;
    
    if (icon.classList.contains('far')) {
        // Add to wishlist
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.style.color = '#ef4444';
        btn.style.borderColor = '#ef4444';
        showNotification(`${bundleName} added to wishlist`, 'success');
    } else {
        // Remove from wishlist
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.style.color = '';
        btn.style.borderColor = '';
        showNotification(`${bundleName} removed from wishlist`, 'info');
    }
}

// Filter by Category
function filterByCategory(category) {
    // Scroll to bundles section
    document.querySelector('.featured-bundles').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    // Update filter after scroll
    setTimeout(() => {
        const filterTab = document.querySelector(`[data-filter="${category}"]`);
        if (filterTab) {
            filterTab.click();
        }
    }, 800);
}

// Modal Functionality
function initializeModal() {
    const modal = document.getElementById('bundleModal');
    const closeBtn = modal.querySelector('.close-btn');
    const closeModal = modal.querySelector('.close-modal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const addToCartModal = modal.querySelector('.add-to-cart-modal');
    
    // Close modal events
    [closeBtn, closeModal, modalOverlay].forEach(element => {
        element.addEventListener('click', function() {
            closeBundleModal();
        });
    });
    
    // Add to cart from modal
    addToCartModal.addEventListener('click', function() {
        showNotification('Bundle added to cart!', 'success');
        closeBundleModal();
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeBundleModal();
        }
    });
}

// Open Bundle Modal
function openBundleModal(bundleCard) {
    const modal = document.getElementById('bundleModal');
    const bundleName = bundleCard.querySelector('h3').textContent;
    const bundleImage = bundleCard.querySelector('img').src;
    
    // Update modal content
    modal.querySelector('.modal-header h3').textContent = bundleName;
    modal.querySelector('.preview-image img').src = bundleImage;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.8) translateY(-50px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s ease';
        modalContent.style.transform = 'scale(1) translateY(0)';
        modalContent.style.opacity = '1';
    }, 100);
}

// Close Bundle Modal
function closeBundleModal() {
    const modal = document.getElementById('bundleModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Add exit animation
    modalContent.style.transform = 'scale(0.8) translateY(-50px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }, 300);
}

// Countdown Timers
function initializeCountdownTimers() {
    const timers = document.querySelectorAll('.countdown-timer');
    
    timers.forEach(timer => {
        updateCountdown(timer);
        setInterval(() => updateCountdown(timer), 60000); // Update every minute
    });
}

// Update Countdown
function updateCountdown(timer) {
    const timeUnits = timer.querySelectorAll('.time-value');
    const now = new Date().getTime();
    const futureTime = now + (Math.random() * 7 * 24 * 60 * 60 * 1000); // Random future time within a week
    const distance = futureTime - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    if (timeUnits.length >= 3) {
        timeUnits[0].textContent = days.toString().padStart(2, '0');
        timeUnits[1].textContent = hours.toString().padStart(2, '0');
        timeUnits[2].textContent = minutes.toString().padStart(2, '0');
    }
}

// Newsletter Form
function initializeNewsletterForm() {
    const form = document.querySelector('.email-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const submitBtn = this.querySelector('.btn-subscribe');
        const originalText = submitBtn.innerHTML;
        
        // Add loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Successfully subscribed to newsletter!', 'success');
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-header, .category-card, .benefit-card');
    animateElements.forEach(el => {
        observer.observe(el);
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });
}

// Load More Bundles
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-load-more') || e.target.closest('.btn-load-more')) {
        loadMoreBundles();
    }
});

function loadMoreBundles() {
    const loadMoreBtn = document.querySelector('.btn-load-more');
    const originalText = loadMoreBtn.innerHTML;
    
    // Add loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate loading more bundles
    setTimeout(() => {
        showNotification('More bundles loaded!', 'info');
        
        // Reset button
        loadMoreBtn.innerHTML = originalText;
        loadMoreBtn.disabled = false;
    }, 2000);
}

// Hero Buttons Functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.hero-buttons .btn-primary')) {
        // Browse bundles
        document.querySelector('.featured-bundles').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
    
    if (e.target.closest('.hero-buttons .btn-secondary')) {
        // Watch demo
        showNotification('Demo video coming soon!', 'info');
    }
});

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 4 seconds
    const autoHide = setTimeout(() => {
        hideNotification(notification);
    }, 4000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoHide);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.add('hide');
    setTimeout(() => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    }, 300);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
        
        // Add animation
        cartCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 200);
    }
}

function updateResultsCount(count) {
    let resultsInfo = document.querySelector('.results-info');
    if (!resultsInfo) {
        resultsInfo = document.createElement('div');
        resultsInfo.className = 'results-info';
        document.querySelector('.header-actions').appendChild(resultsInfo);
    }
    
    resultsInfo.textContent = `Showing ${count} bundle${count !== 1 ? 's' : ''}`;
}

// Add CSS for animations and notifications
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.hide {
        transform: translateX(100%);
    }
    
    .notification-success {
        border-left: 4px solid #10b981;
        color: #065f46;
    }
    
    .notification-error {
        border-left: 4px solid #ef4444;
        color: #991b1b;
    }
    
    .notification-warning {
        border-left: 4px solid #f59e0b;
        color: #92400e;
    }
    
    .notification-info {
        border-left: 4px solid #3b82f6;
        color: #1e40af;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        opacity: 0.7;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .filter-notification {
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%) translateX(100%);
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
        z-index: 1001;
    }
    
    @keyframes slideInRight {
        to { transform: translateY(-50%) translateX(0); }
    }
    
    @keyframes slideOutRight {
        to { transform: translateY(-50%) translateX(100%); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .list-view {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .list-view .bundle-card {
        display: grid;
        grid-template-columns: 250px 1fr;
        max-width: none;
    }
    
    .list-view .bundle-image {
        height: 200px;
    }
    
    .results-info {
        color: #6b7280;
        font-size: 0.9rem;
        font-weight: 500;
    }
`;

document.head.appendChild(style);
