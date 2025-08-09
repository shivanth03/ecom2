// Function to load nav include (header + footer from nav.html)
document.addEventListener('DOMContentLoaded', function() {
    loadNavInclude();
});

// Function to load the full navigation structure
function loadNavInclude() {
    fetch('includes/nav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Split nav.html into header and footer parts
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            
            // Get header
            const header = doc.querySelector('header');
            if (header) {
                const headerPlaceholder = document.getElementById('header-placeholder');
                if (headerPlaceholder) {
                    headerPlaceholder.innerHTML = header.outerHTML;
                }
            }
            
            // Get footer
            const footer = doc.querySelector('footer');
            if (footer) {
                const footerPlaceholder = document.getElementById('footer-placeholder');
                if (footerPlaceholder) {
                    footerPlaceholder.innerHTML = footer.outerHTML;
                }
            }
            
            // Get back to top button
            const backToTop = doc.querySelector('.back-to-top');
            if (backToTop) {
                document.body.appendChild(backToTop);
            }
            
            // Execute any scripts that were in the nav.html
            const scripts = doc.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.innerHTML.trim()) {
                    const newScript = document.createElement('script');
                    newScript.innerHTML = script.innerHTML;
                    document.body.appendChild(newScript);
                }
            });
        })
        .catch(error => {
            console.error('Error loading nav:', error);
            // Fallback: try to load header and footer separately
            loadSeparateIncludes();
        });
}

// Fallback function to load header and footer separately
function loadSeparateIncludes() {
    // Load header
    fetch('includes/header.html')
        .then(response => response.text())
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer  
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}