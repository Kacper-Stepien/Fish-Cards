import { Modal } from './Modal';
import { autobind } from '../decorators/autobind';

export class DeleteModal extends Modal {
    private yesButton = document.getElementById('delete-card-confirmation__yes-btn') as HTMLButtonElement;
    private noButton = document.getElementById('delete-card-confirmation__no-btn') as HTMLButtonElement;

    constructor() {
        super();
        this.modal = document.getElementById('delete-card-confirmation') as HTMLDivElement;
        this.message = document.getElementById('delete-card-question') as HTMLParagraphElement;
    }
    
    @autobind
    openModal(question: string) {
        this.message.textContent = question;
        this.modal.classList.remove('delete-card-confirmation__hidden');
        this.openOverlay();
    }

    @autobind
    closeModal() {
        this.message.textContent = '';
        this.modal.classList.add('delete-card-confirmation__hidden');
        this.closeOverlay();
    }
}