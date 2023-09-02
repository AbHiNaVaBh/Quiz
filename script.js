const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainerElement = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-button");

let shuffleQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener("click", starGame);

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function starGame() {
  startButton.classList.add("hide");
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  quizScore = 0;
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.innerText = answers.text;
    button.classList.add("btn");
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  setStatusClass(document.body, correct);
  Array.from(answerButtonElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "restart";
    startButton.classList.remove("hide");
  }

  if ((selectedButton.dataset = correct)) {
    quizScore++;
  }
  document.getElementById("right-answer").innerText = quizScore;
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "which one of the js framework ?",
    answers: [
      { text: "Phython", correct: false },
      { text: "Django", correct: false },
      { text: "React", correct: true },
      { text: "Eclipse", correct: false },
    ],
  },
  {
    question: "which one of the Python framework ?",
    answers: [
      { text: "Bootstrap", correct: false },
      { text: "Django", correct: true },
      { text: "React", correct: false },
      { text: "Eclipse", correct: false },
    ],
  },
  {
    question: "which one of the js framework ?",
    answers: [
      { text: "Phython", correct: false },
      { text: "Django", correct: false },
      { text: "dud", correct: false },
      { text: "react", correct: true },
    ],
  },
  {
    question: "which one of the python framework ?",
    answers: [
      { text: "c", correct: false },
      { text: "java", correct: false },
      { text: "Django", correct: true },
      { text: "Eclipse", correct: false },
    ],
  },
];
