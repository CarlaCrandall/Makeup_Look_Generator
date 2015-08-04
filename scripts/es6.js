var s,
	MakeupGenerator = {

	settings: {
		questions   	: questionData,
		isMobile		: true,
		currentSel  	: 0,
		images      	: [],
		imgHolder   	: document.getElementById( 'imgHolder' ),
		selHolder   	: document.getElementById( 'selHolder' ),
		stepsHolder 	: document.getElementById( 'stepsHolder' ),
		formHolder  	: document.getElementById( 'formHolder' ),
		nextBtn			: document.getElementById( 'next' ),
		prevBtn			: document.getElementById( 'prev' ),
		translateRight	: 'translateX( calc( 100% + 15px ) )',
		translateLeft	: 'translateX( calc( -100% - 15px ) )',
		translateReset	: 'translateX( 0 )'
	},

	/**
	* Initial app setup
	*/
	init: function() {
		s = this.settings;

		var types = Object.keys( s.questions ),
			newImg;

		this.checkForMobile();

		// Create image placeholders
		for( let type of types ) {

			newImg = document.createElement( 'img' );
			newImg.setAttribute( 'src', '' );
			newImg.setAttribute( 'alt', '' );
			newImg.setAttribute( 'id', type );
			newImg.setAttribute( 'class', 'fade' );

			s.imgHolder.appendChild( newImg );
		}

		// Create the first select / question
		this.displayQuestion( document.getElementById( 'initSelect' ) );

		this.bindEvents();
	},

	/**
	* Bind necessary event handlers
	*/
	bindEvents: function() {

		// Bind window resize event
		window.addEventListener( 'resize', this.checkForMobile.bind( this ), true );

		// Click event for previous button
		s.prevBtn.addEventListener( 'click', () => { this.slideInOption( false ); }, false );

		// Click event for next button
		s.nextBtn.addEventListener( 'click', () => { this.slideInOption( true ); }, false );
	},

	/**
	* Helper function - Removes all child nodes
	* of the passed in element
	*/
	removeChildNodes: function( parentEl ) {

		while( parentEl.lastChild ) {

			parentEl.removeChild( parentEl.lastChild );
		}
	},

	/**
	* Helper function - Fade in/out the passed in element
	*/
	fadeElement: function( element, fadeOut ) {

		var opacity = 1,
			visibility = 'visible';

		if( fadeOut ) {

			opacity = 0;
			visibility = 'hidden';
		}

		element.style.opacity = opacity;
		element.style.visibility = visibility;
	},


	/*----------------------------------------------------------------------------------------

	MOBILE EXPERIENCE

	------------------------------------------------------------------------------------------*/


	/**
	* Sets settings.isMobile based on window size, so we
	* can create a different experience for mobile devices /
	* small screen sizes
	*/
	checkForMobile: function() {

		var prevIsMobile = s.isMobile;

		// Check screen size
		s.isMobile = ( Number( window.innerWidth ) < 768 ) ? true : false;

		// Changing between different user experiences
		if( s.isMobile !== prevIsMobile ) {
			
			this.changeUserExperience();
		}
	},

	/**
	* Updates necessary variables and DOM elements when switching
	* between the mobile and desktop experiences
	*/
	changeUserExperience: function() {

		var selects = s.selHolder.children,
			translate = '',
			selClass = '';

		// Changing from desktop to mobile...
		if( s.isMobile ) {

			s.currentSel = 0; // Send user back to first select for simplicity's sake

			translate = s.translateRight;

			this.updateBtnStatus( s.nextBtn, false ); // Enable the next button
		}
		// Changing from mobile to desktop...
		else {

			translate = s.translateReset;
			selClass = 'fade';
		}

		// Update styling & transitions
		for( let select of selects ) {

			// For mobile, skip over first select when updating position
			if( !s.isMobile || ( s.isMobile && select !== s.selHolder.firstChild ) ) {

				select.style.transform = translate;
			}

			select.setAttribute( 'class', selClass );
		}
	},

	/**
	* Handles enabling and disabling the next/prev buttons
	* for mobile devices / small screen sizes
	*/
	updateBtnStatus: function( button, disable ) {

		// Next/Prev buttons are only needed for mobile devices
		if( s.isMobile ) {

			button.disabled = disable;
		}
	},

	/**
	* For mobile devices, slide in the current select
	* and slide out the next select
	*/
	slideInOption: function( next ) {

		var translate = '',
			increment,
			select;

		// Next/Prev buttons are only needed for mobile devices
		if( s.isMobile ) {

			// User clicked next
			if( next ) {
				translate = s.translateLeft;
				increment = 1;

				// Enable the prev button
				this.updateBtnStatus( s.prevBtn, false );

				// Disable the next button when there is no next select
				if( s.currentSel + increment === s.selHolder.children.length - 1 ) {

					this.updateBtnStatus( s.nextBtn, true );
				}
			}
			// User clicked prev
			else {
				translate = s.translateRight;
				increment = -1;

				// Disable prev button if we're back to the first select / option
				if( s.currentSel + increment === 0 ) {

					this.updateBtnStatus( s.prevBtn, true );
				}

				// Enable the next button
				this.updateBtnStatus( s.nextBtn, false );
			}

			// Slide out current select
			select = s.selHolder.children[ s.currentSel ];
			select.style.transform = translate;

			s.currentSel = s.currentSel + increment;

			// Slide in next select
			select = s.selHolder.children[ s.currentSel ];
			select.style.transform = s.translateReset;
		}

		// Do nothing if not mobile
		return false;
	},


	/*----------------------------------------------------------------------------------------

	QUESTION / SELECT GENERATION

	------------------------------------------------------------------------------------------*/


	/**
	* Handles select menu change events when user selects
	* or updates a choice
	*/
	optionUpdated: function( e ) {

		this.displayQuestion( e.target );
	},

	/**
	* Display the next question
	*/
	displayQuestion: function( select ) {

		var [ type, name, imageType ] = select.value.split( '|' ), 	// Question type, previous answer (to load image), previous type (to load image)
			data = s.questions[ type ]; 							// Data for question/options


		// Load the image
		if( imageType && name ) {
			this.updateImages( imageType, name );
		}

		// Still more questions to load...
		if( data ) {

			this.removePrevChoices( select );
			this.createSelect( data, imageType, type );
		}
		// Reached end of the questions, show instructions & download form
		else {

			this.displayInstructions();
			this.displayForm();
		}
	},

	/**
	* Creates the markup needed for each question
	*/
	createSelect: function( data, imageType, type ) {

		var selContainer,
			labelSpan,
			newSel,
			newOpt,
			nameCap;

		// Create label
		selContainer = document.createElement( 'label' );

		// Tablet & Desktop selects should fade in
		if( !s.isMobile ) {

			selContainer.setAttribute( 'class', 'fade' );
		}
		// Mobile devices offer different user experience
		else if( imageType ) {

			// Mobile selects should slide in
			selContainer.style.transform = s.translateRight;
			
			// Enable the next button
			this.updateBtnStatus( s.nextBtn, false );
		}

		// Wrap text in span for styling purposes
		labelSpan = document.createElement( 'span' );
		labelSpan.appendChild( document.createTextNode( `${ data.optionLabel }:` ) );
		selContainer.appendChild( labelSpan );

		// Create the select
		newSel = document.createElement( 'select' );
		newSel.addEventListener('change', this.optionUpdated.bind( this ), false);

		// Create the first option (question text)
		newOpt = document.createElement( 'option' );
		newOpt.setAttribute( 'disabled', 'disabled' );
		newOpt.setAttribute( 'selected', 'selected' );
		newOpt.appendChild( document.createTextNode( `Choose your ${ data.optionLabel }...` ) );
		newSel.appendChild( newOpt );

		// Create the rest of the options (question choices)
		for( let option of data.options ) {

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
		setTimeout( () => { this.fadeElement( selContainer, false); }, 10); 
	},

	/**
	* Remove unnecessary selects when the user edits
	* a previously selected option
	*/
	removePrevChoices: function( select ) {

		// User changed a previous option...
		while( select.parentNode !== s.selHolder.lastChild ){

			s.selHolder.removeChild( s.selHolder.lastChild );
		}

		// Fade out steps holder and download form
		this.fadeElement( s.stepsHolder, true );
		this.fadeElement( s.formHolder, true );
	},

	
	/*----------------------------------------------------------------------------------------

	IMAGE GENERATION

	------------------------------------------------------------------------------------------*/


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
		this.fadeElement( img, false );

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
			this.fadeElement( s.images[ index ], true );
		}
	},


	/*----------------------------------------------------------------------------------------

	INSTRUCTION LIST GENERATION

	------------------------------------------------------------------------------------------*/


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
		this.removeChildNodes( list );

		// Build new instructions
		for( let instruction of instructions ) {

			listItem = document.createElement( 'li' );
			listItem.appendChild( document.createTextNode( instruction ) );
			list.appendChild( listItem );
		}

		// Fade in instructions
		this.fadeElement( s.stepsHolder, false );
	},


	/*----------------------------------------------------------------------------------------

	DOWNLOAD FORM / BUTTON GENERATION

	------------------------------------------------------------------------------------------*/


	/**
	* Generates and displays necessary form elements
	*/
	displayForm: function() {

		var inputsHolder = document.getElementById( 'inputsHolder' ),
			input;

		// Remove past inputs/choices
		this.removeChildNodes( inputsHolder );

		// Loop through all images and generate hidden inputs
		// Inputs needed to pass image data to the PHP script
		for( let image of s.images ) {

			input = document.createElement( 'input' );
			input.setAttribute( 'type', 'hidden' );
			input.setAttribute( 'value', image.getAttribute( 'src' ) );
			input.setAttribute( 'name', 'layer[]' );

			inputsHolder.appendChild( input );
		}

		// Fade in form
		this.fadeElement( s.formHolder, false );
	}
};

(function() {

  MakeupGenerator.init();

})();