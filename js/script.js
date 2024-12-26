// Selects the DOM elements that display the operations and buttons
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

// Main class that defines the behavior of the calculator
class Calculator {
    constructor(previousOperationText, currentOperationText){
        // Elements to display operations on the screen
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = ""; // Store the current operation
    };

    // Adds a digit (or a dot) to the calculator display
    addDigit(digit){
        // Check if there is already a dot (.) in the current operation to avoid multiple dots
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return; // Prevents adding another dot
        }

        this.currentOperation = digit; // Store the current digit
        this.updateScreen(); // Update the display with the new digit
    }

    // Processes the different calculator operations
    processOperation(operation){
        // If the current operation is empty and not "C", check if it is possible to continue
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            // Allows you to change the mathematical operation without current values
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return; 
        }

        // Get the current and previous values ​​as numbers
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        // Perform the operation based on the type
        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    // Updates the calculator display with the calculated or entered values
    updateScreen(operationValue = null, operation = null, current = null, previous = null){
        if(operationValue === null) {
            // Add the current digit to the display
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // If the previous value is 0, just add the current value
            if(previous === 0){
                operationValue = current;
            }
            
            // Update the display with the result of the operation
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = ""; // Clear the current operation
        }
    };

    // Change the displayed mathematical operation
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"];

        if(!mathOperations.includes(operation)){
            return; // Ignore if not a valid operation
        }

        // Replaces the previous operation with the new one
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    };

    // Remove the last digit from the display
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    };

    // Clear only the current operation
    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    };

    // Clear all operations (current and previous)
    processClearOperation(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    };

    // Processes the equals button (=), executing the operation
    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1]; // Get the previous operation
        this.processOperation(operation); // Process the stored operation
    };
};

// Instantiate the calculator with the display elements
const calc = new Calculator(previousOperationText, currentOperationText);

// Add click events to all calculator buttons
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText; // Get the text of the clicked button

        // Check if it is a number or a dot (.) and add it to the display
        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        } else {
            // Processes mathematical operations and commands
            calc.processOperation(value);
        }
    });
});