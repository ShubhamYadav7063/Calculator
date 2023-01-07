// js class
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        // This will delete the numbers from last if user wants to delete a number
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        // this line will take care that user enters only one period
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // this will check whether the operand is clicked or not
        if (this.currentOperand === '') return
        // this will check if the operator is selected and then it will perform the operation of the previous operand and append the new operand when the user selects a new one
        if (this.previousOperand !== '') this.compute()
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation // this is going to be the result of out compute function
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // This code will check if the previous number or current number is NaN or empty then the code will not run
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break;

            case '-':
                computation = prev - current
                break;

            case '*':
                computation = prev * current
                break;

            case '/':
                computation = prev / current
                break;

            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) { 
        // cons of this code if we want to type a decimal place then the number will not be shown in the display until and unless a new number is clicked
        // and also we can't number of zeroes after the decimal
        // const floatNumber = parseFloat(number)
        // if(isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString('en')


        // fixes in this code - we will divide the number in two parts string and float
        const stringNumber = number.toString()
        // seperates the integer part
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})