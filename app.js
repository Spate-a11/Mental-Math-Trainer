const firstNumberElement = document.getElementById("firstNumber");
const secondNumberElement = document.getElementById("secondNumber");
const operatorSymbolElement = document.getElementById("operatorSymbol");

const answerForm = document.getElementById("answerForm");
const answerInput = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");

const correctScoreElement = document.getElementById("correctScore");
const wrongScoreElement = document.getElementById("wrongScore");

const operatorButtons = document.querySelectorAll(".operator");

let currentOperator = "+";
let correctAnswer = 0;
let correctScore = 0;
let wrongScore = 0;

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getOperatorSymbol() {
    if (currentOperator === "*") return "×";
    if (currentOperator === "/") return "÷";

    return currentOperator;
}

function createExercise() {
    let firstNumber;
    let secondNumber;

    switch (currentOperator) {
        case "+":
            firstNumber = randomNumber(0, 100);
            secondNumber = randomNumber(0, 100);
            correctAnswer = firstNumber + secondNumber;
            break;

        case "-":
            firstNumber = randomNumber(0, 100);
            secondNumber = randomNumber(0, firstNumber);
            correctAnswer = firstNumber - secondNumber;
            break;

        case "*":
            firstNumber = randomNumber(0, 12);
            secondNumber = randomNumber(0, 12);
            correctAnswer = firstNumber * secondNumber;
            break;

        case "/":
            secondNumber = randomNumber(1, 10);
            correctAnswer = randomNumber(0, 10);
            firstNumber = secondNumber * correctAnswer;
            break;
    }

    firstNumberElement.textContent = firstNumber;
    secondNumberElement.textContent = secondNumber;
    operatorSymbolElement.textContent = getOperatorSymbol();

    answerInput.value = "";
    answerInput.focus();
}

function checkAnswer(event) {
    event.preventDefault();

    const inputValue = answerInput.value.trim();

    if (inputValue === "") {
        return;
    }

    const userAnswer = Number(inputValue);
    const previousCorrectAnswer = correctAnswer;

    if (userAnswer === previousCorrectAnswer) {
        correctScore++;
        correctScoreElement.textContent = correctScore;

        feedback.textContent = "Richtig!";
        feedback.className = "correct";
    } else {
        wrongScore++;
        wrongScoreElement.textContent = wrongScore;

        feedback.textContent =
            `Falsch. Das richtige Ergebnis war ${previousCorrectAnswer}.`;

        feedback.className = "wrong";
    }

    // Sofort eine neue Aufgabe erzeugen
    createExercise();
}

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        operatorButtons.forEach((otherButton) => {
            otherButton.classList.remove("active");
        });

        button.classList.add("active");
        currentOperator = button.dataset.operator;

        feedback.textContent = "";
        feedback.className = "";

        createExercise();
    });
});

answerForm.addEventListener("submit", checkAnswer);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js");
    });
}

createExercise();
