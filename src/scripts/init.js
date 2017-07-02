const MakeupGenerator = {

    // Initialize the app state
    state: {
        questions: questionData,
        displayedQuestions: [],
        images: [],
        instructions: null,
        form: null,
        prevBtn: null,
        nextBtn: null,
        isMobile: true,
        currentQuestionIndex: 0,
        displayedQuestionIndex: 0
    },

    refs: {
        questionHolder: document.getElementById('questionHolder'),
        imgHolder: document.getElementById('imgHolder'),
        instructionsHolder: document.getElementById('instructionsHolder'),
        formHolder: document.getElementById('formHolder'),
        navHolder: document.getElementById('questionNav')
    },


    /**
     * Initial app setup
     */
    init: function() {
        this.checkForMobile();
        this.createMobileNav();

        window.addEventListener('resize', () => this.checkForMobile(), true);

        this.createQuestion();
    },

    /**
     * Helper function - append element, fade/slide in, and add to an array
     */
    displayElement: function(container, object, array, slide = false) {
        container.appendChild(object.toHTML());

        // Elements on desktop and fade in
        // Timeout needed for animation / transition
        if (!slide) {
            setTimeout(() => object.fadeIn(), 10);
        }
        // Questions on mobile slide in
        // Don't slide the first question
        else {
            object.slideIn(!!this.state.displayedQuestions.length);
        }

        if (array) {
            array.push(object);
        }
    },

    /**
     * Display a question
     */
    createQuestion: function() {
        const question = new Question(this.state.questions[this.state.currentQuestionIndex], this.onSelection.bind(this));

        this.displayElement(this.refs.questionHolder, question, this.state.displayedQuestions, this.state.isMobile);
    },

    /**
     * Display an image
     */
    createImage: function(selectedOption) {
        const
            questionLabel = this.state.questions[this.state.currentQuestionIndex].questionLabel,
            image = new Element({
                tag: 'img',
                attributes: {
                    src: `images/${selectedOption}.png`,
                    alt: `${selectedOption} ${questionLabel}`
                }
            });

        this.displayElement(this.refs.imgHolder, image, this.state.images);
    },

    /**
     * Display list of steps to recreate the look
     */
    createInstructions: function() {
        this.state.instructions = new Instructions(this.state.displayedQuestions);
        this.displayElement(this.refs.instructionsHolder, this.state.instructions);
    },

    /**
     * Display the download button
     */
    createDownloadForm: function() {
        this.state.form = new DownloadForm(document.querySelectorAll('#imgHolder img'));
        this.displayElement(this.refs.formHolder, this.state.form);
    },

    /**
     * Display the next/prev buttons for mobile experience
     */
    createMobileNav: function() {
        this.state.prevBtn = new Button('prev', () => this.slideInQuestion(false));
        this.state.nextBtn = new Button('next', () => this.slideInQuestion(true));

        this.displayElement(this.refs.navHolder, this.state.prevBtn);
        this.displayElement(this.refs.navHolder, this.state.nextBtn);

        this.state.prevBtn.disable(true);
        this.state.nextBtn.disable(true);
    },

    /**
     * Helper function - remove an array of elements from the page
     */
    removeArrayOfElements: function(stop, array) {
        // Remove elements starting at the end of the array until reaching the stopping point
        for (let i = array.length - 1; i > stop; i--) {
            array[i].removeFromDOM();
            array.splice(i, 1);
        }
    },

    /**
     * Helper function
     * Remove a single element from the page
     * Reset reference to element in the state
     */
    removeSingleElement: function(element) {
        if (this.state[element]) {
            this.state[element].removeFromDOM();
            this.state[element] = null;
        }
    },

    /**
     * Removes any unneeded questions or images,
     * clears out the instructions and download form
     */
    resetUI: function(question) {
        const index = this.state.displayedQuestions.indexOf(question);

        // Remove elements from page
        this.removeArrayOfElements(index, this.state.displayedQuestions);
        this.removeArrayOfElements(index - 1, this.state.images);
        this.removeSingleElement('instructions');
        this.removeSingleElement('form');
    },

    /**
     * Triggered when user answers a question
     */
    onSelection: function(question, updatedPastChoice) {
        // If user updated a past choice, reset UI and question
        if (updatedPastChoice) {
            const index = this.state.questions.indexOf(question.questionData);

            this.resetUI(question);
            this.state.currentQuestionIndex = index;
        }

        // Display image
        this.createImage(question.selectedOption);

        this.state.currentQuestionIndex++;
        this.state.currentQuestion = this.state.questions[this.state.currentQuestionIndex];

        // Display the next question
        if (this.state.questions[this.state.currentQuestionIndex]) {
            this.createQuestion();

            // Enable next button for mobile devices
            if (this.state.isMobile) {
                this.state.nextBtn.disable(false);
            }
        }
        // No more questions to display
        else {
            this.createInstructions();
            this.createDownloadForm();
        }
    },


    /* -----------------------------------------------------------------

    MOBILE EXPERIENCE

    ------------------------------------------------------------------- */

    /**
     * Sets state.isMobile based on window size, so we
     * can create a different experience for mobile devices /
     * small screen sizes
     */
    checkForMobile: function() {
        const prevIsMobile = this.state.isMobile;

        this.state.isMobile = Number(window.innerWidth) < 768;

        // Changing between different user experiences
        if (this.state.isMobile !== prevIsMobile) {
            this.changeUserExperience();
        }
    },

    /**
     * Updates necessary variables and DOM elements when switching
     * between the mobile and desktop experiences
     */
    changeUserExperience: function() {
        const questions = this.state.displayedQuestions;

        let translate = '',
            classname = '';

        // Changing from desktop to mobile...
        // Send user back to first select for simplicity's sake
        // Disable prev button
        // Enable next button if there is a next question
        if (this.state.isMobile) {
            this.state.currentQuestionIndex = 0;
            this.state.displayedQuestionIndex = 0;
            this.state.prevBtn.disable(true);

            if (questions.length > 1) {
                this.state.nextBtn.disable(false);
            }

            translate = 'right';
        }
        // Changing from mobile to desktop...
        else {
            translate = 'reset';
            classname = 'fade';
        }

        // Loop through questions, update styling & transitions
        for (let i = 0, len = questions.length; i < len; i++) {
            // If mobile, skip over first select when updating position
            if (!this.state.isMobile || (this.state.isMobile && i > 0)) {
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
        let translate,
            increment,
            limit,
            enable,
            disable;

        // Next/Prev buttons are only needed for mobile devices
        if (!this.state.isMobile) {
            return false;
        }

        // User clicked next
        if (next) {
            translate = 'left';
            increment = 1;
            enable = 'prevBtn';
            disable = 'nextBtn';

            // Disable the next button when there is no next question
            limit = this.state.displayedQuestions.length - 1;
        }
        // User clicked prev
        else {
            translate = 'right';
            increment = -1;
            enable = 'nextBtn';
            disable = 'prevBtn';

            // Disable prev button if we're back to the first question
            limit = 0;
        }

        // Update button states
        this.state[enable].disable(false);

        if (this.state.displayedQuestionIndex + increment === limit) {
            this.state[disable].disable(true);
        }

        // Slide out current question,  Update index, Slide in next question
        this.state.displayedQuestions[this.state.displayedQuestionIndex].translate(translate);
        this.state.displayedQuestionIndex = this.state.displayedQuestionIndex + increment;
        this.state.displayedQuestions[this.state.displayedQuestionIndex].translate('reset');
    }
};

(function() {
    MakeupGenerator.init();
})();
