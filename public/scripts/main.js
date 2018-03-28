const menuBtn = document.querySelector('.menu-button');
const ingredientsBtn = document.querySelector('.more-ingredients');
const stepsBtn = document.querySelector('.more-steps');

menuBtn.addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('menu-visible');
});

if (ingredientsBtn) {
    ingredientsBtn.addEventListener('click', () => {
        let ingredients = document.querySelector('.ingredients');
        let elem = document.createElement('input');
        elem.setAttribute('type', 'text');
        elem.setAttribute('name', 'ingredients[]');
        ingredients.appendChild(elem);
        ingredients.lastChild.focus();
    });
};

if (stepsBtn) {
    stepsBtn.addEventListener('click', () => {
        let steps = document.querySelector('.steps');
        let elem = document.createElement('div');
        elem.innerHTML = `<textarea name="steps[]" cols="10" rows="5"></textarea>`;
        steps.appendChild(elem);
        steps.lastChild.lastChild.focus();
    });
};