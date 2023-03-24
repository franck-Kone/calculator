const screen = document.querySelector('#screen'), textarea = document.querySelector('#textarea'), calculator = document.querySelector('#calculator'), form = document.querySelector('form'), btns = document.querySelectorAll('button'), remove = document.querySelector('#delete'), history = document.querySelector('#history'), historyScreen = document.querySelector('.container-history'), clearHistory = document.querySelector('#clear-history');

let result = 0

calculator.addEventListener('click', (event) => {
    event.preventDefault()

    addNumbers(event)
    operators(event)
    resultOperations(event)
    displayHistory(event)
    cleanHistory(event)
})

//add numbers to the screen

function addNumbers(number) {

    if (number.target.className === 'one') {
        textarea.value === "0" ? textarea.value = 1 : textarea.value += 1
    } else if (number.target.className === 'two') {
        textarea.value === "0" ? textarea.value = 2 : textarea.value += 2

    } else if (number.target.className === 'three') {
        textarea.value === "0" ? textarea.value = 3 : textarea.value += 3

    } else if (number.target.className === 'four') {
        textarea.value === "0" ? textarea.value = 4 : textarea.value += 4

    } else if (number.target.className === 'five') {
        textarea.value === "0" ? textarea.value = 5 : textarea.value += 5

    } else if (number.target.className === 'six') {
        textarea.value === "0" ? textarea.value = 6 : textarea.value += 6

    } else if (number.target.className === 'seven') {
        textarea.value === "0" ? textarea.value = 7 : textarea.value += 7

    } else if (number.target.className === 'eight') {
        textarea.value === "0" ? textarea.value = 8 : textarea.value += 8

    } else if (number.target.className === 'nine') {
        textarea.value === "0" ? textarea.value = 9 : textarea.value += 9

    } else if (number.target.className === 'zero') {

        textarea.value += 0

    } else if (number.target.className === 'reset') {
        textarea.value = 0
    }
}

//use operators
let numberOfPressing = 0
function operators(operator) {
    
    if (operator.target.className === 'addition') {
        textarea.value += "+"
    }else if (operator.target.className === 'multiplication') {
        textarea.value += "*"

    }else if (operator.target.className === 'division') {
        textarea.value += '/'

    }else if (operator.target.className === 'substraction') {
        textarea.value += "-"

    } else if (operator.target.className === 'percent') {
        textarea.value += '%'
    } else if (operator.target.className === 'parenthesis' && numberOfPressing === 0) {

        textarea.value === "0" ? textarea.value = '(' : textarea.value += '('
        numberOfPressing += 1

    }else if (operator.target.className === 'parenthesis' && numberOfPressing === 1) {

        textarea.value += ')'
        numberOfPressing = 0
    } else if (operator.target.className === 'signs') {
        textarea.value === "0" ? textarea.value = '(-' : textarea.value += '(-'
        numberOfPressing += 1

    }else if (operator.target.classList.contains("delete")) {
        result = textarea.value.slice(0, textarea.value.length - 1)
        textarea.value = result

        // to make pressing realistic because we didn't use button tag
        remove.style.transform = 'scale(.9)'

        setTimeout(() => {
            remove.style.transform = 'scale(1)'

        }, 100)

    } else if (operator.target.classList.contains("dot")) {
        textarea.value === "" ? textarea.value = '' : textarea.value += '.'
    }
}

//display history
let historyPressedCount = 0
function displayHistory(historyEl) {

    if (historyEl.target.classList.contains('history') && historyPressedCount === 0) {

        historyScreen.style.display = 'flex'
        clearHistory.style.display = 'flex'
        historyPressedCount++

    } else if (historyEl.target.classList.contains('history') && historyPressedCount === 1) {
        historyScreen.style.display = 'none'
        clearHistory.style.display = 'none'

        historyPressedCount = 0
    }

    //to make pressing realistic because we didn't use button tag
    if (historyEl.target.classList.contains('history')) {
        history.style.transform = 'scale(.9)'

        setTimeout(() => {
            history.style.transform = 'scale(1)'

        }, 100)
    }

}

//clear history
let paragraphArray = []

function cleanHistory(cleaner) {

    if (cleaner.target.classList.contains('clear')) {
        for (let element of paragraphArray) {
            historyScreen.removeChild(element)
        }
        // to remove paragraphArray Elements that are used by the equal sign to set operations on the historyScreen
        paragraphArray.splice(0, paragraphArray.length)

        clearHistory.style.transform = 'scale(.9)'

        setTimeout(() => {
            clearHistory.style.transform = 'scale(1)'

        }, 100)
    }
}

//display the result
let paragraphEl

function resultOperations(resultTotal) {

    if (resultTotal.target.className === 'equal') {
        result = textarea.value

        //for the history part to display all operations expressions
        paragraphEl = document.createElement('p')
        paragraphEl.style.display = 'flex'
        paragraphEl.style.justifyContent = 'end'
        paragraphEl.style.fontSize = '18px'
        paragraphEl.style.color = 'white'
        paragraphEl.style.border = '1px solid gray'
        paragraphEl.style.paddingTop = '10px'
        paragraphEl.style.paddingBottom = '10px'
        paragraphEl.innerHTML = textarea.value

        // to operate percentage tool instead of modulo operation
        for (let index = 0; index < result.length; index++) {

            if (result[index] === '%') {
                result = result.replace(result[index], '/100')

                textarea.value = eval(result)
            }
        }
        // to add an equal sign after the operations expressions and then put the result of the operations
        
        textarea.value = eval(result)
        paragraphEl.innerHTML += ' = ' + textarea.value

        // on the purpose to use paragraphArray to clear history list
        paragraphArray.unshift(paragraphEl)
        for (let item of paragraphArray) {

            //to put all results in the history list
            historyScreen.appendChild(item)
        }
    }
}



