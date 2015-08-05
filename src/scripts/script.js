'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var settings,
    MakeupGenerator = {

	settings: {
		questions: questionData,
		isMobile: true,
		currentSelectIndex: 0,
		images: [],
		imgHolder: document.getElementById('imgHolder'),
		selectHolder: document.getElementById('selHolder'),
		stepsHolder: document.getElementById('stepsHolder'),
		formHolder: document.getElementById('formHolder'),
		nextBtn: document.getElementById('next'),
		prevBtn: document.getElementById('prev'),
		translateRight: 'translateX( calc( 100% + 15px ) )',
		translateLeft: 'translateX( calc( -100% - 15px ) )',
		translateReset: 'translateX( 0 )'
	},

	/**
 * Initial app setup
 */
	init: function init() {
		settings = this.settings;

		var types = Object.keys(settings.questions),
		    newImg;

		this.checkForMobile();

		// Create image placeholders
		var _iteratorNormalCompletion = true;

		// Create the first select / question
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = types[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var type = _step.value;

				newImg = document.createElement('img');
				newImg.setAttribute('src', '');
				newImg.setAttribute('alt', '');
				newImg.setAttribute('id', type);
				newImg.setAttribute('class', 'fade');

				settings.imgHolder.appendChild(newImg);
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

		this.optionUpdated(document.getElementById('initSelect'));

		this.bindEvents();
	},

	/**
 * Bind necessary event handlers
 */
	bindEvents: function bindEvents() {
		var _this = this;

		// Bind window resize event
		window.addEventListener('resize', this.checkForMobile.bind(this), true);

		// Click event for previous button
		settings.prevBtn.addEventListener('click', function () {
			_this.slideInOption(false);
		}, false);

		// Click event for next button
		settings.nextBtn.addEventListener('click', function () {
			_this.slideInOption(true);
		}, false);
	},

	/**
 * Helper function - Removes all child nodes
 * of the passed in element
 */
	removeChildNodes: function removeChildNodes(parentEl) {

		while (parentEl.lastChild) {

			parentEl.removeChild(parentEl.lastChild);
		}
	},

	/**
 * Helper function - Fade in/out the passed in element
 */
	fadeElement: function fadeElement(element, fadeOut) {

		var opacity = 1,
		    visibility = 'visible';

		if (fadeOut) {

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

		var selects = settings.selectHolder.children,
		    translate = '',
		    classname = '';

		// Changing from desktop to mobile...
		if (settings.isMobile) {

			// Disable prev button
			settings.prevBtn.disabled = true;

			// Enable next button if there is a next select
			if (selects.length > 1) {

				settings.nextBtn.disabled = false;
			}

			// Send user back to first select for simplicity's sake
			settings.currentSelectIndex = 0;

			translate = settings.translateRight;
		}
		// Changing from mobile to desktop...
		else {

				translate = settings.translateReset;
				classname = 'fade';
			}

		// Update styling & transitions
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = selects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var select = _step2.value;

				// For mobile, skip over first select when updating position
				if (!settings.isMobile || settings.isMobile && select !== settings.selectHolder.firstChild) {

					select.style.transform = translate;
				}

				select.setAttribute('class', classname);
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
	},

	/**
 * For mobile devices, slide in the current select
 * and slide out the next select
 */
	slideInOption: function slideInOption(next) {

		var translate = '',
		    increment,
		    select;

		// Next/Prev buttons are only needed for mobile devices
		if (settings.isMobile) {

			// User clicked next
			if (next) {
				translate = settings.translateLeft;
				increment = 1;

				// Enable the prev button
				settings.prevBtn.disabled = false;

				// Disable the next button when there is no next select
				if (settings.currentSelectIndex + increment === settings.selectHolder.children.length - 1) {

					settings.nextBtn.disabled = true;
				}
			}
			// User clicked prev
			else {
					translate = settings.translateRight;
					increment = -1;

					// Disable prev button if we're back to the first select / option
					if (settings.currentSelectIndex + increment === 0) {

						settings.prevBtn.disabled = true;
					}

					// Enable the next button
					settings.nextBtn.disabled = false;
				}

			// Slide out current select
			select = settings.selectHolder.children[settings.currentSelectIndex];
			select.style.transform = translate;

			// Update current select index
			settings.currentSelectIndex = settings.currentSelectIndex + increment;

			// Slide in next select
			select = settings.selectHolder.children[settings.currentSelectIndex];
			select.style.transform = settings.translateReset;
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
	optionUpdated: function optionUpdated(e) {
		var select = e.target || e; // Data for question/options

		// Load the image

		var _select$value$split = select.value.split('|');

		var _select$value$split2 = _slicedToArray(_select$value$split, 3);

		var type = _select$value$split2[0];
		var name = _select$value$split2[1];
		// e.target for event handling, e for initial function call
		var imageType = _select$value$split2[2]; // Question type, previous answer (to load image), previous type (to load image)
		var data = settings.questions[type];if (imageType && name) {
			this.updateImages(imageType, name);
		}

		// Still more questions to load...
		if (data) {

			this.removePrevChoices(select);
			this.displayQuestion(type, imageType, data);
		}
		// Reached end of the questions, show instructions & download form
		else {

				this.displayInstructions();
				this.displayForm();
			}
	},

	/**
 * Display the next question
 */
	displayQuestion: function displayQuestion(type, imageType, data) {
		var _this2 = this;

		var label, select;

		// Enable the next button for mobile devices
		if (settings.isMobile && imageType) {

			settings.nextBtn.disabled = false;
		}

		// Create the question (label & select)
		label = this.createLabel(imageType, data);
		select = this.createSelect(data, type);

		// Add question to the container
		label.appendChild(select);
		settings.selectHolder.appendChild(label);

		// Fade in question - Timeout needed for CSS animation
		setTimeout(function () {
			_this2.fadeElement(label, false);
		}, 10);
	},

	/**
 * Creates the markup needed for each label 
 * (contains the select for styling purposes)
 */
	createLabel: function createLabel(imageType, data) {

		var label, span;

		// Create label
		label = document.createElement('label');

		// Tablet & Desktop questions should fade in
		if (!settings.isMobile) {

			label.setAttribute('class', 'fade');
		}
		// Mobile devices offer different user experience
		else if (imageType) {

				// Mobile questions should slide in
				label.style.transform = settings.translateRight;
			}

		// Wrap text in span for styling purposes
		span = document.createElement('span');
		span.appendChild(document.createTextNode(data.optionLabel + ':'));

		label.appendChild(span);

		return label;
	},

	/**
 * Creates the markup needed for each select dropdown
 */
	createSelect: function createSelect(data, type) {

		var select, option, nameCap;

		// Create the select
		select = document.createElement('select');
		select.addEventListener('change', this.optionUpdated.bind(this), false);

		// Create and append the first option (question text)
		option = this.createOption(null, 'Choose your ' + data.optionLabel + '...', true);
		select.appendChild(option);

		// Create the rest of the options (question choices)
		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = data.options[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var choice = _step3.value;

				// Capitalize first character
				nameCap = choice.charAt(0).toUpperCase() + choice.slice(1);

				// Create and append the option
				option = this.createOption(data.nextType + '|' + choice + '|' + type, nameCap, false);
				select.appendChild(option);
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

		return select;
	},

	/**
 * Creates the markup needed for each option
 * of the select dropdown
 */
	createOption: function createOption(value, textNode, firstOption) {

		var option;

		option = document.createElement('option');

		// Create the first option (question text)
		if (firstOption) {

			option.setAttribute('disabled', 'disabled');
			option.setAttribute('selected', 'selected');
		}

		option.setAttribute('value', value);
		option.appendChild(document.createTextNode(textNode));

		return option;
	},

	/**
 * Remove unnecessary selects when the user edits
 * a previously selected option
 */
	removePrevChoices: function removePrevChoices(select) {

		// User changed a previous option...
		while (select.parentNode !== settings.selectHolder.lastChild) {

			settings.selectHolder.removeChild(settings.selectHolder.lastChild);
		}

		// Fade out steps holder and download form
		this.fadeElement(settings.stepsHolder, true);
		this.fadeElement(settings.formHolder, true);
	},

	/*----------------------------------------------------------------------------------------
 	IMAGE GENERATION
 	------------------------------------------------------------------------------------------*/

	/**
 * Updates images when user makes a selection
 */
	updateImages: function updateImages(type, name) {

		var img = document.getElementById(type),
		    location = 'images/' + name + '.png';

		// User changed a previous option
		// Old images need to be cleared out
		if (img.alt !== '') {

			this.clearImages(img);
		}

		// Load the new image
		img.src = location;
		img.alt = name;

		// Fade in image
		this.fadeElement(img, false);

		// Update current list of images / choices
		settings.images = settings.imgHolder.children;
	},

	/**
 * Remove unnecessary images when the user edits
 * a previously selected option
 */
	clearImages: function clearImages(img) {

		var index = Array.prototype.indexOf.call(settings.images, img) + 1;

		// Hide image choices that come after currently selected image
		for (var len = settings.images.length; index < len; index++) {

			// Fade out image
			this.fadeElement(settings.images[index], true);
		}
	},

	/*----------------------------------------------------------------------------------------
 	INSTRUCTION LIST GENERATION
 	------------------------------------------------------------------------------------------*/

	/**
 * Generate instructions array based on user's choices
 */
	getInstructions: function getInstructions() {

		var instructions = [],
		    step = '',
		    type = '';

		// Build out each step
		// Don't need a step for first image - it's just the base eye
		for (var i = 1, len = settings.images.length; i < len; i++) {

			type = settings.images[i].id;
			step = settings.questions[type].instruction[0] + ' ' + settings.images[i].alt + ' ' + settings.questions[type].instruction[1];

			instructions.push(step);
		}

		return instructions;
	},

	/**
 * Display list of steps to recreate the look
 * created by the user
 */
	displayInstructions: function displayInstructions() {

		var instructions = this.getInstructions(),
		    list = document.getElementById('stepList'),
		    listItem;

		// Remove past instructions
		this.removeChildNodes(list);

		// Build new instructions
		var _iteratorNormalCompletion4 = true;

		// Fade in instructions
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = instructions[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var instruction = _step4.value;

				listItem = document.createElement('li');
				listItem.appendChild(document.createTextNode(instruction));
				list.appendChild(listItem);
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4['return']) {
					_iterator4['return']();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}

		this.fadeElement(settings.stepsHolder, false);
	},

	/*----------------------------------------------------------------------------------------
 	DOWNLOAD FORM / BUTTON GENERATION
 	------------------------------------------------------------------------------------------*/

	/**
 * Generates and displays necessary form elements
 */
	displayForm: function displayForm() {

		var inputsHolder = document.getElementById('inputsHolder'),
		    input;

		// Remove past inputs/choices
		this.removeChildNodes(inputsHolder);

		// Loop through all images and generate hidden inputs
		// Inputs needed to pass image data to the PHP script
		var _iteratorNormalCompletion5 = true;

		// Fade in form
		var _didIteratorError5 = false;
		var _iteratorError5 = undefined;

		try {
			for (var _iterator5 = settings.images[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
				var image = _step5.value;

				input = document.createElement('input');
				input.setAttribute('type', 'hidden');
				input.setAttribute('value', image.getAttribute('src'));
				input.setAttribute('name', 'layer[]');

				inputsHolder.appendChild(input);
			}
		} catch (err) {
			_didIteratorError5 = true;
			_iteratorError5 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion5 && _iterator5['return']) {
					_iterator5['return']();
				}
			} finally {
				if (_didIteratorError5) {
					throw _iteratorError5;
				}
			}
		}

		this.fadeElement(settings.formHolder, false);
	}
};

(function () {

	MakeupGenerator.init();
})();
