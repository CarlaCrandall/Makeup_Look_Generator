window.mockListConstructor = jest.fn();
window.mockListToHTML = jest.fn();

window.List = class List {
    constructor(answeredQuestions) {
        mockListConstructor(answeredQuestions);
    }

    toHTML() {
        mockListToHTML();
        return document.createElement('ul');
    }
};
