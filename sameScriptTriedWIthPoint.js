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

let first = 0;
let second = '';
let lastOperator = '';
let currentOperator = '';
let inputArray = new Array();
let input = 0;
let contcalc = false;
let resultHistory = 0;
let done = false;
let res = '';
let nextres = '';
let calcCounter = 0;
let commaIndexFirst = 0;
let commaIndexSecond = 0;

numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        //append or replace number? (replace if mainresult = 0)
        if(first == 0 && second == ''){
            console.log('a')
            first = mainResult.textContent === 0 ? 
            first = Number(numberButton.textContent) : Number(String(first += numberButton.textContent)); 
            //set input to mainResult
            mainResult.textContent = first;
        }  else if (first != '' && second == '' && currentOperator == ''){
               if(!Number.isInteger(first)){
                   console.log('b')
                   console.log('first before: ' + first);
                   console.log(typeof first);
                   console.log(countDecimals(first));
                   countDecimals(first) >= 2 ? first = Number(first) + Number((numberButton.textContent/10).toFixed(2)) : first = Number(first) + Number((numberButton.textContent/100).toFixed(2));

                } else { 
                    console.log('c')
                    first = mainResult.textContent === 0 ? 
                    first = Number(numberButton.textContent) : Number(String(first += numberButton.textContent));  
                }
                mainResult.textContent = Number(first.toFixed(2));
        }   
            else if(first != '' && second == '' && currentOperator != ''){
                console.log('d')
                if(!Number.isInteger(second)){
                    //second = mainResult.textContent === '0' ?
                    //second = ((second/100 + numberButton.textContent)*100).toFixed(1) : /*first += */ ((second/100 + numberButton.textContent)*100).toFixed(1); //(numberButton.textContent*100);
                    console.log(countDecimals(second));
                    if(countDecimals(second) == 0){
                        console.log(countDecimals(second));
                        second+=numberButton.textContent;
                    }
                    else if(countDecimals(second) == 1) {
                        console.log(countDecimals(second));
                        second = Number(second) + Number((numberButton.textContent/10).toFixed(2));
                        
                    }
                    else if(countDecimals(second) == 2){
                        console.log(countDecimals(second));
                        second = Number(second) + Number((numberButton.textContent/100).toFixed(2));
                    } 
                    
                } else { 
                    console.log('e')
                    second = mainResult.textContent === '0' ? 
                    second = Number(numberButton.textContent) : Number(String(second += numberButton.textContent)); 
                }
         //   second = mainResult.textContent === '0' ? 
         //   second = numberButton.textContent : second += numberButton.textContent; 
            mainResult.textContent = second;
        }
        else {
            console.log('f')
            console.log(mainResult.textContent);
            if(!Number.isInteger(second)){
                //second = mainResult.textContent === '0' ?
                //second = ((second/100 + numberButton.textContent)*100) : /*first += */ ((second/100 + numberButton.textContent)*100); //(numberButton.textContent*100);
                countDecimals(second) >= 2 ? second = Number(second) + Number((numberButton.textContent/10).toFixed(2)) : second = Number(second) + Number((numberButton.textContent/100).toFixed(2));
                
            } else { 
                second = mainResult.textContent === '0' ? 
                second = numberButton.textContent : second += Number(numberButton.textContent); 
            }
           // second = mainResult.textContent === '0' ? 
           // second = numberButton.textContent : second += numberButton.textContent; 
            //set input to mainResult
            mainResult.textContent = Number(second).toFixed(2);
        }
        console.log('first: ' + first);
        console.log('currentOperator: ' + currentOperator);
        console.log(typeof second);
        console.log('second: ' + second);

    })
})

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", () => {
        //change currentoperator
        
        
        
        //if only first is known (and operator), update Upperscreen
        if(first != '' && second == ''){
            
            currentOperator = operatorButton.getAttribute('id');
            upperResult.textContent = first + ' ' + currentOperator;
            mainResult.textContent = 0; 
            
            console.log('first: ' + first);
            console.log('currentOperator: ' + currentOperator);
            console.log('second: ' + second);
            console.log(contcalc);
    
        }  
        // if second is known, calculate, set result on first, update upperScreen, set second back
        else if (second != ''){
            lastOperator = currentOperator;
            res = operate(first,currentOperator,second);
            first = res;
            currentOperator = operatorButton.getAttribute('id');
            upperResult.textContent = first + ' ' + currentOperator;
            mainResult.textContent = 0;
            second = '0';
            
            console.log('first: ' + first);
            console.log('lastOPerator: ' + lastOperator);
            console.log('currentOperator: ' + currentOperator);
            console.log('second: ' + second);
            console.log(contcalc);
            contcalc = true;
        } 
        
        else {
            currentOperator = operatorButton.getAttribute('id');
            upperResult.textContent = first + ' ' + currentOperator;
            console.log("this was else nothing.")
            return;
        }
        


    })
    
})

clearButton.addEventListener("click", () => {
    inputArray = [];
    input = 0;
    mainResult.textContent = 0;
    upperResult.textContent = '';
    resultHistory = 0;
    first = '';
    second = '';
    currentOperator = '';
    lastOperator = '';
    result = '';
    done = false;
    contcalc = false;
})

deleteButton.addEventListener("click", () => {
    input = Math.floor(input / 10);
    mainResult.textContent = input;
    console.log(input);
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
        console.log('first: ' + first);
        console.log('currentOperator: ' + currentOperator);
        console.log('second: ' + second);
        second = '';
    }

})

// Not quite working as expected
/*
commaButton.addEventListener("click", () => {
    if(first == '' && second == ''){
        return;
    }
    if(first == mainResult.textContent){
        first = (first*1).toFixed(2);
        mainResult.textContent = first;

    }
    if(second == mainResult.textContent){
        second = (second*1);//.toFixed(2);
        mainResult.textContent = second;
    }
    console.log(first);
    console.log(second);
})
*/



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

function countDecimals(num){

let text = num.toString();
let index = text.indexOf(".");
return text.length - index - 1;

}

