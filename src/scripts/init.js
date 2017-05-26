var MakeupGenerator = {

	// Initialize the app settings
	settings: {
		questions: questionData,
		displayedQuestions: [],
		images: [],
		instructions: null,
		form: null,
		prevBtn: null,
		nextBtn: null,
		isMobile: true,
		currentQuestionIndex: 0
	},


	/**
	 * Initial app setup
	 */
	init: function() {
		this.checkForMobile();
		this.createMobileNav();

		// Bind window resize event
		window.addEventListener('resize', this.checkForMobile.bind(this), true);

		// Display initial question
		this.questionType = 'lid';
		this.createQuestion();
	},

	/**
	 * Helper function - append element, fade/slide in, and add to an array
	 */
	displayElement: function(container, object, array, slide = false) {
		container.appendChild(object.toHTML());

		// Questions on desktop and all other elements fade in
		if (!slide) {
			// Timeout needed for animation / transition
			setTimeout(() => object.fadeIn(), 10);
		}
		// Questions on mobile slide in
		else {
			// Don't position/translate the first question
			object.slideIn(!!this.settings.displayedQuestions.length);
		}

		if (array) {
			array.push(object);
		}
	},

	/**
	 * Display a question
	 */
	createQuestion: function() {
		var questionHolder = document.getElementById('questionHolder'),
			question = new Question(this.settings.questions[this.questionType], this.questionType, this.onSelection.bind(this));

		this.displayElement(questionHolder, question, this.settings.displayedQuestions, this.settings.isMobile);
	},

	/**
	 * Display an image
	 */
	createImage: function(selectedOption) {
		var imgHolder = document.getElementById('imgHolder'),
			image = new Element({
				tag: 'img',
				attributes: {
					src: `images/${ selectedOption }.png`,
					alt: this.questionType
				}
			});

		this.displayElement(imgHolder, image, this.settings.images);
	},

	/**
	 * Display list of steps to recreate the look
	 */
	createInstructions: function() {
		var instructionsHolder = document.getElementById('instructionsHolder');
			this.settings.instructions = new Instructions(this.settings.displayedQuestions);

		this.displayElement(instructionsHolder, this.settings.instructions);
	},

	/**
	 * Display the download button
	 */
	createDownloadForm: function() {
		var formHolder = document.getElementById('formHolder');
			this.settings.form = new DownloadForm(document.querySelectorAll('#imgHolder img'));

		this.displayElement(formHolder, this.settings.form);
	},

	/**
	 * Display the next/prev buttons for mobile experience
	 */
	createMobileNav: function() {
		var navHolder = document.getElementById('questionNav');
			this.settings.prevBtn = new Button('prev', this.slideInQuestion);
			this.settings.nextBtn = new Button('next', this.slideInQuestion);

		this.displayElement(navHolder, this.settings.prevBtn);
		this.displayElement(navHolder, this.settings.nextBtn);

		this.settings.prevBtn.disable(true);
		this.settings.nextBtn.disable(true);
	},

	/**
	 * Helper function - remove an array of elements from the page
	 */
	removeArrayOfElements: function(stop, array) {
		// Remove elements starting at the end of the array until reaching the stop point/index
		for (let i = array.length - 1; i > stop; i--) {
			this.removeSingleElement(array[i]);
			array.splice(i, 1);
		}
	},

	/**
	 * Helper function - remove a single element from the page
	 */
	removeSingleElement: function(object) {
		if (object) {
			object.removeFromDOM();
		}
	},

	/**
	 * Removes any unneeded questions or images,
	 * clears out the instructions and download form
	 */
	resetUI: function(question) {
		var index = this.settings.displayedQuestions.indexOf(question);

		// Remove unnecessary questions & images
		this.removeArrayOfElements(index, this.settings.displayedQuestions);
		this.removeArrayOfElements(index - 1, this.settings.images);

		// Remove instructions
		this.removeSingleElement(this.settings.instructions);
		this.settings.instructions = null;

		// Remove form
		this.removeSingleElement(this.settings.form);
		this.settings.form = null;
	},

	/**
	 * Triggered when user answers a question
	 */
	onSelection: function(selectedOption, updatedPastChoice, question) {

		// If user updated a past choice...
		if (updatedPastChoice) {
			this.resetUI(question);

			// Reset question type
			this.questionType = question.questionType;
		}

		// Display image
		this.createImage(selectedOption);

		this.questionType = this.settings.questions[this.questionType].nextType;

		// Still more questions...
		if (this.questionType) {

			// Display next question
			this.createQuestion();

			// Enable next button for mobile devices
			if (this.settings.isMobile) {
				this.settings.nextBtn.disable(false);
			}
		}
		// No more questions to display
		else {
			this.createInstructions();
			this.createDownloadForm();
		}

	},


	/*-----------------------------------------------------------------

	MOBILE EXPERIENCE

	-------------------------------------------------------------------*/

	/**
	 * Sets settings.isMobile based on window size, so we
	 * can create a different experience for mobile devices /
	 * small screen sizes
	 */
	checkForMobile: function() {
		var prevIsMobile = this.settings.isMobile;

		// Check screen size
		this.settings.isMobile = (Number(window.innerWidth) < 768) ? true : false;

		// Changing between different user experiences
		if (this.settings.isMobile !== prevIsMobile) {
			this.changeUserExperience();
		}
	},

	/**
	 * Updates necessary variables and DOM elements when switching
	 * between the mobile and desktop experiences
	 */
	changeUserExperience: function() {
		var questions = this.settings.displayedQuestions,
			translate = '',
			classname = '';


		// Changing from desktop to mobile...
		// Send user back to first select for simplicity's sake
		// Disable prev button
		// Enable next button if there is a next question
		if (this.settings.isMobile) {
			this.settings.currentQuestionIndex = 0;
			this.settings.prevBtn.disable( true );

			if (questions.length > 1) {
				this.settings.nextBtn.disable( false );
			}

			translate = 'right';
		}
		// Changing from mobile to desktop...
		else {
			translate = 'reset';
			classname = 'fade';
		}

		// Loop through questions
		// Update styling & transitions
		for (let i = 0, len = questions.length; i < len; i++) {
			// For mobile, skip over first select when updating position
			if (!this.settings.isMobile || (this.settings.isMobile && i > 0)) {
				questions[i].translate(translate);
			}

			questions[i].setClass(classname);
		}
	},

	/**
	 * User clicked next or previous button
	 * Handles sliding in new question / sliding out current question
	 */
	slideInQuestion: function(next) {
		var translate = '',
			increment;

		// Next/Prev buttons are only needed for mobile devices
		if (this.settings.isMobile) {
			// User clicked next
			if (next) {
				translate = 'left';
				increment = 1;

				// Enable the prev button
				this.settings.prevBtn.disable(false);

				// Disable the next button when there is no next question
				if (this.settings.currentQuestionIndex + increment === this.settings.displayedQuestions.length - 1) {
					this.settings.nextBtn.disable(true);
				}
			}
			// User clicked prev
			else {
				translate = 'right';
				increment = -1;

				// Disable prev button if we're back to the first question
				if (this.settings.currentQuestionIndex + increment === 0) {
					this.settings.prevBtn.disable(true);
				}

				// Enable the next button
				this.settings.nextBtn.disable(false);
			}

			// Slide out current question,  Update index, Slide in next question
			this.settings.displayedQuestions[this.settings.currentQuestionIndex].translate(translate);
			this.settings.currentQuestionIndex = this.settings.currentQuestionIndex + increment;
			this.settings.displayedQuestions[this.settings.currentQuestionIndex].translate('reset');
		}

		// Do nothing if not mobile
		return false;
	}

};

(function() {
  MakeupGenerator.init();
})();