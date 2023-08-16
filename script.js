const quizQuestions = [
  {
    question: "In which year did World War II end?",
    options: ["1943", "1945", "1950", "1939"],
    correctAnswer: "1945"
  },
  {
    question: "What is the largest mammal?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yuan", "Euro", "Yen", "Dollar"],
    correctAnswer: "Yen"
  },
  {
    question: "What is the world's largest ocean?",
    options: ["Indian Ocean", "Arctic Ocean", "Atlantic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 45;
let timerInterval;

function startQuiz() {
  document.getElementById("start-button").style.display = "none";
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");

  questionText.innerHTML = "";
  answerButtons.innerHTML = "";

  questionText.innerHTML = currentQuestion.question;

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("answer-button");
    answerButtons.appendChild(button);

    button.addEventListener("click", function() {
      checkAnswer(option);
    });
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;

    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);

  const scorePercentage = (score / quizQuestions.length) * 100;

  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your Score: ${score} out of ${quizQuestions.length}</p>
    <p>Score Percentage: ${scorePercentage}%</p>
  `;
}

document.getElementById("start-button").addEventListener("click", startQuiz);
