/**
 * List Class - Inherits from Element
 */
window.List = class List extends Element {

    /**
     * Create an instance of List
     * @param { array } answeredQuestions - contains a list of all the questions with the user's choice
     */
    constructor(answeredQuestions) {
        super({ tag: 'ol' });
        this.answeredQuestions = answeredQuestions;
    }

    /**
     * Build list markup
     */
    toHTML() {
        let listItem;

        // Create the list
        super.toHTML();

        // Create the other Options (question choices)
        for (let question of this.answeredQuestions) {
            listItem = new Element({
                tag: 'li',
                textNode: question.questionData.instruction.replace('[OPTION]', question.selectedOption)
            });

            this.element.appendChild(listItem.toHTML());
        }

        return this.element;
    }
};
