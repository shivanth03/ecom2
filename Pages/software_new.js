// Software Page JavaScript - Play Store & Microsoft Store Style

document.addEventListener('DOMContentLoaded', function() {
    initializeMainNavigation();
    initializeChartTabs();
    initializeCompareTool();
    initializeCategoryFilters();
    initializeSorting();
    initializeSearch();
    initializeAppModals();
    initializeScrollAnimations();
});

// Main Navigation Between Sections
function initializeMainNavigation() {
    const navTabs = document.querySelectorAll('.main-nav-tab');
    const sections = document.querySelectorAll('.software-section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all tabs and sections
            navTabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Scroll to top of section
            document.getElementById(targetSection).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Chart Tabs Functionality (Play Store Style)
function initializeChartTabs() {
    const chartTabs = document.querySelectorAll('.chart-tab');
    const chartContents = document.querySelectorAll('.chart-content');
    
    chartTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetChart = this.getAttribute('data-chart');
            
            // Remove active class from all tabs and contents
            chartTabs.forEach(t => t.classList.remove('active'));
            chartContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetChart);
            if (targetContent) {
                targetContent.classList.add('active');
                // Animate chart items
                animateChartItems(targetChart);
            }
        });
    });
}

// Compare Tool Functionality
function initializeCompareTool() {
    const compareSelect1 = document.getElementById('compareSelect1');
    const compareSelect2 = document.getElementById('compareSelect2');
    const comparisonTable = document.getElementById('comparisonTable');
    
    if (compareSelect1 && compareSelect2) {
        compareSelect1.addEventListener('change', updateComparison);
        compareSelect2.addEventListener('change', updateComparison);
    }
    
    function updateComparison() {
        const software1 = compareSelect1.value;
        const software2 = compareSelect2.value;
        
        if (software1 && software2 && software1 !== software2) {
            showComparison(software1, software2);
        } else {
            showComparePlaceholder();
        }
    }
    
    function showComparison(id1, id2) {
        const app1 = getAppData(parseInt(id1));
        const app2 = getAppData(parseInt(id2));
        
        comparisonTable.innerHTML = `
            <div class="comparison-view">
                <div class="compare-apps">
                    <div class="compare-app">
                        <img src="${app1.image}" alt="${app1.name}">
                        <h4>${app1.name}</h4>
                        <p>${app1.developer}</p>
                        <div class="compare-rating">★★★★★ ${app1.rating}</div>
                        <div class="compare-price">${app1.price === 0 ? 'FREE' : '₹' + app1.price}</div>
                    </div>
                    
                    <div class="vs-separator">VS</div>
                    
                    <div class="compare-app">
                        <img src="${app2.image}" alt="${app2.name}">
                        <h4>${app2.name}</h4>
                        <p>${app2.developer}</p>
                        <div class="compare-rating">★★★★★ ${app2.rating}</div>
                        <div class="compare-price">${app2.price === 0 ? 'FREE' : '₹' + app2.price}</div>
                    </div>
                </div>
                
                <div class="comparison-features">
                    <div class="feature-comparison">
                        <h5>Key Features Comparison</h5>
                        <div class="features-grid">
                            <div class="feature-column">
                                <h6>${app1.name}</h6>
                                ${app1.features.map(f => `<div class="feature-item">✓ ${f}</div>`).join('')}
                            </div>
                            <div class="feature-column">
                                <h6>${app2.name}</h6>
                                ${app2.features.map(f => `<div class="feature-item">✓ ${f}</div>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="comparison-actions">
                    <button class="compare-install-btn" onclick="openAppModal(${id1})">
                        Get ${app1.name}
                    </button>
                    <button class="compare-install-btn" onclick="openAppModal(${id2})">
                        Get ${app2.name}
                    </button>
                </div>
            </div>
        `;
    }
    
    function showComparePlaceholder() {
        comparisonTable.innerHTML = `
            <div class="compare-placeholder">
                <i class="fas fa-balance-scale"></i>
                <h4>Select two software to compare</h4>
                <p>Choose applications from the dropdowns above to see detailed comparison</p>
            </div>
        `;
    }
}

// Category Filters for Browse All Section
function initializeCategoryFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const softwareItems = document.querySelectorAll('.software-grid-item');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    
    function applyFilters() {
        const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
        const selectedPrice = priceFilter ? priceFilter.value : 'all';
        
        softwareItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemPrice = parseInt(item.getAttribute('data-price'));
            
            let showItem = true;
            
            // Category filter
            if (selectedCategory !== 'all' && itemCategory !== selectedCategory) {
                showItem = false;
            }
            
            // Price filter
            if (selectedPrice !== 'all') {
                switch (selectedPrice) {
                    case 'free':
                        if (itemPrice !== 0) showItem = false;
                        break;
                    case 'paid':
                        if (itemPrice === 0) showItem = false;
                        break;
                    case 'under-500':
                        if (itemPrice === 0 || itemPrice >= 500) showItem = false;
                        break;
                    case 'under-1000':
                        if (itemPrice === 0 || itemPrice >= 1000) showItem = false;
                        break;
                    case 'premium':
                        if (itemPrice < 1000) showItem = false;
                        break;
                }
            }
            
            // Apply filter
            if (showItem) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('softwareSearch');
    const softwareItems = document.querySelectorAll('.software-grid-item');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            softwareItems.forEach(item => {
                const appName = item.querySelector('h4').textContent.toLowerCase();
                const developer = item.querySelector('.developer').textContent.toLowerCase();
                const category = item.querySelector('.item-category').textContent.toLowerCase();
                
                const matches = appName.includes(searchTerm) || 
                               developer.includes(searchTerm) || 
                               category.includes(searchTerm);
                
                if (matches || searchTerm === '') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
}

// Animate chart items when switching tabs
function animateChartItems(chartId) {
    const chartItems = document.querySelectorAll(`#${chartId} .chart-item`);
    chartItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Sorting Functionality for Featured Apps
function initializeSorting() {
    const sortSelect = document.getElementById('featuredSortOptions');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortFeaturedApps(sortBy);
        });
    }
}

function sortFeaturedApps(sortBy) {
    const featuredList = document.querySelector('.featured-apps-list');
    const featuredItems = Array.from(featuredList.children);
    
    featuredItems.sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                const ratingA = parseFloat(a.getAttribute('data-rating'));
                const ratingB = parseFloat(b.getAttribute('data-rating'));
                return ratingB - ratingA;
            
            case 'price-low':
                const priceA = parseInt(a.getAttribute('data-price'));
                const priceB = parseInt(b.getAttribute('data-price'));
                return priceA - priceB;
            
            case 'price-high':
                const priceA2 = parseInt(a.getAttribute('data-price'));
                const priceB2 = parseInt(b.getAttribute('data-price'));
                return priceB2 - priceA2;
            
            case 'downloads':
                const downloadsA = parseInt(a.getAttribute('data-downloads'));
                const downloadsB = parseInt(b.getAttribute('data-downloads'));
                return downloadsB - downloadsA;
            
            default:
                return 0;
        }
    });
    
    // Animate sorting
    featuredItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });
    
    setTimeout(() => {
        featuredItems.forEach(item => {
            featuredList.appendChild(item);
        });
        
        featuredItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
}

// App Modal Functionality (Microsoft Store Style)
function initializeAppModals() {
    // Create modal HTML
    createAppModal();
    
    // Close modal events
    const modal = document.getElementById('appModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAppModal);
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeAppModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAppModal();
        }
    });
}

function createAppModal() {
    const modalHTML = `
    <div id="appModal" class="app-modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <div class="modal-app-info">
                    <img id="modalAppImage" src="" alt="" class="modal-app-image">
                    <div class="modal-app-details">
                        <h3 id="modalAppName">App Name</h3>
                        <p id="modalAppDeveloper">Developer</p>
                        <div class="modal-app-rating">
                            <div id="modalStars" class="modal-stars">★★★★★</div>
                            <span id="modalRatingText" class="modal-rating-text">4.5</span>
                            <span id="modalReviewsCount">(1.2K reviews)</span>
                        </div>
                        <div id="modalAppCategory" class="app-category">Category</div>
                        <button id="modalInstallBtn" class="modal-install-btn">
                            <i class="fas fa-download"></i> Install App
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="modal-section">
                    <h4>About this app</h4>
                    <p id="modalDescription">App description goes here...</p>
                </div>
                <div class="modal-section">
                    <h4>Key Features</h4>
                    <ul id="modalFeatures" class="feature-list">
                        <li><i class="fas fa-check"></i> Feature 1</li>
                        <li><i class="fas fa-check"></i> Feature 2</li>
                        <li><i class="fas fa-check"></i> Feature 3</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Requirements</h4>
                    <p id="modalRequirements">System requirements information...</p>
                </div>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openAppModal(appId) {
    const appData = getAppData(appId);
    const modal = document.getElementById('appModal');
    
    // Populate modal with app data
    document.getElementById('modalAppImage').src = appData.image;
    document.getElementById('modalAppImage').alt = appData.name;
    document.getElementById('modalAppName').textContent = appData.name;
    document.getElementById('modalAppDeveloper').textContent = appData.developer;
    document.getElementById('modalStars').textContent = '★'.repeat(Math.floor(appData.rating)) + '☆'.repeat(5 - Math.floor(appData.rating));
    document.getElementById('modalRatingText').textContent = appData.rating;
    document.getElementById('modalReviewsCount').textContent = `(${appData.reviews})`;
    document.getElementById('modalAppCategory').textContent = appData.category;
    document.getElementById('modalDescription').textContent = appData.description;
    document.getElementById('modalRequirements').textContent = appData.requirements;
    
    // Update features list
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    appData.features.forEach(feature => {
        featuresList.innerHTML += `<li><i class="fas fa-check"></i> ${feature}</li>`;
    });
    
    // Update install button
    const installBtn = document.getElementById('modalInstallBtn');
    if (appData.price === 0) {
        installBtn.innerHTML = '<i class="fas fa-download"></i> Install Free';
        installBtn.style.background = '#10b981';
    } else {
        installBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> Buy for ₹${appData.price}`;
        installBtn.style.background = '#007AFF';
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAppModal() {
    const modal = document.getElementById('appModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// App Data (Sample Data)
function getAppData(appId) {
    const apps = {
        1: {
            name: 'Photo Editor Pro',
            developer: 'Creative Studio Labs',
            rating: 4.8,
            reviews: '15K reviews',
            category: 'Photography & Design',
            price: 999,
            image: '../images/software 3.png',
            description: 'Professional photo editing software with AI-powered features, advanced filters, and creative tools. Transform your photos with industry-leading editing capabilities.',
            features: [
                'AI-powered photo enhancement',
                'Advanced filter library',
                'Professional editing tools',
                'Batch processing',
                'Cloud sync and backup',
                'Layer-based editing'
            ],
            requirements: 'Windows 10/11, macOS 10.15+, 4GB RAM, 2GB storage space'
        },
        2: {
            name: 'Code Master IDE',
            developer: 'DevTech Solutions',
            rating: 4.9,
            reviews: '8.2K reviews',
            category: 'Developer Tools',
            price: 0,
            image: '../images/software 4.png',
            description: 'Complete integrated development environment with syntax highlighting, debugging tools, and Git integration for modern development workflows.',
            features: [
                'Multi-language support',
                'Integrated debugging',
                'Git version control',
                'Plugin ecosystem',
                'Code completion',
                'Project management'
            ],
            requirements: 'Windows 10/11, macOS 10.14+, Linux, 2GB RAM, 1GB storage space'
        },
        3: {
            name: 'Office Suite Professional',
            developer: 'Productivity Plus',
            rating: 4.5,
            reviews: '22K reviews',
            category: 'Productivity',
            price: 0,
            image: '../images/software 5.png',
            description: 'Complete office suite with document editor, spreadsheets, presentations, and cloud synchronization for seamless productivity.',
            features: [
                'Word processor',
                'Spreadsheet application',
                'Presentation maker',
                'Cloud synchronization',
                'Real-time collaboration',
                'Template library'
            ],
            requirements: 'Windows 10/11, macOS 10.13+, 3GB RAM, 2GB storage space'
        },
        4: {
            name: 'Video Editor Pro',
            developer: 'Media Works Studio',
            rating: 4.7,
            reviews: '5.8K reviews',
            category: 'Multimedia & Design',
            price: 1499,
            image: '../images/software 6.png',
            description: 'Professional video editing software with 4K support, motion graphics, and advanced effects for content creators and professionals.',
            features: [
                '4K video editing',
                'Motion graphics',
                'Advanced effects library',
                'Audio mixing',
                'Color correction',
                'Export optimization'
            ],
            requirements: 'Windows 10/11, macOS 10.15+, 8GB RAM, 5GB storage space, Graphics card recommended'
        },
        5: {
            name: 'Security Shield Pro',
            developer: 'CyberSafe Technologies',
            rating: 4.6,
            reviews: '12K reviews',
            category: 'Security & Privacy',
            price: 699,
            image: '../images/software 7.png',
            description: 'Complete security suite with antivirus, firewall, VPN, and real-time threat protection for comprehensive digital security.',
            features: [
                'Real-time antivirus',
                'Advanced firewall',
                'Secure VPN',
                'Identity protection',
                'Safe browsing',
                'Automatic updates'
            ],
            requirements: 'Windows 10/11, macOS 10.14+, 2GB RAM, 1GB storage space'
        },
        6: {
            name: 'Project Manager Enterprise',
            developer: 'Business Solutions Inc',
            rating: 4.4,
            reviews: '3.1K reviews',
            category: 'Business & Productivity',
            price: 1999,
            image: '../images/software 8.png',
            description: 'Enterprise project management solution with team collaboration, resource planning, and comprehensive analytics for business success.',
            features: [
                'Project planning',
                'Team collaboration',
                'Resource management',
                'Time tracking',
                'Analytics dashboard',
                'Integration support'
            ],
            requirements: 'Windows 10/11, macOS 10.15+, 4GB RAM, 3GB storage space'
        }
    };
    
    return apps[appId] || apps[1];
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
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate children if they exist
                const children = entry.target.querySelectorAll('.app-card, .chart-item, .category-pill');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.fade-in-top-delay-2, .fade-in-top-delay-3');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
    
    // Observe app cards for individual animation
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Smooth Scroll for Category Pills
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add to Cart Functionality (if cart system exists)
function addToCart(appId) {
    const appData = getAppData(appId);
    
    // Show success message
    showNotification(`${appData.name} added to cart!`, 'success');
    
    // Update cart count if element exists
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#007AFF'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        transform: translateX(400px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
