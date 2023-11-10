// Elements on page
const inputs = document.querySelectorAll('input[type=text]');
const errorF = document.querySelector('.error-f'); // Format error txt
const errorB = document.querySelectorAll('error-b'); // Blank error txt
const errorR = document.querySelector('.error-r'); // Require Field txt
const no = document.querySelectorAll('.no');
let noArray = Array.from(no);
const submit = document.querySelector('.btn'); // Submit button


// Inputs & Displays
const userInput = document.querySelector('#userName-input');
const cardInput = document.querySelector('#cardNumber-input');
const mmInput = document.querySelector('#mm-input');
const yyInput = document.querySelector('#yy-input');
const ccvInput = document.querySelector('#ccv-input');

const userDisplay = document.querySelector('#userName');
const cardDisplay = document.querySelector('#cardNumber'); 
const mmDisplay = document.querySelector('#mm');
const yyDisplay = document.querySelector('#yy');
const ccvDisplay = document.querySelector('#ccv');

// Wrapper
const wrapper = document.querySelector('.user-wrapper');

// Resets
userInput.value = '';
cardInput.value = '';
mmInput.value = '';
yyInput.value = '';
ccvInput.value = '';

// src
const img = 'Assets/img/icon-complete.svg';

// Errors
const required = 'Please enter required fields';
const format = 'Wrong Format, numbers only';
const length = 'Please check card number';
let isValid = true;

// Error Color
const errorColor = '#ff5252';

let checkFields = () => {
    inputs.forEach((input, index) => {
        if(input.value == '') {
            errorR.innerText = required;
            input.style.borderColor = errorColor;
            
            isValid = false;
        } else {
            input.style.borderColor = '';
        }

        if (index == 1 && !input.value == '') {
            formatInput();
        }
    });
}

let formatInput = () => {
    inputs.forEach(input => {
            errorR.innerText = '';
            input.style.borderColor = '';
    });
    checkFormat();
}

let checkFormat = () => {
    let value = cardInput.value;
    let noSpace = value.replace(/\s/g, "");

    if(!/^\d+$/.test(noSpace)) {
        cardInput.style.borderColor = errorColor;
        errorF.innerText = format;
        isValid = false;
    } else {
        cardInput.style.borderColor = '';
        errorF.innerText = '';
        checkLastFields();
    }
}

let checkLastFields = () => {
    no.forEach(number => {
        if(number.value == '') {
            errorR.innerText = required;
        } else {
            isValid = true;
        }
    });
}




// Splitting numbers into a group of 4 in input as user types
cardInput.addEventListener("input", () => cardInput.value = formatNumber(cardInput.value.replaceAll(" ", "")));

const formatNumber = (number) => number.split("").reduce((seed, next, index) => {
  if (index !== 0 && !(index % 4)) seed += " ";
  return seed + next;
}, "");




let validateForm = (e) => {
    e.preventDefault();
    checkFields();
    if(isValid == true) {
        userDisplay.innerText = userInput.value;
        cardDisplay.innerText = cardInput.value;
        mmDisplay.innerText = mmInput.value;
        yyDisplay.innerText = yyInput.value;
        ccvDisplay.innerText = ccvInput.value;

        return wrapper.innerHTML = `
                <div class='complete-wrapper'>
                    <img src='${img}'>
                    <h1>Thank you!</h1>
                    <p>We've added your card details!</p>
                    <input type="submit" value="Continue" class="btn-complete" id="btn">
                </div>
        `;

    } else {
        // do nothing
        return;
    }
}

submit.addEventListener('click', validateForm);
