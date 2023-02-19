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

function addNewCategoryToLocalStorage() {
    const newCategory = addNewCategoryInput.value;
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
    let x = addNewCategoryInput.value;
    addNewCategoryToLocalStorage();
    categories = getCategoriesFromLocalStorage();
    addCategoriesToSelectElement();
    clearNewCategoryInput();
    chooseCategorySelect.value = x;
});

function getAllCardsFromLocalStorage() {
    let cards = localStorage.getItem('Memory-Cards-Cards') ? JSON.parse(localStorage.getItem('Memory-Cards-Cards') as string) : [];
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