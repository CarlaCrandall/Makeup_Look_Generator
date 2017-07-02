/**
 * Instructions Class - Inherits from Element
 */
class Instructions extends Element {

    /**
     * Create an instance of Instructions
     * @param { array } answeredQuestions - contains a list of all the questions with the user's choice
     */
    constructor(answeredQuestions) {
        super();
        this.answeredQuestions = answeredQuestions;
    }

    /**
     * Build instructions markup
     */
    toHTML() {
        let title,
            list;

        // Create the container
        super.toHTML();

        // Create the title
        title = new Element({
            tag: 'h2',
            textNode: 'To recreate your look...'
        });

        this.element.appendChild(title.toHTML());

        // Create the list of instructions
        list = new List(this.answeredQuestions);
        this.element.appendChild(list.toHTML());

        return this.element;
    }
}
