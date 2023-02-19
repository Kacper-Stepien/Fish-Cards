// Flipping cards ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const card = document.getElementById('card') as HTMLDivElement;
const cardFront = document.getElementById('card-front') as HTMLDivElement;
const cardBack = document.getElementById('card-back') as HTMLDivElement;

function flipCard() {
  card.classList.toggle('is-flipped');
}

cardFront.addEventListener('click', flipCard);
cardBack.addEventListener('click', flipCard);


// Navigation of Sections ////////////////////////////////////////////////////////////////////////////////////////////////////////
const mainMenuSection = document.getElementById('main-menu-section') as HTMLDivElement;
const displayCardsSection = document.getElementById('display-cards-section') as HTMLDivElement;
const addCardSection = document.getElementById('add-card-section') as HTMLDivElement;
const deleteCardsSection = document.getElementById('delete-cards-section') as HTMLDivElement;
const modifyCardsSection = document.getElementById('modify-cards-section') as HTMLDivElement;

const navAddCardBtn = document.getElementById('nav-add-card-btn') as HTMLElement;
const navStartPracticingBtn = document.getElementById('nav-start-practicing-btn') as HTMLElement;
const navDeleteCardsBtn = document.getElementById('nav-delete-card-btn') as HTMLElement;
const navModifyCardsBtn = document.getElementById('nav-modify-card-btn') as HTMLElement;

const backMainPageBtn = document.getElementById('back-main-page-btn') as HTMLElement;

function displayMainMenu() {
    mainMenuSection.classList.remove('hidden-section-left');
    addCardSection.classList.add('hidden-section-right');
    displayCardsSection.classList.add('hidden-section-right');
    deleteCardsSection.classList.add('hidden-section-right');
    modifyCardsSection.classList.add('hidden-section-right');
    backMainPageBtn.classList.add('hidden');
}

function displaySection(section: HTMLDivElement) {
    mainMenuSection.classList.add('hidden-section-left');
    section.classList.remove('hidden-section-right');
    backMainPageBtn.classList.remove('hidden');
}

navAddCardBtn.addEventListener('click', () => displaySection(addCardSection));
navStartPracticingBtn.addEventListener('click', () => displaySection(displayCardsSection));
navDeleteCardsBtn.addEventListener('click', () => displaySection(deleteCardsSection));
navModifyCardsBtn.addEventListener('click', () => displaySection(modifyCardsSection));
backMainPageBtn.addEventListener('click', displayMainMenu);

// Card Class ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Card {

}