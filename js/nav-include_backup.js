// Navigation Include Script
// This script loads the header and footer from nav.html into any page

document.addEventListener('DOMContentLoaded', function() {
    // Function to load external HTML content
    function loadHTML(url, targetId) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.innerHTML = data;
                    
                    // Execute any scripts in the loaded content
                    const scripts = targetElement.getElementsByTagName('script');
                    for (let i = 0; i < scripts.length; i++) {
                        const script = scripts[i];
                        const newScript = document.createElement('script');
                        if (script.src) {
                            newScript.src = script.src;
                        } else {
                            newScript.textContent = script.textContent;
                        }
                        document.head.appendChild(newScript);
                    }
                }
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
            });
    }

    // Load header if header-placeholder exists
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        loadHTML('includes/header.html', 'header-placeholder');
    }

    // Load footer if footer-placeholder exists  
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        loadHTML('includes/footer.html', 'footer-placeholder');
    }
});

// Alternative method using jQuery if available
function loadNavigation() {
    if (typeof $ !== 'undefined') {
        // Load header
        if ($('#header-placeholder').length) {
            $('#header-placeholder').load('includes/nav.html header');
        }
        
        // Load footer
        if ($('#footer-placeholder').length) {
            $('#footer-placeholder').load('includes/nav.html footer, .back-to-top, script');
        }
    }
}
