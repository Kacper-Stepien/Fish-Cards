import { Form } from "./Form";
import { Categories } from "./Categories";
import { Modal } from "./Modal";

export class ModifyForm extends Form {
    constructor(categories: Categories, modal: Modal) {
        super(categories, modal);
        this.questionInput = document.getElementById('modify-card-question-input') as HTMLInputElement;
        this.answerInput = document.getElementById('modify-card-answer-input') as HTMLTextAreaElement;
        this.categoryInput = document.getElementById('modify-choose-category-select') as HTMLSelectElement;
        this.newCategoryInput = document.getElementById('modify-new-category-input') as HTMLInputElement;
        this.newCategoryButton = document.getElementById('modify-new-category-btn') as HTMLButtonElement;
        this.confirmButton = document.getElementById('confirm-modify-card-btn') as HTMLButtonElement;
        // this.addEventListeners();
    }

    setQuestionInputValue(value: string) {
        this.questionInput.value = value;
    }

    setAnswerInputValue(value: string) {
        this.answerInput.value = value;
    }

}