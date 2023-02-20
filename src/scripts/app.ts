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
const header = document.getElementById('header') as HTMLDivElement;
const footer = document.getElementById('footer') as HTMLDivElement;

const mainMenuSection = document.getElementById('main-menu-section') as HTMLDivElement;
const displayCardsSection = document.getElementById('display-cards-section') as HTMLDivElement;
const addCardSection = document.getElementById('add-card-section') as HTMLDivElement;
const deleteCardsSection = document.getElementById('delete-cards-section') as HTMLDivElement;
const modifyCardsSection = document.getElementById('modify-cards-section') as HTMLDivElement;
const modifyCardsSection2 = document.getElementById('modify-card-section') as HTMLDivElement;

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
    question: string;
    answer: string;
    category: string;

    constructor(question: string, answer: string, category: string) {
        this.question = question;
        this.answer = answer;
        this.category = category;
    }
}

// Add new Card ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addCardForm = document.getElementById('add-card-form') as HTMLFormElement;
const addCardQuestionInput = document.getElementById('add-card-question-input') as HTMLInputElement;
const addCardAnswerInput = document.getElementById('add-card-answer-input') as HTMLTextAreaElement;
const chooseCategorySelect = document.getElementById('choose-category-select') as HTMLSelectElement;
const addNewCategoryInput = document.getElementById('add-new-category-input') as HTMLInputElement;
const addNewCategoryBtn = document.getElementById('add-new-category-btn') as HTMLButtonElement;
const confirmAddCardBtn = document.getElementById('confirm-add-card-btn') as HTMLButtonElement;

let allCards: Card[] = getAllCardsFromLocalStorage();
let categories: string[] = getCategoriesFromLocalStorage();
addCategoriesToSelectElement();

function validateAddNewCardForm(): boolean {
    let question = addCardQuestionInput.value;
    let answer = addCardAnswerInput.value; 
    if (question === '' || answer === '') {
        return false;
    };
    return true;
}

function checkIfQuestionExists(question: string): boolean {
    let questionExists = false;
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].question.toLowerCase() === question.toLowerCase()) {
            questionExists = true;
            break;
        }
    }

    // allCards.forEach(card => {
    //     if (card.question.toLowerCase() === question.toLowerCase()) {
    //         questionExists = true;
    //     }
    // });
    return questionExists;
}

function addNewCategoryToLocalStorage(newCategory: string) {
    if (newCategory !== '' && !categories.includes(newCategory)) {
        categories.push(newCategory);
        localStorage.setItem('Memory-Cards-Categories', JSON.stringify(categories));
    }
}

function getCategoriesFromLocalStorage() {
    const allCategories = localStorage.getItem('Memory-Cards-Categories') ? JSON.parse(localStorage.getItem('Memory-Cards-Categories') as string) : [];
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
    let newCategory = addNewCategoryInput.value;
    addNewCategoryToLocalStorage(newCategory);
    categories = getCategoriesFromLocalStorage();
    addCategoriesToSelectElement();
    clearNewCategoryInput();
    chooseCategorySelect.value = newCategory;
});

function getAllCardsFromLocalStorage() {
    let cards = localStorage.getItem('Memory-Cards-Cards') ? JSON.parse(localStorage.getItem('Memory-Cards-Cards') as string) : [];
    return cards;
}

function addCardToLocalStorage() {
    let question = addCardQuestionInput.value;
    let answer = addCardAnswerInput.value;
    let category = chooseCategorySelect.value === 'Choose category' ? '' : chooseCategorySelect.value;
    
    let newCard = new Card(question, answer, category);
    allCards.push(newCard);
    localStorage.setItem('Memory-Cards-Cards', JSON.stringify(allCards));
}

function clearForm() {
    addCardQuestionInput.value = '';
    addCardAnswerInput.value = '';
    chooseCategorySelect.value = 'Choose category';
}

confirmAddCardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (checkIfQuestionExists(addCardQuestionInput.value)) {
        openErrorModal('This question already exists');
    } 
    else if (!validateAddNewCardForm()) {
        openErrorModal('Please fill in all fields');
    }
    else {
        addCardToLocalStorage();
        clearForm();
        displayCardsToModify(allCards);
        displayCardsToDelete(allCards);
        openErrorModal('Card added successfully');
    }
});


// Modify Cards ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const modifyCardsList = document.getElementById('modify-cards-list') as HTMLDivElement;
displayCardsToModify(allCards);

function displayCardsToModify(cards: Card[]) {
    modifyCardsList.innerHTML = '';
    cards.forEach(card => {
        modifyCardsList.innerHTML += `<div class="modify-card-section__card">
                    <p class="modify-card-section__card-question">${card.question}</p>
                    <button class="modify-card-section__card-button"><i class="fa-solid fa-pen-to-square"></i></button>
                </div>`
    });
}

modifyCardsList.addEventListener('click', (e) => {
    if (e.target !== null) {
        if (e.target !== modifyCardsList) {
            let clickedElement = e.target as HTMLElement;
            let cardToModify = clickedElement.closest('.modify-card-section__card') as HTMLDivElement;
            let question = cardToModify.querySelector('.modify-card-section__card-question') as HTMLParagraphElement;

        }
    }
});


// Delete Cards ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const deleteCardsList = document.getElementById('delete-cards-list') as HTMLDivElement;
const deleteCardConfirmationModal = document.getElementById('delete-card-confirmation') as HTMLDivElement;
const deleteCardModalQuestion = document.getElementById('delete-card-question') as HTMLParagraphElement;
const deleteCardModalYesBtn = document.getElementById('delete-card-confirmation__yes-btn') as HTMLButtonElement;
const deleteCardModalNoBtn = document.getElementById('delete-card-confirmation__no-btn') as HTMLButtonElement;
const overlay = document.getElementById('overlay') as HTMLDivElement;
let questionOfCardToDelete: string = '';


function displayCardsToDelete(cards: Card[]) {
    deleteCardsList.innerHTML = '';
    cards.forEach(card => {
        deleteCardsList.innerHTML +=   `<div class="delete-card-section__card">
                                            <p class="delete-card-section__card-question">${card.question}</p>
                                            <button class="delete-card-section__card-button"><i class="fa-solid fa-trash"></i></button>
                                        </div>`
    });
}
displayCardsToDelete(allCards);

deleteCardsList.addEventListener('click', (e) => {

    if (e.target !== null) {
        if (e.target !== deleteCardsList) {
            let clickedElement = e.target as HTMLElement;
            let parent = clickedElement.closest('.delete-card-section__card') as HTMLElement;
            let title = parent.querySelector('.delete-card-section__card-question')?.textContent;
            if (title !== null && title !== undefined) {
                questionOfCardToDelete = title;
                showDeleteCardConfirmationModal(questionOfCardToDelete);
            }
       }
    }
});

function addBlurToElement(element: HTMLElement) {
    element.classList.add('blurred');
}

function removeBlurFromElement(element: HTMLElement) {
    element.classList.remove('blurred');
}

function showDeleteCardConfirmationModal(question: string) {
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

function deleteCardFromLocalStorage(question: string) {
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


// Error Modal ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const errorModal = document.getElementById('modal-with-errors') as HTMLDivElement;
const errorModalMessage = document.getElementById('modal-with-errors-text') as HTMLDivElement;
const errorModalBtn = document.getElementById('modal-with-errors-btn') as HTMLButtonElement;

function openErrorModal(message: string) {
    errorModalMessage.textContent = message;
    errorModal.classList.remove('error-modal-hidden');
    overlay.classList.remove('overlay-hidden');
}

function closeErrorModal() {
    errorModalMessage.textContent = ""
    errorModal.classList.add('error-modal-hidden');
    overlay.classList.add('overlay-hidden');
}

errorModalBtn.addEventListener('click', () => {
    closeErrorModal();
}) ;