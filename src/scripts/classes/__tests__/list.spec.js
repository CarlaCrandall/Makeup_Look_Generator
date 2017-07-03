require('../element');
require('../list');

describe('List', () => {
    let answeredQuestions;

    beforeAll(() => {
        const
            question01 = {
                questionData: { instruction: 'Test instruction 01 - [OPTION]' },
                selectedOption: 'Selected option 01'
            },
            question02 = {
                questionData: { instruction: 'Test instruction 02 - [OPTION]' },
                selectedOption: 'Selected option 02'
            };

        answeredQuestions = [question01, question02];
    });

    it('constructor() creates an object with passed in values', () => {
        const instance = new List(answeredQuestions);

        expect(instance.tag).toEqual('ol');
        expect(instance.answeredQuestions).toEqual(answeredQuestions);
    });

    it('toHTML() creates one list item for each question in the answeredQuestions array', () => {
        const
            domElement = new List(answeredQuestions).toHTML(),
            listItems = domElement.querySelectorAll('li');

        expect(listItems.length).toEqual(answeredQuestions.length);
        expect(listItems[0].innerHTML).toEqual('Test instruction 01 - Selected option 01');
        expect(listItems[1].innerHTML).toEqual('Test instruction 02 - Selected option 02');
    });
});
