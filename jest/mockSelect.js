window.mockSelectConstructor = jest.fn();
window.mockSelectToHTML = jest.fn();

window.Select = class Select {
    constructor(questionData) {
        mockSelectConstructor(questionData);
    }

    toHTML() {
        mockSelectToHTML();
        return document.createElement('select');
    }
};
