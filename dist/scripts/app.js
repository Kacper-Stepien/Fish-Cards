const cardFront = document.getElementById('card-front');
const cardBack = document.getElementById('card-back');

const card = document.getElementById('card');

function flipCard() {
    card.classList.toggle('is-switched');
}

cardFront.addEventListener('click', flipCard);

cardBack.addEventListener('click', flipCard);