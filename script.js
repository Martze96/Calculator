/******************************CONSTANTS*************************************/
const ERROR_DIVIDE_BY_ZERO = 'Division by Zero does not work here.';
const ERROR_NO_VALID_OPERATOR = 'Not a valid Operator.';

const mainResult = document.getElementById('mainResult');
const upperResult = document.getElementById('upperResult');
const numberButtons = Array.from(document.getElementsByClassName('number'));
const operatorButtons = Array.from(document.getElementsByClassName('operator'));
const clearButton = document.getElementById('clearButton');
const deleteButton = document.getElementById('deleteButton');
const resultButton = document.getElementById('resultButton');
const commaButton = document.getElementById('commaButton');
const infoBox = document.getElementById('infobox');

/******************************GLOBALS***************************************/

let first = '';
let second = '';
let currentOperator = '';
let res = '';

/******************************EVENTSLISTENERS*******************************/

numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {

        if(first == '' && second == ''){
                first = appendNumber(numberButton.textContent);
                updateMainResultScreen(first);
        }   else if (first != '' && second == '' && currentOperator == ''){
                first = appendNumber(numberButton.textContent);
                updateMainResultScreen(first);
        }   
            else if(first != '' && second == '' && currentOperator != ''){
                second = appendNumber(numberButton.textContent);
                updateMainResultScreen(second);
        }
            else {
                second = appendNumber(numberButton.textContent);
                updateMainResultScreen(second);
        }

    })
})

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", () => {


        if(first != '' && second == ''){
            currentOperator = operatorButton.getAttribute('id');
            updateUpperResultScreen(first + ' ' + currentOperator);
            updateMainResultScreen(0);
        }  

        else if (second != '' && first != ''){
            res = operate(first,currentOperator,second);
            first = res;
            currentOperator = operatorButton.getAttribute('id');
            updateUpperResultScreen(first + ' ' + currentOperator);
            updateMainResultScreen(0);
            second = '';
        } 
        
        else {
            currentOperator = operatorButton.getAttribute('id');
            updateUpperResultScreen(first + ' ' + currentOperator);
            return;
        }
    })
})

clearButton.addEventListener("click", () => {
    updateMainResultScreen(0);
    updateUpperResultScreen('');
    first = '';
    second = '';
    currentOperator = '';
})

deleteButton.addEventListener("click", () => {
    if(first != ''){
        if(first != '' && second == ''){
            first = Math.floor(first/10);
            mainResult.textContent = first;
        } 
        else {
            second = Math.floor(second/10);
            mainResult.textContent = second;
        }
    } else {
        return;
}


})

resultButton.addEventListener("click", () => {
    if(first == '' && second == ''){
        return;
    }
    if(first != '' && second == '') {
        mainResult.textContent = first;
    }
    if(first != '' && second != ''){
        res = operate(first,currentOperator,second);
        upperResult.textContent = first + ' ' + currentOperator + ' ' + second + ' = '
        mainResult.textContent = res;
        first = res;
        second = '';
    }

})

commaButton.addEventListener("click", () => {
    alert("Point currently out of Office :)");
});

window.addEventListener('keydown', handleKeyboardInput);


/******************************FUNCTIONS*******************************/


function operate(num1,operation,num2) {

    switch (operation) {
        case '+': return Number(num1)+Number(num2);
        case '-': return Number(num1)-Number(num2);
        case '/': return num2 == 0 ? ERROR_DIVIDE_BY_ZERO : num1/num2;
        case '*': return num1 * num2;
        default: return ERROR_NO_VALID_OPERATOR;
    }
}

function appendNumber(input) {
    // Cant input global variable, so same condition tree as eventlistener 
    //to decide if to var first oder var second should be appended/replaced
    let num = 0;
    if          (first == '' && second == '')                          {num = first;}   
        else if (first != '' && second == '' && currentOperator == '') {num = first;}   
        else if (first != '' && second == '' && currentOperator != '') {num = second;}  
        else                                                           {num = second;}
    
    if(input == 0 && num == ''){
        alert('no leading zeros please.')
        num = '';
    }
    
        num = mainResult.textContent === 0 ? 
    Number(input) : Number(String(num += input)); 
    return num;
    
}

function updateMainResultScreen(num) {
    mainResult.textContent = num;
}

function updateUpperResultScreen(str) {
    upperResult.textContent = str;
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) document.getElementById(e.key).click();
    if (e.key === '=' || e.key === 'Enter') document.getElementById('resultButton').click();
    if (e.key === 'Backspace') document.getElementById('deleteButton').click();
    if (e.key === 'Escape') document.getElementById('clearButton').click();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        document.getElementById(e.key).click();
  }

/****************************LAYOUT LISTENERS***********************************/

window.addEventListener("resize", () => {
    infoBox.style.visibility = window.innerWidth < 1153 ? 'hidden':'visible';
})

// Display Number Overflow Handler with Mutationobserver
let observer = new MutationObserver(() => {
    console.log(mainResult.clientWidth);
    if(mainResult.clientWidth > document.getElementById('screen').clientWidth){
        mainResult.textContent = '*OVERFLOW*';
        upperResult.textContent = '';
    }
})

let config = {characterData: false, subtree: true, childList: true};
observer.observe(mainResult,config);




/*
=== Leading Zero does not work with this concept ( You'll get an alert :) )===
BUG geteilt durch 0 macht keinen Fehler
BUG 4*0 + 3 (es geht nicht mit 0 sondern mit 4 weiter, sollte aber 0 + im upper sein)
================================================================================
TODO footer hinzufügen (schauen wie das so geht mit github logo etc, oder ist das bei GitHub Pages normal?)
*/




