"use strict";
// Flipping cards ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var card = document.getElementById('card');
var cardFront = document.getElementById('card-front');
var cardBack = document.getElementById('card-back');
function flipCard() {
    card.classList.toggle('is-flipped');
}
cardFront.addEventListener('click', flipCard);
cardBack.addEventListener('click', flipCard);
// Navigation of Sections ////////////////////////////////////////////////////////////////////////////////////////////////////////
var mainMenuSection = document.getElementById('main-menu-section');
var displayCardsSection = document.getElementById('display-cards-section');
var addCardSection = document.getElementById('add-card-section');
var deleteCardsSection = document.getElementById('delete-cards-section');
var modifyCardsSection = document.getElementById('modify-cards-section');
var navAddCardBtn = document.getElementById('nav-add-card-btn');
var navStartPracticingBtn = document.getElementById('nav-start-practicing-btn');
var navDeleteCardsBtn = document.getElementById('nav-delete-card-btn');
var navModifyCardsBtn = document.getElementById('nav-modify-card-btn');
var backMainPageBtn = document.getElementById('back-main-page-btn');
function displayMainMenu() {
    mainMenuSection.classList.remove('hidden-section-left');
    addCardSection.classList.add('hidden-section-right');
    displayCardsSection.classList.add('hidden-section-right');
    deleteCardsSection.classList.add('hidden-section-right');
    modifyCardsSection.classList.add('hidden-section-right');
    backMainPageBtn.classList.add('hidden');
}
function displaySection(section) {
    mainMenuSection.classList.add('hidden-section-left');
    section.classList.remove('hidden-section-right');
    backMainPageBtn.classList.remove('hidden');
}
navAddCardBtn.addEventListener('click', function () { return displaySection(addCardSection); });
navStartPracticingBtn.addEventListener('click', function () { return displaySection(displayCardsSection); });
navDeleteCardsBtn.addEventListener('click', function () { return displaySection(deleteCardsSection); });
navModifyCardsBtn.addEventListener('click', function () { return displaySection(modifyCardsSection); });
backMainPageBtn.addEventListener('click', displayMainMenu);
// Card Class ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Card = /** @class */ (function () {
    function Card() {
    }
    return Card;
}());
