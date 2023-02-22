"use strict";
///////////////////////////////////////////////////////////// GLOBAL VARIABLES /////////////////////////////////////////////////////////////
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const mainMenuSection = document.getElementById('main-menu-section');
const displayCardsSection = document.getElementById('display-cards-section');
const addCardSection = document.getElementById('add-card-section');
const deleteCardsSection = document.getElementById('delete-cards-section');
const modifyCardsSection = document.getElementById('modify-cards-section');
const modifyCardsSection2 = document.getElementById('modify-card-section');
const navAddCardBtn = document.getElementById('nav-add-card-btn');
const navStartPracticingBtn = document.getElementById('nav-start-practicing-btn');
const navDeleteCardsBtn = document.getElementById('nav-delete-card-btn');
const navModifyCardsBtn = document.getElementById('nav-modify-card-btn');
const backMainPageBtn = document.getElementById('back-main-page-btn');
const addCardForm = document.getElementById('add-card-form');
const addCardQuestionInput = document.getElementById('add-card-question-input');
const addCardAnswerInput = document.getElementById('add-card-answer-input');
const chooseCategorySelect = document.getElementById('choose-category-select');
const addNewCategoryInput = document.getElementById('add-new-category-input');
const addNewCategoryBtn = document.getElementById('add-new-category-btn');
const confirmAddCardBtn = document.getElementById('confirm-add-card-btn');
const modifyCardsList = document.getElementById('modify-cards-list');
const modifyCardQuestionInput = document.getElementById('modify-card-question-input');
const modifyCardAnswerInput = document.getElementById('modify-card-answer-input');
const modifyCardCategorySelect = document.getElementById('modify-choose-category-select');
const modifyCardNewCategoryInput = document.getElementById('modify-new-category-input');
const modifyCardNewCategoryBtn = document.getElementById('modify-new-category-btn');
const modifyCardConfirmBtn = document.getElementById('confirm-modify-card-btn');
const deleteCardsList = document.getElementById('delete-cards-list');
const deleteCardConfirmationModal = document.getElementById('delete-card-confirmation');
const deleteCardModalQuestion = document.getElementById('delete-card-question');
const deleteCardModalYesBtn = document.getElementById('delete-card-confirmation__yes-btn');
const deleteCardModalNoBtn = document.getElementById('delete-card-confirmation__no-btn');
const overlay = document.getElementById('overlay');
const displayCardsContainer = document.getElementById('display-cards-container');
const prevCardBtn = document.getElementById('prev-card');
const nextCardBtn = document.getElementById('next-card');
const currentCardIndexSpan = document.getElementById('current-card');
const totalCardsNumber = document.getElementById('total-cards');
const errorModal = document.getElementById('modal-with-errors');
const errorModalMessage = document.getElementById('modal-with-errors-text');
const errorModalBtn = document.getElementById('modal-with-errors-btn');
///////////////////////////////////////////////////////////// CARD CLASS /////////////////////////////////////////////////////////////
class Card {
    constructor(question, answer, category) {
        this.question = question;
        this.answer = answer;
        this.category = category;
    }
    setQuestion(question) {
        this.question = question;
    }
    setAnswer(answer) {
        this.answer = answer;
    }
    setCategory(category) {
        this.category = category;
    }
    createCardHTMLElement() {
        return `<div class="card">
                    <div class="card__wrapper">
                        <div class="card__front is-active">
                            <p class="card__front-text">${this.question}</p>
                            <i class="fa-solid fa-rotate card__icon"></i>
                        </div>
                        <div class="card__back">
                            <p class="card__back-text">${this.answer}</p>
                            <i class="fa-solid fa-rotate card__icon"></i>
                        </div>
                    </div> 
                </div>`;
    }
    createCardRightHTMLElement() {
        return `<div class="card card-right">
                    <div class="card__wrapper">
                        <div class="card__front is-active">
                            <p class="card__front-text">${this.question}</p>
                            <i class="fa-solid fa-rotate card__icon"></i>
                        </div>
                        <div class="card__back">
                            <p class="card__back-text">${this.answer}</p>
                            <i class="fa-solid fa-rotate card__icon"></i>
                        </div>
                    </div>
                </div>`;
    }
}
///////////////////////////////////////////////////////////// INITIALIZE /////////////////////////////////////////////////////////////
let allCards = getAllCardsFromLocalStorage();
let allCardsElement = createCardsHTMLElementsArray(allCards, '');
let categories = getCategoriesFromLocalStorage();
let currentCardIndex = 0;
let cardQuestionToModify = '';
let cardQuestionToDelete = '';
addCategoriesToSelectElement(chooseCategorySelect);
updateView();
function updateView() {
    updateCounter();
    addCardsToDOM(createCardsHTMLElementsArray(allCards, ''));
    addEventListenerToAllCards();
    displayCardsToModify(allCards);
    displayCardsToDelete(allCards);
    clearForm();
}
////////////////////////////////////////////////////////// NAVIGATION ////////////////////////////////////////////////////////////////
function moveSectionToRight(section) {
    section.classList.add('hidden-section-right');
}
function moveSectionToCenter(section) {
    section.classList.remove('hidden-section-right');
    section.classList.remove('hidden-section-left');
}
function moveSectionToLeft(section) {
    section.classList.add('hidden-section-left');
}
function displayMainMenu() {
    moveSectionToCenter(mainMenuSection);
    moveSectionToRight(addCardSection);
    moveSectionToRight(displayCardsSection);
    moveSectionToRight(deleteCardsSection);
    moveSectionToRight(modifyCardsSection);
    backMainPageBtn.classList.add('hidden');
}
function displaySection(section) {
    moveSectionToLeft(mainMenuSection);
    moveSectionToCenter(section);
    backMainPageBtn.classList.remove('hidden');
}
navAddCardBtn.addEventListener('click', () => displaySection(addCardSection));
navStartPracticingBtn.addEventListener('click', () => displaySection(displayCardsSection));
navDeleteCardsBtn.addEventListener('click', () => displaySection(deleteCardsSection));
navModifyCardsBtn.addEventListener('click', () => displaySection(modifyCardsSection));
backMainPageBtn.addEventListener('click', () => {
    if (!modifyCardsSection2.classList.contains('hidden-section-right')) {
        moveSectionToRight(modifyCardsSection2);
        moveSectionToCenter(modifyCardsSection);
    }
    else {
        displayMainMenu();
    }
});
///////////////////////////////////////////////////////////// ADD NEW CARD /////////////////////////////////////////////////////////////
function validateCardData(question, answer) {
    if (question === '' || answer === '') {
        return false;
    }
    ;
    return true;
}
function checkIfQuestionExists(question) {
    let questionExists = false;
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].question.toLowerCase() === question.toLowerCase()) {
            questionExists = true;
            break;
        }
    }
    return questionExists;
}
function addNewCategoryToLocalStorage(newCategory) {
    if (newCategory !== '' && !categories.includes(newCategory)) {
        categories.push(newCategory);
        localStorage.setItem('Memory-Cards-Categories', JSON.stringify(categories));
    }
}
function getCategoriesFromLocalStorage() {
    const allCategories = localStorage.getItem('Memory-Cards-Categories') ? JSON.parse(localStorage.getItem('Memory-Cards-Categories')) : [];
    return allCategories;
}
function addCategoriesToSelectElement(select) {
    select.innerHTML = '<option value="">Choose category</option>';
    categories.forEach(category => {
        select.innerHTML += `<option value="${category}">${category}</option>`;
    });
}
function clearInput(input) {
    input.value = '';
}
addNewCategoryBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let newCategory = addNewCategoryInput.value;
    addNewCategoryToLocalStorage(newCategory);
    categories = getCategoriesFromLocalStorage();
    addCategoriesToSelectElement(chooseCategorySelect);
    clearInput(addNewCategoryInput);
    chooseCategorySelect.value = newCategory;
});
function getAllCardsFromLocalStorage() {
    let dataFromLocalStorage = localStorage.getItem('Memory-Cards-Cards') ? JSON.parse(localStorage.getItem('Memory-Cards-Cards')) : [];
    let cards = [];
    dataFromLocalStorage.forEach((card) => {
        cards.push(new Card(card.question, card.answer, card.category));
    });
    return cards;
}
function addCardToLocalStorage(question, answer, category) {
    let newCard = new Card(question, answer, category);
    allCards.push(newCard);
    localStorage.setItem('Memory-Cards-Cards', JSON.stringify(allCards));
}
function clearForm() {
    clearInput(addCardQuestionInput);
    clearInput(addCardAnswerInput);
    clearInput(chooseCategorySelect);
}
confirmAddCardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let question = addCardQuestionInput.value;
    let answer = addCardAnswerInput.value;
    let category = chooseCategorySelect.value;
    if (checkIfQuestionExists(question)) {
        openErrorModal('This question already exists');
    }
    else if (!validateCardData(question, answer)) {
        openErrorModal('Please fill in all fields');
    }
    else {
        addCardToLocalStorage(question, answer, category);
        updateView();
        openErrorModal('Card added successfully');
    }
});
///////////////////////////////////////////////////////////// MODIFY CARDS /////////////////////////////////////////////////////////////
function displayCardsToModify(cards) {
    modifyCardsList.innerHTML = '';
    cards.forEach(card => {
        modifyCardsList.innerHTML += `<div class="modify-card-section__card">
                    <p class="modify-card-section__card-question">${card.question}</p>
                    <button class="modify-card-section__card-button"><i class="fa-solid fa-pen-to-square"></i></button>
                </div>`;
    });
}
function getCardAnswerByQuestion(question) {
    let answer = '';
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].question === question) {
            answer = allCards[i].answer;
            break;
        }
    }
    return answer;
}
function getCardCategoryByQuestion(question) {
    let category = '';
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].question === question) {
            category = allCards[i].category;
            break;
        }
    }
    return category;
}
function changeCardData(question, answer, category) {
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].question === cardQuestionToModify) {
            allCards[i].question = question;
            allCards[i].answer = answer;
            allCards[i].category = category;
            break;
        }
    }
    localStorage.setItem('Memory-Cards-Cards', JSON.stringify(allCards));
}
function displayModifyCardForm(question, answer, category) {
    modifyCardCategorySelect.innerHTML = '<option value="">Choose category</option>';
    categories.forEach(category => {
        modifyCardCategorySelect.innerHTML += `<option value="${category}">${category}</option>`;
    });
    modifyCardQuestionInput.value = question;
    modifyCardAnswerInput.value = answer;
    modifyCardCategorySelect.value = category;
    moveSectionToCenter(modifyCardsSection2);
    moveSectionToLeft(modifyCardsSection);
}
modifyCardsList.addEventListener('click', (e) => {
    var _a;
    if (e.target !== null) {
        if (e.target !== modifyCardsList) {
            let clickedElement = e.target;
            let cardToModify = clickedElement.closest('.modify-card-section__card');
            let question = (_a = cardToModify.querySelector('.modify-card-section__card-question')) === null || _a === void 0 ? void 0 : _a.textContent;
            let answer = getCardAnswerByQuestion(question);
            let category = getCardCategoryByQuestion(question);
            cardQuestionToModify = question;
            displayModifyCardForm(question, answer, category);
        }
    }
});
modifyCardConfirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let question = modifyCardQuestionInput.value;
    let answer = modifyCardAnswerInput.value;
    let category = modifyCardCategorySelect.value === 'Choose category' ? '' : modifyCardCategorySelect.value;
    if (!validateCardData(question, answer)) {
        openErrorModal('Please fill in all fields');
    }
    else {
        changeCardData(question, answer, category);
        updateView();
        openErrorModal('Card modified successfully');
        moveSectionToCenter(modifyCardsSection);
        moveSectionToCenter(modifyCardsSection2);
    }
});
modifyCardNewCategoryBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let newCategory = modifyCardNewCategoryInput.value;
    addNewCategoryToLocalStorage(newCategory);
    categories = getCategoriesFromLocalStorage();
    addCategoriesToSelectElement(modifyCardCategorySelect);
    addCategoriesToSelectElement(chooseCategorySelect);
    clearInput(modifyCardNewCategoryInput);
    modifyCardCategorySelect.value = newCategory;
});
///////////////////////////////////////////////////////////// DELETE CARDS /////////////////////////////////////////////////////////////
function displayCardsToDelete(cards) {
    deleteCardsList.innerHTML = '';
    cards.forEach(card => {
        deleteCardsList.innerHTML += `<div class="delete-card-section__card">
                                            <p class="delete-card-section__card-question">${card.question}</p>
                                            <button class="delete-card-section__card-button"><i class="fa-solid fa-trash"></i></button>
                                        </div>`;
    });
}
deleteCardsList.addEventListener('click', (e) => {
    var _a;
    if (e.target !== null) {
        if (e.target !== deleteCardsList) {
            let clickedElement = e.target;
            let parent = clickedElement.closest('.delete-card-section__card');
            let title = (_a = parent.querySelector('.delete-card-section__card-question')) === null || _a === void 0 ? void 0 : _a.textContent;
            if (title !== null && title !== undefined) {
                cardQuestionToDelete = title;
                showDeleteCardConfirmationModal(cardQuestionToDelete);
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
    deleteCardFromLocalStorage(cardQuestionToDelete);
    closeDeleteCardConfirmationModal();
    displayCardsToDelete(allCards);
    displayCardsToModify(allCards);
    addCardsToDOM(createCardsHTMLElementsArray(allCards, ''));
    addEventListenerToAllCards();
    updateCounter();
});
deleteCardModalNoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeDeleteCardConfirmationModal();
});
///////////////////////////////////////////////////////////// ERROR MODAL /////////////////////////////////////////////////////////////
function openErrorModal(message) {
    errorModalMessage.textContent = message;
    errorModal.classList.remove('error-modal-hidden');
    overlay.classList.remove('overlay-hidden');
}
function closeErrorModal() {
    errorModalMessage.textContent = "";
    errorModal.classList.add('error-modal-hidden');
    overlay.classList.add('overlay-hidden');
}
errorModalBtn.addEventListener('click', () => {
    closeErrorModal();
});
///////////////////////////////////////////////////////////// DISPLAY CARDS /////////////////////////////////////////////////////////////
function createCardsHTMLElementsArray(cards, category) {
    let cardsMarkupArray = [];
    let cardsCopy = [...cards];
    if (category !== '') {
        cardsCopy = cards.filter(card => card.category === category);
    }
    cardsCopy.forEach((card, index) => {
        if (index === 0) {
            cardsMarkupArray.push(card.createCardHTMLElement());
        }
        else {
            cardsMarkupArray.push(card.createCardRightHTMLElement());
        }
    });
    return cardsMarkupArray;
}
function addCardsToDOM(cards) {
    currentCardIndex = 0;
    displayCardsContainer.innerHTML = '';
    cards.forEach(card => {
        displayCardsContainer.innerHTML += card;
    });
}
function addEventListenerToAllCards() {
    let cards = displayCardsContainer.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            let clickedElement = e.target;
            let parent = clickedElement.closest('.card');
            parent.classList.toggle('is-flipped');
        });
    });
}
function displayNextCard() {
    if (currentCardIndex !== allCards.length - 1) {
        let Cards = displayCardsContainer.querySelectorAll('.card');
        Cards[currentCardIndex].classList.add('card-left');
        Cards[currentCardIndex + 1].classList.remove('card-right');
        currentCardIndex++;
    }
}
function displayPrevCard() {
    if (currentCardIndex !== 0) {
        let Cards = displayCardsContainer.querySelectorAll('.card');
        Cards[currentCardIndex].classList.add('card-right');
        Cards[currentCardIndex - 1].classList.remove('card-left');
        currentCardIndex--;
    }
}
function updateCounter() {
    currentCardIndexSpan.textContent = (currentCardIndex + 1).toString();
    totalCardsNumber.textContent = allCards.length.toString();
}
nextCardBtn.addEventListener('click', () => {
    displayNextCard();
    updateCounter();
});
prevCardBtn.addEventListener('click', () => {
    displayPrevCard();
    updateCounter();
});
