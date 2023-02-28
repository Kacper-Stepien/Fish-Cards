import { autobind } from "../decorators/autobind";

export class Navigation {
    private mainMenu = document.getElementById('main-menu-section') as HTMLDivElement;
    private displayCards = document.getElementById('display-cards-section') as HTMLDivElement;
    private addCard = document.getElementById('add-card-section') as HTMLDivElement;
    private deleteCards = document.getElementById('delete-cards-section') as HTMLDivElement;
    private modifyCards = document.getElementById('modify-cards-section') as HTMLDivElement;
    private modifyCards2 = document.getElementById('modify-card-section2') as HTMLDivElement;

    private addCardButton = document.getElementById('nav-add-card-btn') as HTMLElement;
    private startPracticeButton = document.getElementById('nav-start-practicing-btn') as HTMLElement;
    private deleteCardsButton = document.getElementById('nav-delete-card-btn') as HTMLElement;
    private modifyCardsButton = document.getElementById('nav-modify-card-btn') as HTMLElement;
    private backToMainMenuButton = document.getElementById('back-main-page-btn') as HTMLAnchorElement;

    constructor() {
        console.log('Navigation class created');
        this.addEventListeners();
    }

    private moveSectionToRight(section: HTMLDivElement) {
        section.classList.add('hidden-section-right');
    }

    private moveSectionToCenter(section: HTMLDivElement) {
        section.classList.remove('hidden-section-right');
        section.classList.remove('hidden-section-left');
    }

    private moveSectionToLeft(section: HTMLDivElement) {
        section.classList.add('hidden-section-left');
    }

    private hiddeButton(button: HTMLElement) {
        button.classList.add('hidden');
    }

    private showButton(button: HTMLElement) {
        button.classList.remove('hidden');
    }

    @autobind
    private displayMainMenu() {
        this.moveSectionToCenter(this.mainMenu);
        this.moveSectionToRight(this.displayCards);
        this.moveSectionToRight(this.addCard);
        this.moveSectionToRight(this.deleteCards);
        this.moveSectionToRight(this.modifyCards);
        this.moveSectionToRight(this.modifyCards2);
        this.hiddeButton(this.backToMainMenuButton);
    }

    @autobind
    private displaySection(section: HTMLDivElement) {
        if (section.classList.contains('display-cards-section')) {

        }
        this.moveSectionToLeft(this.mainMenu);
        this.moveSectionToCenter(section);
        this.showButton(this.backToMainMenuButton);
    }

    @autobind
    displayModifyCardForm() {
        this.moveSectionToCenter(this.modifyCards2);
        this.moveSectionToLeft(this.modifyCards);
    }

    @autobind
    addEventListeners() {
        this.addCardButton.addEventListener('click', () => {
            this.displaySection(this.addCard);
        });

        this.startPracticeButton.addEventListener('click', () => {
            this.displaySection(this.displayCards);
        });

        this.deleteCardsButton.addEventListener('click', () => {
            this.displaySection(this.deleteCards);
        });

        this.modifyCardsButton.addEventListener('click', () => {
            this.displaySection(this.modifyCards);
        });

        this.backToMainMenuButton.addEventListener('click', () => {
            
            if (this.modifyCards.classList.contains('hidden-section-left')) {
                this.moveSectionToRight(this.modifyCards2);
                this.moveSectionToCenter(this.modifyCards);
            }
            else {
                this.displayMainMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.displayMainMenu();
            }
            if (event.keyCode === 37) {
                if (this.modifyCards.classList.contains('hidden-section-left')) {
                this.moveSectionToRight(this.modifyCards2);
                this.moveSectionToCenter(this.modifyCards);
            }
            else {
                this.displayMainMenu();
            }
            }
        });
    }
}