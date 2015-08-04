'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var s,
    that,
    MakeupGenerator = {

	settings: {
		questions: questionData,
		isMobile: false,
		currentSel: 0,
		images: [],
		imgHolder: document.getElementById('imgHolder'),
		selHolder: document.getElementById('selHolder'),
		stepsHolder: document.getElementById('stepsHolder'),
		formHolder: document.getElementById('formHolder'),
		nextBtn: document.getElementById('next'),
		prevBtn: document.getElementById('prev')
	},

	/**
 * Initial app setup
 */
	init: function init() {
		s = this.settings;
		that = this;

		var types = Object.keys(s.questions),
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

				s.imgHolder.appendChild(newImg);
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

		this.displayQuestion(document.getElementById('initSelect'));

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
		s.prevBtn.addEventListener('click', function () {
			_this.slideInOption(false);
		}, false);

		// Click event for next button
		s.nextBtn.addEventListener('click', function () {
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

	/*----------------------------------------------------------------------------------------
 	MOBILE EXPERIENCE
 	------------------------------------------------------------------------------------------*/

	/**
 * Sets settings.isMobile based on window size, so we
 * can create a different experience for mobile devices /
 * small screen sizes
 */
	checkForMobile: function checkForMobile() {

		var prevIsMobile = s.isMobile;

		// Check screen size
		s.isMobile = Number(window.innerWidth) < 768 ? true : false;

		// Changing between different user experiences
		if (s.isMobile !== prevIsMobile) {

			this.changeUserExperience();
		}
	},

	/**
 * Updates necessary variables and DOM elements when switching
 * between the mobile and desktop experiences
 */
	changeUserExperience: function changeUserExperience() {

		var selects = s.selHolder.children,
		    translate = '',
		    selClass = '',
		    index = 0;

		// Changing from desktop to mobile...
		if (s.isMobile) {

			s.currentSel = 0; // Send user back to first select for simplicity's sake

			index = 1; // Skip over first select when updating position
			translate = 'translateX( calc( 100% + 15px) )';

			this.updateBtnStatus(s.nextBtn, false); // Enable the next button
		}
		// Changing from mobile to desktop...
		else {

				translate = 'translateX( 0 )';
				selClass = 'fade';
			}

		// Update styling & transitions
		for (var len = selects.length; index < len; index++) {

			selects[index].style.transform = translate;
			selects[index].setAttribute('class', selClass);
		}
	},

	/**
 * Handles enabling and disabling the next/prev buttons
 * for mobile devices / small screen sizes
 */
	updateBtnStatus: function updateBtnStatus(button, disable) {

		// Next/Prev buttons are only needed for mobile devices
		if (s.isMobile) {

			button.disabled = disable;
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
		if (s.isMobile) {

			// User clicked next
			if (next) {
				translate = 'translateX( calc( -100% - 15px ) )';
				increment = 1;

				// Enable the prev button
				this.updateBtnStatus(s.prevBtn, false);

				// Disable the next button when there is no next select
				if (s.currentSel + increment === s.selHolder.children.length - 1) {

					this.updateBtnStatus(s.nextBtn, true);
				}
			}
			// User clicked prev
			else {
					translate = 'translateX( calc( 100% + 15px ) )';
					increment = -1;

					// Disable prev button if we're back to the first select / option
					if (s.currentSel + increment === 0) {

						this.updateBtnStatus(s.prevBtn, true);
					}

					// Enable the next button
					this.updateBtnStatus(s.nextBtn, false);
				}

			// Slide out current select
			select = s.selHolder.children[s.currentSel];
			select.style.transform = translate;

			s.currentSel = s.currentSel + increment;

			// Slide in next select
			select = s.selHolder.children[s.currentSel];
			select.style.transform = 'translateX( 0 )';
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
	optionUpdated: function optionUpdated() {

		that.displayQuestion(this);
	},

	/**
 * Display the next question
 */
	displayQuestion: function displayQuestion(select) {
		var _select$value$split = select.value.split('|');

		// Data for question/options

		// Load the image

		var _select$value$split2 = _slicedToArray(_select$value$split, 3);

		var type = _select$value$split2[0];
		var name = _select$value$split2[1];
		var imageType = _select$value$split2[2]; // Question type, previous answer (to load image), previous type (to load image)
		var data = s.questions[type];if (imageType && name) {
			this.updateImages(imageType, name);
		}

		// Still more questions to load...
		if (data) {

			this.removePrevChoices(select);
			this.createSelect(data, imageType, type);
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
	createSelect: function createSelect(data, imageType, type) {

		var selContainer, labelSpan, newSel, newOpt, nameCap;

		// Create label
		selContainer = document.createElement('label');

		// Tablet & Desktop selects should fade in
		if (!s.isMobile) {

			selContainer.setAttribute('class', 'fade');
		}
		// Mobile devices offer different user experience
		else if (imageType) {

				// Mobile selects should slide in
				selContainer.style.transform = 'translateX( calc( 100% + 15px) )';

				// Enable the next button
				this.updateBtnStatus(s.nextBtn, false);
			}

		// Wrap text in span for styling purposes
		labelSpan = document.createElement('span');
		labelSpan.appendChild(document.createTextNode(data.optionLabel + ':'));
		selContainer.appendChild(labelSpan);

		// Create the select
		newSel = document.createElement('select');
		newSel.addEventListener('change', this.optionUpdated, false);

		// Create the first option (question text)
		newOpt = document.createElement('option');
		newOpt.setAttribute('disabled', 'disabled');
		newOpt.setAttribute('selected', 'selected');
		newOpt.appendChild(document.createTextNode('Choose your ' + data.optionLabel + '...'));
		newSel.appendChild(newOpt);

		// Create the rest of the options (question choices)
		var _iteratorNormalCompletion2 = true;

		// Add select to the container
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = data.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var option = _step2.value;

				// Capitalize first character
				nameCap = option.charAt(0).toUpperCase() + option.slice(1);

				newOpt = document.createElement('option');
				newOpt.setAttribute('value', data.nextType + '|' + option + '|' + type);
				newOpt.appendChild(document.createTextNode(nameCap));
				newSel.appendChild(newOpt);
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

		selContainer.appendChild(newSel);
		s.selHolder.appendChild(selContainer);

		// Fade in select - Timeout needed for CSS animation
		setTimeout(function () {
			selContainer.style.opacity = 1;
		}, 10);
	},

	/**
 * Remove unnecessary selects when the user edits
 * a previously selected option
 */
	removePrevChoices: function removePrevChoices(select) {

		// User changed a previous option...
		while (select.parentNode !== s.selHolder.lastChild) {

			s.selHolder.removeChild(s.selHolder.lastChild);
		}

		// Hide steps holder and download form
		s.stepsHolder.style.opacity = 0;
		s.formHolder.style.opacity = 0;
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
		img.style.opacity = 1;

		// Update current list of images / choices
		s.images = s.imgHolder.children;
	},

	/**
 * Remove unnecessary images when the user edits
 * a previously selected option
 */
	clearImages: function clearImages(img) {

		var index = Array.prototype.indexOf.call(s.images, img) + 1,
		    len;

		// Hide image choices that come after currently selected image
		for (len = s.images.length; index < len; index++) {

			// Fade out image
			s.images[index].style.opacity = 0;
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
		    type = '',
		    i,
		    len;

		// Build out each step
		// Don't need a step for first image - it's just the base eye
		for (i = 1, len = s.images.length; i < len; i++) {

			type = s.images[i].id;
			step = s.questions[type].instruction[0] + ' ' + s.images[i].alt + ' ' + s.questions[type].instruction[1];

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
		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = instructions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var instruction = _step3.value;

				listItem = document.createElement('li');
				listItem.appendChild(document.createTextNode(instruction));
				list.appendChild(listItem);
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

		s.stepsHolder.style.opacity = 1;
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
		var _iteratorNormalCompletion4 = true;

		// TODO: display:none/block for button when needed

		// Show the form
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = s.images[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var image = _step4.value;

				input = document.createElement('input');
				input.setAttribute('type', 'hidden');
				input.setAttribute('value', image.getAttribute('src'));
				input.setAttribute('name', 'layer[]');

				inputsHolder.appendChild(input);
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

		s.formHolder.style.opacity = 1;
	}
};

(function () {

	MakeupGenerator.init();
})();
