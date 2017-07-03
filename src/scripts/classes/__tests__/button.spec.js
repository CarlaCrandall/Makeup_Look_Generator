require('../element');
require('../button');

describe('Button', () => {
    let btnValue,
        btnOnClick;

    beforeAll(() => {
        btnValue = 'test value';
        btnOnClick = jest.fn();
    });

    it('constructor() creates an object with passed in values', () => {
        const instance = new Button(btnValue, btnOnClick);

        expect(instance.tag).toEqual('input');
        expect(instance.attributes.type).toEqual('button');
        expect(instance.attributes.value).toEqual(btnValue);
        expect(instance.onClick).toEqual(btnOnClick);
    });

    it('toHTML() adds the onClick event listener for the button', () => {
        const domElement = new Button(btnValue, btnOnClick).toHTML();

        expect(btnOnClick).not.toHaveBeenCalled();
        domElement.click();
        expect(btnOnClick).toHaveBeenCalled();
    });

    it('disable() updates the disabled attribute to the passed in value', () => {
        const
            instance = new Button(btnValue, btnOnClick),
            domElement = instance.toHTML();

        instance.disable(true);
        expect(domElement.disabled).toEqual(true);

        instance.disable(false);
        expect(domElement.disabled).toEqual(false);
    });
});
