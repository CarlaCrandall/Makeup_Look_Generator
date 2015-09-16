/**
 * Element Class
 * Extended by Button, DownloadForm, Instructions, List, Question, and Select classes
 */
class Element {

	/**
	 * Create an instance of Element
	 * @param { object } options - contains options used to build the element
	 * @param { string } options.tag - the tagname of the element
	 * @param { object } options.attributes - the attributes for the element
	 * @param { string } options.textNode - the text that should be appended to the element
	 */
	constructor( options = {} ) {

		this.tag = options.tag || 'div';
		this.attributes = options.attributes || null;
		this.textNode = options.textNode || null;
		this.element = null;
	}

	/**
	 * Build element markup
	 */
	toHTML() {

		// Create the element
		this.element = document.createElement( this.tag );

		// Add any attributes
		if( this.attributes ) {

			for( let property in this.attributes ) {

				if( this.attributes.hasOwnProperty( property ) ) {

					this.element.setAttribute( property, this.attributes[ property ] );
				}
			}
		}

		// Append the text node
		if( this.textNode ) {

			this.element.appendChild( document.createTextNode( this.textNode ) );
		}

		return this.element;
	}

	/**
	 * Fade element in
	 */
	fadeIn() {

		var opacity = 1,
			visibility = 'visible';

		// Add the fade class for transition
		this.element.className += ' fade';

		// Update the style
		this.element.style.opacity = opacity;
		this.element.style.visibility = visibility;
	}

	/**
	 * Removes element markup from the DOM
	 */
	removeFromDOM() {

		this.element.parentNode.removeChild( this.element );
	}
}