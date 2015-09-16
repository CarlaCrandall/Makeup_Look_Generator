/**
 * Button Class - Inherits from Element
 */
class Button extends Element {

	/**
	 * Create an instance of Button
	 * @param { string } value - the button value
	 * @param { function } onclick - the function to call when button is clicked
	 */
	constructor( value, onclick ) {

		super({
			'tag' : 'input',
			'attributes': { 
				'type'  : 'button', 
				'value' : value,
				'name'  : value + 'Btn'
			}
		});

		this.onclick = onclick;
	}

	/**
	 * Build button markup
	 */
	toHTML() {

		super.toHTML();

		// Add the on change event listener
		this.element.addEventListener( 'click', this.btnClicked.bind( this ), false );
	
		return this.element;
	}

	/**
	 * User clicked a button - figure out if previous or next and call the onclick function
	 */
	btnClicked() {

		var next = ( this.attributes.value === 'next' ) ? true : false;

		this.onclick( next );
	}

	/**
	 * Toggle disabled/enabled state of the button
	 * @param { boolean } state - determines whether button should be disabled or enabled
	 */
	disable( state ) {

		this.element.disabled = state;
	}
}