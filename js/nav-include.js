// Function to load nav include (header + footer from nav.html)
document.addEventListener('DOMContentLoaded', function() {
    loadNavInclude();
});

// Function to load the full navigation structure
function loadNavInclude() {
    // Determine the correct path based on current location
    const navPath = window.location.pathname.includes('/Pages/') ? '../includes/nav.html' : 'includes/nav.html';
    
    fetch(navPath)
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
            
            // Get header - try both nav-placeholder and header-placeholder
            const header = doc.querySelector('header');
            if (header) {
                // Fix paths for Pages subdirectory
                if (window.location.pathname.includes('/Pages/')) {
                    // Update image sources
                    const images = header.querySelectorAll('img');
                    images.forEach(img => {
                        if (img.src.includes('images/')) {
                            img.src = img.src.replace('images/', '../images/');
                        }
                    });
                    
                    // Update links to root pages
                    const links = header.querySelectorAll('a');
                    links.forEach(link => {
                        if (link.href.includes('index.html') && !link.href.includes('../')) {
                            link.href = '../index.html';
                        }
                    });
                }
                
                const navPlaceholder = document.getElementById('nav-placeholder');
                const headerPlaceholder = document.getElementById('header-placeholder');
                if (navPlaceholder) {
                    navPlaceholder.innerHTML = header.outerHTML;
                } else if (headerPlaceholder) {
                    headerPlaceholder.innerHTML = header.outerHTML;
                }
            }
            
            // Get footer
            const footer = doc.querySelector('footer');
            if (footer) {
                // Fix paths for Pages subdirectory
                if (window.location.pathname.includes('/Pages/')) {
                    // Update image sources in footer
                    const images = footer.querySelectorAll('img');
                    images.forEach(img => {
                        if (img.src.includes('images/')) {
                            img.src = img.src.replace('images/', '../images/');
                        }
                    });
                    
                    // Update links in footer
                    const links = footer.querySelectorAll('a');
                    links.forEach(link => {
                        if (link.href.includes('index.html') && !link.href.includes('../')) {
                            link.href = '../index.html';
                        }
                    });
                }
                
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
            
            // Initialize mobile menu after loading
            initializeMobileMenu();
        })
        .catch(error => {
            console.error('Error loading nav:', error);
            // Fallback: try to load header and footer separately
            loadSeparateIncludes();
        });
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const closeBtn = document.querySelector('.close');

    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            navList.classList.add('active');
        });
    }

    if (closeBtn && navList) {
        closeBtn.addEventListener('click', function() {
            navList.classList.remove('active');
        });
    }
}

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