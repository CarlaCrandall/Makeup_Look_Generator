require('../../../classes/makeup-generator');

describe('MakeupGenerator', () => {
    let questionData;

    beforeAll(() => {
        questionData = [{
            questionLabel: 'Test label',
            choices: ['option01', 'option02', 'options03'],
            instruction: 'Test instructions for [OPTION]'
        }];

        // Add required divs to document
        document.querySelector('body').innerHTML = '<div><div id="imgHolder"><img src="http://www.abc.com/" alt="alt text"></div><div id="questionHolder"></div><div id="navHolder"></div><div id="formHolder"></div><div id="instructionsHolder"></div></div>';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('constructor()', () => {
        let instance;

        beforeAll(() => {
            instance = new MakeupGenerator(questionData);
        });

        it('sets the state object with the passed in data', () => {
            expect(instance.state.questions).toEqual(questionData);
        });

        it('sets the refs for the DOM elements', () => {
            expect(instance.refs.questionHolder.tagName).toEqual('DIV');
            expect(instance.refs.questionHolder.id).toEqual('questionHolder');

            expect(instance.refs.imgHolder.tagName).toEqual('DIV');
            expect(instance.refs.imgHolder.id).toEqual('imgHolder');

            expect(instance.refs.instructionsHolder.tagName).toEqual('DIV');
            expect(instance.refs.instructionsHolder.id).toEqual('instructionsHolder');

            expect(instance.refs.formHolder.tagName).toEqual('DIV');
            expect(instance.refs.formHolder.id).toEqual('formHolder');

            expect(instance.refs.navHolder.tagName).toEqual('DIV');
            expect(instance.refs.navHolder.id).toEqual('navHolder');
        });
    });
});
