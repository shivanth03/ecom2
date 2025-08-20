// Software Categories Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize All Software Showcase
    initializeShowcase();
    
    // Category card click handlers
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Filter software by category (if browse section exists)
            filterSoftwareByCategory(category);
            
            // Scroll to software showcase
            const showcaseSection = document.getElementById('all-software-showcase');
            if (showcaseSection) {
                showcaseSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Add hover effect enhancements
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// Initialize All Software Showcase
function initializeShowcase() {
    const showcaseContainer = document.querySelector('.all-apps-showcase');
    if (!showcaseContainer) return;
    
    // Sample software data (merged from free and featured apps)
    const allSoftware = [
        {
            id: 1,
            name: "Photo Editor Pro",
            developer: "Creative Studio Labs",
            category: "Photography & Design",
            rating: 4.8,
            reviews: "15K",
            price: 0,
            image: "../images/software 3.png",
            type: "free",
            featured: false,
            rank: 1
        },
        {
            id: 2,
            name: "Code Master IDE",
            developer: "DevTech Solutions",
            category: "Developer Tools",
            rating: 4.9,
            reviews: "8.2K",
            price: 0,
            image: "../images/software 4.png",
            type: "free",
            featured: true,
            badge: "Free Premium",
            rank: 2
        },
        {
            id: 3,
            name: "Office Suite Professional",
            developer: "Productivity Plus",
            category: "Productivity",
            rating: 4.5,
            reviews: "22K",
            price: 0,
            image: "../images/software 5.png",
            type: "free",
            featured: false,
            rank: 3
        },
        {
            id: 4,
            name: "Video Editor Pro",
            developer: "Media Works Studio",
            category: "Video & Multimedia",
            rating: 4.7,
            reviews: "5.8K",
            price: 1499,
            image: "../images/software 6.png",
            type: "premium",
            featured: true,
            badge: "Premium Pro",
            rank: 4
        },
        {
            id: 5,
            name: "Security Shield Pro",
            developer: "CyberSafe Technologies",
            category: "Security & Privacy",
            rating: 4.6,
            reviews: "12K",
            price: 699,
            image: "../images/software 7.png",
            type: "premium",
            featured: true,
            badge: "Security Choice",
            rank: 5
        },
        {
            id: 6,
            name: "AI Assistant Pro",
            developer: "AI Technologies",
            category: "Productivity & AI",
            rating: 4.7,
            reviews: "3.4K",
            price: 0,
            image: "../images/software 9.png",
            type: "free",
            featured: false,
            rank: 6
        }
    ];
    
    // Render initial apps
    renderShowcaseApps(allSoftware, showcaseContainer);
    
    // Setup showcase controls
    setupShowcaseControls(allSoftware, showcaseContainer);
    
    // Setup load more functionality
    setupLoadMore();
}

// Render showcase apps
function renderShowcaseApps(apps, container) {
    container.innerHTML = '';
    
    apps.forEach(app => {
        const appElement = createAppShowcaseItem(app);
        container.appendChild(appElement);
    });
}

// Create individual app showcase item
function createAppShowcaseItem(app) {
    const item = document.createElement('div');
    item.className = `app-showcase-item ${app.type}-app ${app.featured ? 'featured-app' : ''}`;
    item.setAttribute('data-rating', app.rating);
    item.setAttribute('data-price', app.price);
    item.setAttribute('data-downloads', app.reviews.replace('K', '000').replace('.', ''));
    
    const badgeHtml = app.featured && app.badge ? 
        `<div class="featured-badge ${app.type === 'free' ? 'free-featured' : 'premium-featured'}">
            <i class="fas fa-${app.badge.includes('Security') ? 'shield-alt' : app.badge.includes('Premium') ? 'star' : 'gift'}"></i>
            ${app.badge}
        </div>` : 
        app.price === 0 ? '<div class="free-badge">FREE</div>' : '';
    
    item.innerHTML = `
        <div class="app-rank">${app.rank}</div>
        <div class="app-image">
            <img src="${app.image}" alt="${app.name}">
            ${badgeHtml}
        </div>
        <div class="app-info">
            <h4>${app.name}</h4>
            <p class="developer">${app.developer}</p>
            <div class="app-category-tag ${app.featured ? 'featured-tag' : ''}">${app.category}</div>
            <div class="app-rating">
                <span class="rating">${app.rating}</span>
                <div class="stars">★★★★★</div>
                <span class="reviews">(${app.reviews})${app.featured ? ' • ' + app.badge : ''}</span>
            </div>
        </div>
        ${app.price > 0 ? 
            `<div class="app-actions">
                <div class="app-price-display">₹${app.price.toLocaleString()}</div>
                <button class="install-btn premium" onclick="openAppModal(${app.id})">
                    <i class="fas fa-download"></i>
                    Get App
                </button>
            </div>` :
            `<button class="install-btn free" onclick="openAppModal(${app.id})">Install Free</button>`
        }
    `;
    
    return item;
}

// Setup showcase controls
function setupShowcaseControls(allApps, container) {
    // Showcase tabs
    const showcaseTabs = document.querySelectorAll('.showcase-tab');
    showcaseTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            showcaseTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterShowcaseApps(allApps, container, filter);
        });
    });
    
    // Sort options
    const sortSelect = document.getElementById('showcaseSortOptions');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const currentFilter = document.querySelector('.showcase-tab.active')?.getAttribute('data-filter') || 'all';
            const filteredApps = filterAppsByType(allApps, currentFilter);
            const sortedApps = sortApps(filteredApps, sortBy);
            renderShowcaseApps(sortedApps, container);
        });
    }
}

// Filter showcase apps by type
function filterShowcaseApps(allApps, container, filter) {
    const filteredApps = filterAppsByType(allApps, filter);
    renderShowcaseApps(filteredApps, container);
}

// Filter apps by type helper
function filterAppsByType(apps, filter) {
    switch(filter) {
        case 'free':
            return apps.filter(app => app.price === 0);
        case 'premium':
            return apps.filter(app => app.price > 0);
        case 'featured':
            return apps.filter(app => app.featured);
        default:
            return apps;
    }
}

// Sort apps helper
function sortApps(apps, sortBy) {
    const sortedApps = [...apps];
    
    switch(sortBy) {
        case 'rating':
            return sortedApps.sort((a, b) => b.rating - a.rating);
        case 'price-low':
            return sortedApps.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sortedApps.sort((a, b) => b.price - a.price);
        case 'downloads':
            return sortedApps.sort((a, b) => {
                const aDownloads = parseInt(a.reviews.replace('K', '000').replace('.', ''));
                const bDownloads = parseInt(b.reviews.replace('K', '000').replace('.', ''));
                return bDownloads - aDownloads;
            });
        default:
            return sortedApps;
    }
}

// Setup load more functionality
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreShowcase');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show additional items
            const additionalItems = document.getElementById('additionalShowcaseItems');
            if (additionalItems) {
                additionalItems.style.display = 'contents';
                this.style.display = 'none';
            }
        });
    }
}

// Filter software by category
function filterSoftwareByCategory(category) {
    // Update filter tabs if they exist
    const filterTabs = document.querySelectorAll('.filter-tab, .showcase-tab');
    filterTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // If there's a specific category tab, activate it
    const categoryTab = document.querySelector(`[data-filter="${category}"]`);
    if (categoryTab) {
        categoryTab.classList.add('active');
    } else {
        // Default to 'all' if category doesn't exist
        const allTab = document.querySelector('[data-filter="all"]');
        if (allTab) {
            allTab.classList.add('active');
        }
    }
}
        if (allTab) allTab.classList.add('active');
    }
    
    // Filter software items
    const softwareItems = document.querySelectorAll('.software-grid-item');
    softwareItems.forEach(item => {
        const itemCategory = item.dataset.category;
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show notification
    showCategoryNotification(category);
}

// Show category filter notification
function showCategoryNotification(category) {
    const categoryNames = {
        'productivity': 'Productivity',
        'design': 'Design & Graphics', 
        'development': 'Development',
        'multimedia': 'Multimedia',
        'security': 'Security',
        'games': 'Games',
        'all': 'All Categories'
    };
    
    const notification = document.createElement('div');
    notification.className = 'category-notification';
    notification.innerHTML = `
        <i class="fas fa-filter"></i>
        Showing ${categoryNames[category] || category} software
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
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
`;
document.head.appendChild(style); - Premium Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedFeatures();
    initializeSearchEnhancements();
    initializeAnimations();
    initializeTooltips();
    initializeKeyboardShortcuts();
    initializeWhyChooseSection();
    initializeBrowseAllSoftware();
    initializeFeaturedApps();
    initializeEnhancedSearch();
});

// Initialize Why Choose Us Section
function initializeWhyChooseSection() {
    // Initialize scroll-triggered animations
    initializeWhyChooseAnimations();
    
    // Initialize counter animations
    initializeCounterAnimations();
    
    // Initialize interactive features
    initializeFeatureCardInteractions();
    
    // Initialize parallax effects
    initializeParallaxEffects();
}

// Why Choose Us Scroll Animations
function initializeWhyChooseAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate feature cards
                const featureCards = entry.target.querySelectorAll('.feature-card');
                featureCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 200);
                });
                
                // Animate stats
                const statNumbers = entry.target.querySelectorAll('.stat-number-enhanced');
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        animateCounter(stat);
                    }, 1000 + index * 300);
                });
                
                // Animate header
                const header = entry.target.querySelector('.why-choose-header');
                if (header) {
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);
    
    const whyChooseSection = document.querySelector('.why-choose-us');
    if (whyChooseSection) {
        // Set initial state
        const featureCards = whyChooseSection.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.9)';
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        const header = whyChooseSection.querySelector('.why-choose-header');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(30px)';
            header.style.transition = 'all 0.8s ease';
        }
        
        observer.observe(whyChooseSection);
    }
}

// Enhanced Counter Animation
function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const hasStar = text.includes('★');
    const hasK = text.includes('K');
    
    let targetValue = 0;
    let suffix = '';
    
    if (hasPercent) {
        targetValue = parseFloat(text);
        suffix = '%';
    } else if (hasStar) {
        targetValue = parseFloat(text);
        suffix = '★';
    } else if (hasK) {
        targetValue = parseFloat(text.replace('K+', '')) * 1000;
        suffix = 'K+';
    } else {
        targetValue = parseInt(text.replace(/[^0-9]/g, ''));
        suffix = hasPlus ? '+' : '';
    }
    
    let currentValue = 0;
    const duration = 2500;
    const increment = targetValue / (duration / 50);
    
    element.classList.add('counter-animated');
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        let displayValue;
        if (hasPercent) {
            displayValue = currentValue.toFixed(1) + '%';
        } else if (hasStar) {
            displayValue = currentValue.toFixed(1) + '★';
        } else if (hasK) {
            displayValue = (currentValue / 1000).toFixed(0) + 'K+';
        } else {
            displayValue = Math.floor(currentValue) + suffix;
        }
        
        element.textContent = displayValue;
    }, 50);
}

// Feature Card Interactions
function initializeFeatureCardInteractions() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            
            // Ripple effect on hover
            createFeatureCardRipple(this);
            
            // Animate icon
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotateY(180deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset icon
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotateY(0deg)';
            }
        });
        
        // Click interactions
        card.addEventListener('click', function() {
            showFeatureDetails(this, index);
        });
        
        // Add subtle pulse animation
        setTimeout(() => {
            card.style.animation = `pulse 3s ease-in-out infinite ${index * 0.5}s`;
        }, 2000);
    });
}

// Create Feature Card Ripple Effect
function createFeatureCardRipple(card) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        animation: featureRipple 1s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    card.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
    
    // Add ripple animation if not exists
    if (!document.querySelector('#feature-ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'feature-ripple-styles';
        style.textContent = `
            @keyframes featureRipple {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Show Feature Details Modal
function showFeatureDetails(card, index) {
    const featureData = {
        0: {
            title: "Instant Download",
            details: "Experience lightning-fast downloads with our CDN network. Get your software instantly with secure license keys and comprehensive installation guides.",
            benefits: ["Zero wait time", "Secure delivery", "Step-by-step guides", "Automatic updates"]
        },
        1: {
            title: "100% Safe & Secure",
            details: "All software undergoes rigorous security testing. We provide digital certificates and guarantee virus-free, authentic applications.",
            benefits: ["Virus-free guarantee", "Digital certificates", "Verified publishers", "Security scans"]
        },
        2: {
            title: "Lifetime Updates",
            details: "Receive free updates, patches, and security fixes for the lifetime of your software license with priority support access.",
            benefits: ["Free updates", "Security patches", "New features", "Priority support"]
        },
        3: {
            title: "24/7 Expert Support",
            details: "Professional technical support available around the clock through live chat, email, and phone assistance from certified experts.",
            benefits: ["Live chat support", "Email assistance", "Phone support", "Expert technicians"]
        },
        4: {
            title: "Money-Back Guarantee",
            details: "30-day money-back guarantee on all purchases. If you're not satisfied, get a full refund with no questions asked.",
            benefits: ["30-day guarantee", "Full refund", "No questions asked", "Easy process"]
        },
        5: {
            title: "Premium Quality",
            details: "Carefully curated collection of the highest-rated software from trusted developers and established companies worldwide.",
            benefits: ["Curated collection", "Trusted developers", "High ratings", "Quality assurance"]
        }
    };
    
    const feature = featureData[index];
    if (!feature) return;
    
    const modal = document.createElement('div');
    modal.className = 'feature-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="feature-modal-content" style="
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            position: relative;
            animation: slideInUp 0.4s ease;
        ">
            <button class="close-feature-modal" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #64748b;
            ">&times;</button>
            
            <div style="
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                color: white;
                font-size: 2rem;
            ">
                ${card.querySelector('.feature-icon').innerHTML}
            </div>
            
            <h3 style="margin-bottom: 15px; color: #1e293b; font-size: 1.5rem;">${feature.title}</h3>
            <p style="color: #64748b; margin-bottom: 25px; line-height: 1.6;">${feature.details}</p>
            
            <div style="text-align: left; margin-bottom: 25px;">
                <h4 style="color: #1e293b; margin-bottom: 15px; font-size: 1.1rem;">Key Benefits:</h4>
                <ul style="list-style: none; padding: 0;">
                    ${feature.benefits.map(benefit => `
                        <li style="
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            margin-bottom: 8px;
                            color: #64748b;
                        ">
                            <i class="fas fa-check-circle" style="color: #10b981;"></i>
                            ${benefit}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <button style="
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                Learn More
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    modal.querySelector('.close-feature-modal').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

// Parallax Effects
function initializeParallaxEffects() {
    const whyChooseSection = document.querySelector('.why-choose-us');
    if (!whyChooseSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sectionTop = whyChooseSection.offsetTop;
        const sectionHeight = whyChooseSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Check if section is in viewport
        if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            const progress = (scrolled + windowHeight - sectionTop) / (sectionHeight + windowHeight);
            const translateY = (progress - 0.5) * 50;
            
            // Apply parallax to background elements
            const before = whyChooseSection.querySelector('::before');
            whyChooseSection.style.setProperty('--parallax-y', `${translateY}px`);
        }
    });
}

// Initialize Enhanced Features
function initializeEnhancedFeatures() {
    // Enhanced chart tabs with smooth transitions
    initializeModernTabs();
    
    // Enhanced search with real-time filtering
    initializeRealTimeSearch();
    
    // Enhanced load more with pagination
    initializeSmartLoadMore();
    
    // Enhanced app interactions
    initializeAppInteractions();
    
    // Performance monitoring
    initializePerformanceTracking();
}

// Modern Tabs with Enhanced UX
function initializeModernTabs() {
    const tabs = document.querySelectorAll('.modern-tab');
    const contents = document.querySelectorAll('.chart-content');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            const targetChart = this.getAttribute('data-chart');
            
            // Remove active states
            tabs.forEach(t => {
                t.classList.remove('active');
                t.style.transform = 'scale(1)';
            });
            contents.forEach(c => {
                c.classList.remove('active');
                c.style.opacity = '0';
            });
            
            // Add active state with animation
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show target content with fade effect
            const targetContent = document.getElementById(targetChart);
            if (targetContent) {
                setTimeout(() => {
                    targetContent.classList.add('active');
                    targetContent.style.opacity = '1';
                    animateChartItemsEnhanced(targetChart);
                }, 200);
            }
            
            // Update URL without reload
            if (history.pushState) {
                const newUrl = window.location.protocol + "//" + window.location.host + 
                              window.location.pathname + '?tab=' + targetChart;
                window.history.pushState({path: newUrl}, '', newUrl);
            }
        });
    });
    
    // Initialize based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('tab');
    if (activeTab) {
        const tabElement = document.querySelector(`[data-chart="${activeTab}"]`);
        if (tabElement) {
            tabElement.click();
        }
    }
}

// Enhanced Chart Items Animation
function animateChartItemsEnhanced(chartId) {
    const chartItems = document.querySelectorAll(`#${chartId} .chart-item`);
    
    chartItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.95)';
        item.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
            
            // Add hover glow effect
            item.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.15)';
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                this.style.transform = 'translateY(0) scale(1)';
            });
            
        }, index * 100);
    });
}

// Enhanced Search with Real-time Suggestions
function initializeRealTimeSearch() {
    const searchInput = document.getElementById('softwareSearch');
    const searchSuggestions = createSearchSuggestions();
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.toLowerCase().trim();
            
            searchTimeout = setTimeout(() => {
                if (query.length > 0) {
                    showSearchSuggestions(query, searchSuggestions);
                    highlightSearchResults(query);
                } else {
                    hideSearchSuggestions(searchSuggestions);
                    clearSearchHighlights();
                }
            }, 300);
        });
        
        searchInput.addEventListener('focus', function() {
            if (this.value.length > 0) {
                showSearchSuggestions(this.value.toLowerCase(), searchSuggestions);
            }
        });
        
        searchInput.addEventListener('blur', function() {
            setTimeout(() => hideSearchSuggestions(searchSuggestions), 200);
        });
    }
}

// Create Search Suggestions Container
function createSearchSuggestions() {
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    suggestionsContainer.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 2px solid #e2e8f0;
        border-top: none;
        border-radius: 0 0 16px 16px;
        max-height: 300px;
        overflow-y: auto;
        z-index: 1000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        display: none;
    `;
    
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.appendChild(suggestionsContainer);
    }
    
    return suggestionsContainer;
}

// Enhanced App Interactions
function initializeAppInteractions() {
    const chartItems = document.querySelectorAll('.chart-item');
    
    chartItems.forEach(item => {
        // Add ripple effect on click
        item.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
        
        // Add enhanced hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.15)';
            
            // Animate app icon
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            
            // Reset app icon
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Create Ripple Effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Load More Functionality
function initializeSmartLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreCharts');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading Premium Software...';
            
            // Simulate API call
            setTimeout(() => {
                loadAdditionalContent();
                
                // Success state
                this.innerHTML = '<i class="fas fa-check"></i> More Software Loaded!';
                this.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
                
                setTimeout(() => {
                    this.style.display = 'none';
                    showLoadingComplete();
                }, 2000);
                
            }, 1500);
        });
    }
}

// Load Additional Content
function loadAdditionalContent() {
    const sections = ['top-free', 'top-paid', 'trending', 'new-releases'];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            addMoreAppsToSection(section, sectionId);
        }
    });
}

// Add More Apps to Section
function addMoreAppsToSection(section, sectionId) {
    const additionalApps = generateAdditionalApps(sectionId);
    
    additionalApps.forEach((app, index) => {
        const appElement = createEnhancedAppElement(app, sectionId);
        appElement.style.opacity = '0';
        appElement.style.transform = 'translateY(30px)';
        
        section.appendChild(appElement);
        
        setTimeout(() => {
            appElement.style.transition = 'all 0.5s ease';
            appElement.style.opacity = '1';
            appElement.style.transform = 'translateY(0)';
            initializeAppInteractions(); // Re-initialize interactions
        }, index * 150);
    });
}

// Generate Additional Apps
function generateAdditionalApps(sectionId) {
    const apps = {
        'top-free': [
            { name: 'Media Player Pro', dev: 'AudioTech', rating: 4.7, category: 'Multimedia', price: 'FREE' },
            { name: 'Note Keeper', dev: 'ProductivityCorp', rating: 4.5, category: 'Productivity', price: 'FREE' }
        ],
        'top-paid': [
            { name: 'Business Analytics', dev: 'DataViz Inc', rating: 4.8, category: 'Business', price: '₹3,499' },
            { name: 'Creative Suite', dev: 'DesignStudio', rating: 4.9, category: 'Design', price: '₹5,999' }
        ],
        'trending': [
            { name: 'AI Assistant', dev: 'FutureTech', rating: 4.6, category: 'AI & ML', price: '₹1,999' },
            { name: 'Cloud Backup Pro', dev: 'CloudSafe', rating: 4.4, category: 'Utility', price: 'FREE' }
        ],
        'new-releases': [
            { name: 'Game Engine 2024', dev: 'GameDev Studios', rating: 4.3, category: 'Development', price: '₹4,999' },
            { name: 'Social Manager', dev: 'SocialTech', rating: 4.5, category: 'Social Media', price: '₹899' }
        ]
    };
    
    return apps[sectionId] || [];
}

// Create Enhanced App Element
function createEnhancedAppElement(app, sectionId) {
    const appElement = document.createElement('div');
    appElement.className = 'chart-item';
    
    const isFree = app.price === 'FREE';
    const buttonClass = isFree ? 'free' : 'price';
    const rankIcon = sectionId === 'trending' ? '<i class="fas fa-fire"></i>' : 
                    sectionId === 'new-releases' ? '<i class="fas fa-star"></i>' : '●';
    
    appElement.innerHTML = `
        <div class="chart-rank ${sectionId === 'trending' ? 'trending' : sectionId === 'new-releases' ? 'new' : ''}">
            ${rankIcon}
        </div>
        <div class="chart-app-info">
            <img src="../images/software ${Math.floor(Math.random() * 10) + 1}.png" alt="${app.name}">
            <div class="app-details">
                <h4>${app.name}</h4>
                <p>${app.dev}</p>
                <div class="app-category-tag">${app.category}</div>
                <div class="app-rating">
                    <span class="rating">${app.rating}</span>
                    <div class="stars">★★★★★</div>
                    <span class="reviews">(${Math.floor(Math.random() * 5000) + 100})</span>
                </div>
            </div>
        </div>
        <button class="install-btn ${buttonClass}" onclick="openAppModal(${Math.floor(Math.random() * 20) + 1})">
            ${app.price}
        </button>
    `;
    
    return appElement;
}

// Show Loading Complete Message
function showLoadingComplete() {
    const container = document.querySelector('.load-more-container');
    if (container) {
        container.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
                color: white;
                padding: 20px 40px;
                border-radius: 16px;
                display: inline-flex;
                align-items: center;
                gap: 12px;
                font-weight: 600;
                box-shadow: 0 10px 25px rgba(67, 233, 123, 0.3);
            ">
                <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
                <span>Successfully loaded 8+ premium software across all categories!</span>
            </div>
        `;
    }
}

// Initialize Enhanced Search
function initializeSearchEnhancements() {
    const searchInput = document.getElementById('softwareSearch');
    
    if (searchInput) {
        // Add search shortcuts
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performAdvancedSearch(this.value);
            }
            if (e.key === 'Escape') {
                this.blur();
                clearSearchHighlights();
            }
        });
        
        // Add voice search (if supported)
        if ('webkitSpeechRecognition' in window) {
            addVoiceSearchButton(searchInput);
        }
    }
}

// Initialize Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animation for chart items
                if (entry.target.classList.contains('chart-item')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatedElements = document.querySelectorAll('.chart-item, .modern-tab, .section-header');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize Tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

// Initialize Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('softwareSearch');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Number keys for tab switching
        if (e.key >= '1' && e.key <= '4' && !e.ctrlKey && !e.metaKey) {
            const tabs = document.querySelectorAll('.modern-tab');
            const tabIndex = parseInt(e.key) - 1;
            if (tabs[tabIndex]) {
                tabs[tabIndex].click();
            }
        }
    });
}

// Initialize Performance Tracking
function initializePerformanceTracking() {
    // Track page load performance
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Software Store loaded in ${loadTime.toFixed(2)}ms`);
        
        // Show performance indicator for fast loads
        if (loadTime < 2000) {
            showPerformanceIndicator('Fast Load', 'success');
        }
    });
}

// Show Performance Indicator
function showPerformanceIndicator(message, type) {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#43e97b' : '#667eea'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.3s ease;
    `;
    indicator.textContent = message;
    
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.opacity = '1';
        indicator.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translateY(50px)';
        setTimeout(() => indicator.remove(), 300);
    }, 3000);
}

// Export functions for global use
window.softwareEnhanced = {
    animateChartItemsEnhanced,
    createRippleEffect,
    showPerformanceIndicator
};

// Browse All Software Section Functionality
function initializeBrowseAllSoftware() {
    initializeSoftwareSearch();
    initializeSoftwareFilters();
    initializeSoftwareGrid();
    initializeLoadMore();
    initializeWishlist();
    initializeQuickActions();
}

// Software Search Functionality
function initializeSoftwareSearch() {
    const searchInput = document.getElementById('softwareSearch');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterSoftwareItems(searchTerm, 'search');
        }, 300);
    });
    
    // Add search animations
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
}

// Software Filter Functionality
function initializeSoftwareFilters() {
    initializeCategoryFilter();
    initializePriceFilter();
}

function initializeCategoryFilter() {
    const categoryBtn = document.getElementById('categoryFilterBtn');
    if (!categoryBtn) return;
    
    const categories = ['all', 'design', 'development', 'productivity', 'multimedia', 'security', 'business'];
    let currentCategory = 'all';
    
    // Create dropdown menu
    const dropdown = createFilterDropdown(categories.map(cat => ({
        value: cat,
        label: cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)
    })));
    
    categoryBtn.parentElement.appendChild(dropdown);
    
    categoryBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown(dropdown);
    });
    
    dropdown.addEventListener('click', function(e) {
        if (e.target.dataset.value) {
            currentCategory = e.target.dataset.value;
            updateFilterButton(categoryBtn, e.target.textContent);
            filterSoftwareItems(currentCategory, 'category');
            closeDropdown(dropdown);
        }
    });
}

function initializePriceFilter() {
    const priceBtn = document.getElementById('priceFilterBtn');
    if (!priceBtn) return;
    
    const priceRanges = [
        { value: 'all', label: 'All Prices' },
        { value: 'free', label: 'Free' },
        { value: 'under500', label: 'Under ₹500' },
        { value: 'under1000', label: 'Under ₹1,000' },
        { value: 'under2000', label: 'Under ₹2,000' },
        { value: 'premium', label: 'Premium (₹2,000+)' }
    ];
    
    let currentPriceRange = 'all';
    
    const dropdown = createFilterDropdown(priceRanges);
    priceBtn.parentElement.appendChild(dropdown);
    
    priceBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown(dropdown);
    });
    
    dropdown.addEventListener('click', function(e) {
        if (e.target.dataset.value) {
            currentPriceRange = e.target.dataset.value;
            updateFilterButton(priceBtn, e.target.textContent);
            filterSoftwareItems(currentPriceRange, 'price');
            closeDropdown(dropdown);
        }
    });
}

// Filter Helper Functions
function createFilterDropdown(options) {
    const dropdown = document.createElement('div');
    dropdown.className = 'filter-dropdown-menu';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        margin-top: 5px;
    `;
    
    options.forEach(option => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.textContent = option.label;
        item.dataset.value = option.value;
        item.style.cssText = `
            padding: 12px 16px;
            cursor: pointer;
            transition: background-color 0.2s ease;
            border-radius: 8px;
            margin: 4px;
        `;
        
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f1f5f9';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        dropdown.appendChild(item);
    });
    
    return dropdown;
}

function toggleDropdown(dropdown) {
    const isVisible = dropdown.style.visibility === 'visible';
    
    if (isVisible) {
        closeDropdown(dropdown);
    } else {
        openDropdown(dropdown);
    }
}

function openDropdown(dropdown) {
    // Close other dropdowns
    document.querySelectorAll('.filter-dropdown-menu').forEach(menu => {
        if (menu !== dropdown) closeDropdown(menu);
    });
    
    dropdown.style.visibility = 'visible';
    dropdown.style.opacity = '1';
    dropdown.style.transform = 'translateY(0)';
}

function closeDropdown(dropdown) {
    dropdown.style.visibility = 'hidden';
    dropdown.style.opacity = '0';
    dropdown.style.transform = 'translateY(-10px)';
}

function updateFilterButton(button, text) {
    const span = button.querySelector('span');
    if (span) {
        span.textContent = text;
        button.classList.add('active');
        
        setTimeout(() => {
            button.classList.remove('active');
        }, 300);
    }
}

// Software Filtering Logic
function filterSoftwareItems(filterValue, filterType) {
    const softwareItems = document.querySelectorAll('.software-grid-item');
    let visibleCount = 0;
    
    softwareItems.forEach(item => {
        let shouldShow = true;
        
        if (filterType === 'search') {
            const title = item.querySelector('h4').textContent.toLowerCase();
            const developer = item.querySelector('.developer').textContent.toLowerCase();
            const category = item.querySelector('.item-category').textContent.toLowerCase();
            
            shouldShow = filterValue === '' || 
                        title.includes(filterValue) || 
                        developer.includes(filterValue) || 
                        category.includes(filterValue);
        } else if (filterType === 'category') {
            const itemCategory = item.dataset.category;
            shouldShow = filterValue === 'all' || itemCategory === filterValue;
        } else if (filterType === 'price') {
            const itemPrice = parseInt(item.dataset.price) || 0;
            
            switch(filterValue) {
                case 'all':
                    shouldShow = true;
                    break;
                case 'free':
                    shouldShow = itemPrice === 0;
                    break;
                case 'under500':
                    shouldShow = itemPrice > 0 && itemPrice < 500;
                    break;
                case 'under1000':
                    shouldShow = itemPrice > 0 && itemPrice < 1000;
                    break;
                case 'under2000':
                    shouldShow = itemPrice > 0 && itemPrice < 2000;
                    break;
                case 'premium':
                    shouldShow = itemPrice >= 2000;
                    break;
            }
        }
        
        if (shouldShow) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease forwards';
            visibleCount++;
        } else {
            item.style.animation = 'fadeOutDown 0.3s ease forwards';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
    
    // Show/hide no results message
    showNoResultsMessage(visibleCount === 0);
}

function showNoResultsMessage(show) {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (show && !noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #64748b;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3 style="margin-bottom: 10px; color: #1e293b;">No software found</h3>
                <p>Try adjusting your search terms or filters</p>
            </div>
        `;
        document.querySelector('.all-software-grid').parentElement.appendChild(noResultsMsg);
    } else if (!show && noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Software Grid Animations
function initializeSoftwareGrid() {
    const softwareItems = document.querySelectorAll('.software-grid-item');
    
    // Add entrance animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    softwareItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Load More Functionality
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreSoftware');
    if (!loadMoreBtn) return;
    
    let isLoading = false;
    
    loadMoreBtn.addEventListener('click', function() {
        if (isLoading) return;
        
        isLoading = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        this.disabled = true;
        
        // Simulate loading new software items
        setTimeout(() => {
            addMoreSoftwareItems();
            isLoading = false;
            this.innerHTML = '<i class="fas fa-plus"></i> Load More Software';
            this.disabled = false;
        }, 1500);
    });
}

function addMoreSoftwareItems() {
    const grid = document.querySelector('.all-software-grid');
    const newItems = generateAdditionalSoftwareItems();
    
    newItems.forEach((itemHTML, index) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = itemHTML;
        const softwareItem = itemElement.firstElementChild;
        
        // Add entrance animation
        softwareItem.style.opacity = '0';
        softwareItem.style.transform = 'translateY(30px)';
        
        grid.appendChild(softwareItem);
        
        setTimeout(() => {
            softwareItem.style.opacity = '1';
            softwareItem.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

function generateAdditionalSoftwareItems() {
    return [
        `<div class="software-grid-item" data-category="design" data-price="799" data-rating="4.5">
            <div class="software-item-image">
                <img src="../images/software 9.png" alt="Design Pro">
                <div class="quick-actions">
                    <button class="quick-view"><i class="fas fa-eye"></i></button>
                    <button class="add-wishlist"><i class="fas fa-heart"></i></button>
                </div>
            </div>
            <div class="software-item-info">
                <h4>Design Pro Suite</h4>
                <p class="developer">Creative Labs</p>
                <div class="item-rating">
                    <div class="stars">★★★★☆</div>
                    <span>4.5 (2.3K)</span>
                </div>
                <div class="item-category">Design & Graphics</div>
                <div class="item-footer">
                    <div class="item-price">₹799</div>
                    <button class="item-install-btn">Get</button>
                </div>
            </div>
        </div>`,
        // Add more items as needed
    ];
}

// Wishlist Functionality
function initializeWishlist() {
    let wishlist = JSON.parse(localStorage.getItem('softwareWishlist') || '[]');
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-wishlist')) {
            const button = e.target.closest('.add-wishlist');
            const softwareItem = button.closest('.software-grid-item');
            const softwareTitle = softwareItem.querySelector('h4').textContent;
            
            toggleWishlist(button, softwareTitle);
        }
    });
    
    function toggleWishlist(button, title) {
        const isInWishlist = wishlist.includes(title);
        
        if (isInWishlist) {
            wishlist = wishlist.filter(item => item !== title);
            button.style.color = '#64748b';
            showNotification('Removed from wishlist', 'info');
        } else {
            wishlist.push(title);
            button.style.color = '#ef4444';
            showNotification('Added to wishlist', 'success');
        }
        
        localStorage.setItem('softwareWishlist', JSON.stringify(wishlist));
        updateWishlistUI();
    }
    
    function updateWishlistUI() {
        document.querySelectorAll('.add-wishlist').forEach(button => {
            const softwareItem = button.closest('.software-grid-item');
            const title = softwareItem.querySelector('h4').textContent;
            
            if (wishlist.includes(title)) {
                button.style.color = '#ef4444';
            }
        });
    }
    
    updateWishlistUI();
}

// Quick Actions
function initializeQuickActions() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.quick-view')) {
            const button = e.target.closest('.quick-view');
            const softwareItem = button.closest('.software-grid-item');
            showQuickView(softwareItem);
        }
    });
}

function showQuickView(softwareItem) {
    const title = softwareItem.querySelector('h4').textContent;
    const developer = softwareItem.querySelector('.developer').textContent;
    const price = softwareItem.querySelector('.item-price').textContent;
    const category = softwareItem.querySelector('.item-category').textContent;
    const rating = softwareItem.querySelector('.item-rating span').textContent;
    
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="quick-view-content">
            <button class="close-modal">&times;</button>
            <h3>${title}</h3>
            <p class="developer">${developer}</p>
            <div class="quick-view-details">
                <div class="detail-item">
                    <strong>Price:</strong> ${price}
                </div>
                <div class="detail-item">
                    <strong>Category:</strong> ${category}
                </div>
                <div class="detail-item">
                    <strong>Rating:</strong> ${rating}
                </div>
            </div>
            <div class="quick-view-actions">
                <button class="btn-primary">Get Software</button>
                <button class="btn-secondary">Add to Wishlist</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            closeQuickView(modal);
        }
    });
}

function closeQuickView(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 
          type === 'error' ? 'background: #ef4444;' : 'background: #3b82f6;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close dropdowns when clicking outside
document.addEventListener('click', function() {
    document.querySelectorAll('.filter-dropdown-menu').forEach(closeDropdown);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
    
    .quick-view-content {
        background: white;
        padding: 30px;
        border-radius: 16px;
        max-width: 500px;
        width: 90%;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .quick-view-modal[style*="opacity: 1"] .quick-view-content {
        transform: scale(1);
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #64748b;
    }
    
    .quick-view-details {
        margin: 20px 0;
    }
    
    .detail-item {
        margin: 10px 0;
        padding: 8px 0;
        border-bottom: 1px solid #f1f5f9;
    }
    
    .quick-view-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    
    .btn-primary, .btn-secondary {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .btn-primary {
        background: #3b82f6;
        color: white;
    }
    
    .btn-primary:hover {
        background: #2563eb;
    }
    
    .btn-secondary {
        background: #f1f5f9;
        color: #64748b;
    }
    
    .btn-secondary:hover {
        background: #e2e8f0;
    }
`;

document.head.appendChild(style);

// Featured Apps Section Functionality
function initializeFeaturedApps() {
    initializeFeaturedSorting();
    initializeFeaturedAnimations();
    initializeFeaturedInteractions();
}

// Featured Apps Sorting
function initializeFeaturedSorting() {
    const sortSelect = document.getElementById('featuredSortOptions');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        sortFeaturedApps(sortValue);
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

function sortFeaturedApps(sortBy) {
    const featuredList = document.querySelector('.featured-apps-list');
    const featuredItems = Array.from(document.querySelectorAll('.featured-item'));
    
    if (!featuredList || featuredItems.length === 0) return;
    
    let sortedItems;
    
    switch(sortBy) {
        case 'rating':
            sortedItems = featuredItems.sort((a, b) => {
                const ratingA = parseFloat(a.dataset.rating);
                const ratingB = parseFloat(b.dataset.rating);
                return ratingB - ratingA;
            });
            break;
            
        case 'price-low':
            sortedItems = featuredItems.sort((a, b) => {
                const priceA = parseInt(a.dataset.price) || 0;
                const priceB = parseInt(b.dataset.price) || 0;
                return priceA - priceB;
            });
            break;
            
        case 'price-high':
            sortedItems = featuredItems.sort((a, b) => {
                const priceA = parseInt(a.dataset.price) || 0;
                const priceB = parseInt(b.dataset.price) || 0;
                return priceB - priceA;
            });
            break;
            
        case 'downloads':
            sortedItems = featuredItems.sort((a, b) => {
                const downloadsA = parseInt(a.dataset.downloads) || 0;
                const downloadsB = parseInt(b.dataset.downloads) || 0;
                return downloadsB - downloadsA;
            });
            break;
            
        default:
            sortedItems = featuredItems;
    }
    
    // Simple re-append without animations
    featuredList.innerHTML = '';
    sortedItems.forEach(item => {
        featuredList.appendChild(item);
    });
    
    showSortingIndicator(sortBy);
}

function showSortingIndicator(sortType) {
    const indicator = document.createElement('div');
    indicator.className = 'sorting-indicator';
    indicator.innerHTML = `
        <i class="fas fa-sort"></i>
        Sorted by ${getSortDisplayName(sortType)}
    `;
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        display: flex;
        align-items: center;
        gap: 8px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        indicator.style.transform = 'translateX(100%)';
        setTimeout(() => indicator.remove(), 300);
    }, 2500);
}

function getSortDisplayName(sortType) {
    const names = {
        'rating': 'Rating',
        'price-low': 'Price (Low to High)',
        'price-high': 'Price (High to Low)',
        'downloads': 'Downloads'
    };
    return names[sortType] || 'Default';
}

// Featured Apps Animations (Simplified)
function initializeFeaturedAnimations() {
    // Simple fade-in without complex animations
    const featuredItems = document.querySelectorAll('.featured-item');
    featuredItems.forEach(item => {
        item.style.opacity = '1';
    });
}

// Featured Apps Interactions
function initializeFeaturedInteractions() {
    initializePriceDisplayInteractions();
    initializeInstallButtonInteractions();
    initializeAppImageInteractions();
}

function initializePriceDisplayInteractions() {
    // Removed complex price display animations for simplicity
}

function initializeInstallButtonInteractions() {
    const installButtons = document.querySelectorAll('.install-btn');
    
    installButtons.forEach(button => {
        button.addEventListener('click', function() {
            showInstallFeedback(this);
        });
    });
}

function initializeAppImageInteractions() {
    // Removed complex image preview for simplicity
}

function showImagePreview(img) {
    const modal = document.createElement('div');
    modal.className = 'image-preview-modal';
    modal.innerHTML = `
        <div class="image-preview-content">
            <button class="close-preview">&times;</button>
            <img src="${img.src}" alt="${img.alt}">
            <div class="image-info">
                <h4>${img.alt}</h4>
                <p>App Icon Preview</p>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-preview')) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

function showInstallFeedback(button) {
    const originalText = button.innerHTML;
    const isSecure = button.classList.contains('security');
    const isFree = button.classList.contains('free');
    
    if (isSecure) {
        button.innerHTML = '<i class="fas fa-shield-check"></i> Securing...';
    } else if (isFree) {
        button.innerHTML = '<i class="fas fa-download"></i> Installing...';
    } else {
        button.innerHTML = '<i class="fas fa-credit-card"></i> Processing...';
    }
    
    button.disabled = true;
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Success!';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.opacity = '1';
            button.style.background = '';
        }, 2000);
    }, 1500);
}

// Add CSS for image preview
const imagePreviewStyle = document.createElement('style');
imagePreviewStyle.textContent = `
    .image-preview-content {
        background: white;
        padding: 20px;
        border-radius: 16px;
        text-align: center;
        position: relative;
        max-width: 400px;
        width: 90%;
    }
    
    .image-preview-content img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 16px;
        margin-bottom: 15px;
        border: 3px solid #f1f5f9;
    }
    
    .close-preview {
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #64748b;
    }
    
    .image-info h4 {
        margin: 0 0 5px 0;
        color: #1e293b;
        font-size: 1.2rem;
    }
    
    .image-info p {
        margin: 0;
        color: #64748b;
        font-size: 0.9rem;
    }
`;

document.head.appendChild(imagePreviewStyle);

// Enhanced Search and Trending Functionality
function initializeEnhancedSearch() {
    initializeMainSearch();
    initializeFilterTabs();
    initializeTrendingItems();
    initializeSearchSuggestions();
}

// Main Search Functionality
function initializeMainSearch() {
    const searchInput = document.getElementById('mainSoftwareSearch');
    const searchClearBtn = document.getElementById('searchClearBtn');
    const searchWrapper = document.querySelector('.search-input-wrapper');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    // Add focus animations
    searchInput.addEventListener('focus', function() {
        searchWrapper.classList.add('search-focused');
        this.placeholder = 'Type to search apps, games, tools...';
    });
    
    searchInput.addEventListener('blur', function() {
        searchWrapper.classList.remove('search-focused');
        this.placeholder = 'Search software, games, tools...';
    });
    
    // Search input handling
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.trim();
        
        // Show/hide clear button with animation
        if (searchTerm.length > 0) {
            searchClearBtn.style.display = 'flex';
            searchClearBtn.style.animation = 'fadeInScale 0.3s ease';
        } else {
            searchClearBtn.style.animation = 'fadeOutScale 0.3s ease';
            setTimeout(() => {
                if (searchInput.value.trim().length === 0) {
                    searchClearBtn.style.display = 'none';
                }
            }, 300);
        }
        
        // Add typing indicator
        searchWrapper.classList.add('typing');
        clearTimeout(searchTimeout);
        
        // Debounced search
        searchTimeout = setTimeout(() => {
            searchWrapper.classList.remove('typing');
            performEnhancedSearch(searchTerm);
            updateSearchSuggestions(searchTerm);
        }, 300);
    });
    
    // Clear search with animation
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', function() {
            searchInput.value = '';
            this.style.animation = 'bounceOut 0.3s ease';
            performEnhancedSearch('');
            hideSearchSuggestions();
            searchInput.focus();
            
            // Show clear feedback
            showSearchClearFeedback();
            
            setTimeout(() => {
                this.style.display = 'none';
                this.style.animation = '';
            }, 300);
        });
    }
    
    // Enhanced search on Enter
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = e.target.value.trim();
            
            // Add search animation
            searchWrapper.classList.add('searching');
            
            setTimeout(() => {
                searchWrapper.classList.remove('searching');
                performEnhancedSearch(searchTerm);
                hideSearchSuggestions();
                showSearchFeedback(searchTerm);
            }, 500);
        }
        
        // Handle arrow keys for suggestion navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            navigateSuggestions(e.key === 'ArrowDown' ? 'down' : 'up');
        }
        
        if (e.key === 'Escape') {
            hideSearchSuggestions();
            this.blur();
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-search-container')) {
            hideSearchSuggestions();
        }
    });
}

function showSearchClearFeedback() {
    const feedback = document.createElement('div');
    feedback.className = 'search-clear-feedback';
    feedback.innerHTML = `
        <i class="fas fa-broom"></i>
        Search cleared
    `;
    
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #64748b, #475569);
        color: white;
        padding: 10px 16px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 6px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        feedback.style.transform = 'translateX(100%)';
        setTimeout(() => feedback.remove(), 300);
    }, 1500);
}

function navigateSuggestions(direction) {
    const suggestions = document.querySelectorAll('.suggestion-item');
    if (suggestions.length === 0) return;
    
    const currentActive = document.querySelector('.suggestion-item.keyboard-active');
    let newActiveIndex = 0;
    
    if (currentActive) {
        currentActive.classList.remove('keyboard-active');
        const currentIndex = Array.from(suggestions).indexOf(currentActive);
        
        if (direction === 'down') {
            newActiveIndex = currentIndex < suggestions.length - 1 ? currentIndex + 1 : 0;
        } else {
            newActiveIndex = currentIndex > 0 ? currentIndex - 1 : suggestions.length - 1;
        }
    }
    
    suggestions[newActiveIndex].classList.add('keyboard-active');
    suggestions[newActiveIndex].scrollIntoView({ block: 'nearest' });
    
    // Add visual feedback
    suggestions[newActiveIndex].style.animation = 'keyboardHighlight 0.3s ease';
}

function performEnhancedSearch(searchTerm) {
    const softwareItems = document.querySelectorAll('.software-grid-item');
    let visibleCount = 0;
    
    softwareItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const developer = item.querySelector('.developer').textContent.toLowerCase();
        const category = item.querySelector('.item-category').textContent.toLowerCase();
        
        const matchesSearch = searchTerm === '' || 
            title.includes(searchTerm.toLowerCase()) ||
            developer.includes(searchTerm.toLowerCase()) ||
            category.includes(searchTerm.toLowerCase());
        
        if (matchesSearch) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease forwards';
            visibleCount++;
            
            // Highlight search terms
            if (searchTerm.length > 0) {
                highlightSearchTerms(item, searchTerm);
            } else {
                removeHighlights(item);
            }
        } else {
            item.style.display = 'none';
        }
    });
    
    // Update results count
    updateSearchResultsCount(visibleCount, searchTerm);
}

function highlightSearchTerms(item, searchTerm) {
    const titleElement = item.querySelector('h4');
    const developerElement = item.querySelector('.developer');
    
    [titleElement, developerElement].forEach(element => {
        const originalText = element.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const highlightedText = originalText.replace(regex, '<span class="search-highlight">$1</span>');
        element.innerHTML = highlightedText;
    });
}

function removeHighlights(item) {
    const highlightedElements = item.querySelectorAll('.search-highlight');
    highlightedElements.forEach(element => {
        element.outerHTML = element.textContent;
    });
}

function updateSearchResultsCount(count, searchTerm) {
    let resultsBadge = document.getElementById('searchResultsBadge');
    
    if (!resultsBadge) {
        resultsBadge = document.createElement('div');
        resultsBadge.id = 'searchResultsBadge';
        resultsBadge.style.cssText = `
            text-align: center;
            margin: 20px 0;
            padding: 10px 20px;
            background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
            border-radius: 15px;
            font-size: 0.9rem;
            color: #64748b;
            transition: all 0.3s ease;
        `;
        
        const softwareGrid = document.querySelector('.all-software-grid');
        if (softwareGrid) {
            softwareGrid.parentNode.insertBefore(resultsBadge, softwareGrid);
        }
    }
    
    if (searchTerm.length > 0) {
        resultsBadge.innerHTML = `
            <i class="fas fa-search"></i>
            Found <strong>${count}</strong> results for "<strong>${searchTerm}</strong>"
        `;
        resultsBadge.style.display = 'block';
    } else {
        resultsBadge.style.display = 'none';
    }
}

function showSearchFeedback(searchTerm) {
    if (!searchTerm) return;
    
    const feedback = document.createElement('div');
    feedback.className = 'search-feedback';
    feedback.innerHTML = `
        <i class="fas fa-search"></i>
        Searching for "${searchTerm}"
    `;
    
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 8px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        feedback.style.transform = 'translateX(100%)';
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

// Filter Tabs Functionality
function initializeFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Apply filter
            const filterType = this.dataset.filter;
            applyFilterTab(filterType);
            
            // Show feedback
            showFilterFeedback(filterType);
        });
    });
}

function applyFilterTab(filterType) {
    const softwareItems = document.querySelectorAll('.software-grid-item');
    let visibleCount = 0;
    
    softwareItems.forEach(item => {
        const price = parseInt(item.dataset.price) || 0;
        const isNew = item.hasAttribute('data-new') || Math.random() < 0.3; // Simulate new items
        
        let shouldShow = false;
        
        switch(filterType) {
            case 'all':
                shouldShow = true;
                break;
            case 'free':
                shouldShow = price === 0;
                break;
            case 'premium':
                shouldShow = price > 0;
                break;
            case 'new':
                shouldShow = isNew;
                break;
        }
        
        if (shouldShow) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease forwards';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    updateFilterResultsCount(visibleCount, filterType);
}

function updateFilterResultsCount(count, filterType) {
    let resultsBadge = document.getElementById('searchResultsBadge');
    
    if (!resultsBadge) {
        resultsBadge = document.createElement('div');
        resultsBadge.id = 'searchResultsBadge';
        resultsBadge.style.cssText = `
            text-align: center;
            margin: 20px 0;
            padding: 10px 20px;
            background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
            border-radius: 15px;
            font-size: 0.9rem;
            color: #64748b;
            transition: all 0.3s ease;
        `;
        
        const softwareGrid = document.querySelector('.all-software-grid');
        if (softwareGrid) {
            softwareGrid.parentNode.insertBefore(resultsBadge, softwareGrid);
        }
    }
    
    const filterLabels = {
        'all': 'All Software',
        'free': 'Free Software',
        'premium': 'Premium Software',
        'new': 'New Software'
    };
    
    if (filterType !== 'all') {
        resultsBadge.innerHTML = `
            <i class="fas fa-filter"></i>
            Showing <strong>${count}</strong> ${filterLabels[filterType]} applications
        `;
        resultsBadge.style.display = 'block';
    } else {
        resultsBadge.style.display = 'none';
    }
}

function showFilterFeedback(filterType) {
    const filterLabels = {
        'all': 'All Software',
        'free': 'Free Software',
        'premium': 'Premium Software',
        'new': 'New Software'
    };
    
    const feedback = document.createElement('div');
    feedback.className = 'filter-feedback';
    feedback.innerHTML = `
        <i class="fas fa-filter"></i>
        Filtering: ${filterLabels[filterType]}
    `;
    
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 8px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        feedback.style.transform = 'translateX(100%)';
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

// Trending Items Functionality
function initializeTrendingItems() {
    const trendingItems = document.querySelectorAll('.trending-item');
    
    trendingItems.forEach(item => {
        item.addEventListener('click', function() {
            const searchTerm = this.dataset.search;
            const searchInput = document.getElementById('mainSoftwareSearch');
            
            if (searchInput && searchTerm) {
                searchInput.value = searchTerm;
                performEnhancedSearch(searchTerm);
                showTrendingFeedback(searchTerm);
                
                // Scroll to results
                const softwareGrid = document.querySelector('.all-software-grid');
                if (softwareGrid) {
                    softwareGrid.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
        
        // Add hover animation
        item.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease';
        });
    });
}

function showTrendingFeedback(searchTerm) {
    const feedback = document.createElement('div');
    feedback.className = 'trending-feedback';
    feedback.innerHTML = `
        <i class="fas fa-fire"></i>
        Trending search: "${searchTerm}"
    `;
    
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #f97316, #ea580c);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 8px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        feedback.style.transform = 'translateX(100%)';
        setTimeout(() => feedback.remove(), 300);
    }, 2500);
}

// Search Suggestions Functionality
function initializeSearchSuggestions() {
    const searchInput = document.getElementById('mainSoftwareSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('focus', function() {
        if (this.value.trim().length > 0) {
            updateSearchSuggestions(this.value.trim());
        }
    });
}

function updateSearchSuggestions(searchTerm) {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (!suggestionsContainer || searchTerm.length < 2) {
        hideSearchSuggestions();
        return;
    }
    
    // Add searching state
    const searchWrapper = document.querySelector('.search-input-wrapper');
    searchWrapper.classList.add('searching');
    
    // Simulate API delay
    setTimeout(() => {
        searchWrapper.classList.remove('searching');
        
        // Enhanced suggestions data with full app details
        const suggestions = [
            {
                id: 1,
                name: 'Photo Editor Pro',
                developer: 'Creative Studio Labs',
                category: 'Photography & Design',
                rating: 4.6,
                reviewCount: '15K',
                price: 0,
                isFree: true,
                image: '../images/software 3.png',
                badges: ['trending']
            },
            {
                id: 2,
                name: 'Code Master IDE',
                developer: 'DevTools Inc',
                category: 'Development Tools',
                rating: 4.9,
                reviewCount: '23K',
                price: 1999,
                isFree: false,
                image: '../images/software 4.png',
                badges: ['popular']
            },
            {
                id: 3,
                name: 'Office Suite',
                developer: 'Productivity Corp',
                category: 'Office & Business',
                rating: 4.4,
                reviewCount: '45K',
                price: 0,
                isFree: true,
                image: '../images/software 5.png',
                badges: ['free']
            },
            {
                id: 4,
                name: 'Video Editor Plus',
                developer: 'Media Works',
                category: 'Video & Audio',
                rating: 4.7,
                reviewCount: '18K',
                price: 2999,
                isFree: false,
                image: '../images/software 6.png',
                badges: []
            },
            {
                id: 5,
                name: 'Security Shield',
                developer: 'SecureTech',
                category: 'Security & Privacy',
                rating: 4.5,
                reviewCount: '12K',
                price: 1499,
                isFree: false,
                image: '../images/software 7.png',
                badges: []
            },
            {
                id: 6,
                name: 'Design Studio',
                developer: 'Creative Labs',
                category: 'Design & Graphics',
                rating: 4.8,
                reviewCount: '20K',
                price: 2499,
                isFree: false,
                image: '../images/software 2.png',
                badges: ['trending']
            }
        ].filter(suggestion => 
            suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            suggestion.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            suggestion.category.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 6);
        
        if (suggestions.length > 0) {
            const suggestionsHTML = `
                <div class="suggestions-header">
                    <i class="fas fa-search"></i>
                    Search results for "${searchTerm}"
                </div>
                ${suggestions.map(app => createSuggestionHTML(app, searchTerm)).join('')}
            `;
            
            suggestionsContainer.innerHTML = suggestionsHTML;
            
            // Add click handlers
            suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    const appName = this.dataset.appName;
                    const searchInput = document.getElementById('mainSoftwareSearch');
                    searchInput.value = appName;
                    performEnhancedSearch(appName);
                    hideSearchSuggestions();
                    showSearchFeedback(appName);
                });
                
                // Add view button click handler
                const viewBtn = item.querySelector('.suggestion-view-btn');
                if (viewBtn) {
                    viewBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const appId = item.dataset.appId;
                        openAppDetails(appId);
                    });
                }
            });
            
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.innerHTML = `
                <div class="no-suggestions">
                    <i class="fas fa-search"></i>
                    No applications found for "${searchTerm}"
                </div>
            `;
            suggestionsContainer.style.display = 'block';
        }
    }, 300);
}

function createSuggestionHTML(app, searchTerm) {
    const highlightedName = highlightText(app.name, searchTerm);
    const highlightedDeveloper = highlightText(app.developer, searchTerm);
    const highlightedCategory = highlightText(app.category, searchTerm);
    
    const badgeHTML = app.badges.map(badge => {
        const badgeConfig = {
            trending: { icon: 'fas fa-fire', text: 'Trending', class: 'suggestion-trending-badge' },
            popular: { icon: 'fas fa-star', text: 'Popular', class: 'suggestion-popular-badge' },
            free: { icon: 'fas fa-gift', text: 'Free', class: 'suggestion-free-badge' }
        };
        
        const config = badgeConfig[badge];
        if (config) {
            return `<div class="${config.class}"><i class="${config.icon}"></i>${config.text}</div>`;
        }
        return '';
    }).join('');
    
    const stars = '★'.repeat(5);
    const priceDisplay = app.isFree ? 'FREE' : `₹${app.price}`;
    const priceBadgeClass = app.isFree ? '' : 'paid';
    
    return `
        <div class="suggestion-item" data-app-id="${app.id}" data-app-name="${app.name}">
            <div class="suggestion-app-icon">
                <img src="${app.image}" alt="${app.name}" onerror="this.src='../images/software 2.png'">
                ${badgeHTML}
            </div>
            <div class="suggestion-details">
                <div class="suggestion-app-name">${highlightedName}</div>
                <div class="suggestion-developer">${highlightedDeveloper}</div>
                <div class="suggestion-category">${highlightedCategory}</div>
                <div class="suggestion-rating">
                    <span class="suggestion-rating-score">${app.rating}</span>
                    <span class="suggestion-stars">${stars}</span>
                    <span class="suggestion-rating-count">(${app.reviewCount})</span>
                </div>
            </div>
            <div class="suggestion-actions">
                <div class="suggestion-price-badge ${priceBadgeClass}">${priceDisplay}</div>
                <button class="suggestion-view-btn">View</button>
            </div>
        </div>
    `;
}

function highlightText(text, searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return text;
    
    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function openAppDetails(appId) {
    // Simulate opening app details modal
    const modal = document.createElement('div');
    modal.className = 'app-details-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>App Details</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Loading app details for ID: ${appId}</p>
                <p>This would show full app information, screenshots, reviews, etc.</p>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const backdrop = modal.querySelector('.modal-backdrop');
    backdrop.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(modal);
    
    // Close handlers
    const closeModal = () => modal.remove();
    backdrop.addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    
    // Auto close after 3 seconds for demo
    setTimeout(closeModal, 3000);
}

function hideSearchSuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// Add CSS animations
const enhancedSearchStyle = document.createElement('style');
enhancedSearchStyle.textContent = `
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
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;

document.head.appendChild(enhancedSearchStyle);

// Featured Categories Functionality
function initializeFeaturedCategories() {
    const categoryCards = document.querySelectorAll('.category-card');
    const actionButtons = document.querySelectorAll('.action-btn');
    
    // Category card click handlers
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Filter software by category
            filterSoftwareByCategory(category);
            
            // Show success message
            showCategoryFilterMessage(category);
            
            // Scroll to charts section
            setTimeout(() => {
                const chartsSection = document.getElementById('top-charts');
                if (chartsSection) {
                    chartsSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'categoryHover 0.6s ease';
        });
        
        card.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Action button handlers
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.classList.contains('view-all') ? 'view-all' :
                          this.classList.contains('featured-picks') ? 'featured' :
                          'free';
            
            handleQuickAction(action);
        });
    });
}

function filterSoftwareByCategory(category) {
    const chartItems = document.querySelectorAll('.chart-item');
    const gridItems = document.querySelectorAll('.software-grid-item');
    
    // Filter chart items
    chartItems.forEach(item => {
        const categoryMatch = checkCategoryMatch(item, category);
        if (categoryMatch) {
            item.style.display = 'flex';
            item.style.animation = 'fadeInUp 0.5s ease';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Filter grid items
    gridItems.forEach(item => {
        const itemCategory = item.dataset.category;
        if (itemCategory === category || category === 'all') {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkCategoryMatch(item, category) {
    const categoryTags = item.querySelectorAll('.app-category-tag');
    if (!categoryTags.length) return false;
    
    const categoryMap = {
        'design': ['Photography & Design', 'Design & Graphics', 'Creative'],
        'development': ['Developer Tools', 'Programming'],
        'productivity': ['Productivity', 'Business & Productivity', 'Office'],
        'security': ['Security & Privacy', 'Security'],
        'multimedia': ['Multimedia & Design', 'Video & Multimedia', 'Entertainment'],
        'business': ['Business & Management', 'Enterprise']
    };
    
    const categoryText = categoryTags[0].textContent.trim();
    return categoryMap[category]?.some(cat => categoryText.includes(cat)) || false;
}

function handleQuickAction(action) {
    switch(action) {
        case 'view-all':
            // Show all software
            filterSoftwareByCategory('all');
            showActionFeedback('Showing all categories', 'fas fa-th-large');
            break;
        case 'featured':
            // Scroll to featured section
            const featuredSection = document.getElementById('featured-apps');
            if (featuredSection) {
                featuredSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            showActionFeedback('Viewing featured picks', 'fas fa-star');
            break;
        case 'free':
            // Filter free software
            filterFreeSoftware();
            showActionFeedback('Showing free software', 'fas fa-gift');
            break;
    }
}

function filterFreeSoftware() {
    const chartItems = document.querySelectorAll('.chart-item');
    const gridItems = document.querySelectorAll('.software-grid-item');
    
    // Filter chart items for free software
    chartItems.forEach(item => {
        const installBtn = item.querySelector('.install-btn');
        const isFree = installBtn && (installBtn.textContent.includes('FREE') || 
                                     installBtn.classList.contains('free'));
        
        if (isFree) {
            item.style.display = 'flex';
            item.style.animation = 'fadeInUp 0.5s ease';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Filter grid items for free software
    gridItems.forEach(item => {
        const price = item.dataset.price;
        if (price === '0') {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

function showCategoryFilterMessage(category) {
    const categoryNames = {
        'design': 'Design & Creative',
        'development': 'Development Tools',
        'productivity': 'Productivity Apps',
        'security': 'Security & Privacy',
        'multimedia': 'Multimedia Tools',
        'business': 'Business Solutions'
    };
    
    const message = `Filtering by ${categoryNames[category]}`;
    showActionFeedback(message, 'fas fa-filter');
}

function showActionFeedback(message, iconClass) {
    const feedback = document.createElement('div');
    feedback.className = 'action-feedback';
    feedback.innerHTML = `
        <i class="${iconClass}"></i>
        ${message}
    `;
    
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(94, 109, 255, 0.3);
        display: flex;
        align-items: center;
        gap: 8px;
        animation: slideInDown 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'slideOutUp 0.3s ease';
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

// Add category animations CSS
const categoryAnimationStyle = document.createElement('style');
categoryAnimationStyle.textContent = `
    @keyframes categoryHover {
        0% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-5px) scale(1.02); }
        100% { transform: translateY(0) scale(1); }
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;

document.head.appendChild(categoryAnimationStyle);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMainSearch();
    initializeFilterTabs();
    initializeTrendingItems();
    initializeFeaturedCategories();
    initializeStoreNavigation();
});

// Store Navigation Functionality
function initializeStoreNavigation() {
    // Add smooth scrolling for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effects for preview cards
    const previewCards = document.querySelectorAll('.preview-card');
    
    previewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'cardHover 0.6s ease';
        });
        
        card.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Add intersection observer for animations
    const observeElements = document.querySelectorAll('.software-store-nav .header-content > *');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease';
            }
        });
    }, { threshold: 0.1 });
    
    observeElements.forEach(el => observer.observe(el));
}

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add visual feedback
        showScrollFeedback(sectionId);
    }
}

function showScrollFeedback(sectionId) {
    const sectionNames = {
        'browse-all': 'Browse All Software',
        'featured-apps': 'Featured Applications',
        'top-charts': 'Top Charts'
    };
    
    const message = `Navigating to ${sectionNames[sectionId]}`;
    showActionFeedback(message, 'fas fa-arrow-down');
}

// Add enhanced navigation animations
const navigationAnimationStyle = document.createElement('style');
navigationAnimationStyle.textContent = `
    @keyframes cardHover {
        0% { transform: translateY(0) scale(1) rotate(0deg); }
        50% { transform: translateY(-10px) scale(1.05) rotate(2deg); }
        100% { transform: translateY(0) scale(1) rotate(0deg); }
    }
    
    @keyframes pulseGlow {
        0%, 100% { 
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); 
        }
        50% { 
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.6); 
        }
    }
    
    .store-badge {
        animation: pulseGlow 3s ease-in-out infinite;
    }
`;

document.head.appendChild(navigationAnimationStyle);
