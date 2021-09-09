const ERROR_DIVIDE_BY_ZERO = 'Division by Zero does not work here.';
const ERROR_NO_VALID_OPERATOR = 'Not a valid Operator.';



const mainResult = document.getElementById('mainResult');
const upperResult = document.getElementById('upperResult');
const numberButtons = Array.from(document.getElementsByClassName('number'));
const operatorButtons = Array.from(document.getElementsByClassName('operator'));
const clearButton = document.getElementById('clearButton');
const deleteButton = document.getElementById('deleteButton');
const resultButton = document.getElementById('resultButton');

let firstNum = null;
let secondNum = null;

let inputArray = new Array();
let input = 0;
let contcalc = false;
let resultHistory = 0;

numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        //append or replace number? (replace if mainresult = 0)
        input = Number(mainResult.textContent) === 0 ? 
        input = Number(numberButton.textContent) : Number(input += numberButton.textContent); 
        //set input to mainResult
        mainResult.textContent = input;
    })
})

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", () => {
        inputArray.push(input);
        //If yet nothing saved in input (but could be inputted without pushed)
        if(inputArray.length == 0) {
            //push to inputarray
            inputArray.push(input);
            //push the clicked operator
            inputArray.push(operatorButton.getAttribute('id'));
        // else if first pos in array already initialiazed, then only push the operator  
        } else if(inputArray.length == 1) {
            // only put the operator in inputArray
            
            inputArray.push(operatorButton.getAttribute('id'));
        // else if number + operator + number and u press operator, it should calc the result, set the inputarray[0] to result and push operator    
        } else if(inputArray.length == 3) {
            console.log(inputArray);
            let result = operate(inputArray[0],inputArray[1],inputArray[2])
            inputArray = [];
            inputArray.push(result);
            inputArray.push(operatorButton.getAttribute('id'));
            console.log(inputArray);
        }
        
        //if operand clicked after operand, last operand changes
        if(isNaN(inputArray[inputArray.length-1])){
            inputArray[inputArray.length-1] = operatorButton.getAttribute('id');
        } 
        //
        upperResult.textContent = '';
        inputArray.forEach(pos => {
            upperResult.textContent += String(pos) + ' '; 
        })
        
        //upperResult.textContent = String(inputArray[0]) + ' ' + String(inputArray[1]);
        input = 0;
        mainResult.textContent = '0';
    })
})

clearButton.addEventListener("click", () => {
    inputArray = [];
    input = 0;
    mainResult.textContent = input;
    upperResult.textContent = '';
    resultHistory = 0;
    console.log(input);
})

deleteButton.addEventListener("click", () => {
    input = Math.floor(input / 10);
    mainResult.textContent = input;
    console.log(input);
})

resultButton.addEventListener("click", () => {
    inputArray.push(input);
    console.log(inputArray);
    let result = 0;
    if(inputArray.length == 1) {
        result = operate(inputArray[0],'+',0);
        upperResult.textContent = result;
    } else {
        result = operate(inputArray[0],inputArray[1],inputArray[2]);
        upperResult.textContent = String(inputArray[0]) + ' ' + String(inputArray[1]) + ' ' + String(inputArray[2] + ' ' + '=')
    }
     
    mainResult.textContent = result;
    
    input = result;
    //resultHistory = Number(mainResult.textContent);
    console.log(resultHistory);
    inputArray = [result];
    console.log(inputArray);
})




/* Versuch onchange bei input ( evtl. einfach methoden machen)
input.addEventListener("onchange", (e) => {
    mainResult.textContent = e;
})
*/
function operate(num1,operation,num2) {

    switch (operation) {
        case '+': return Number(num1)+Number(num2);
        case '-': return Number(num1)-Number(num2);
        case '/': return num2 == 0 ? ERROR_DIVIDE_BY_ZERO : num1/num2;
        case '*': return num1 * num2;
        default: return ERROR_NO_VALID_OPERATOR;
    }
}

