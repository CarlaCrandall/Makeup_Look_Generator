var s,
	that,
	MakeupGenerator = {

	settings: {
		questions   : questionData,
		images      : null,
		imgHolder   : document.getElementById( 'imgHolder' ),
		selHolder   : document.getElementById( 'selHolder' ),
		stepsHolder : document.getElementById( 'stepsHolder' ),
		formHolder  : document.getElementById( 'formHolder' )
	},

	/**
	* Initial app setup
	*/
	init: function() {
		s = this.settings;
		that = this;

		var types = Object.keys( questionData ),
			newImg;

		// Create image placeholders
		for( type of types ) {

			newImg = document.createElement( 'img' );
			newImg.setAttribute( 'src', '' );
			newImg.setAttribute( 'alt', '' );
			newImg.setAttribute( 'id', type );
			newImg.setAttribute( 'class', 'animated' );

			s.imgHolder.appendChild( newImg );
		}

		// Create the first select / question
		this.createSelect( document.getElementById( 'initSelect' ) );
	},

	/**
	* Handles select change events
	*/
	changeEventHandler: function() {

		that.createSelect( this );
	},

	/**
	* Creates a new select / question
	*/
	createSelect: function( select ) {

		var valArray = select.value.split( '|' ),
			type = valArray[ 0 ],				  	// Question type
			name = valArray[ 1 ],					// Previous answer - to load image
			imageType = valArray[ 2 ],				// Previous type - to load image
			data = s.questions[ type ], 			// Data for question/options
			nameCap,
			selContainer,
			labelSpan,
			newSel,
			newOpt;


		// Load the image
		if( imageType && name ) {
			this.updateImages( imageType, name );
		}

		// Still more questions to load...
		if( data ) {

			this.removePrevChoices( select, type );

			// Create label
			selContainer = document.createElement( 'label' );
			selContainer.setAttribute( 'class', 'animated' );

			// Wrap text in span for styling purposes
			labelSpan = document.createElement( 'span' );
			labelSpan.appendChild( document.createTextNode( `${ data.optionLabel }:` ) );
			selContainer.appendChild( labelSpan );

			// Create the select
			newSel = document.createElement( 'select' );
			newSel.addEventListener('change', this.changeEventHandler, false);

			// Create the first option (question text)
			newOpt = document.createElement( 'option' );
			newOpt.setAttribute( 'disabled', 'disabled' );
			newOpt.setAttribute( 'selected', 'selected' );
			newOpt.appendChild( document.createTextNode( `Choose your ${ data.optionLabel }...` ) );
			newSel.appendChild( newOpt );

			// Create the rest of the options (question choices)
			for( option of data.options ) {

				// Capitalize first character
				nameCap = option.charAt(0).toUpperCase() + option.slice(1);

				newOpt = document.createElement( 'option' );
				newOpt.setAttribute( 'value',  `${ data.nextType }|${ option }|${ type }` );
				newOpt.appendChild( document.createTextNode( nameCap ) );
				newSel.appendChild( newOpt );
			}

			// Add select to the container
			selContainer.appendChild( newSel );
			s.selHolder.appendChild( selContainer );
			
			// Fade in select - Timeout needed for CSS animation
			setTimeout( function() { 
				selContainer.style.opacity = 1; 
			}, 10 );

		}
		// Reached end of the questions, show instructions & download form
		else {

			this.displayInstructions();
			this.displayForm();
		}
	},

	/**
	* Remove unnecessary selects when the user edits
	* a previously selected option
	*/
	removePrevChoices: function( select, type ) {

		// User changed a previous option...
		while( select.parentNode !== s.selHolder.lastChild ){

			s.selHolder.removeChild( s.selHolder.lastChild );
		}

		// Hide steps holder and download form
		s.stepsHolder.style.opacity = 0;
		s.formHolder.style.opacity = 0;
	},

	/**
	* Updates images when user makes a selection
	*/
	updateImages: function( type, name ) {

		var img = document.getElementById( type ),
			location = `images/${ name }.png`;

		// User changed a previous option
		// Old images need to be cleared out
		if( img.alt !== '' ) {

			this.clearImages( img );
		}

		// Load the new image
		img.src = location;
		img.alt = name;

		// Fade in image
		img.style.opacity = 1;

		// Update current list of images / choices
		s.images = s.imgHolder.children;
	},

	/**
	* Remove unnecessary images when the user edits
	* a previously selected option
	*/
	clearImages: function( img ) {

		var index = Array.prototype.indexOf.call( s.images, img ) + 1,
			len;

		// Hide image choices that come after currently selected image
		for( len = s.images.length; index < len; index++ ) {

			// Fade out image
			s.images[ index ].style.opacity = 0;
		}
	},

	/**
	* Generate instructions array based on user's choices
	*/
	getInstructions: function() {

		var instructions = [],
			step = '',
			type = '',
			i,
			len;

		// Build out each step
		// Don't need a step for first image - it's just the base eye
		for( i = 1, len = s.images.length; i < len; i++ ) {

			type = s.images[ i ].id;
			step = `${ s.questions[ type ].instruction[ 0 ] } ${ s.images[ i ].alt } ${ s.questions[ type ].instruction[ 1 ] }`;
			
			instructions.push( step );
		}

		return instructions;
	},

	/**
	* Display list of steps to recreate the look
	* created by the user
	*/
	displayInstructions: function() {

		var instructions = this.getInstructions(),
			list = document.getElementById( 'stepList' ),
			listItem;

		// Remove past instructions 
		while( list.lastChild ) {

			list.removeChild( list.lastChild );
		}

		// Build new instructions
		for( instruction of instructions ) {

			listItem = document.createElement( 'li' );
			listItem.appendChild( document.createTextNode( instruction ) );
			list.appendChild( listItem );
		}		

		s.stepsHolder.style.opacity = 1;
	},

	/**
	* Generates and displays necessary form elements
	*/
	displayForm: function() {

		var inputsHolder = document.getElementById( 'inputsHolder' ),
			input;

		// Remove past inputs/choices 
		while( inputsHolder.lastChild ) {

			inputsHolder.removeChild( inputsHolder.lastChild );
		}

		// Loop through all images and generate hidden inputs
		// Inputs needed to pass image data to the PHP script
		for( image of s.images ) {

			input = document.createElement( 'input' );
			input.setAttribute( 'type', 'hidden' );
			input.setAttribute( 'value', image.getAttribute( 'src' ) );
			input.setAttribute( 'name', 'layer[]' );

			inputsHolder.appendChild( input );
		}

		s.formHolder.style.opacity = 1;
	}

};

(function() {

  MakeupGenerator.init();

})();