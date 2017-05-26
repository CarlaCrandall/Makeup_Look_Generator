/**
 * Element Class
 * Extended by Button, DownloadForm, Instructions, List, Question, and Select classes
 */
'use strict';

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Element = (function () {

	/**
  * Create an instance of Element
  * @param { object } options - contains options used to build the element
  * @param { string } options.tag - the tagname of the element
  * @param { object } options.attributes - the attributes for the element
  * @param { string } options.textNode - the text that should be appended to the element
  */

	function Element() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, Element);

		this.tag = options.tag || 'div';
		this.attributes = options.attributes || null;
		this.textNode = options.textNode || null;
		this.element = null;
	}

	/**
  * Select Class - Inherits from Element
  */

	/**
  * Build element markup
  */

	_createClass(Element, [{
		key: 'toHTML',
		value: function toHTML() {
			// Create the element
			this.element = document.createElement(this.tag);

			// Add any attributes
			if (this.attributes) {
				for (var property in this.attributes) {
					if (this.attributes.hasOwnProperty(property)) {
						this.element.setAttribute(property, this.attributes[property]);
					}
				}
			}

			// Append the text node
			if (this.textNode) {
				this.element.appendChild(document.createTextNode(this.textNode));
			}

			return this.element;
		}

		/**
   * Fade element in
   */
	}, {
		key: 'fadeIn',
		value: function fadeIn() {
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
	}, {
		key: 'removeFromDOM',
		value: function removeFromDOM() {
			this.element.parentNode.removeChild(this.element);
		}
	}]);

	return Element;
})();

var Select = (function (_Element) {
	_inherits(Select, _Element);

	/**
  * Create an instance of Select
  * @param { object } questionData - contains necessary data to create the select options
  */

	function Select(questionData) {
		_classCallCheck(this, Select);

		_get(Object.getPrototypeOf(Select.prototype), 'constructor', this).call(this, { tag: 'select' });
		this.questionData = questionData;
	}

	/**
  * List Class - Inherits from Element
  */

	/**
  * Build select markup
  */

	_createClass(Select, [{
		key: 'toHTML',
		value: function toHTML() {
			var option,
			    nameCap = '';

			// Create the select
			_get(Object.getPrototypeOf(Select.prototype), 'toHTML', this).call(this);

			// Create the first Option (question text)
			option = new Element({
				tag: 'option',
				attributes: {
					disabled: 'disabled',
					selected: 'selected'
				},
				textNode: 'Choose your ' + this.questionData.questionLabel + '...'
			});

			this.element.appendChild(option.toHTML());

			// Create the other Options (question choices)
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.questionData.choices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var choice = _step.value;

					nameCap = choice.charAt(0).toUpperCase() + choice.slice(1);

					option = new Element({
						tag: 'option',
						attributes: { value: choice },
						textNode: nameCap
					});

					this.element.appendChild(option.toHTML());
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return this.element;
		}
	}]);

	return Select;
})(Element);

var List = (function (_Element2) {
	_inherits(List, _Element2);

	/**
  * Create an instance of List
  * @param { array } answeredQuestions - contains a list of all the questions with the user's choice
  */

	function List(answeredQuestions) {
		_classCallCheck(this, List);

		_get(Object.getPrototypeOf(List.prototype), 'constructor', this).call(this, { tag: 'ol' });
		this.answeredQuestions = answeredQuestions;
	}

	/**
  * Question Class - Inherits from Element
  */

	/**
  * Build list markup
  */

	_createClass(List, [{
		key: 'toHTML',
		value: function toHTML() {
			var listItem;

			// Create the list
			_get(Object.getPrototypeOf(List.prototype), 'toHTML', this).call(this);

			// Create the other Options (question choices)
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.answeredQuestions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var question = _step2.value;

					listItem = new Element({
						tag: 'li',
						textNode: question.questionData.instruction[0] + ' ' + question.selectedOption + ' ' + question.questionData.instruction[1]
					});

					this.element.appendChild(listItem.toHTML());
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2['return']) {
						_iterator2['return']();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return this.element;
		}
	}]);

	return List;
})(Element);

var Question = (function (_Element3) {
	_inherits(Question, _Element3);

	/**
  * Create an instance of Question
  * @param { object } questionData - contains necessary data to create the question markup
  * @param { string } questionType - used to create the label for the question
  * @param { function } onSelection - function called when user selects an answer / option
  */

	function Question(questionData, questionType, onSelection) {
		_classCallCheck(this, Question);

		// Question containing element will be a div
		_get(Object.getPrototypeOf(Question.prototype), 'constructor', this).call(this, {
			tag: 'label',
			attributes: { 'class': 'question' }
		});

		this.questionData = questionData;
		this.questionType = questionType;
		this.onSelection = onSelection;
		this.selectedOption = '';
	}

	/**
  * Instructions Class - Inherits from Element
  */

	/**
  * Build question markup
  */

	_createClass(Question, [{
		key: 'toHTML',
		value: function toHTML() {
			// Create label, span and select
			var span, select;

			_get(Object.getPrototypeOf(Question.prototype), 'toHTML', this).call(this);

			span = new Element({
				tag: 'span',
				textNode: this.questionData.questionLabel + ':'
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
	}, {
		key: 'answerSelected',
		value: function answerSelected(evt) {
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
	}, {
		key: 'slideIn',
		value: function slideIn() {
			var translate = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

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
	}, {
		key: 'translate',
		value: function translate(value) {
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
	}, {
		key: 'setClass',
		value: function setClass(value) {
			this.element.setAttribute('class', 'question ' + value);
		}
	}]);

	return Question;
})(Element);

var Instructions = (function (_Element4) {
	_inherits(Instructions, _Element4);

	/**
  * Create an instance of Instructions
  * @param { array } answeredQuestions - contains a list of all the questions with the user's choice
  */

	function Instructions(answeredQuestions) {
		_classCallCheck(this, Instructions);

		_get(Object.getPrototypeOf(Instructions.prototype), 'constructor', this).call(this);
		this.answeredQuestions = answeredQuestions;
	}

	/**
  * Download Form Class - Inherits from Element
  */

	/**
  * Build instructions markup
  */

	_createClass(Instructions, [{
		key: 'toHTML',
		value: function toHTML() {
			var title, list;

			// Create the container
			_get(Object.getPrototypeOf(Instructions.prototype), 'toHTML', this).call(this);

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
	}]);

	return Instructions;
})(Element);

var DownloadForm = (function (_Element5) {
	_inherits(DownloadForm, _Element5);

	/**
  * Create an instance of Download Form
  * @param { node list } images - contains a list of all the makeup look images
  */

	function DownloadForm(images) {
		_classCallCheck(this, DownloadForm);

		_get(Object.getPrototypeOf(DownloadForm.prototype), 'constructor', this).call(this, {
			tag: 'form',
			attributes: {
				method: 'post',
				action: 'image.php'
			}
		});

		this.images = images;
	}

	/**
  * Button Class - Inherits from Element
  */

	/**
  * Build form markup
  */

	_createClass(DownloadForm, [{
		key: 'toHTML',
		value: function toHTML() {
			var input;

			// Create the container
			_get(Object.getPrototypeOf(DownloadForm.prototype), 'toHTML', this).call(this);

			// Create the hidden inputs
			var _iteratorNormalCompletion3 = true;

			// Create the button
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.images[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var image = _step3.value;

					input = new Element({
						tag: 'input',
						attributes: {
							type: 'hidden',
							value: image.getAttribute('src'),
							name: 'layer[]'
						}
					});

					this.element.appendChild(input.toHTML());
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3['return']) {
						_iterator3['return']();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			input = new Element({
				tag: 'input',
				attributes: {
					type: 'submit',
					value: 'Download Your Look',
					name: 'download'
				}
			});

			this.element.appendChild(input.toHTML());

			return this.element;
		}
	}]);

	return DownloadForm;
})(Element);

var Button = (function (_Element6) {
	_inherits(Button, _Element6);

	/**
  * Create an instance of Button
  * @param { string } value - the button value
  * @param { function } onclick - the function to call when button is clicked
  */

	function Button(value, onclick) {
		_classCallCheck(this, Button);

		_get(Object.getPrototypeOf(Button.prototype), 'constructor', this).call(this, {
			tag: 'input',
			attributes: {
				type: 'button',
				value: value,
				name: value + 'Btn'
			}
		});

		this.onclick = onclick;
	}

	/**
  * Build button markup
  */

	_createClass(Button, [{
		key: 'toHTML',
		value: function toHTML() {
			_get(Object.getPrototypeOf(Button.prototype), 'toHTML', this).call(this);
			this.element.addEventListener('click', this.btnClicked.bind(this), false);
			return this.element;
		}

		/**
   * User clicked a button - figure out if previous or next and call the onclick function
   */
	}, {
		key: 'btnClicked',
		value: function btnClicked() {
			var next = this.attributes.value === 'next' ? true : false;
			this.onclick(next);
		}

		/**
   * Toggle disabled/enabled state of the button
   * @param { boolean } state - determines whether button should be disabled or enabled
   */
	}, {
		key: 'disable',
		value: function disable(state) {
			this.element.disabled = state;
		}
	}]);

	return Button;
})(Element);

var settings,
    MakeupGenerator = {

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
	init: function init() {
		settings = this.settings;

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
	displayElement: function displayElement(container, object, array) {
		var slide = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

		container.appendChild(object.toHTML());

		// Questions on desktop and all other elements fade in
		if (!slide) {
			// Timeout needed for animation / transition
			setTimeout(function () {
				return object.fadeIn();
			}, 10);
		}
		// Questions on mobile slide in
		else {
				// Don't position/translate the first question
				object.slideIn(!!settings.displayedQuestions.length);
			}

		if (array) {
			array.push(object);
		}
	},

	/**
  * Display a question
  */
	createQuestion: function createQuestion() {
		var questionHolder = document.getElementById('questionHolder'),
		    question = new Question(settings.questions[this.questionType], this.questionType, this.onSelection.bind(this));

		this.displayElement(questionHolder, question, settings.displayedQuestions, settings.isMobile);
	},

	/**
  * Display an image
  */
	createImage: function createImage(selectedOption) {
		var imgHolder = document.getElementById('imgHolder'),
		    image = new Element({
			tag: 'img',
			attributes: {
				src: 'images/' + selectedOption + '.png',
				alt: this.questionType
			}
		});

		this.displayElement(imgHolder, image, settings.images);
	},

	/**
  * Display list of steps to recreate the look
  */
	createInstructions: function createInstructions() {
		var instructionsHolder = document.getElementById('instructionsHolder');
		settings.instructions = new Instructions(settings.displayedQuestions);

		this.displayElement(instructionsHolder, settings.instructions);
	},

	/**
  * Display the download button
  */
	createDownloadForm: function createDownloadForm() {
		var formHolder = document.getElementById('formHolder');
		settings.form = new DownloadForm(document.querySelectorAll('#imgHolder img'));

		this.displayElement(formHolder, settings.form);
	},

	/**
  * Display the next/prev buttons for mobile experience
  */
	createMobileNav: function createMobileNav() {
		var navHolder = document.getElementById('questionNav');
		settings.prevBtn = new Button('prev', this.slideInQuestion);
		settings.nextBtn = new Button('next', this.slideInQuestion);

		this.displayElement(navHolder, settings.prevBtn);
		this.displayElement(navHolder, settings.nextBtn);

		settings.prevBtn.disable(true);
		settings.nextBtn.disable(true);
	},

	/**
  * Helper function - remove an array of elements from the page
  */
	removeArrayOfElements: function removeArrayOfElements(stop, array) {
		// Remove elements starting at the end of the array until reaching the stop point/index
		for (var i = array.length - 1; i > stop; i--) {
			this.removeSingleElement(array[i]);
			array.splice(i, 1);
		}
	},

	/**
  * Helper function - remove a single element from the page
  */
	removeSingleElement: function removeSingleElement(object) {
		if (object) {
			object.removeFromDOM();
		}
	},

	/**
  * Removes any unneeded questions or images,
  * clears out the instructions and download form
  */
	resetUI: function resetUI(question) {
		var index = settings.displayedQuestions.indexOf(question);

		// Remove unnecessary questions & images
		this.removeArrayOfElements(index, settings.displayedQuestions);
		this.removeArrayOfElements(index - 1, settings.images);

		// Remove instructions
		this.removeSingleElement(settings.instructions);
		settings.instructions = null;

		// Remove form
		this.removeSingleElement(settings.form);
		settings.form = null;
	},

	/**
  * Triggered when user answers a question
  */
	onSelection: function onSelection(selectedOption, updatedPastChoice, question) {

		// If user updated a past choice...
		if (updatedPastChoice) {
			this.resetUI(question);

			// Reset question type
			this.questionType = question.questionType;
		}

		// Display image
		this.createImage(selectedOption);

		this.questionType = settings.questions[this.questionType].nextType;

		// Still more questions...
		if (this.questionType) {

			// Display next question
			this.createQuestion();

			// Enable next button for mobile devices
			if (settings.isMobile) {
				settings.nextBtn.disable(false);
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
	checkForMobile: function checkForMobile() {
		var prevIsMobile = settings.isMobile;

		// Check screen size
		settings.isMobile = Number(window.innerWidth) < 768 ? true : false;

		// Changing between different user experiences
		if (settings.isMobile !== prevIsMobile) {
			this.changeUserExperience();
		}
	},

	/**
  * Updates necessary variables and DOM elements when switching
  * between the mobile and desktop experiences
  */
	changeUserExperience: function changeUserExperience() {
		var questions = settings.displayedQuestions,
		    translate = '',
		    classname = '';

		// Changing from desktop to mobile...
		// Send user back to first select for simplicity's sake
		// Disable prev button
		// Enable next button if there is a next question
		if (settings.isMobile) {
			settings.currentQuestionIndex = 0;
			settings.prevBtn.disable(true);

			if (questions.length > 1) {
				settings.nextBtn.disable(false);
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
		for (var i = 0, len = questions.length; i < len; i++) {
			// For mobile, skip over first select when updating position
			if (!settings.isMobile || settings.isMobile && i > 0) {
				questions[i].translate(translate);
			}

			questions[i].setClass(classname);
		}
	},

	/**
  * User clicked next or previous button
  * Handles sliding in new question / sliding out current question
  */
	slideInQuestion: function slideInQuestion(next) {
		var translate = '',
		    increment;

		// Next/Prev buttons are only needed for mobile devices
		if (settings.isMobile) {
			// User clicked next
			if (next) {
				translate = 'left';
				increment = 1;

				// Enable the prev button
				settings.prevBtn.disable(false);

				// Disable the next button when there is no next question
				if (settings.currentQuestionIndex + increment === settings.displayedQuestions.length - 1) {
					settings.nextBtn.disable(true);
				}
			}
			// User clicked prev
			else {
					translate = 'right';
					increment = -1;

					// Disable prev button if we're back to the first question
					if (settings.currentQuestionIndex + increment === 0) {
						settings.prevBtn.disable(true);
					}

					// Enable the next button
					settings.nextBtn.disable(false);
				}

			// Slide out current question,  Update index, Slide in next question
			settings.displayedQuestions[settings.currentQuestionIndex].translate(translate);
			settings.currentQuestionIndex = settings.currentQuestionIndex + increment;
			settings.displayedQuestions[settings.currentQuestionIndex].translate('reset');
		}

		// Do nothing if not mobile
		return false;
	}

};

(function () {
	MakeupGenerator.init();
})();
