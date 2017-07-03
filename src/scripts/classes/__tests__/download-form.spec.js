require('../element');
require('../download-form');

describe('DownloadForm', () => {
    let images;

    beforeAll(() => {
        const
            image01 = document.createElement('img'),
            image02 = document.createElement('img');

        image01.setAttribute('src', 'http://www.abc.com/');
        image02.setAttribute('src', 'http://www.123.com/');

        images = [image01, image02];
    });

    it('constructor() creates an object with passed in values', () => {
        const instance = new DownloadForm(images);

        expect(instance.tag).toEqual('form');
        expect(instance.attributes.method).toEqual('post');
        expect(instance.attributes.action).toEqual('image.php');
        expect(instance.images).toEqual(images);
    });

    describe('toHTML()', () => {
        it('creates one hidden input for each image in the images array', () => {
            const
                domElement = new DownloadForm(images).toHTML(),
                inputs = domElement.querySelectorAll('input[type=hidden]');

            expect(inputs.length).toEqual(images.length);
            expect(inputs[0].value).toEqual(images[0].src);
            expect(inputs[1].value).toEqual(images[1].src);
        });

        it('creates a submit button', () => {
            const
                domElement = new DownloadForm(images).toHTML(),
                submit = domElement.querySelector('input[type=submit]');

            expect(submit.value).toEqual('Download Your Look');
            expect(submit.name).toEqual('download');
        });
    });
});
