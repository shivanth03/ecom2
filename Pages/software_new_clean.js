// Software Page JavaScript - Play Store & Microsoft Store Style Enhanced

document.addEventListener('DOMContentLoaded', function() {
    initializeModernTabs();
    initializeCategoryFilters();
    initializeSorting();
    initializeAppModals();
    initializeScrollAnimations();
    initializeBrowseAllSoftware();
    initializeWhyChooseUsAnimations();
    initializeLoadMore();
});

// Modern Chart Tabs Functionality
function initializeModernTabs() {
    const modernTabs = document.querySelectorAll('.modern-tab');
    const chartContents = document.querySelectorAll('.chart-content');
    
    modernTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetChart = this.getAttribute('data-chart');
            
            // Remove active class from all tabs and contents
            modernTabs.forEach(t => t.classList.remove('active'));
            chartContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetChart);
            if (targetContent) {
                targetContent.classList.add('active');
                animateChartItems(targetChart);
            }
        });
    });
}

// Browse All Software Enhanced Functionality
function initializeBrowseAllSoftware() {
    const searchInput = document.getElementById('softwareSearch');
    const categoryFilterBtn = document.getElementById('categoryFilterBtn');
    const priceFilterBtn = document.getElementById('priceFilterBtn');
    const loadMoreBtn = document.getElementById('loadMoreSoftware');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Enhanced search functionality with debouncing
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const searchTerm = this.value.toLowerCase();
            
            searchTimeout = setTimeout(() => {
                filterSoftwareCards(searchTerm, 'search');
                highlightSearchResults(searchTerm);
            }, 300);
        });
        
        // Add search suggestions
        searchInput.addEventListener('focus', showSearchSuggestions);
        searchInput.addEventListener('blur', hideSearchSuggestions);
    }
    
    // Enhanced category filter
    if (categoryFilterBtn) {
        categoryFilterBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleFilterDropdown('category');
        });
    }
    
    // Enhanced price filter  
    if (priceFilterBtn) {
        priceFilterBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleFilterDropdown('price');
        });
    }
    
    // Enhanced load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreSoftware();
        });
    }
    
    // Initialize software card interactions
    initializeSoftwareCardInteractions();
    
    // Initialize infinite scroll (optional)
    initializeInfiniteScroll();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });
}

function initializeSoftwareCardInteractions() {
    const softwareCards = document.querySelectorAll('.software-card');
    
    softwareCards.forEach((card, index) => {
        // Add hover animations
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            addRippleEffect(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click interaction
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.software-price') && !e.target.closest('button')) {
                showSoftwareDetails(card);
            }
        });
        
        // Set data attributes for filtering
        if (!card.hasAttribute('data-category')) {
            const categories = ['design', 'development', 'productivity', 'security', 'multimedia', 'business'];
            card.setAttribute('data-category', categories[index % categories.length]);
        }
    });
}

function addRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.2);
        animation: ripple 0.6s linear;
        pointer-events: none;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        transform: translate(-50%, -50%);
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('style[data-ripple]')) {
        style.setAttribute('data-ripple', 'true');
        document.head.appendChild(style);
    }
}

function showSearchSuggestions() {
    // Get common search terms from software cards
    const suggestions = [
        'Photo Editor', 'Code Editor', 'Design Tools', 'Productivity',
        'Security Software', 'Business Apps', 'Development Tools'
    ];
    
    const searchContainer = document.querySelector('.search-container');
    let suggestionsContainer = document.getElementById('searchSuggestions');
    
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.id = 'searchSuggestions';
        suggestionsContainer.className = 'search-suggestions';
        suggestionsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 2px solid #e2e8f0;
            border-top: none;
            border-radius: 0 0 20px 20px;
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 8px 30px rgba(0,0,0,0.1);
            display: none;
        `;
        
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = suggestion;
            suggestionItem.style.cssText = `
                padding: 12px 24px;
                cursor: pointer;
                transition: background 0.2s ease;
                border-bottom: 1px solid #f1f5f9;
            `;
            
            suggestionItem.addEventListener('mouseenter', function() {
                this.style.background = '#f8fafc';
            });
            
            suggestionItem.addEventListener('mouseleave', function() {
                this.style.background = 'white';
            });
            
            suggestionItem.addEventListener('click', function() {
                document.getElementById('softwareSearch').value = suggestion;
                filterSoftwareCards(suggestion.toLowerCase(), 'search');
                hideSearchSuggestions();
            });
            
            suggestionsContainer.appendChild(suggestionItem);
        });
        
        searchContainer.appendChild(suggestionsContainer);
    }
    
    suggestionsContainer.style.display = 'block';
}

function hideSearchSuggestions() {
    setTimeout(() => {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    }, 200);
}

function toggleFilterDropdown(type) {
    // Remove any existing dropdowns
    document.querySelectorAll('.filter-dropdown-menu').forEach(dropdown => {
        if (!dropdown.classList.contains(`${type}-dropdown-menu`)) {
            dropdown.remove();
        }
    });
    
    const existingDropdown = document.querySelector(`.${type}-dropdown-menu`);
    if (existingDropdown) {
        existingDropdown.remove();
        return;
    }
    
    const dropdown = document.createElement('div');
    dropdown.className = `${type}-dropdown-menu filter-dropdown-menu`;
    
    let options = [];
    if (type === 'category') {
        options = [
            {value: 'all', label: 'All Categories', icon: 'fas fa-th'},
            {value: 'design', label: 'Design & Graphics', icon: 'fas fa-palette'},
            {value: 'development', label: 'Development', icon: 'fas fa-code'},
            {value: 'productivity', label: 'Productivity', icon: 'fas fa-tasks'},
            {value: 'security', label: 'Security', icon: 'fas fa-shield-alt'},
            {value: 'multimedia', label: 'Multimedia', icon: 'fas fa-play-circle'},
            {value: 'business', label: 'Business', icon: 'fas fa-briefcase'}
        ];
    } else if (type === 'price') {
        options = [
            {value: 'all', label: 'All Prices', icon: 'fas fa-tags'},
            {value: 'free', label: 'Free', icon: 'fas fa-gift'},
            {value: 'under-1000', label: 'Under ₹1,000', icon: 'fas fa-rupee-sign'},
            {value: 'under-5000', label: 'Under ₹5,000', icon: 'fas fa-rupee-sign'},
            {value: 'premium', label: 'Premium (₹5,000+)', icon: 'fas fa-crown'}
        ];
    }
    
    dropdown.innerHTML = options.map(option => 
        `<div class="filter-option" data-value="${option.value}">
            <i class="${option.icon}"></i>
            ${option.label}
        </div>`
    ).join('');
    
    // Position and show dropdown
    const button = document.getElementById(`${type}FilterBtn`);
    const rect = button.getBoundingClientRect();
    dropdown.style.cssText = `
        position: absolute;
        top: ${rect.bottom + window.scrollY + 8}px;
        left: ${rect.left + window.scrollX}px;
        min-width: ${Math.max(rect.width, 200)}px;
        z-index: 1000;
        animation: fadeInUp 0.3s ease;
    `;
    
    document.body.appendChild(dropdown);
    
    // Style filter options
    dropdown.querySelectorAll('.filter-option').forEach(option => {
        option.style.cssText += `
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        option.querySelector('i').style.cssText = `
            width: 16px;
            color: #3b82f6;
            font-size: 14px;
        `;
        
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const label = this.textContent.trim();
            
            // Update button text and icon
            const buttonSpan = button.querySelector('span');
            const buttonIcon = this.querySelector('i').cloneNode();
            buttonSpan.innerHTML = '';
            buttonSpan.appendChild(buttonIcon);
            buttonSpan.appendChild(document.createTextNode(' ' + label));
            
            // Apply filter with animation
            filterSoftwareCards(value, type);
            
            // Remove dropdown
            dropdown.remove();
            
            // Show filter applied feedback
            showFilterFeedback(label);
        });
    });
    
    // Close dropdown when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeDropdown(e) {
            if (!dropdown.contains(e.target) && !button.contains(e.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        });
    }, 100);
}

function showFilterFeedback(filterName) {
    const feedback = document.createElement('div');
    feedback.className = 'filter-feedback';
    feedback.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Filter applied: ${filterName}
    `;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        box-shadow: 0 8px 30px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'slideOutRight 0.5s ease forwards';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 500);
    }, 3000);
    
    // Add animations if not exist
    if (!document.querySelector('style[data-feedback-animations]')) {
        const style = document.createElement('style');
        style.setAttribute('data-feedback-animations', 'true');
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
        `;
        document.head.appendChild(style);
    }
}

function loadMoreSoftware() {
    const loadMoreBtn = document.getElementById('loadMoreSoftware');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const softwareGrid = document.querySelector('.software-grid');
    
    if (!loadMoreBtn || !loadingSpinner || !softwareGrid) return;
    
    // Show loading state
    loadMoreBtn.style.display = 'none';
    loadingSpinner.style.display = 'block';
    
    // Simulate loading delay
    setTimeout(() => {
        // Add more software cards (you can customize this data)
        const newSoftwareData = [
            {
                name: 'Analytics Pro',
                category: 'business',
                price: 4999,
                rating: 4.7,
                reviews: 234,
                image: '../images/software 6.png'
            },
            {
                name: 'Video Editor Supreme',
                category: 'multimedia', 
                price: 0,
                rating: 4.5,
                reviews: 1890,
                image: '../images/software 7.png'
            },
            {
                name: 'Security Shield',
                category: 'security',
                price: 2999,
                rating: 4.9,
                reviews: 567,
                image: '../images/software 8.png'
            }
        ];
        
        newSoftwareData.forEach((software, index) => {
            const softwareCard = createSoftwareCard(software);
            softwareCard.style.opacity = '0';
            softwareCard.style.transform = 'translateY(30px)';
            softwareGrid.appendChild(softwareCard);
            
            // Animate in
            setTimeout(() => {
                softwareCard.style.transition = 'all 0.5s ease';
                softwareCard.style.opacity = '1';
                softwareCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Re-initialize interactions for new cards
        initializeSoftwareCardInteractions();
        
        // Hide loading, show button
        loadingSpinner.style.display = 'none';
        loadMoreBtn.style.display = 'inline-flex';
        
        // Update button text
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Software';
        
    }, 1500);
}

function createSoftwareCard(software) {
    const card = document.createElement('div');
    card.className = 'software-card';
    card.setAttribute('data-category', software.category);
    
    card.innerHTML = `
        <div class="software-image">
            <img src="${software.image}" alt="${software.name}">
            <div class="software-overlay">
                <button class="quick-view-btn" onclick="showSoftwareDetails(this.closest('.software-card'))">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        
        <div class="software-info">
            <h4>${software.name}</h4>
            <p class="category-tag">${software.category.charAt(0).toUpperCase() + software.category.slice(1)}</p>
            <p class="software-description">Professional ${software.category} software with advanced features.</p>
            
            <div class="software-footer">
                <div class="software-rating">
                    <i class="fas fa-star"></i>
                    <span>${software.rating} (${software.reviews} reviews)</span>
                </div>
                <div class="software-price">
                    ${software.price === 0 ? 
                        '<span class="price-current">FREE</span>' : 
                        `<span class="price-current">₹${software.price}</span>`
                    }
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function initializeInfiniteScroll() {
    let isLoading = false;
    
    window.addEventListener('scroll', () => {
        if (isLoading) return;
        
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - 1000) {
            isLoading = true;
            
            const loadMoreBtn = document.getElementById('loadMoreSoftware');
            if (loadMoreBtn && loadMoreBtn.style.display !== 'none') {
                loadMoreSoftware();
                
                setTimeout(() => {
                    isLoading = false;
                }, 2000);
            }
        }
    });
}

function highlightSearchResults(searchTerm) {
    if (!searchTerm) return;
    
    const softwareCards = document.querySelectorAll('.software-card:not([style*="display: none"])');
    
    softwareCards.forEach(card => {
        const title = card.querySelector('h4');
        const description = card.querySelector('.software-description');
        
        // Remove previous highlights
        [title, description].forEach(element => {
            if (element && element.dataset.originalText) {
                element.innerHTML = element.dataset.originalText;
            }
        });
        
        // Add new highlights
        [title, description].forEach(element => {
            if (element) {
                if (!element.dataset.originalText) {
                    element.dataset.originalText = element.innerHTML;
                }
                
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                element.innerHTML = element.dataset.originalText.replace(regex, 
                    '<mark style="background: #fef3c7; color: #92400e; padding: 2px 4px; border-radius: 4px; font-weight: 600;">$1</mark>'
                );
            }
        });
    });
}

function showSoftwareDetails(card) {
    const softwareName = card.querySelector('h4').textContent;
    const softwareImage = card.querySelector('img').src;
    const softwareCategory = card.querySelector('.category-tag').textContent;
    const softwarePrice = card.querySelector('.price-current').textContent;
    const softwareRating = card.querySelector('.software-rating span').textContent;
    
    // Create and show modal with software details
    const modal = document.createElement('div');
    modal.className = 'software-detail-modal';
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
        <div class="modal-content" style="
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            position: relative;
            animation: slideInUp 0.3s ease;
        ">
            <button class="close-modal" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #64748b;
            ">&times;</button>
            
            <img src="${softwareImage}" alt="${softwareName}" style="
                width: 100px;
                height: 100px;
                object-fit: cover;
                border-radius: 20px;
                margin-bottom: 20px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.1);
            ">
            
            <h3 style="margin-bottom: 10px; color: #1e293b;">${softwareName}</h3>
            <p style="color: #64748b; margin-bottom: 15px;">${softwareCategory}</p>
            <div style="margin-bottom: 20px; color: #3b82f6; font-weight: 600;">${softwareRating}</div>
            <div style="font-size: 24px; font-weight: 700; color: #059669; margin-bottom: 30px;">${softwarePrice}</div>
            
            <button style="
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 50px;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 8px 30px rgba(59, 130, 246, 0.3);
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                <i class="fas fa-download"></i> Get Software
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add animations if not exist
    if (!document.querySelector('style[data-modal-animations]')) {
        const style = document.createElement('style');
        style.setAttribute('data-modal-animations', 'true');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideInUp {
                from { 
                    transform: translateY(50px);
                    opacity: 0;
                }
                to { 
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function toggleFilterDropdown(type) {
    // Create dropdown options if they don't exist
    const existingDropdown = document.querySelector(`.${type}-dropdown-menu`);
    if (existingDropdown) {
        existingDropdown.remove();
        return;
    }
    
    const dropdown = document.createElement('div');
    dropdown.className = `${type}-dropdown-menu filter-dropdown-menu`;
    
    let options = [];
    if (type === 'category') {
        options = [
            {value: 'all', label: 'All Categories'},
            {value: 'design', label: 'Design & Graphics'},
            {value: 'development', label: 'Development'},
            {value: 'productivity', label: 'Productivity'},
            {value: 'security', label: 'Security'},
            {value: 'multimedia', label: 'Multimedia'},
            {value: 'business', label: 'Business'}
        ];
    } else if (type === 'price') {
        options = [
            {value: 'all', label: 'All Prices'},
            {value: 'free', label: 'Free'},
            {value: 'under-1000', label: 'Under ₹1,000'},
            {value: 'under-5000', label: 'Under ₹5,000'},
            {value: 'premium', label: 'Premium (₹5,000+)'}
        ];
    }
    
    dropdown.innerHTML = options.map(option => 
        `<div class="filter-option" data-value="${option.value}">${option.label}</div>`
    ).join('');
    
    // Position and show dropdown
    const button = document.getElementById(`${type}FilterBtn`);
    const rect = button.getBoundingClientRect();
    dropdown.style.cssText = `
        position: absolute;
        top: ${rect.bottom + window.scrollY + 5}px;
        left: ${rect.left + window.scrollX}px;
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        z-index: 1000;
        min-width: ${rect.width}px;
        max-height: 200px;
        overflow-y: auto;
    `;
    
    document.body.appendChild(dropdown);
    
    // Add click handlers for options
    dropdown.querySelectorAll('.filter-option').forEach(option => {
        option.style.cssText = `
            padding: 12px 16px;
            cursor: pointer;
            transition: background 0.2s ease;
            font-size: 14px;
            font-weight: 500;
            color: #475569;
        `;
        
        option.addEventListener('mouseenter', function() {
            this.style.background = '#f1f5f9';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.background = 'white';
        });
        
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const label = this.textContent;
            
            // Update button text
            button.querySelector('span').textContent = label;
            
            // Apply filter
            filterSoftwareCards(value, type);
            
            // Remove dropdown
            dropdown.remove();
        });
    });
    
    // Close dropdown when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeDropdown(e) {
            if (!dropdown.contains(e.target) && !button.contains(e.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        });
    }, 100);
}

function filterSoftwareCards(value, filterType) {
    const softwareCards = document.querySelectorAll('.software-card');
    
    softwareCards.forEach((card, index) => {
        let shouldShow = true;
        
        if (filterType === 'search' && value) {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('.software-description').textContent.toLowerCase();
            shouldShow = title.includes(value) || description.includes(value);
        } else if (filterType === 'category' && value !== 'all') {
            const cardCategory = card.getAttribute('data-category');
            shouldShow = cardCategory === value;
        } else if (filterType === 'price' && value !== 'all') {
            const priceElement = card.querySelector('.price-current');
            if (priceElement) {
                const price = parseInt(priceElement.textContent.replace(/[₹,]/g, ''));
                switch(value) {
                    case 'free':
                        shouldShow = price === 0;
                        break;
                    case 'under-1000':
                        shouldShow = price < 1000;
                        break;
                    case 'under-5000':
                        shouldShow = price < 5000;
                        break;
                    case 'premium':
                        shouldShow = price >= 5000;
                        break;
                }
            }
        }
        
        if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Why Choose Us Animations
function initializeWhyChooseUsAnimations() {
    const observerOptions = {
        threshold: 0.2,
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
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                
                // Animate stats
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        animateCounter(stat);
                    }, 1000 + index * 200);
                });
            }
        });
    }, observerOptions);
    
    const whyChooseSection = document.querySelector('.why-choose-us');
    if (whyChooseSection) {
        // Set initial state
        const featureCards = whyChooseSection.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        });
        
        observer.observe(whyChooseSection);
    }
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isStar = target.includes('★');
    const isNumber = !isPercentage && !isStar;
    
    let startValue = 0;
    let endValue = 0;
    
    if (isNumber) {
        endValue = parseInt(target.replace(/[^0-9]/g, ''));
        if (target.includes('K')) endValue *= 1000;
    } else if (isPercentage) {
        endValue = parseFloat(target);
    } else if (isStar) {
        endValue = parseFloat(target);
    }
    
    const duration = 2000;
    const stepTime = 50;
    const steps = duration / stepTime;
    const increment = (endValue - startValue) / steps;
    
    let currentValue = startValue;
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= endValue) {
            element.textContent = target; // Set final value
            clearInterval(timer);
        } else {
            if (isNumber) {
                const displayValue = Math.floor(currentValue);
                element.textContent = displayValue >= 1000 ? 
                    Math.floor(displayValue / 1000) + 'K+' : 
                    displayValue + '+';
            } else if (isPercentage) {
                element.textContent = currentValue.toFixed(1) + '%';
            } else if (isStar) {
                element.textContent = currentValue.toFixed(1) + '★';
            }
        }
    }, stepTime);
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

// Category Filter Functionality (existing)
function initializeCategoryFilters() {
    const categoryPills = document.querySelectorAll('.category-pill');
    const appCards = document.querySelectorAll('.app-card');
    
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active pill
            categoryPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            // Filter app cards
            filterAppsByCategory(category, appCards);
        });
    });
}

function filterAppsByCategory(category, appCards) {
    appCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = category === 'all' || cardCategory === category;
        
        if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Sorting Functionality (existing)
function initializeSorting() {
    const sortSelect = document.getElementById('sortOptions');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortApps(sortBy);
        });
    }
}

function sortApps(sortBy) {
    const appsGrid = document.getElementById('appsGrid');
    if (!appsGrid) return;
    
    const appCards = Array.from(appsGrid.children);
    
    appCards.sort((a, b) => {
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
            
            case 'name':
                const nameA = a.querySelector('.app-name').textContent;
                const nameB = b.querySelector('.app-name').textContent;
                return nameA.localeCompare(nameB);
            
            case 'downloads':
                const downloadsA = parseInt(a.getAttribute('data-downloads') || 0);
                const downloadsB = parseInt(b.getAttribute('data-downloads') || 0);
                return downloadsB - downloadsA;
            
            default:
                return 0;
        }
    });
    
    // Animate sorting
    appCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    setTimeout(() => {
        appCards.forEach(card => {
            appsGrid.appendChild(card);
        });
        
        appCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
}

// App Modal Functionality (existing)
function initializeAppModals() {
    createAppModal();
    
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
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAppModal();
        }
    });
}

function createAppModal() {
    const existingModal = document.getElementById('appModal');
    if (existingModal) return;
    
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
    
    if (!modal || !appData) return;
    
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
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
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
            description: 'Professional photo editing software with AI-powered features, advanced filters, and creative tools.',
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
            description: 'Complete integrated development environment with syntax highlighting, debugging tools, and Git integration.',
            features: [
                'Multi-language support',
                'Integrated debugging',
                'Git version control',
                'Plugin ecosystem',
                'Code completion',
                'Project management'
            ],
            requirements: 'Windows 10/11, macOS 10.14+, Linux, 2GB RAM, 1GB storage space'
        }
        // Add more app data as needed
    };
    
    return apps[appId] || apps[1];
}

// Scroll Animations (existing)
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
                const children = entry.target.querySelectorAll('.app-card, .chart-item, .category-pill, .software-card');
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
    const sections = document.querySelectorAll('.fade-in-top-delay-2, .fade-in-top-delay-3, .fade-in-top-delay-4');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
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

// App Modal Functionality
function initializeAppModals() {
    const modal = document.getElementById('appModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

function openAppModal(appId) {
    const modal = document.getElementById('appModal');
    const modalContent = document.getElementById('modalContent');
    
    // Get app data
    const appData = getAppData(appId);
    
    if (appData && modal) {
        modalContent.innerHTML = generateModalContent(appData);
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Re-initialize modal event listeners
        const newCloseBtn = modal.querySelector('.close-modal');
        if (newCloseBtn) {
            newCloseBtn.addEventListener('click', closeModal);
        }
    }
}

function closeModal() {
    const modal = document.getElementById('appModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function getAppData(appId) {
    // Sample app data for demonstration
    const sampleApps = {
        1: {
            id: 1,
            name: "Adobe Photoshop",
            developer: "Adobe Inc.",
            rating: 4.8,
            price: 1999,
            image: "../images/software 2.png",
            category: "graphics",
            downloads: 50000000,
            description: "World's most advanced image editing software with AI-powered tools and professional features.",
            features: ["Advanced photo editing", "Layer support", "AI-powered tools", "Creative filters", "RAW support"],
            screenshots: ["../images/software 2.png", "../images/software 3.png", "../images/software 4.png"],
            systemRequirements: "Windows 10 64-bit, 8GB RAM, 4GB storage"
        },
        2: {
            id: 2,
            name: "Microsoft Office",
            developer: "Microsoft Corporation",
            rating: 4.7,
            price: 2499,
            image: "../images/software 3.png",
            category: "productivity",
            downloads: 100000000,
            description: "Complete productivity suite for business and personal use with cloud integration.",
            features: ["Word processing", "Spreadsheets", "Presentations", "Email client", "Cloud sync"],
            screenshots: ["../images/software 3.png", "../images/software 4.png", "../images/software 5.png"],
            systemRequirements: "Windows 10, 4GB RAM, 4GB storage"
        },
        3: {
            id: 3,
            name: "AutoCAD",
            developer: "Autodesk",
            rating: 4.6,
            price: 15000,
            image: "../images/software 4.png",
            category: "design",
            downloads: 20000000,
            description: "Professional 2D and 3D CAD software for architects, engineers, and designers.",
            features: ["2D & 3D design", "Precision drafting", "Industry standards", "Collaboration tools"],
            screenshots: ["../images/software 4.png", "../images/software 5.png", "../images/software 6.png"],
            systemRequirements: "Windows 10 64-bit, 16GB RAM, 7GB storage"
        },
        4: {
            id: 4,
            name: "Visual Studio Code",
            developer: "Microsoft",
            rating: 4.9,
            price: 0,
            image: "../images/software 5.png",
            category: "development",
            downloads: 75000000,
            description: "Free, lightweight code editor with powerful features for modern development.",
            features: ["Syntax highlighting", "IntelliSense", "Git integration", "Extensions", "Debugging"],
            screenshots: ["../images/software 5.png", "../images/software 6.png", "../images/software 7.png"],
            systemRequirements: "Windows 7+, 1GB RAM, 200MB storage"
        },
        5: {
            id: 5,
            name: "Steam",
            developer: "Valve Corporation",
            rating: 4.5,
            price: 0,
            image: "../images/software 6.png",
            category: "gaming",
            downloads: 120000000,
            description: "Digital distribution platform for PC gaming with vast library of games.",
            features: ["Game library", "Friends & chat", "Workshop", "Broadcasting", "Remote play"],
            screenshots: ["../images/software 6.png", "../images/software 7.png", "../images/software 8.png"],
            systemRequirements: "Windows 10, 2GB RAM, 5GB storage"
        },
        6: {
            id: 6,
            name: "Slack",
            developer: "Slack Technologies",
            rating: 4.4,
            price: 0,
            image: "../images/software 7.png",
            category: "communication",
            downloads: 30000000,
            description: "Team collaboration and communication platform for modern workplaces.",
            features: ["Team messaging", "File sharing", "Video calls", "App integrations", "Workflow automation"],
            screenshots: ["../images/software 7.png", "../images/software 8.png", "../images/software 9.png"],
            systemRequirements: "Windows 10, 4GB RAM, 1GB storage"
        }
    };
    
    return sampleApps[appId] || sampleApps[1]; // Default to first app if not found
}

function generateModalContent(app) {
    return `
        <div class="modal-header">
            <div class="modal-app-info">
                <img src="${app.image}" alt="${app.name}" class="modal-app-icon">
                <div class="modal-app-details">
                    <h2>${app.name}</h2>
                    <p class="modal-developer">${app.developer}</p>
                    <div class="modal-rating">
                        <span class="stars">★★★★★</span>
                        <span class="rating-value">${app.rating}</span>
                        <span class="rating-count">(${app.downloads.toLocaleString()} downloads)</span>
                    </div>
                </div>
            </div>
            <button class="close-modal">&times;</button>
        </div>
        
        <div class="modal-body">
            <div class="modal-main-content">
                <div class="modal-screenshots">
                    <h3>Screenshots</h3>
                    <div class="screenshots-grid">
                        ${app.screenshots.map(img => `<img src="${img}" alt="Screenshot" class="screenshot-img">`).join('')}
                    </div>
                </div>
                
                <div class="modal-description">
                    <h3>About ${app.name}</h3>
                    <p>${app.description}</p>
                    
                    <h4>Key Features</h4>
                    <ul class="features-list">
                        ${app.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    
                    <h4>System Requirements</h4>
                    <p class="system-requirements">${app.systemRequirements}</p>
                </div>
            </div>
            
            <div class="modal-sidebar">
                <div class="modal-actions">
                    <div class="modal-price">
                        ${app.price === 0 ? 'FREE' : '₹' + app.price.toLocaleString()}
                    </div>
                    <button class="install-btn">
                        ${app.price === 0 ? 'Install' : 'Buy Now'}
                    </button>
                    <button class="wishlist-btn">Add to Wishlist</button>
                </div>
                
                <div class="modal-stats">
                    <div class="stat-item">
                        <span class="stat-label">Downloads</span>
                        <span class="stat-value">${formatDownloads(app.downloads)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Category</span>
                        <span class="stat-value">${capitalizeFirst(app.category)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Developer</span>
                        <span class="stat-value">${app.developer}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function formatDownloads(downloads) {
    if (downloads >= 1000000) {
        return (downloads / 1000000).toFixed(1) + 'M+';
    } else if (downloads >= 1000) {
        return (downloads / 1000).toFixed(1) + 'K+';
    }
    return downloads.toString();
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
    const animatedElements = document.querySelectorAll('.chart-item, .category-card, .featured-item, .software-grid-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Load More Functionality
function initializeLoadMore() {
    // Add event listener for load more buttons
    window.loadMoreFreeApps = loadMoreFreeApps;
    window.loadMoreChartsApps = loadMoreChartsApps;
}

function loadMoreFreeApps() {
    const additionalItems = document.getElementById('additionalFreeItems');
    const loadMoreBtn = document.getElementById('loadMoreFree');
    
    if (additionalItems && loadMoreBtn) {
        // Add loading state
        loadMoreBtn.classList.add('loading');
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner"></i> Loading...';
        
        // Simulate loading delay
        setTimeout(() => {
            // Show additional items with animation
            additionalItems.style.display = 'block';
            
            // Update button to show it's expanded
            loadMoreBtn.style.display = 'none';
            
            // Add animation to new items
            const newItems = additionalItems.querySelectorAll('.chart-item');
            newItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.style.transition = 'all 0.3s ease';
                    
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                }, index * 100);
            });
            
            // Show success message
            const container = document.querySelector('.load-more-container');
            if (container) {
                container.innerHTML = `
                    <div style="text-align: center; color: #10b981; font-weight: 600; font-size: 14px;">
                        <i class="fas fa-check-circle"></i> 
                        5 more apps loaded successfully!
                    </div>
                `;
            }
        }, 1000);
    }
}

function loadMoreChartsApps() {
    const loadMoreBtn = document.getElementById('loadMoreCharts');
    
    if (loadMoreBtn) {
        // Add loading state
        loadMoreBtn.classList.add('loading');
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner"></i> Loading More Software...';
        
        // Simulate loading delay
        setTimeout(() => {
            // Show additional items for free apps
            const additionalFreeItems = document.getElementById('additionalFreeItems');
            if (additionalFreeItems) {
                additionalFreeItems.style.display = 'block';
            }
            
            // Add more items to paid section
            const topPaidSection = document.getElementById('top-paid');
            if (topPaidSection) {
                const additionalPaidItems = `
                    <div class="chart-item">
                        <div class="chart-rank">6</div>
                        <div class="chart-app-info">
                            <img src="../images/software 2.png" alt="Business Suite">
                            <div class="app-details">
                                <h4>Business Suite Premium</h4>
                                <p>Enterprise Solutions</p>
                                <div class="app-category-tag">Business & Finance</div>
                                <div class="app-rating">
                                    <span class="rating">4.5</span>
                                    <div class="stars">★★★★★</div>
                                    <span class="reviews">(4.2K)</span>
                                </div>
                            </div>
                        </div>
                        <button class="install-btn price" onclick="openAppModal(16)">₹2,999</button>
                    </div>
                    <div class="chart-item">
                        <div class="chart-rank">7</div>
                        <div class="chart-app-info">
                            <img src="../images/software 5.png" alt="Analytics Pro">
                            <div class="app-details">
                                <h4>Analytics Pro</h4>
                                <p>Data Insights Inc</p>
                                <div class="app-category-tag">Analytics & Data</div>
                                <div class="app-rating">
                                    <span class="rating">4.4</span>
                                    <div class="stars">★★★★☆</div>
                                    <span class="reviews">(2.8K)</span>
                                </div>
                            </div>
                        </div>
                        <button class="install-btn price" onclick="openAppModal(17)">₹1,299</button>
                    </div>
                `;
                topPaidSection.insertAdjacentHTML('beforeend', additionalPaidItems);
            }
            
            // Add more items to trending section
            const trendingSection = document.getElementById('trending');
            if (trendingSection) {
                const additionalTrendingItems = `
                    <div class="chart-item trending-item">
                        <div class="chart-rank trending">
                            <i class="fas fa-fire"></i>
                        </div>
                        <div class="chart-app-info">
                            <img src="../images/software 2.png" alt="Cloud Sync">
                            <div class="app-details">
                                <h4>Cloud Sync Pro</h4>
                                <p>SyncTech Solutions</p>
                                <div class="app-category-tag trending-tag">Cloud & Storage</div>
                                <div class="app-rating">
                                    <span class="rating">4.6</span>
                                    <div class="stars">★★★★★</div>
                                    <span class="reviews">(1.8K) • Trending</span>
                                </div>
                            </div>
                        </div>
                        <button class="install-btn free" onclick="openAppModal(18)">FREE</button>
                    </div>
                    <div class="chart-item trending-item">
                        <div class="chart-rank trending">
                            <i class="fas fa-fire"></i>
                        </div>
                        <div class="chart-app-info">
                            <img src="../images/software 8.png" alt="Dev Tools Plus">
                            <div class="app-details">
                                <h4>Dev Tools Plus</h4>
                                <p>CodeCraft Studios</p>
                                <div class="app-category-tag trending-tag">Developer Tools</div>
                                <div class="app-rating">
                                    <span class="rating">4.7</span>
                                    <div class="stars">★★★★★</div>
                                    <span class="reviews">(950) • Hot</span>
                                </div>
                            </div>
                        </div>
                        <button class="install-btn price" onclick="openAppModal(19)">₹799</button>
                    </div>
                `;
                trendingSection.insertAdjacentHTML('beforeend', additionalTrendingItems);
            }
            
            // Add more items to new releases section
            const newReleasesSection = document.getElementById('new-releases');
            if (newReleasesSection) {
                const additionalNewItems = `
                    <div class="chart-item new-item">
                        <div class="chart-rank new">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="chart-app-info">
                            <img src="../images/software 9.png" alt="Smart Assistant">
                            <div class="app-details">
                                <h4>Smart Assistant 2024</h4>
                                <p>AI Innovations</p>
                                <div class="app-category-tag new-tag">AI & Automation</div>
                                <div class="app-rating">
                                    <span class="rating">4.8</span>
                                    <div class="stars">★★★★★</div>
                                    <span class="reviews">(89) • Just Released</span>
                                </div>
                            </div>
                        </div>
                        <button class="install-btn price" onclick="openAppModal(20)">₹599</button>
                    </div>
                    <div class="chart-item new-item">
                        <div class="chart-rank new">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="chart-app-info">
                            <img src="../images/software 10.png" alt="Game Engine Pro">
                            <div class="app-details">
                                <h4>Game Engine Pro</h4>
                                <p>GameDev Studios</p>
                                <div class="app-category-tag new-tag">Game Development</div>
                                <div class="app-rating">
                                    <span class="rating">4.5</span>
                                    <div class="stars">★★★★★</div>
                                    <span class="reviews">(67) • New</span>
                                </div>
                            </div>
                        </div>
                        <button class="install-btn free" onclick="openAppModal(21)">FREE</button>
                    </div>
                `;
                newReleasesSection.insertAdjacentHTML('beforeend', additionalNewItems);
            }
            
            // Animate all new items
            const allNewItems = document.querySelectorAll('.chart-item:not([data-animated])');
            allNewItems.forEach((item, index) => {
                item.setAttribute('data-animated', 'true');
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.style.transition = 'all 0.3s ease';
                    
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                }, index * 50);
            });
            
            // Update button to show completion
            loadMoreBtn.style.display = 'none';
            
            // Show success message
            const container = document.querySelector('.load-more-container');
            if (container) {
                container.innerHTML = `
                    <div style="text-align: center; color: #10b981; font-weight: 600; font-size: 16px; padding: 20px;">
                        <i class="fas fa-check-circle" style="font-size: 20px; margin-right: 8px;"></i> 
                        15+ more apps loaded successfully across all categories!
                    </div>
                `;
            }
        }, 1500);
    }
}
