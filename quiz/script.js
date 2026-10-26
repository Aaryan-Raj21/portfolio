// Code With AI Quiz App - Lecture 10 Implementation
// Author: Aryan Raj (JECRC University)

const questions = [
  {
    question: "What does a large language model actually predict?",
    options: [
      "The next token",
      "The entire paragraph",
      "The final answer",
      "The user's intention"
    ],
    answer: "The next token"
  },
  {
    question: "In the commit-message format used in this course, what comes before the colon?",
    options: [
      "The type, such as feat or fix",
      "The filename",
      "The programmer name",
      "The date"
    ],
    answer: "The type, such as feat or fix"
  },
  {
    question: "What must a unit test do before the bug is fixed?",
    options: [
      "Fail",
      "Pass",
      "Stop running",
      "Delete the code"
    ],
    answer: "Fail"
  },
  {
    question: "Where should the styling for a webpage live?",
    options: [
      "In a separate CSS file",
      "Inside Python",
      "Inside the browser console",
      "Inside a text file"
    ],
    answer: "In a separate CSS file"
  },
  {
    question: "What does a loop inside another loop usually mean for time complexity?",
    options: [
      "It is quadratic",
      "It is constant",
      "It is logarithmic",
      "It has no complexity"
    ],
    answer: "It is quadratic"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizContainer = document.getElementById("quiz");
const resultCard = document.getElementById("result-card");
const questionNumber = document.getElementById("question-number");
const scoreCounter = document.getElementById("score-counter");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
  answered = false;
  const q = questions[currentQuestion];
  
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreCounter.textContent = `Score: ${score}`;
  questionElement.textContent = q.question;
  optionsElement.innerHTML = "";

  q.options.forEach(function (option) {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", function () {
      checkAnswer(button, option);
    });
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selectedButton, selectedOption) {
  if (answered) return;
  answered = true;

  const currentQ = questions[currentQuestion];
  const allButtons = optionsElement.querySelectorAll("button");

  if (selectedOption === currentQ.answer) {
    score++;
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
    allButtons.forEach(btn => {
      if (btn.textContent === currentQ.answer) {
        btn.classList.add("correct");
      }
    });
  }

  allButtons.forEach(btn => btn.setAttribute("disabled", "true"));
  scoreCounter.textContent = `Score: ${score}`;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizContainer.classList.add("hidden");
  resultCard.classList.remove("hidden");
  const percentage = Math.round((score / questions.length) * 100);
  resultElement.textContent = `You scored ${score} out of ${questions.length} (${percentage}%)`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultCard.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  showQuestion();
});

showQuestion();
