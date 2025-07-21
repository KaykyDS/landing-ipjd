// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA PARA O MENU RESPONSIVO ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        // Abre e fecha o menu ao clicar no botão hambúrguer
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um dos links (útil para one-page sites)
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            });
        });
    }

    // --- LÓGICA PARA O CARROSSEL ---
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const items = document.querySelectorAll('.carousel-item');
    let currentItem = 0;
    let autoSlideInterval;

    function showItem(index) {
        // Esconde todos os itens
        items.forEach(item => item.classList.remove('active'));
        
        // Garante que o índice seja cíclico
        currentItem = (index + items.length) % items.length;
        
        // Mostra o item correto
        items[currentItem].classList.add('active');
    }

    function startAutoSlide() {
        // Troca de slide a cada 5 segundos
        autoSlideInterval = setInterval(() => {
            showItem(currentItem + 1);
        }, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (items.length > 1) {
        prevButton.addEventListener('click', () => {
            stopAutoSlide();
            showItem(currentItem - 1);
            startAutoSlide();
        });

        nextButton.addEventListener('click', () => {
            stopAutoSlide();
            showItem(currentItem + 1);
            startAutoSlide();
        });
        
        // Inicia a troca automática
        startAutoSlide();
        showItem(0); // Mostra o primeiro item ao carregar
    } else if (items.length === 1) {
        // Se houver apenas uma imagem, esconde os botões
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        showItem(0);
    }
});