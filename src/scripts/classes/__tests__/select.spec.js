require('../element');
require('../select');

describe('Select', () => {
    let questionData;

    beforeAll(() => {
        questionData = {
            questionLabel: 'test label',
            choices: ['choice01', 'choice02', 'choice03']
        };
    });

    it('constructor() creates an object with passed in values', () => {
        const instance = new Select(questionData);

        expect(instance.tag).toEqual('select');
        expect(instance.questionData).toEqual(questionData);
    });

    describe('toHTML()', () => {
        it('creates one option for the label and selects it by default', () => {
            const
                domElement = new Select(questionData).toHTML(),
                option = domElement.querySelector('option[selected="selected"]');

            expect(option.innerHTML).toEqual(`Choose your ${questionData.questionLabel}...`);
            expect(option.disabled).toEqual(true);
            expect(option.selected).toEqual(true);
        });

        it('creates one option for each question in the questionData.choices array', () => {
            const
                domElement = new Select(questionData).toHTML(),
                options = domElement.querySelectorAll('option:not([selected="selected"])');

            expect(options.length).toEqual(questionData.choices.length);

            expect(options[0].innerHTML).toEqual('Choice01');
            expect(options[0].value).toEqual(questionData.choices[0]);

            expect(options[1].innerHTML).toEqual('Choice02');
            expect(options[1].value).toEqual(questionData.choices[1]);

            expect(options[2].innerHTML).toEqual('Choice03');
            expect(options[2].value).toEqual(questionData.choices[2]);
        });
    });
});
