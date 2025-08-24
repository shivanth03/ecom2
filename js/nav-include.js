// Robust header include and link rewriting for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Determine correct nav.html path
    const navPath = window.location.pathname.includes('/Pages/') ? '../includes/nav.html' : 'includes/nav.html';
    fetch(navPath)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const header = doc.querySelector('header');
            if (header) {
                // Fix image paths for /Pages/
                if (window.location.pathname.includes('/Pages/')) {
                    header.querySelectorAll('img').forEach(img => {
                        if (img.src.includes('images/')) {
                            img.src = img.src.replace('images/', '../images/');
                        }
                    });
                    // Rewrite all header links
                    header.querySelectorAll('a').forEach(link => {
                        let href = link.getAttribute('href');
                        if (!href) return;
                        // Home link
                        if (href === 'index.html') {
                            link.setAttribute('href', '../index.html');
                        }
                        // Pages/xxx.html links
                        else if (href.startsWith('Pages/')) {
                            link.setAttribute('href', href.replace('Pages/', ''));
                        }
                        // Already relative (xxx.html)
                        else if (/^[a-zA-Z0-9_-]+\.html$/.test(href)) {
                            link.setAttribute('href', href);
                        }
                        // Other links (external, etc.)
                        else {
                            link.setAttribute('href', href);
                        }
                    });
                }
                // Inject header
                const navPlaceholder = document.getElementById('nav-placeholder');
                if (navPlaceholder) {
                    navPlaceholder.innerHTML = header.outerHTML;
                }
            }
        });
});
            if (navPlaceholder) {
                navPlaceholder.innerHTML = header.outerHTML;
            } else if (headerPlaceholder) {
                headerPlaceholder.innerHTML = header.outerHTML;
            }
// ...existing code...

// Fallback function to load header and footer separately
function loadSeparateIncludes() {
    const basePath = window.location.pathname.includes('/Pages/') ? '../includes/' : 'includes/';
    
    // Load header
    fetch(basePath + 'header.html')
        .then(response => response.text())
        .then(data => {
            const navPlaceholder = document.getElementById('nav-placeholder');
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (navPlaceholder) {
                navPlaceholder.innerHTML = data;
            } else if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
            }
            initializeMobileMenu();
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer  
    fetch(basePath + 'footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
    .catch(error => console.error('Error loading footer:', error));

}