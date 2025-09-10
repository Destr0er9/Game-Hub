// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on links
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.menu-toggle')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Logo click handler
function initLogoClick() {
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        
        // Add cursor pointer style
        logoContainer.style.cursor = 'pointer';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initLogoClick();
    
    // Your existing code
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('scroll', () => {
        const scrollTopButton = document.querySelector('.scroll-top');
        if (window.scrollY > 300) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
        
        // Header scroll effect
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const cards = document.querySelectorAll('[data-parallax="card"]');
    let index = 0;
    for (const card of cards) {
        card.style.setProperty('--index', index++);
    }

    function filterGames() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const gameCards = document.querySelectorAll('.game-card');
        
        const genreFilters = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(input => input.value);
        const platformFilters = Array.from(document.querySelectorAll('input[name="platform"]:checked')).map(input => input.value);
        const priceFilters = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(input => input.value);
        const languageFilters = Array.from(document.querySelectorAll('input[name="language"]:checked')).map(input => input.value);
        const playersFilters = Array.from(document.querySelectorAll('input[name="players"]:checked')).map(input => input.value);
        const controllerFilters = Array.from(document.querySelectorAll('input[name="controller"]:checked')).map(input => input.value);

        gameCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const genres = card.getAttribute('data-genre').split(',');
            const platforms = card.getAttribute('data-platform').split(',');
            const price = card.getAttribute('data-price');
            const languages = card.getAttribute('data-language').split(',');
            const players = card.getAttribute('data-players').split(',');
            const controller = card.getAttribute('data-controller');

            const matchesSearch = title.includes(searchInput);
            const matchesGenre = genreFilters.length === 0 || genres.some(genre => genreFilters.includes(genre));
            const matchesPlatform = platformFilters.length === 0 || platforms.some(platform => platformFilters.includes(platform));
            const matchesPrice = priceFilters.length === 0 || priceFilters.includes(price);
            const matchesLanguage = languageFilters.length === 0 || languages.some(language => languageFilters.includes(language));
            const matchesPlayers = playersFilters.length === 0 || players.some(player => playersFilters.includes(player));
            const matchesController = controllerFilters.length === 0 || controllerFilters.includes(controller);

            if (matchesSearch && matchesGenre && matchesPlatform && matchesPrice && matchesLanguage && matchesPlayers && matchesController) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Make filterGames function available globally
    window.filterGames = filterGames;
    window.scrollToTop = scrollToTop;
    
    // Add padding to sections to account for fixed header
    const adjustSectionPadding = () => {
        const headerHeight = document.querySelector('header').offsetHeight;
        const sections = document.querySelectorAll('.games-section, .news-section, .trailers-section');
        
        sections.forEach(section => {
            section.style.paddingTop = `${headerHeight + 40}px`;
        });
        
        // Adjust hero section margin
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.paddingTop = `${headerHeight}px`;
        }
    };
    
    adjustSectionPadding();
    window.addEventListener('resize', adjustSectionPadding);
});