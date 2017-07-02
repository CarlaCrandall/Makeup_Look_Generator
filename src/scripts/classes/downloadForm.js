/**
 * Download Form Class - Inherits from Element
 */
class DownloadForm extends Element {

    /**
     * Create an instance of Download Form
     * @param { node list } images - contains a list of all the makeup look images
     */
    constructor(images) {
        super({
            tag: 'form',
            attributes: {
                method: 'post',
                action: 'image.php'
            }
        });

        this.images = images;
    }

    /**
     * Build form markup
     */
    toHTML() {
        let input;

        // Create the container
        super.toHTML();

        // Create the hidden inputs
        for (let image of this.images) {
            input = new Element({
                tag: 'input',
                attributes: {
                    type: 'hidden',
                    value: image.getAttribute( 'src' ),
                    name: 'layer[]'
                }
            });

            this.element.appendChild(input.toHTML());
        }

        // Create the button
        input = new Element({
            tag: 'input',
            attributes: {
                type: 'submit',
                value: 'Download Your Look',
                name: 'download'
            }
        });

        this.element.appendChild(input.toHTML());

        return this.element;
    }
}
