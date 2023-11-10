// Elements on page
const inputs = document.querySelectorAll('input[type=text]');
const errorF = document.querySelector('.error-f'); // Format error txt
const errorB = document.querySelectorAll('error-b'); // Blank error txt
const errorR = document.querySelector('.error-r'); // Require Field txt
const no = document.querySelectorAll('.no');
let noArray = Array.from(no);
const submit = document.querySelector('.btn'); // Submit button

const cardNumber = document.querySelector('#cardNumber-input'); // Card Number input


// Errors
const required = 'Please enter required fields';
const format = 'Wrong Format, numbers only';
const length = 'Please check card number';
let isValid = true;
let isNumber = false;

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
    let value = cardNumber.value;
    let noSpace = value.replace(/\s/g, "");

    if(!/^\d+$/.test(noSpace)) {
        cardNumber.style.borderColor = errorColor;
        errorF.innerText = format;
        isValid = false;
    } else {
        cardNumber.style.borderColor = '';
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
cardNumber.addEventListener("input", () => cardNumber.value = formatNumber(cardNumber.value.replaceAll(" ", "")));

const formatNumber = (number) => number.split("").reduce((seed, next, index) => {
  if (index !== 0 && !(index % 4)) seed += " ";
  return seed + next;
}, "");




let validateForm = (e) => {
    e.preventDefault();
    checkFields();
    if(isValid == true) {
        console.log('All validation check')
    } else {
        // do nothing
        return;
    }
}

submit.addEventListener('click', validateForm);
