const ERROR_DIVIDE_BY_ZERO = 'Division by Zero does not work here.';
const ERROR_NO_VALID_OPERATOR = 'Not a valid Operator.';



const mainResult = document.getElementById('mainResult');
const numberButtons = Array.from(document.getElementsByClassName('number'));
const clearButton = document.getElementById('clearButton');
const deleteButton = document.getElementById('deleteButton');


numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        input = Number(mainResult.textContent) === 0 ? input = numberButton.textContent : input += numberButton.textContent;
        mainResult.textContent = input;
        console.log(input);
    })
})

clearButton.addEventListener("click", () => {
    input = 0;
    mainResult.textContent = input;
})

deleteButton.addEventListener("click", () => {
    input = Math.floor(input / 10);
    mainResult.textContent = input;
    console.log(input);
})
/* Versuch onchange bei input ( evtl. einfach methoden machen)
input.addEventListener("onchange", (e) => {
    mainResult.textContent = e;
})
*/
function operate(num1,operation,num2) {

    switch (operation) {
        case 'add': return num1+num2;
        case 'subtract': return num1-num2;
        case 'divide': return num2 == 0 ? ERROR_DIVIDE_BY_ZERO : num1/num2;
        case 'multiply': return num1 * num2;
        default: return ERROR_NO_VALID_OPERATOR;
    }
}

