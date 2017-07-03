require('../element');
require('../../../../jest/mocks/mockList');
require('../instructions');

describe('Instructions', () => {
    let answeredQuestions;

    beforeAll(() => {
        answeredQuestions = ['Question 01', 'Question 02'];
    });

    it('constructor() creates an object with passed in values', () => {
        const instance = new Instructions(answeredQuestions);

        expect(instance.tag).toEqual('div');
        expect(instance.answeredQuestions).toEqual(answeredQuestions);
    });

    describe('toHTML()', () => {
        it('toHTML() creates a title', () => {
            const
                domElement = new Instructions(answeredQuestions).toHTML(),
                title = domElement.querySelector('h2');

            expect(title.tagName).toEqual('H2');
            expect(title.innerHTML).toEqual('To recreate your look...');
        });

        it('toHTML() creates a List', () => {
            const instance = new Instructions(answeredQuestions);

            expect(mockListConstructor).not.toHaveBeenCalled();
            expect(mockListToHTML).not.toHaveBeenCalled();

            instance.toHTML();

            expect(mockListConstructor).toHaveBeenCalledWith(answeredQuestions);
            expect(mockListToHTML).toHaveBeenCalled();
        });
    });
});
