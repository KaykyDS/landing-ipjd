// script.js

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (navToggle && mainNavUl) {
        navToggle.addEventListener('click', function() {
            mainNavUl.classList.toggle('active');
        });

        // Opcional: Fechar o menu ao clicar em um link (para single-page applications)
        const navLinks = document.querySelectorAll('.main-nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mainNavUl.classList.contains('active')) {
                    mainNavUl.classList.remove('active');
                }
            });
        });
    }
});