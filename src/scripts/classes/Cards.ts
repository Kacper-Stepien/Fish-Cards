import { Card } from './Card';
import { Categories } from './Categories';
import { autobind } from '../decorators/autobind';

export class Cards {
    allCards: Card[];
    cardsToDisplayElements: string[] = [];
    currentIndexOfCard: number = 0;
    cardToModify = '';
    cardToDelete = '';
    categories: Categories;


    constructor(categories: Categories) {
        this.allCards = this.getAllCardsFromLocalStorage();
        this.createCardsHTMLElements();
        this.categories = categories;
    }

    private getAllCardsFromLocalStorage(): Card[] {
        let data = localStorage.getItem('Memory-Cards-Cards') ? JSON.parse(localStorage.getItem('Memory-Cards-Cards') as string) : [];
        let cards: Card[] = [];
        data.forEach((card: Card) => {
            cards.push(new Card(card.question, card.answer, card.category));
        });

        return cards;
    }

    saveCardsToLocalStorage() {
        localStorage.setItem('Memory-Cards-Cards', JSON.stringify(this.allCards));
    }

    @autobind
    getAllCards() {
        return this.allCards;
    }

    @autobind
    addNewCard(question: string, answer: string, category: string) {
        this.allCards.push(new Card(question, answer, category));
        this.saveCardsToLocalStorage();
        this.createCardsHTMLElements();
    }

    @autobind
    createCardsHTMLElements() {
        let category = "";
        this.cardsToDisplayElements = [];
        let cardsCopy = [...this.allCards];
        
        if (category !== "") {
            cardsCopy = cardsCopy.filter(card => card.category === category);
        }

        cardsCopy.forEach((card, index) => {
            if (index === 0) {
                this.cardsToDisplayElements.push(card.createCardHTMLElement());
            }
            else {
                this.cardsToDisplayElements.push(card.createCardRightHTMLElement());
            }
        });
        
    }

    @autobind
    getCardsHTMLToDisplay() {
        this.createCardsHTMLElements();
        return this.cardsToDisplayElements;
    }

    @autobind
    getCurrentIndexOfCard() : number{
        return this.currentIndexOfCard;
    }

    @autobind
    getNumberOfCards() : number{
        // return this.cardsToDisplayElements.length;
        return this.cardsToDisplayElements.length;
    }

    @autobind
    setCurrentIndexOfCard(index: number) {
        this.currentIndexOfCard = index;
    }

    @autobind
    checkIfQuestionExists(question: string): boolean {
        return this.allCards.some(card => card.question.toLowerCase() === question.toLowerCase());  
    }

    @autobind
    changeCardData(question: string, answer: string, category: string) {
        for (let i = 0; i < this.allCards.length; i++) {
            if (this.allCards[i].question === this.cardToModify) {
                this.allCards[i].question = question;
                this.allCards[i].answer = answer;
                this.allCards[i].category = category;
                break;
            }
        }
        this.saveCardsToLocalStorage();
    }

    @autobind
    getCategoryOfCardByQuestion(question: string): string {
        let category = '';
        for (let i = 0; i < this.allCards.length; i++) {
            if (this.allCards[i].question === question) {
                category = this.allCards[i].category;
                break;
            }
        }
        return category;
    }

    @autobind
    getAnswerOfCardByQuestion(question: string): string {
        let answer = '';
        for (let i = 0; i < this.allCards.length; i++) {
            if (this.allCards[i].question === question) {
                answer = this.allCards[i].answer;
                break;
            }
        }
        return answer;
    }

    @autobind
    deleteCard() {
        for (let i = 0; i < this.allCards.length; i++) {
            if (this.allCards[i].question === this.cardToDelete) {
                this.allCards.splice(i, 1);
                break;
            }
        }
        this.saveCardsToLocalStorage();
    }

}