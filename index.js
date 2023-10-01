// Odd & Even Box Starting State
let oddStart = [];
let evenStart = [];

// References
let addNumberForm = document.querySelector("form");
let numberBank = document.querySelector("#numberBank output");
let oddNumbers = document.querySelector("#odds output");
let evenNumbers = document.querySelector("#evens output");
let sort1Button = document.querySelector("#sortOne");
let sortAllButton = document.querySelector("#sortAll");
let randomButton = document.querySelector("#random");
let clearButton = document.querySelector("#clear");

// function to add a number to the Number Bank from form input
const addNumber = function (event) {
  event.preventDefault();
  let inputFieldValue = addNumberForm.elements.input.value;
  if (inputFieldValue) { // this if statement says if there's an input to the "Add Number to the Bank" form, do the following:
    const inputs = inputFieldValue.split(`,`); // because input value is a string, need to split values at the commas to create new array 
    for (const input of inputs) {
      let trimmedInput = +(input.trim()); // trims any trailing whitespace from input values and turns the values into numbers
      if (isNaN(trimmedInput)) { // checks to see whether the input is not a number
        continue; // if string is found, skip to next iteration of loop
      } else {
        const numberInNumberBank = document.createElement("p"); // creates a place to put a number inside the number bank box
        numberInNumberBank.textContent = trimmedInput;
        numberBank.appendChild(numberInNumberBank);
      }
    }
  }
  addNumberForm.elements.input.value = ``;
}
addNumberForm.addEventListener(`submit`, addNumber);

// function to generate a random number using the "Generate Random Number" button:
const generateRandomNumber = function (event) {
  event.preventDefault();
  let randomNumber = Math.floor(Math.random() * 200); // when button is clicked, generates a random number
  let inputField = addNumberForm.elements.input;
  if (inputField.value.length === 0) {
    inputField.value = randomNumber;
  } else {
    inputField.value += `, ` + randomNumber;
  }
}
randomButton.addEventListener(`click`, generateRandomNumber);

// function to clear the Odds & Evens boxes with the "Clear All" button:
const clearSortedNumbers = function (event) {
  event.preventDefault();
  oddNumbers.innerHTML = ``;
  evenNumbers.innerHTML = ``;
  oddStart = [];
  evenStart = [];
}
clearButton.addEventListener(`click`, clearSortedNumbers);

// function to create eventListener - on "Sort 1" button click, sort 1 number in Number Bank to Odds or Evens boxes accordingly.
const sortOne = function (event) {
  event.preventDefault();
  let firstChild = +(numberBank.querySelector("p").innerHTML)
  if (firstChild % 2 === 0) {
    appendNumber(firstChild, evenStart, true); // if first number in Number Bank is even, add to the Evens box
    numberBank.removeChild(numberBank.firstChild); // to remove the first child in the number bank
  } if (evenNumbers.length !== 0) { // if the Evens Box already has numbers in it, array is replaced with new one. 
    replaceNumber(evenStart, true);
  } if (firstChild % 2 !== 0) {
    appendNumber(firstChild, oddStart, false); // if first number in Number Bank is odd, add to the Odds box
    numberBank.removeChild(numberBank.firstChild); // to remove the first child in the number bank
  } if (oddNumbers.length !== 0) { // if the Odds Box already has numbers in it, array is replaced with new one. 
    replaceNumber(oddStart, false);
  }
}
sort1Button.addEventListener(`click`, sortOne);

// function to create eventListener - on "Sort All" button click, sort all numbers in Number Bank to Odds or Evens boxes accordingly.
const sortAll = function (event) {
  event.preventDefault();
  const numberBankArray = Array.from(numberBank.querySelectorAll("p")); // creates an array from the numberBank node
  const allNumbersArray = numberBankArray.map(p => Number(p.textContent)); // maps over arrayFromNumberBankNode and creates a new array with the numbers only (content of p) 
  for (const num of allNumbersArray) {
    if (num % 2 === 0) {
      appendNumber(num, evenStart, true); // Adds all even numbers in Number Bank to the Evens box
      numberBank.innerHTML = ``; // clears the Number Bank box
    } if (evenNumbers.length !== 0) { // if the Evens Box already has numbers in it, array is replaced with new one. 
      replaceNumber(evenStart, true);
    } if (num % 2 !== 0) {
      appendNumber(num, oddStart, false); // Adds all odd numbers in Number Bank to the Odds box
      numberBank.innerHTML = ``; // clears the Number Bank box
    } if (oddNumbers.length !== 0) { // if the Odds Box already has numbers in it, array is replaced with new one. 
      replaceNumber(oddStart, false);
    }
  }
}
sortAllButton.addEventListener(`click`, sortAll);


// helper function: appends number to respective Evens or Odds box if it is empty
function appendNumber(number, numbersArray, isEven) {
  numbersArray.push(` ` + number);
  numbersArray.sort(compareNumbers);
  let numbersInBox = document.createElement("p"); // creates a place to put a number inside the Even/Odd Numbers box
  numbersInBox.textContent = numbersArray;
  if (isEven) {
    evenNumbers.appendChild(numbersInBox);
  } else {
    oddNumbers.appendChild(numbersInBox);
  }
}

// helper function: if Evens or Odds boxes already have numbers in it, array is replaced with new one
function replaceNumber(numbersArray, isEven) {
  let numberInBox = document.createElement("p");
  numbersArray.sort(compareNumbers);
  numberInBox.textContent = numbersArray;
  if (isEven) {
    evenNumbers.replaceChildren(numberInBox);
  } else {
    oddNumbers.replaceChildren(numberInBox);
  }
}

// helper function: compares numbers in array, to be used in the .sort array method to sort the numbers in ascending order
function compareNumbers(a, b) {
  return a - b;
}