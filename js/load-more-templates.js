// Load More Templates Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const templatesGrid = document.querySelector('.templates-container');
    
    // Initially hide some template cards (keep first 6 visible)
    const templateCards = document.querySelectorAll('.template-card');
    const initialVisible = 6;
    let currentlyVisible = initialVisible;
    
    // Hide cards beyond the initial visible count
    templateCards.forEach((card, index) => {
        if (index >= initialVisible) {
            card.classList.add('hidden');
        }
    });
    
    // Check if load more button is needed
    if (templateCards.length <= initialVisible) {
        loadMoreBtn.style.display = 'none';
    }
    
    // Load More Button Click Event
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show loading state
            loadMoreBtn.style.display = 'none';
            loadingSpinner.style.display = 'block';
            
            // Simulate loading delay for better UX
            setTimeout(() => {
                const toShow = 6; // Show 6 more templates each time
                let shown = 0;
                
                // Show next set of hidden templates
                templateCards.forEach((card, index) => {
                    if (index >= currentlyVisible && index < currentlyVisible + toShow && card.classList.contains('hidden')) {
                        card.classList.remove('hidden');
                        shown++;
                    }
                });
                
                currentlyVisible += shown;
                
                // Hide loading spinner
                loadingSpinner.style.display = 'none';
                
                // Show/hide load more button based on remaining templates
                if (currentlyVisible >= templateCards.length) {
                    loadMoreBtn.style.display = 'none';
                    // Optionally show "All templates loaded" message
                    const allLoadedMsg = document.createElement('p');
                    allLoadedMsg.textContent = 'All templates loaded!';
                    allLoadedMsg.style.color = '#667eea';
                    allLoadedMsg.style.fontWeight = '600';
                    allLoadedMsg.style.textAlign = 'center';
                    allLoadedMsg.style.marginTop = '2rem';
                    document.querySelector('.load-more-container').appendChild(allLoadedMsg);
                } else {
                    loadMoreBtn.style.display = 'inline-flex';
                }
                
                // Smooth scroll to new content
                if (shown > 0) {
                    const newlyVisibleCard = templateCards[currentlyVisible - shown];
                    if (newlyVisibleCard) {
                        newlyVisibleCard.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }
            }, 800); // 800ms delay to show loading state
        });
    }
});

// Optional: Add animation for newly loaded templates
function animateNewTemplates(startIndex, count) {
    const templateCards = document.querySelectorAll('.template-card');
    
    for (let i = startIndex; i < startIndex + count && i < templateCards.length; i++) {
        const card = templateCards[i];
        if (card && !card.classList.contains('hidden')) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, (i - startIndex) * 100); // Stagger animation
        }
    }
}
