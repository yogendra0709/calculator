const numberButtons = document.querySelectorAll('[data-number]')
const oparationButtons = document.querySelectorAll('[data-oparation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOparandTextElement = document.querySelector('[data-previous-oparand]')
const currentOparandTextElement = document.querySelector('[data-current-oparand]')

class Calculator {
    constructor(previousOparandTextElement, currentOparandTextElement) {
        this.previousOparandTextElement = previousOparandTextElement;
        this.currentOparandTextElement = currentOparandTextElement;
        this.clear();
    }

    clear() {
        this.currentOparand = '';
        this.previousOparand = '';
        this.oparation = undefined;
    }
    delete() {
        this.currentOparand = this.currentOparand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOparand.includes('.')) {
            return;
        }
        this.currentOparand = this.currentOparand.toString() + number.toString();
    }

    chooseOparation(oparation) {
        if (this.currentOparand === '') {
            return;
        }
        if (this.previousOparand !== '') {
            this.compute();
        }
        this.oparation = oparation;
        this.previousOparand = this.currentOparand;
        this.currentOparand = '';

    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOparand);
        const current = parseFloat(this.currentOparand);
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        switch (this.oparation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '+':
                computation = prev + current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOparand = computation;
        this.oparation = undefined;
        this.previousOparand = '';
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = (stringNumber.split('.')[1]);
        // const floatNumber = parseFloat(number);
        // if (isNaN(floatNumber)) {
        //     return '';
        // }
        // return floatNumber.toLocaleString('en');
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else {
            return integerDisplay;
        }
    }
    updateDisplay() {
        this.currentOparandTextElement.innerText = this.getDisplayNumber(this.currentOparand);
        if (this.oparation != null) {
            this.previousOparandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOparand)} ${this.oparation}`;
        } else {
            this.previousOparandTextElement.innerText = '';
        }

    }
}

const calculator = new Calculator(previousOparandTextElement, currentOparandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
});

oparationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOparation(button.innerText)
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});