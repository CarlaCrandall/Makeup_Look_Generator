/**
 * Select Class - Inherits from Element
 */
class Select extends Element {

	/**
	 * Create an instance of Select
	 * @param { object } questionData - contains necessary data to create the select options
	 */
	constructor(questionData) {
		super({ tag: 'select' });
		this.questionData = questionData;
	}

	/**
	 * Build select markup
	 */
	toHTML() {
		var option,
			nameCap = '';

		// Create the select
		super.toHTML();

		// Create the first Option (question text)
		option = new Element({
			tag: 'option',
			attributes: {
				disabled: 'disabled',
				selected: 'selected'
			},
			textNode: `Choose your ${this.questionData.questionLabel}...`
		});

		this.element.appendChild(option.toHTML());

		// Create the other Options (question choices)
		for (let choice of this.questionData.choices) {
			nameCap = choice.charAt(0).toUpperCase() + choice.slice(1);

			option = new Element({
				tag: 'option',
				attributes: { value: choice },
				textNode: nameCap
			});

			this.element.appendChild(option.toHTML());
		}

		return this.element;
	}
}