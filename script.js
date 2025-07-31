// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA PARA O MENU RESPONSIVO E ANIMAÇÕES ---
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
    }

    // Animação do cabeçalho ao rolar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animação dos elementos ao rolar (Scroll Reveal)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- LÓGICA PARA O CARROSSEL ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const items = carouselContainer.querySelectorAll('.carousel-item');
        let currentItem = 0;
        let autoSlideInterval;

        if (items.length > 1) {
            function showItem(index) {
                currentItem = (index + items.length) % items.length;
                items.forEach(item => item.classList.remove('active'));
                items[currentItem].classList.add('active');
            }

            function resetAutoSlide() {
                clearInterval(autoSlideInterval);
                autoSlideInterval = setInterval(() => {
                    showItem(currentItem + 1);
                }, 5000);
            }

            let touchStartX = 0;
            carouselContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                clearInterval(autoSlideInterval);
            }, { passive: true });

            carouselContainer.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 50) { 
                    showItem(currentItem + 1);
                } else if (touchEndX - touchStartX > 50) {
                    showItem(currentItem - 1);
                }
                resetAutoSlide();
            });
            
            showItem(0);
            resetAutoSlide();
        } else if (items.length === 1) {
            items[0].classList.add('active');
        }
    }
    
    // --- LÓGICA PARA O MODAL DE VÍDEO ---
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('video-modal');

    if (videoModal) {
        const iframe = document.getElementById('video-iframe');
        const closeModalBtn = videoModal.querySelector('.close-modal');

        videoCards.forEach(card => {
            card.addEventListener('click', () => {
                const videoId = card.getAttribute('data-video-id');
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                videoModal.classList.add('active');
            });
        });

        const closeModal = () => {
            videoModal.classList.remove('active');
            iframe.src = ''; 
        }

        closeModalBtn.addEventListener('click', closeModal);

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeModal();
            }
        });
    }

    // --- LÓGICA PARA O MODAL DE EVENTOS ---
    const eventCards = document.querySelectorAll('.js-evento-card');
    const eventModal = document.getElementById('event-modal');
    
    if (eventModal) {
        const eventModalImg = document.getElementById('event-modal-img');
        const eventModalTitle = document.getElementById('event-modal-title');
        const eventModalDate = document.getElementById('event-modal-date');
        const eventModalDescription = document.getElementById('event-modal-description');
        const closeEventModalBtn = eventModal.querySelector('.close-modal');

        eventCards.forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('img').src;
                const title = card.querySelector('h3').textContent;
                const date = card.querySelector('.evento-data').textContent;
                const description = card.querySelector('p:last-of-type').textContent;

                eventModalImg.src = img;
                eventModalTitle.textContent = title;
                eventModalDate.textContent = date;
                eventModalDescription.textContent = description;

                eventModal.classList.add('active');
            });
        });

        const closeEventModal = () => {
            eventModal.classList.remove('active');
        }

        closeEventModalBtn.addEventListener('click', closeEventModal);

        eventModal.addEventListener('click', (e) => {
            if (e.target === eventModal) {
                closeEventModal();
            }
        });
    }
});