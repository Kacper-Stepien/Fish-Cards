import { autobind } from "../decorators/autobind";
export class Categories {
    allCategories: string[];
    currentCategory: string;

    constructor() {
        this.allCategories = this.getCategoriesFromLocalStorage();
        this.currentCategory = this.getCurrentCategoryFromLocalStorage();
        console.log(this.allCategories);
    }

    getCategoriesFromLocalStorage() {
        const allCategories = localStorage.getItem('Memory-Cards-Categories') ? JSON.parse(localStorage.getItem('Memory-Cards-Categories') as string) : [];
        return allCategories;
    }

    getCurrentCategoryFromLocalStorage() {
        const currentCategory = localStorage.getItem('Memory-Cards-Current-Category') ? JSON.parse(localStorage.getItem('Memory-Cards-Current-Category') as string) : "";
        return currentCategory;
    }

    @autobind
    setCurrentCategory(category: string) {
        this.currentCategory = category;
        localStorage.setItem('Memory-Cards-Current-Category', JSON.stringify(this.currentCategory));
    }

    @autobind
    addNewCategory(category: string) {
        if (category !== '' && !this.allCategories.includes(category)) {
            this.allCategories.push(category);
            localStorage.setItem('Memory-Cards-Categories', JSON.stringify(this.allCategories));
        }
    }
} 