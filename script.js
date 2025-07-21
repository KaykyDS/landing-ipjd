// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA PARA O MENU RESPONSIVO E ANIMAÇÕES ---
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Animação do ícone do menu
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('active'); // Adiciona/remove classe do botão
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
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- LÓGICA PARA O CARROSSEL ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return; 

    const items = carouselContainer.querySelectorAll('.carousel-item');
    let currentItem = 0;
    let autoSlideInterval;

    if (items.length <= 1) {
        if (items.length === 1) items[0].classList.add('active');
        return;
    }

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
});