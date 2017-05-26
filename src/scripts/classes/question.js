/**
 * Question Class - Inherits from Element
 */
class Question extends Element {

	/**
	 * Create an instance of Question
	 * @param { object } questionData - contains necessary data to create the question markup
	 * @param { string } questionType - used to create the label for the question
	 * @param { function } onSelection - function called when user selects an answer / option
	 */
	constructor(questionData, questionType, onSelection) {
		// Question containing element will be a div
		super({
			tag: 'label',
			attributes: { class: 'question' }
		});

		this.questionData = questionData;
		this.questionType = questionType;
		this.onSelection = onSelection;
		this.selectedOption = '';
	}

	/**
	 * Build question markup
	 */
	toHTML() {
		// Create label, span and select
		var span,
			select;

		super.toHTML();

		span = new Element({
			tag: 'span',
			textNode: `${this.questionData.questionLabel}:`
		});

		select = new Select(this.questionData);

		// Create question container, append necessary elements
		this.element.appendChild(span.toHTML());
		this.element.appendChild(select.toHTML());

		// Add the on change event listener
		this.element.addEventListener('change', this.answerSelected.bind(this), false);

		return this.element;
	}

	/**
	 * User answered the question
	 * Save answer and call callback function
	 * @param { event } evt - the onchange event
	 */
	answerSelected(evt) {
		var updatedPastChoice = false;

		// Need to know if user updated their choice
		if (this.selectedOption) {
			updatedPastChoice = true;
		}

		// Save user's choice
		this.selectedOption = evt.target.value;
		this.onSelection(this.selectedOption, updatedPastChoice, this);
	}

	/**
	 * Slide question in - for mobile devices
	 */
	slideIn(translate = false) {
		if (translate) {
			// Position the element for sliding
			this.translate('right');
		}

		// Update the style
		this.element.style.opacity = 1;
		this.element.style.visibility = 'visible';
	}

	/**
	 * Update position of question to allow sliding left/right in mobile experience
	 * @param { string } value - Whether the question should be positioned left, right, or reset
	 */
	translate(value) {
		var translate = '';

		switch (value) {
			case 'reset':
				translate = 'translateX( 0 )';
				break;

			case 'left':
				translate = 'translateX( calc( -100% - 15px ) )';
				break;

			case 'right':
				translate = 'translateX( calc( 100% + 15px ) )';
				break;
		}

		this.element.style.transform = translate;
	}

	/**
	 * Update the class of the question to allow sliding in mobile experience and fading in desktop
	 * @param { string } value - The class to be applied
	 */
	setClass(value) {
		this.element.setAttribute('class', 'question ' + value);
	}
}