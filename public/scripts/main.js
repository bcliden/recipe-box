const menuButton = document.querySelector('.menu-button');

menuButton.addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('menu-visible');
})