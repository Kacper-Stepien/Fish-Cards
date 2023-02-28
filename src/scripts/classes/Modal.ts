import { autobind } from "../decorators/autobind";

export class Modal {
    protected modal = document.getElementById('modal-with-errors') as HTMLDivElement;
    protected message = document.getElementById('modal-with-errors-text') as HTMLDivElement;
    private closeButton = document.getElementById('modal-with-errors-btn') as HTMLButtonElement;
    protected overlay = document.getElementById('overlay') as HTMLDivElement;

    protected header = document.getElementById('header') as HTMLDivElement;
    protected footer = document.getElementById('footer') as HTMLDivElement;

    constructor() {
        this.addEventListeners();
    }

    @autobind
    openOverlay() {
        this.addBlurToElement(this.header);
        this.addBlurToElement(this.footer);
        this.overlay.classList.remove('overlay-hidden');
    }

    @autobind
    closeOverlay() {
        this.removeBlurFromElement(this.header);
        this.removeBlurFromElement(this.footer);
        this.overlay.classList.add('overlay-hidden');
    }

    @autobind
    openModal(message: string) {
        this.message.textContent = message;
        this.modal.classList.remove('error-modal-hidden');
        this.openOverlay();
    }

    @autobind
    closeModal() {
        this.message.textContent = '';
        this.modal.classList.add('error-modal-hidden');
        this.closeOverlay();
    }

    addBlurToElement(element: HTMLElement) {
        element.classList.add('blurred');
    }

    removeBlurFromElement(element: HTMLElement) {
        element.classList.remove('blurred');
    }

    addEventListeners() {
        this.closeButton.addEventListener('click', this.closeModal);
    }

}