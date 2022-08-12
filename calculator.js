let itemScreen = document.querySelector("#item-screen");
let itemEquals = document.querySelector("#item-equals");
let dataOperator = document.querySelectorAll(".data-operation");
let dataNumber = document.querySelectorAll(".data-number");
let firstNumber = "";
let secondNumber = "";
let resultNum, operator;

let setNum = function () {
  if (resultNum) {
    firstNumber = this.getAttribute("data-num");
    resultNum = "";
  } else {
    firstNumber += this.getAttribute("data-num");
  }

  console.log(firstNumber + " <- first", secondNumber + " <- second");
  if (firstNumber.length > 10) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Max 10 digit!',
    })
    return;
  }

  itemScreen.innerHTML = firstNumber;
};

let moveOperator = function () {
  secondNumber = firstNumber;
  firstNumber = "";
  operator = this.getAttribute("data-opr");

  itemScreen.innerHTML += ' ' + operator;
  itemEquals.setAttribute("data-result", "");
};

let displayResult = function () {
  secondNumber = parseFloat(secondNumber);
  firstNumber = parseFloat(firstNumber);

  switch (operator) {
    case "+":
      resultNum = secondNumber + firstNumber;
      break;
    case "-":
      resultNum = secondNumber - firstNumber;
      break;
    case "*":
      resultNum = secondNumber * firstNumber;
      break;
    case "/":
      resultNum = secondNumber / firstNumber;
      break;

    default:
      resultNum = firstNumber;
  }

  itemScreen.innerHTML = resultNum;
  itemEquals.setAttribute("data-result", resultNum);

  secondNumber = 0;
  firstNumber += resultNum;
};

let clearScreen = function () {
  firstNumber = "";
  secondNumber = "";
  resultNum = "";
  operator = "";
  itemScreen.innerHTML = "0";
  itemEquals.setAttribute("data-result", "");
};

let deleteLast = function () {
  firstNumber = firstNumber.slice(0, -1);
  if (firstNumber === "") {
    firstNumber = "0";
  }
  itemScreen.innerHTML = firstNumber;
};

for (let i = 0; i < dataNumber.length; i++) {
  dataNumber[i].addEventListener("click", setNum);
}

for (let i = 0; i < dataOperator.length; i++) {
  dataOperator[i].addEventListener("click", moveOperator);
}

itemEquals.addEventListener("click", displayResult);

document.querySelector("#clear").addEventListener("click", clearScreen);
document.querySelector("#delete").addEventListener("click", deleteLast);
