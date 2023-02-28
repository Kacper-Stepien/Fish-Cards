import { Card } from "./classes/Card";
import { Cards } from "./classes/Cards";
import { Categories } from "./classes/Categories";
import { Form } from "./classes/Form";
import { ModifyForm } from "./classes/ModifyForm";
import { Modal } from "./classes/Modal";
import { DeleteModal } from "./classes/DeleteModal";
import { Navigation } from "./classes/Navigation";

const header = document.getElementById('header') as HTMLDivElement;
const footer = document.getElementById('footer') as HTMLDivElement;
const modifyCardsList = document.getElementById('modify-cards-list') as HTMLDivElement;
const deleteCardsList = document.getElementById('delete-cards-list') as HTMLDivElement;
const displayCardsContainer = document.getElementById('display-cards-container') as HTMLDivElement;
const prevCardBtn = document.getElementById('prev-card') as HTMLButtonElement;
const nextCardBtn = document.getElementById('next-card') as HTMLButtonElement;

const newCategoryButton = document.getElementById('add-new-category-btn') as HTMLButtonElement;
const modifyNewCategoryButton = document.getElementById('modify-new-category-btn') as HTMLButtonElement;

const currentCardIndexSpan = document.getElementById('current-card') as HTMLSpanElement;
const totalCardsNumberSpan = document.getElementById('total-cards') as HTMLSpanElement;

const confirmAddCardButton = document.getElementById('confirm-add-card-btn') as HTMLButtonElement;

const confirmModifyCardButton = document.getElementById('confirm-modify-card-btn') as HTMLButtonElement;
const authorLink = document.getElementById('author-page') as HTMLAnchorElement;

const navigation = new Navigation();
const categories = new Categories();
const cards = new Cards(categories);
const modal = new Modal();
const deleteCardModal = new DeleteModal();
const addCardForm = new Form(categories, modal);
const modifyCardForm = new ModifyForm(categories, modal);


function updateCounter() {
    if (cards.getNumberOfCards() === 0) {
        currentCardIndexSpan.textContent = '0';
        totalCardsNumberSpan.textContent = '0';
    }
    else {
        currentCardIndexSpan.textContent = (cards.getCurrentIndexOfCard()+1).toString();
        totalCardsNumberSpan.textContent = cards.getNumberOfCards().toString();
    }
}

function updateView() {
    displayCardsToModify();
    displayCardsToDelete();
    addCardForm.clearForm();
    modifyCardForm.clearForm();
    displayCards();
    updateCounter();
}

function displayCardsToModify() {
    modifyCardsList.innerHTML = '';
    let cardsToModify = cards.getAllCards();
    if (cardsToModify.length === 0) {
        modifyCardsList.innerHTML = '<p class="section__paragraph">No cards to modify</p>';
    }
    else {
        cardsToModify.forEach(card => {
            modifyCardsList.innerHTML += `<div class="modify-card-section__card">
                        <p class="modify-card-section__card-question">${card.question}</p>
                        <button class="modify-card-section__card-button"><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>`
        });
    }
}

function displayModifyCardForm(question: string, answer: string, category: string) {
    modifyCardForm.setQuestionInputValue(question);
    modifyCardForm.setAnswerInputValue(answer);
    modifyCardForm.addCategoriesToSelect(categories.getCategoriesFromLocalStorage());
    modifyCardForm.setCategoryInputValue(category);
    navigation.displayModifyCardForm();
}

function displayCardsToDelete() {
    deleteCardsList.innerHTML = '';
    let cardsToDelete = cards.getAllCards();
    if (cardsToDelete.length === 0) {
        deleteCardsList.innerHTML = '<p class="section__paragraph">No cards to delete</p>';
    }
    else {
        cardsToDelete.forEach(card => {
            deleteCardsList.innerHTML +=   `<div class="delete-card-section__card">
                                                <p class="delete-card-section__card-question">${card.question}</p>
                                                <button class="delete-card-section__card-button"><i class="fa-solid fa-trash"></i></button>
                                            </div>`
        });
    }
}

function displayCards() {
    cards.currentIndexOfCard = 0;
    addCardsToDOM();
    addEventListenerToAllCards();
    updateCounter();
}

function addCardsToDOM() {
    cards.createCardsHTMLElements();
    displayCardsContainer.innerHTML = '';
    if (cards.getNumberOfCards() <= 0) {
        displayCardsContainer.innerHTML = '<p class="section__paragraph">No cards to display</p>';
    }
    else {
        let cardsToDisplay = cards.getCardsHTMLToDisplay();
        console.log(cardsToDisplay);
        cards.getCardsHTMLToDisplay().forEach(card => {
            displayCardsContainer.innerHTML += card;
        });
    }
    updateCounter();
}

function addEventListenerToAllCards() {
    let cards = displayCardsContainer.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            let clickedElement = e.target as HTMLElement;
            let parentElement = clickedElement.closest('.card') as HTMLElement;
            console.log(parentElement.classList.contains('is-flipped'));
            if (parentElement.classList.contains('is-flipped')) {
                parentElement.classList.remove('is-flipped');
            }
            else {
                parentElement.classList.add('is-flipped');
            }
            // parentElement.classList.toggle('is-flipped');
        });
    });
}

function displayNextCard() {
    let currentCardIndex = cards.getCurrentIndexOfCard();
    if (currentCardIndex !== cards.getNumberOfCards() - 1) {
        
        let Cards = displayCardsContainer.querySelectorAll('.card');
        Cards[currentCardIndex].classList.add('card--left');
        Cards[currentCardIndex + 1].classList.remove('card--right');
        cards.setCurrentIndexOfCard(cards.getCurrentIndexOfCard() + 1);
    }
}

function displayPrevCard() {
    let currentCardIndex = cards.getCurrentIndexOfCard();
    if (currentCardIndex !== 0) {
        let Cards = displayCardsContainer.querySelectorAll('.card');
        Cards[currentCardIndex].classList.add('card--right');
        Cards[currentCardIndex - 1].classList.remove('card--left');
        cards.setCurrentIndexOfCard(currentCardIndex - 1);
    }
}

////////////////////////////////////////////////// Event listeners //////////////////////////////////////////////////

confirmAddCardButton.addEventListener('click', (e) => {
    e.preventDefault();
    let data = addCardForm.getDataFromForm();
    if (cards.checkIfQuestionExists(data.question)) {
        modal.openModal('This question already exists in your cards.');
        return;
    }
    else if (!addCardForm.validateForm()) {
        modal.openModal('Please fill in all fields.');
        return;
    }
    else {
        cards.addNewCard(data.question, data.answer, data.category);
        updateView();
        modal.openModal('Card added successfully!');
    }
});

newCategoryButton.addEventListener('click', (e) => {
    e.preventDefault();
    let newCategory = addCardForm.getNewCategoryInputValue();
    categories.addNewCategory(newCategory);
    addCardForm.addCategoriesToSelect(categories.getCategoriesFromLocalStorage());
    addCardForm.setCategoryInputValue(newCategory);
    addCardForm.clearNewCategoryInput();
});

modifyNewCategoryButton.addEventListener('click', (e) => {
    e.preventDefault();
    let newCategory = modifyCardForm.getNewCategoryInputValue();
    categories.addNewCategory(newCategory);
    modifyCardForm.addCategoriesToSelect(categories.getCategoriesFromLocalStorage());
    modifyCardForm.setCategoryInputValue(newCategory);
    modifyCardForm.clearNewCategoryInput();
});



nextCardBtn.addEventListener('click', () => {
    displayNextCard();
    updateCounter();
});

prevCardBtn.addEventListener('click', () => {
    displayPrevCard();
    updateCounter();
});

modifyCardsList.addEventListener('click', (e) => {
    if (e.target !== null) {
        if (e.target !== modifyCardsList) {
            let clickedElement = e.target as HTMLElement;
            let parentElement = clickedElement.closest('.modify-card-section__card') as HTMLElement;
            let question = parentElement.querySelector('.modify-card-section__card-question')?.textContent!;
            let answer = cards.getAnswerOfCardByQuestion(question);
            let category = cards.getCategoryOfCardByQuestion(question);

            cards.cardToModify = question;
            displayModifyCardForm(question, answer, category);
        }
    }
});

confirmModifyCardButton.addEventListener('click', (e) => {
    e.preventDefault();
    let data = modifyCardForm.getDataFromForm();
    if (!modifyCardForm.validateForm()) {
        modal.openModal('Please fill in all fields.');
    }
    else {
        cards.changeCardData(data.question, data.answer, data.category);
        modal.openModal('Card modified successfully!');
        updateView();
    }
});

const deleteCardYesButton = document.getElementById('delete-card-confirmation__yes-btn') as HTMLButtonElement;
const deleteCardNoButton = document.getElementById('delete-card-confirmation__no-btn') as HTMLButtonElement;

deleteCardsList.addEventListener('click', (e) => {
    if (e.target !== null) {
        if (e.target !== deleteCardsList) {
            let clickedElement = e.target as HTMLElement;
            let parentElement = clickedElement.closest('.delete-card-section__card') as HTMLElement;
            let question = parentElement.querySelector('.delete-card-section__card-question')?.textContent!;
            if (question !== null && question !== undefined) {
                cards.cardToDelete = question;
                deleteCardModal.openModal(question);
            }
        }
    }
});

deleteCardYesButton.addEventListener('click', () => {
    cards.deleteCard();
    deleteCardModal.closeModal();
    updateView();
});

deleteCardNoButton.addEventListener('click', () => {
    deleteCardModal.closeModal();
});

authorLink.addEventListener('click', () => {
    window.open('https://github.com/Kacper-Stepien', '_blank');
});

// // Initialize app
updateView();
addCardForm.addCategoriesToSelect(categories.getCategoriesFromLocalStorage());
modifyCardForm.addCategoriesToSelect(categories.getCategoriesFromLocalStorage());