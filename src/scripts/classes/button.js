/**
 * Button Class - Inherits from Element
 */
class Button extends Element {

    /**
     * Create an instance of Button
     * @param { string } value - the button value
     * @param { function } onclick - the function to call when button is clicked
     */
    constructor(value, onClick) {
        super({
            tag: 'input',
            attributes: {
                type: 'button',
                value: value,
                name: `${value}Btn`
            }
        });

        this.onClick = onClick;
    }

    /**
     * Build button markup and bind click event listener
     */
    toHTML() {
        super.toHTML();
        this.element.addEventListener('click', () => this.onClick(), false);
        return this.element;
    }

    /**
     * Toggle disabled/enabled state of the button
     * @param { boolean } state - determines whether button should be disabled or enabled
     */
    disable(state) {
        this.element.disabled = state;
    }
}
