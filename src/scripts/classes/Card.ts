///////////////////////////////////////////////////////////// CARD CLASS /////////////////////////////////////////////////////////////
export class Card {
    question: string;
    answer: string;
    category: string;

    constructor(question: string, answer: string, category: string) {
        this.question = question;
        this.answer = answer;
        this.category = category;
    }

    setQuestion(question: string) {
        this.question = question;
    }

    setAnswer(answer: string) {
        this.answer = answer;
    }

    setCategory(category: string) {
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
                </div>`
    }

    createCardRightHTMLElement() {
        return `<div class="card card--right">
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
                </div>`
    }
}