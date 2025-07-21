// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Menu responsivo
    const navToggle = document.querySelector('.nav-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (navToggle && mainNavUl) {
        navToggle.addEventListener('click', function() {
            mainNavUl.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.main-nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mainNavUl.classList.contains('active')) {
                    mainNavUl.classList.remove('active');
                }
            });
        });
    }

    // Carrossel
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const items = document.querySelectorAll('.carousel-item');
    let currentItem = 0;

    function showItem(index) {
        items.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    }

    if (prevButton && nextButton && items.length > 0) {
        prevButton.addEventListener('click', () => {
            currentItem = (currentItem - 1 + items.length) % items.length;
            showItem(currentItem);
        });

        nextButton.addEventListener('click', () => {
            currentItem = (currentItem + 1) % items.length;
            showItem(currentItem);
        });

        // Troca automática de slides a cada 5 segundos
        setInterval(() => {
            currentItem = (currentItem + 1) % items.length;
            showItem(currentItem);
        }, 5000);

        showItem(currentItem); // Mostra o primeiro item ao carregar
    }
});