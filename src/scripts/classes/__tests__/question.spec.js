require('../element');
require('../../../../jest/mocks/mockSelect');
require('../question');

describe('Question', () => {
    let questionData,
        onSelection;

    beforeAll(() => {
        questionData = {
            questionLabel: 'test label',
            choices: ['choice01', 'choice02', 'choice03']
        };

        onSelection = jest.fn();
    });

    it('constructor() creates an object with passed in values', () => {
        const instance = new Question(questionData, onSelection);

        expect(instance.tag).toEqual('label');
        expect(instance.attributes.class).toEqual('question');
        expect(instance.questionData).toEqual(questionData);
        expect(instance.onSelection).toEqual(onSelection);
        expect(instance.selectedOption).toEqual('');
    });

    it('answerSelected() updates this.selectedOption and calls onSelection()', () => {
        const
            instance = new Question(questionData, onSelection),
            event = { target: { value: 'selected value' } };

        instance.answerSelected(event);

        expect(instance.selectedOption).toEqual(event.target.value);
        expect(instance.onSelection).toHaveBeenCalled();
    });

    it('setClass() updates the class attribute', () => {
        const
            instance = new Question(questionData, onSelection),
            domElement = instance.toHTML();

        instance.setClass('test-class');
        expect(domElement.className).toEqual('question test-class');
    });

    describe('slideIn()', () => {
        it('calls translate() when the passed in value is true', () => {
            const instance = new Question(questionData, onSelection);

            spyOn(instance, 'translate');
            instance.toHTML();
            instance.slideIn(true);
            expect(instance.translate).toHaveBeenCalledWith('right');
        });

        it('does not call translate() when the passed in value is false', () => {
            const instance = new Question(questionData, onSelection);

            spyOn(instance, 'translate');
            instance.toHTML();
            instance.slideIn(false);
            expect(instance.translate).not.toHaveBeenCalled();
        });

        it('updates the style attribute', () => {
            const
                instance = new Question(questionData, onSelection),
                domElement = instance.toHTML();

            instance.slideIn();
            expect(domElement.style.opacity).toEqual('1');
            expect(domElement.style.visibility).toEqual('visible');
        });
    });

    describe('toHTML()', () => {
        it('creates a span', () => {
            const
                domElement = new Question(questionData, onSelection).toHTML(),
                span = domElement.querySelector('span');

            expect(span.tagName).toEqual('SPAN');
            expect(span.innerHTML).toEqual(`${questionData.questionLabel}:`);
        });

        it('creates a Select', () => {
            const instance = new Question(questionData, onSelection);

            expect(mockSelectConstructor).not.toHaveBeenCalled();
            expect(mockSelectToHTML).not.toHaveBeenCalled();

            instance.toHTML();

            expect(mockSelectConstructor).toHaveBeenCalledWith(questionData);
            expect(mockSelectToHTML).toHaveBeenCalled();
        });

        it('adds the onChange event listener for the question', () => {
            const
                instance = new Question(questionData, onSelection),
                domElement = instance.toHTML(),
                event = new UIEvent('change');

            spyOn(instance, 'answerSelected');
            domElement.dispatchEvent(event);
            expect(instance.answerSelected).toHaveBeenCalled();
        });
    });

    describe('translate()', () => {
        it('updates the style attribute when the passed in value is reset', () => {
            const
                instance = new Question(questionData, onSelection),
                domElement = instance.toHTML();

            instance.translate('reset');
            expect(domElement.style.transform).toEqual('translateX(0)');
        });

        it('updates the style attribute when the passed in value is left', () => {
            const
                instance = new Question(questionData, onSelection),
                domElement = instance.toHTML();

            instance.translate('left');
            expect(domElement.style.transform).toEqual('translateX(calc(-100% - 15px))');
        });

        it('updates the style attribute when the passed in value is right', () => {
            const
                instance = new Question(questionData, onSelection),
                domElement = instance.toHTML();

            instance.translate('right');
            expect(domElement.style.transform).toEqual('translateX(calc(100% + 15px))');
        });

        it('updates the style attribute when the passed in value is empty', () => {
            const
                instance = new Question(questionData, onSelection),
                domElement = instance.toHTML();

            instance.translate('');
            expect(domElement.style.transform).toEqual('');
        });
    });
});
