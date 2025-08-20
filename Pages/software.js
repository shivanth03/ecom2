// Software Page JavaScript - Modern E-commerce Functionality

// Software Data
const softwareData = {
    1: {
        id: 1,
        title: "Photo Editor Pro",
        category: "Design & Graphics",
        description: "Professional photo editing software with advanced AI-powered tools, RAW support, and batch processing capabilities. Perfect for photographers and digital artists.",
        features: ["AI-Enhanced Filters", "RAW File Support", "Batch Processing", "Layer Management", "Cloud Storage", "Plugin Support"],
        currentPrice: "₹4,999",
        oldPrice: "₹7,999",
        rating: "4.6",
        reviews: "892",
        image: "../images/software 6.png",
        systemRequirements: ["Windows 10/11", "8GB RAM", "2GB Storage", "DirectX 11"]
    },
    2: {
        id: 2,
        title: "Code Master IDE",
        category: "Development",
        description: "Advanced integrated development environment with intelligent code completion, multi-language support, and seamless Git integration for professional developers.",
        features: ["Multi-Language Support", "Git Integration", "Live Debugging", "Code Completion", "Team Collaboration", "Plugin Ecosystem"],
        currentPrice: "₹9,999",
        oldPrice: "₹14,999",
        rating: "4.8",
        reviews: "1,234",
        image: "../images/software 7.png",
        systemRequirements: ["Windows/macOS/Linux", "4GB RAM", "1GB Storage", "Internet Connection"]
    },
    3: {
        id: 3,
        title: "Security Shield Pro",
        category: "Security",
        description: "Comprehensive cybersecurity solution providing real-time threat protection, VPN service, and password management for complete digital security.",
        features: ["Real-time Protection", "VPN Service", "Password Manager", "Firewall", "Safe Browsing", "Identity Protection"],
        currentPrice: "₹2,999",
        oldPrice: "₹4,999",
        rating: "4.7",
        reviews: "2,156",
        image: "../images/software 8.png",
        systemRequirements: ["Windows/macOS/Android", "2GB RAM", "500MB Storage", "Internet Connection"]
    },
    4: {
        id: 4,
        title: "Office Suite Ultimate",
        category: "Productivity",
        description: "Complete office suite with word processing, spreadsheets, presentations, and cloud storage for seamless productivity and collaboration.",
        features: ["Word Processing", "Spreadsheets", "Presentations", "Cloud Storage", "Real-time Collaboration", "Template Library"],
        currentPrice: "₹5,999",
        oldPrice: "₹8,999",
        rating: "4.5",
        reviews: "3,892",
        image: "../images/software 9.png",
        systemRequirements: ["Windows/macOS/Web", "4GB RAM", "2GB Storage", "Internet Connection"]
    },
    5: {
        id: 5,
        title: "Video Editor Pro",
        category: "Multimedia",
        description: "Professional video editing software with 4K support, advanced effects library, motion graphics, and color grading tools for content creators.",
        features: ["4K Video Support", "Motion Graphics", "Color Grading", "Audio Editing", "Effects Library", "GPU Acceleration"],
        currentPrice: "₹11,999",
        oldPrice: "₹17,999",
        rating: "4.9",
        reviews: "1,567",
        image: "../images/software 10.png",
        systemRequirements: ["Windows/macOS", "16GB RAM", "5GB Storage", "Graphics Card Required"]
    },
    6: {
        id: 6,
        title: "Project Manager Plus",
        category: "Business",
        description: "Advanced project management software with Gantt charts, team collaboration, time tracking, and comprehensive reporting for business success.",
        features: ["Gantt Charts", "Time Tracking", "Team Collaboration", "Resource Management", "Reporting", "Mobile App"],
        currentPrice: "₹7,999",
        oldPrice: "₹11,999",
        rating: "4.6",
        reviews: "987",
        image: "../images/software 2.png",
        systemRequirements: ["Windows/macOS/Web/Mobile", "4GB RAM", "1GB Storage", "Internet Connection"]
    }
};

// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sort-software');
const viewButtons = document.querySelectorAll('.view-btn');
const softwareCards = document.querySelectorAll('.software-card');
const loadMoreBtn = document.getElementById('loadMoreSoftware');
const loadingSpinner = document.getElementById('loadingSpinner');
const categoryCards = document.querySelectorAll('.category-card');
const modal = document.getElementById('softwareModal');
const modalClose = document.querySelector('.modal-close');
const previewButtons = document.querySelectorAll('.preview-btn');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeSort();
    initializeViewToggle();
    initializeCategoryCards();
    initializeModal();
    initializeLoadMore();
    addScrollAnimations();
});

// Filter Functionality
function initializeFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterSoftware(category);
        });
    });
}

function filterSoftware(category) {
    softwareCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Sort Functionality
function initializeSort() {
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortSoftware(sortBy);
        });
    }
}

function sortSoftware(sortBy) {
    const container = document.querySelector('.software-container');
    const cards = Array.from(softwareCards);
    
    cards.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return getPriceValue(a) - getPriceValue(b);
            case 'price-high':
                return getPriceValue(b) - getPriceValue(a);
            case 'rating':
                return getRatingValue(b) - getRatingValue(a);
            case 'name':
                return getSoftwareName(a).localeCompare(getSoftwareName(b));
            case 'newest':
                return Math.random() - 0.5; // Random for demo
            default: // popular
                return Math.random() - 0.5; // Random for demo
        }
    });
    
    // Re-append sorted cards
    cards.forEach(card => container.appendChild(card));
}

function getPriceValue(card) {
    const priceText = card.querySelector('.price-current').textContent;
    return parseInt(priceText.replace(/[₹,]/g, ''));
}

function getRatingValue(card) {
    const ratingText = card.querySelector('.software-rating span').textContent;
    return parseFloat(ratingText.split(' ')[0]);
}

function getSoftwareName(card) {
    return card.querySelector('h4').textContent;
}

// View Toggle Functionality
function initializeViewToggle() {
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            toggleView(view);
        });
    });
}

function toggleView(view) {
    const container = document.querySelector('.software-container');
    
    if (view === 'list') {
        container.classList.add('list-view');
        container.style.gridTemplateColumns = '1fr';
        softwareCards.forEach(card => {
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.querySelector('.software-image').style.width = '200px';
            card.querySelector('.software-image').style.height = '150px';
            card.querySelector('.software-info').style.flex = '1';
        });
    } else {
        container.classList.remove('list-view');
        container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
        softwareCards.forEach(card => {
            card.style.display = 'block';
            card.querySelector('.software-image').style.width = 'auto';
            card.querySelector('.software-image').style.height = '200px';
            card.querySelector('.software-info').style.flex = 'none';
        });
    }
}

// Category Cards Functionality
function initializeCategoryCards() {
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Scroll to filters section
            document.querySelector('.software-filters').scrollIntoView({ 
                behavior: 'smooth' 
            });
            
            // Apply filter after scroll
            setTimeout(() => {
                const filterBtn = document.querySelector(`[data-category="${category}"]`);
                if (filterBtn) {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    filterBtn.classList.add('active');
                    filterSoftware(category);
                }
            }, 800);
        });
    });
}

// Modal Functionality
function initializeModal() {
    // Open modal
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const softwareCard = this.closest('.software-card');
            const softwareId = softwareCard.getAttribute('data-software-id');
            openModal(softwareId);
        });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function openModal(softwareId) {
    const software = softwareData[softwareId];
    if (!software) return;
    
    // Populate modal content
    document.getElementById('modalTitle').textContent = software.title;
    document.getElementById('modalImage').src = software.image;
    document.getElementById('modalSoftwareTitle').textContent = software.title;
    document.getElementById('modalCategory').textContent = software.category;
    document.getElementById('modalDescription').textContent = software.description;
    document.getElementById('modalRating').textContent = `${software.rating} (${software.reviews} reviews)`;
    document.getElementById('modalCurrentPrice').textContent = software.currentPrice;
    document.getElementById('modalOldPrice').textContent = software.oldPrice;
    
    // Populate features
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    software.features.forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.className = 'feature-tag';
        featureElement.textContent = feature;
        featuresContainer.appendChild(featureElement);
    });
    
    // Populate system requirements
    const systemReqContainer = document.getElementById('modalSystemReq');
    systemReqContainer.innerHTML = '';
    software.systemRequirements.forEach(req => {
        const reqElement = document.createElement('div');
        reqElement.textContent = `• ${req}`;
        reqElement.style.color = '#6b7280';
        reqElement.style.marginBottom = '5px';
        systemReqContainer.appendChild(reqElement);
    });
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add button functionality
    document.getElementById('trialBtn').onclick = () => {
        alert(`Starting free trial for ${software.title}...`);
        closeModal();
    };
    
    document.getElementById('buyBtn').onclick = () => {
        alert(`Adding ${software.title} to cart...`);
        closeModal();
    };
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Load More Functionality
function initializeLoadMore() {
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreBtn.style.display = 'none';
            loadingSpinner.style.display = 'block';
            
            // Simulate loading
            setTimeout(() => {
                loadingSpinner.style.display = 'none';
                loadMoreBtn.style.display = 'block';
                loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> All Software Loaded';
                loadMoreBtn.disabled = true;
                loadMoreBtn.style.opacity = '0.6';
            }, 2000);
        });
    }
}

// Scroll Animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.software-card, .category-card, .featured-software-card, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Additional Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to software cards
    softwareCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.trial-btn, .demo-btn, .preview-btn, .buy-btn-modal, .trial-btn-modal');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add tooltips for system compatibility icons
    const compatibilityIcons = document.querySelectorAll('.system-compatibility i, .system-requirements i');
    compatibilityIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('title') || this.className.split('-').pop();
            tooltip.style.cssText = `
                position: absolute;
                background: #131428;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.85rem;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                transform: translateY(-100%);
                margin-top: -10px;
            `;
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        icon.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});

// Featured software buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    const featuredTrialBtns = document.querySelectorAll('.featured-software-card .trial-btn');
    const featuredDemoBtns = document.querySelectorAll('.featured-software-card .demo-btn');
    
    featuredTrialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const softwareTitle = this.closest('.featured-software-card').querySelector('h4').textContent;
            alert(`Starting free trial for ${softwareTitle}...`);
        });
    });
    
    featuredDemoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const softwareTitle = this.closest('.featured-software-card').querySelector('h4').textContent;
            alert(`Opening live demo for ${softwareTitle}...`);
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Search functionality (if search input exists)
const searchInput = document.querySelector('#software-search');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        softwareCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const category = card.querySelector('.category-tag').textContent.toLowerCase();
            const description = card.querySelector('.software-description').textContent.toLowerCase();
            
            if (title.includes(query) || category.includes(query) || description.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}
