require('../../../classes/makeup-generator');

describe('MakeupGenerator', () => {
    let questionData;

    beforeAll(() => {
        questionData = [];
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('init()', () => {
        let instance;

        beforeAll(() => {
            instance = new MakeupGenerator(questionData);

            instance.checkForMobile = jest.fn();
            instance.createMobileNav = jest.fn();
            instance.createQuestion = jest.fn();

            instance.init();
        });

        it('sets up the initial UI', () => {
            expect(instance.checkForMobile).toHaveBeenCalled();
            expect(instance.createMobileNav).toHaveBeenCalled();
            expect(instance.createQuestion).toHaveBeenCalled();
        });

        it('calls checkForMobile() on window resize', () => {
            expect(instance.checkForMobile).not.toHaveBeenCalled();
            window.dispatchEvent(new Event('resize'));
            expect(instance.checkForMobile).toHaveBeenCalled();
        });
    });
});
