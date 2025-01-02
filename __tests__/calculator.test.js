// Simulate DOM elements
const mockPreviousOperationText = { innerText: "" };
const mockCurrentOperationText = { innerText: "" };

// Import the Calculator class from the existing file
import Calculator from "../js/script"; "../js/script";

// Create an instance of the calculator with the mocks
let calc;

beforeEach(() => {
    calc = new Calculator(mockPreviousOperationText, mockCurrentOperationText);
});

describe('Calculator class', () => {
    test('should add a digit to the current operation', () => {
        calc.addDigit('5');
        expect(mockCurrentOperationText.innerText).toBe('5');
    });

    test('should not allow multiple dots', () => {
        calc.addDigit('5');
        calc.addDigit('.');
        calc.addDigit('.');
        expect(mockCurrentOperationText.innerText).toBe('5.');
    });

    test('should process addition operation correctly', () => {
        mockPreviousOperationText.innerText = "10 +";
        mockCurrentOperationText.innerText = "5";
        calc.processOperation("+");
        expect(mockPreviousOperationText.innerText).toBe("15 +");
        expect(mockCurrentOperationText.innerText).toBe("");
    });

    test('should process division by zero and throw error', () => {
        mockPreviousOperationText.innerText = "10 /";
        mockCurrentOperationText.innerText = "0";
        expect(() => calc.processOperation("/")).toThrow();
    });

    test('should clear current operation with CE', () => {
        mockCurrentOperationText.innerText = "123";
        calc.processOperation("CE");
        expect(mockCurrentOperationText.innerText).toBe("");
    });

    test('should clear all operations with C', () => {
        mockPreviousOperationText.innerText = "10 +";
        mockCurrentOperationText.innerText = "5";
        calc.processOperation("C");
        expect(mockPreviousOperationText.innerText).toBe("");
        expect(mockCurrentOperationText.innerText).toBe("");
    });

    test('should delete the last digit with DEL', () => {
        // Simulates a current operation
        calc.currentOperation = "123";
        mockCurrentOperationText.innerText = "123";
        calc.processOperation("DEL");
        // Check the expected result
        expect(mockCurrentOperationText.innerText).toBe("12");
        expect(calc.currentOperation).toBe("12"); // Check internal consistency
    });
});