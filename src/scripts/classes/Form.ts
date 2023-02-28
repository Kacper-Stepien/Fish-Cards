import { Categories } from './Categories';
import { Modal } from './Modal';
import { autobind } from '../decorators/autobind';

export class Form {
    private form = document.getElementById('add-card-form') as HTMLFormElement;
    protected questionInput = document.getElementById('add-card-question-input') as HTMLInputElement;
    protected answerInput = document.getElementById('add-card-answer-input') as HTMLTextAreaElement;
    protected categoryInput = document.getElementById('choose-category-select') as HTMLSelectElement;
    protected newCategoryInput = document.getElementById('add-new-category-input') as HTMLInputElement;
    protected newCategoryButton = document.getElementById('add-new-category-btn') as HTMLButtonElement;
    protected confirmButton = document.getElementById('confirm-add-card-btn') as HTMLButtonElement;
    
    protected categories: Categories;
    protected modal: Modal;

    constructor(categories: Categories, modal: Modal) {
        this.categories = categories;
        this.modal = modal;
        // this.addEventListeners();
    }

    @autobind
    validateForm() {
        if (this.questionInput.value === '' || this.answerInput.value === '') {
            return false;
        }
        return true;
    }

    @autobind
    getDataFromForm(): {question: string, answer: string, category: string} {
        let question = this.questionInput.value;
        let answer = this.answerInput.value;
        let category = this.categoryInput.value;

        return {question, answer, category};
    }

    @autobind
    addCategoriesToSelect(categories: string[]) {
        console.log(categories);
        this.categoryInput.innerHTML = '<option value="">Choose category</option>';
        categories.forEach(category => {
            this.categoryInput.innerHTML += `<option value="${category}">${category}</option>`;
        });
        console.log(this.categoryInput);
    }

    @autobind
    setCategoryInputValue(value: string) {
        this.categoryInput.value = value;
    }

    clearInput(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
        input.value = '';
    }

    @autobind
    getNewCategoryInputValue() {
        return this.newCategoryInput.value;
    }

    @autobind
    clearNewCategoryInput() {
        this.clearInput(this.newCategoryInput);
    }

    @autobind
    clearForm() {
        this.clearInput(this.questionInput);
        this.clearInput(this.answerInput);
        this.clearInput(this.categoryInput);
        this.clearInput(this.newCategoryInput);
    }

    // @autobind
    // addEventListeners() {
    //     this.newCategoryButton.addEventListener('click', () => {
    //         let newCategory = this.newCategoryInput.value;
    //         this.categories.addNewCategory(newCategory);
    //         this.addCategoriesToSelect(this.categories.getCategoriesFromLocalStorage());
    //         this.clearInput(this.newCategoryInput);
    //         this.setCategoryInputValue(newCategory);
    //     });
    // }
}