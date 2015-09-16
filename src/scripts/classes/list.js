/**
 * List Class - Inherits from Element
 */
class List extends Element {

	/**
	 * Create an instance of List
	 * @param { array } answeredQuestions - contains a list of all the questions with the user's choice
	 */
	constructor( answeredQuestions ) {

		super( { 'tag' : 'ol' } );
		
		this.answeredQuestions = answeredQuestions;
	}

	/**
	 * Build list markup 
	 */
	toHTML() {

		var listItem;
		
		// Create the list
		super.toHTML();

		
		// Create the other Options (question choices)
		for( let question of this.answeredQuestions ) {

			listItem = new Element({ 
				'tag' : 'li', 
				'textNode' : `${ question.questionData.instruction[ 0 ] } ${ question.selectedOption } ${ question.questionData.instruction[ 1 ] }` 
			});

			this.element.appendChild( listItem.toHTML() );
		}

		return this.element;
	}
}