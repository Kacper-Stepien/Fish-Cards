"use strict";
// Flipping cards ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const card = document.getElementById('card');
const cardFront = document.getElementById('card-front');
const cardBack = document.getElementById('card-back');
function flipCard() {
    card.classList.toggle('is-flipped');
}
cardFront.addEventListener('click', flipCard);
cardBack.addEventListener('click', flipCard);
// Navigation of Sections ////////////////////////////////////////////////////////////////////////////////////////////////////////
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const mainMenuSection = document.getElementById('main-menu-section');
const displayCardsSection = document.getElementById('display-cards-section');
const addCardSection = document.getElementById('add-card-section');
const deleteCardsSection = document.getElementById('delete-cards-section');
const modifyCardsSection = document.getElementById('modify-cards-section');
const navAddCardBtn = document.getElementById('nav-add-card-btn');
const navStartPracticingBtn = document.getElementById('nav-start-practicing-btn');
const navDeleteCardsBtn = document.getElementById('nav-delete-card-btn');
const navModifyCardsBtn = document.getElementById('nav-modify-card-btn');
const backMainPageBtn = document.getElementById('back-main-page-btn');
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
navAddCardBtn.addEventListener('click', () => displaySection(addCardSection));
navStartPracticingBtn.addEventListener('click', () => displaySection(displayCardsSection));
navDeleteCardsBtn.addEventListener('click', () => displaySection(deleteCardsSection));
navModifyCardsBtn.addEventListener('click', () => displaySection(modifyCardsSection));
backMainPageBtn.addEventListener('click', displayMainMenu);
// Card Class ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Card {
    constructor(question, answer, category) {
        this.question = question;
        this.answer = answer;
        this.category = category;
    }
}
// Add new Card ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addCardForm = document.getElementById('add-card-form');
const addCardQuestionInput = document.getElementById('add-card-question-input');
const addCardAnswerInput = document.getElementById('add-card-answer-input');
const chooseCategorySelect = document.getElementById('choose-category-select');
const addNewCategoryInput = document.getElementById('add-new-category-input');
const addNewCategoryBtn = document.getElementById('add-new-category-btn');
const confirmAddCardBtn = document.getElementById('confirm-add-card-btn');
let allCards = getAllCardsFromLocalStorage();
let categories = getCategoriesFromLocalStorage();
addCategoriesToSelectElement();
function addNewCategoryToLocalStorage() {
    const newCategory = addNewCategoryInput.value;
    if (newCategory !== '' && !categories.includes(newCategory)) {
        categories.push(newCategory);
        localStorage.setItem('Memory-Cards-Categories', JSON.stringify(categories));
    }
}
function getCategoriesFromLocalStorage() {
    const allCategories = localStorage.getItem('Memory-Cards-Categories') ? JSON.parse(localStorage.getItem('Memory-Cards-Categories')) : [];
    return allCategories;
}
function addCategoriesToSelectElement() {
    chooseCategorySelect.innerHTML = '<option value="">Choose category</option>';
    categories.forEach(category => {
        chooseCategorySelect.innerHTML += `<option value="${category}">${category}</option>`;
    });
}
function clearNewCategoryInput() {
    addNewCategoryInput.value = '';
}
addNewCategoryBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let x = addNewCategoryInput.value;
    addNewCategoryToLocalStorage();
    categories = getCategoriesFromLocalStorage();
    addCategoriesToSelectElement();
    clearNewCategoryInput();
    chooseCategorySelect.value = x;
});
function getAllCardsFromLocalStorage() {
    let cards = localStorage.getItem('Memory-Cards-Cards') ? JSON.parse(localStorage.getItem('Memory-Cards-Cards')) : [];
    return cards;
}
function addCardToLocalStorage() {
    let question = addCardQuestionInput.value;
    let answer = addCardAnswerInput.value;
    let category = chooseCategorySelect.value === 'Choose category' ? '' : chooseCategorySelect.value;
    if (question !== '' && answer !== '') {
        let newCard = new Card(question, answer, category);
        allCards.push(newCard);
        localStorage.setItem('Memory-Cards-Cards', JSON.stringify(allCards));
    }
}
function clearForm() {
    addCardQuestionInput.value = '';
    addCardAnswerInput.value = '';
    chooseCategorySelect.value = 'Choose category';
}
confirmAddCardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addCardToLocalStorage();
    clearForm();
});
// Modify Cards ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const modifyCardsList = document.getElementById('modify-cards-list');
function displayCardsToModify(cards) {
    modifyCardsList.innerHTML = '';
    cards.forEach(card => {
        modifyCardsList.innerHTML += `<div class="modify-card-section__card">
                    <p class="modify-card-section__card-question">${card.question}</p>
                    <button class="modify-card-section__card-button"><i class="fa-solid fa-pen-to-square"></i></button>
                </div>`;
    });
}
displayCardsToModify(allCards);
// Delete Cards ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const deleteCardsList = document.getElementById('delete-cards-list');
const deleteCardConfirmationModal = document.getElementById('delete-card-confirmation');
const deleteCardModalQuestion = document.getElementById('delete-card-question');
const deleteCardModalYesBtn = document.getElementById('delete-card-confirmation__yes-btn');
const deleteCardModalNoBtn = document.getElementById('delete-card-confirmation__no-btn');
const overlay = document.getElementById('overlay');
let questionOfCardToDelete = '';
function displayCardsToDelete(cards) {
    deleteCardsList.innerHTML = '';
    cards.forEach(card => {
        deleteCardsList.innerHTML += `<div class="delete-card-section__card">
                                            <p class="delete-card-section__card-question">${card.question}</p>
                                            <button class="delete-card-section__card-button"><i class="fa-solid fa-trash"></i></button>
                                        </div>`;
    });
}
displayCardsToDelete(allCards);
deleteCardsList.addEventListener('click', (e) => {
    var _a;
    if (e.target !== null) {
        if (e.target !== deleteCardsList) {
            let clickedElement = e.target;
            let parent = clickedElement.closest('.delete-card-section__card');
            let title = (_a = clickedElement.querySelector('.delete-card-section__card-question')) === null || _a === void 0 ? void 0 : _a.textContent;
            if (title !== null && title !== undefined) {
                questionOfCardToDelete = title;
                showDeleteCardConfirmationModal(questionOfCardToDelete);
            }
        }
    }
});
function addBlurToElement(element) {
    element.classList.add('blurred');
}
function removeBlurFromElement(element) {
    element.classList.remove('blurred');
}
function showDeleteCardConfirmationModal(question) {
    deleteCardModalQuestion.textContent = question;
    deleteCardConfirmationModal.classList.remove('delete-card-confirmation__hidden');
    overlay.classList.remove('overlay-hidden');
    addBlurToElement(deleteCardsSection);
    addBlurToElement(header);
    addBlurToElement(footer);
}
function closeDeleteCardConfirmationModal() {
    deleteCardConfirmationModal.classList.add('delete-card-confirmation__hidden');
    overlay.classList.add('overlay-hidden');
    removeBlurFromElement(deleteCardsSection);
    removeBlurFromElement(header);
    removeBlurFromElement(footer);
}
function deleteCardFromLocalStorage(question) {
    allCards = allCards.filter(card => card.question !== question);
    localStorage.setItem('Memory-Cards-Cards', JSON.stringify(allCards));
}
deleteCardModalYesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deleteCardFromLocalStorage(questionOfCardToDelete);
    closeDeleteCardConfirmationModal();
    displayCardsToDelete(allCards);
    displayCardsToModify(allCards);
});
deleteCardModalNoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeDeleteCardConfirmationModal();
});
