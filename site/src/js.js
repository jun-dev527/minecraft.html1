document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle functionality for the responsive navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !expanded);
            document.body.classList.toggle('menu-open', !expanded);
            
            // If closing menu, add a delay to allow for animation
            if (expanded) {
                setTimeout(() => {
                    navWrapper.style.visibility = 'hidden';
                }, 400);
            } else {
                navWrapper.style.visibility = 'visible';
            }
        });
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if the href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Calculate offset to account for fixed header
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20; // 20px extra padding
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация появления карточек на странице
    function setupAnimatedCards() {
        // Подготовка карточек для анимации
        const cards = document.querySelectorAll('.modpack-card, .news-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        // Настройка IntersectionObserver для отслеживания видимости элементов
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Когда элемент становится видимым, сделать его полностью непрозрачным
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // Прекратить наблюдение после того, как элемент стал видимым
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Наблюдение за всеми карточками
        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // Запуск анимации после загрузки страницы
    setupAnimatedCards();

    // Parallax effect for background
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const backgroundOverlay = document.querySelector('.background-overlay');
        if (backgroundOverlay) {
            backgroundOverlay.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        }
    });

    // Live player count simulation
    function updateOnlinePlayers() {
        const onlineElements = document.querySelectorAll('.online');
        onlineElements.forEach(element => {
            // In a real project, this would be an API call to the server
            const randomChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const countText = element.textContent.match(/\d+/);
            if (countText) {
                const currentOnline = parseInt(countText[0]);
                const newOnline = Math.max(0, currentOnline + randomChange);
                element.innerHTML = `<i class="player-icon"></i>Онлайн: ${newOnline}`;
            }
        });
    }

    // Update player count every 30 seconds
    setInterval(updateOnlinePlayers, 30000);
}); 