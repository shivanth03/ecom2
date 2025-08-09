// Template Preview Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Template preview modal functionality
    const modal = document.getElementById('templateModal');
    const modalClose = document.querySelector('.modal-close');
    const previewButtons = document.querySelectorAll('.preview-btn');
    
    // Sample template data (you can replace this with dynamic data)
    const templateData = {
        1: {
            title: "Premium Business Template",
            image: "../images/template 1.jpg",
            description: "A professional and modern business template perfect for corporate websites. Features clean design, responsive layout, and premium components that will make your business stand out.",
            features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile Friendly", "Cross Browser Compatible", "Premium Support"],
            rating: 4.8,
            reviews: 156,
            currentPrice: "₹2,999",
            oldPrice: "₹4,999",
            previewUrl: "https://example.com/preview/template1"
        },
        2: {
            title: "Creative Portfolio Template",
            image: "../images/template 2.jpg",
            description: "Showcase your creative work with this stunning portfolio template. Perfect for designers, photographers, and creative professionals who want to make an impact.",
            features: ["Portfolio Gallery", "Animation Effects", "Contact Form", "Blog Integration", "Social Media Links", "Custom CSS"],
            rating: 4.9,
            reviews: 203,
            currentPrice: "₹2,499",
            oldPrice: "₹3,999",
            previewUrl: "https://example.com/preview/template2"
        },
        3: {
            title: "E-commerce Store Template",
            image: "../images/template 3.jpg",
            description: "Complete e-commerce solution with shopping cart, payment integration, and product management. Start selling online in minutes with this professional template.",
            features: ["Shopping Cart", "Payment Gateway", "Product Management", "Order Tracking", "Customer Reviews", "Inventory System"],
            rating: 4.7,
            reviews: 89,
            currentPrice: "₹3,499",
            oldPrice: "₹5,999",
            previewUrl: "https://example.com/preview/template3"
        },
        4: {
            title: "Blog Template",
            image: "../images/template 4.jpg",
            description: "Perfect template for bloggers and content creators. Features modern design with excellent readability and social media integration.",
            features: ["Blog Layout", "Comment System", "Social Sharing", "Newsletter Integration", "Archive Pages", "Search Function"],
            rating: 4.6,
            reviews: 124,
            currentPrice: "₹1,999",
            oldPrice: "₹2,999",
            previewUrl: "https://example.com/preview/template4"
        },
        5: {
            title: "Restaurant Template",
            image: "../images/template 5.jpg",
            description: "Showcase your restaurant with this appetizing template. Perfect for restaurants, cafes, and food businesses with menu integration.",
            features: ["Menu Display", "Online Reservations", "Photo Gallery", "Contact Form", "Location Map", "Reviews Section"],
            rating: 4.8,
            reviews: 87,
            currentPrice: "₹2,799",
            oldPrice: "₹3,999",
            previewUrl: "https://example.com/preview/template5"
        },
        6: {
            title: "Education Template",
            image: "../images/template 6.jpg",
            description: "Modern educational template for schools, universities, and online learning platforms. Features course management and student portals.",
            features: ["Course Catalog", "Student Portal", "Event Calendar", "Faculty Profiles", "Online Learning", "Assessment Tools"],
            rating: 4.5,
            reviews: 76,
            currentPrice: "₹3,299",
            oldPrice: "₹4,999",
            previewUrl: "https://example.com/preview/template6"
        },
        7: {
            title: "Fashion Store Template",
            image: "../images/template 7.jpg",
            description: "Trendy fashion template with lookbook integration and size guide features for modern fashion retailers.",
            features: ["Lookbook Gallery", "Size Guide", "Color Variants", "Fashion Blog", "Style Tips", "Seasonal Collections"],
            rating: 4.9,
            reviews: 142,
            currentPrice: "₹3,199",
            oldPrice: "₹4,799",
            previewUrl: "https://example.com/preview/template7"
        },
        8: {
            title: "Electronics Store Template",
            image: "../images/template 8.jpg",
            description: "Professional electronics store with product comparison and technical specifications display.",
            features: ["Product Compare", "Tech Specs", "Warranty Info", "Customer Support", "Brand Showcase", "Deal Alerts"],
            rating: 4.7,
            reviews: 167,
            currentPrice: "₹3,799",
            oldPrice: "₹5,499",
            previewUrl: "https://example.com/preview/template8"
        },
        9: {
            title: "Minimal Design Template",
            image: "../images/template 9.jpg",
            description: "Clean and minimal template focusing on content and user experience. Perfect for modern businesses.",
            features: ["Clean Design", "Fast Loading", "Typography Focus", "White Space", "Content First", "Accessibility"],
            rating: 4.8,
            reviews: 134,
            currentPrice: "₹2,299",
            oldPrice: "₹3,499",
            previewUrl: "https://example.com/preview/template9"
        },
        10: {
            title: "Food & Restaurant Template",
            image: "../images/template 10.jpg",
            description: "Appetizing restaurant template with online ordering and table reservation system for food businesses.",
            features: ["Online Menu", "Order System", "Table Booking", "Chef Profiles", "Food Gallery", "Customer Reviews"],
            rating: 4.9,
            reviews: 189,
            currentPrice: "₹3,399",
            oldPrice: "₹4,999",
            previewUrl: "https://example.com/preview/template10"
        },
        // Add default template for fallback
        default: {
            title: "Professional Template",
            image: "../images/template 1.jpg",
            description: "A high-quality template designed for modern websites. Features responsive design and professional aesthetics.",
            features: ["Responsive Design", "Modern UI", "Fast Loading", "SEO Friendly", "Cross Platform", "Premium Support"],
            rating: 4.5,
            reviews: 50,
            currentPrice: "₹2,999",
            oldPrice: "₹3,999",
            previewUrl: "https://example.com/preview"
        }
    };
    
    // Open modal function
    function openModal(templateId) {
        const data = templateData[templateId] || templateData.default;
        
        // Populate modal content
        document.getElementById('modalTemplateTitle').textContent = data.title;
        document.getElementById('modalImage').src = data.image;
        document.getElementById('modalImage').alt = data.title;
        document.getElementById('modalDescription').textContent = data.description;
        
        // Populate features
        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = '';
        data.features.forEach(feature => {
            const featureTag = document.createElement('span');
            featureTag.className = 'feature-tag';
            featureTag.textContent = feature;
            featuresList.appendChild(featureTag);
        });
        
        // Populate rating
        const ratingStars = document.querySelector('#modalRating .rating-stars');
        const ratingText = document.querySelector('#modalRating span');
        if (ratingStars && ratingText) {
            ratingStars.innerHTML = '★'.repeat(Math.floor(data.rating)) + '☆'.repeat(5 - Math.floor(data.rating));
            ratingText.textContent = `${data.rating} (${data.reviews} reviews)`;
        }
        
        // Populate pricing
        document.getElementById('modalCurrentPrice').textContent = data.currentPrice;
        document.getElementById('modalOldPrice').textContent = data.oldPrice;
        
        // Set preview URL
        document.getElementById('livePreviewBtn').setAttribute('data-preview-url', data.previewUrl);
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    
    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
    }
    
    // Event listeners for preview buttons
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const templateId = this.getAttribute('data-template-id') || 
                              this.closest('.template-card').getAttribute('data-template-id') || '1';
            openModal(templateId);
        });
    });
    
    // Close modal when clicking X
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Live preview button functionality
    const livePreviewBtn = document.getElementById('livePreviewBtn');
    if (livePreviewBtn) {
        livePreviewBtn.addEventListener('click', function() {
            const previewUrl = this.getAttribute('data-preview-url');
            if (previewUrl) {
                window.open(previewUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
            }
        });
    }
    
    // Add to cart button functionality
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const templateTitle = document.getElementById('modalTemplateTitle').textContent;
            const templatePrice = document.getElementById('modalCurrentPrice').textContent;
            
            // Here you can add your cart functionality
            // For now, we'll show a success message
            showNotification(`"${templateTitle}" has been added to your cart! Price: ${templatePrice}`, 'success');
            
            // Optional: Close modal after adding to cart
            closeModal();
        });
    }
    
    // Notification function
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1001;
            max-width: 350px;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
});
