/* eslint-env jest */

// Replace console.error during tests to raise an exception, causing the tests to fail.
function mockError(err) {
    throw new Error(err);
}

/* eslint-disable no-console */
const
    realError = console.error,
    realWarn = console.warn;

beforeEach(() => {
    console.error = mockError;
    console.warn = jest.fn();
});

afterEach(() => {
    console.error = realError;
    console.warn = realWarn;
});
/* eslint-enable no-console */
