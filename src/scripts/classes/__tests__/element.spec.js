require('../element');

describe('Element', () => {
    let globalOptions;

    beforeAll(() => {
        globalOptions = {
            tag: 'p',
            attributes: {
                class: 'test-class'
            },
            textNode: 'Test text node'
        };
    });

    describe('constructor()', () => {
        it('creates an object with default values', () => {
            const instance = new Element();

            expect(instance.tag).toEqual('div');
            expect(instance.attributes).toEqual(null);
            expect(instance.textNode).toEqual(null);
        });

        it('creates an object with passed in values', () => {
            const instance = new Element(globalOptions);

            expect(instance.tag).toEqual(globalOptions.tag);
            expect(instance.attributes).toEqual(globalOptions.attributes);
            expect(instance.textNode).toEqual(globalOptions.textNode);
        });
    });

    it('toHTML() builds the element markup', () => {
        const domElement = new Element(globalOptions).toHTML();

        expect(domElement.tagName).toEqual(globalOptions.tag.toUpperCase());
        expect(domElement.className).toEqual(globalOptions.attributes.class);
        expect(domElement.innerHTML).toEqual(globalOptions.textNode);
    });

    it('fadeIn() updates the class and style attributes', () => {
        const
            instance = new Element(globalOptions),
            domElement = instance.toHTML();

        instance.fadeIn();

        expect(domElement.className).toContain('fade');
        expect(domElement.style.opacity).toEqual('1');
        expect(domElement.style.visibility).toEqual('visible');
    });

    it('removeFromDOM() calls parentNode.removeChild()', () => {
        const
            instance = new Element(globalOptions),
            domElement = instance.toHTML(),
            parent = document.createElement('div');

        spyOn(parent, 'removeChild');
        parent.appendChild(domElement);
        instance.removeFromDOM();

        expect(parent.removeChild).toHaveBeenCalledWith(domElement);
    });
});
