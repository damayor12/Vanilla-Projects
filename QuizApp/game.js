const question = document.getElementById("question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is 5 + 3?",
        choice1: "2",
        choice2: "4",
        choice3: "8",
        choice4: "10",
        answer: 3,
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<p>",
        choice3: "<body>",
        choice4: "html",
        answer: 1,
    },
    {
        question: "Which type of language is JavaScript?",
        choice1: "Object-Oriented",
        choice2: "Object-based",
        choice3: "Assembly-Language",
        choice4: "High-Level",
        answer: 2,
    },

    {
        question: "Which one of the following also known as Conditional Expression:",
        choice1: "Alternative to if-else",
        choice2: "Switch statement",
        choice3: "If-then-else statement",
        choice4: "immediate if",
        answer: 4,
    },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

function startGame() {
    score = 0;
    questionCounter = 0;
    availableQuestions = [...questions];
    console.log("Nice!");
    console.log(availableQuestions);
    getNewQuestion();
}

function getNewQuestion() {
    if (questionCounter === MAX_QUESTIONS || availableQuestions.length === 0) {
        localStorage.setItem("mostRecentScore", score);
        //console.log(score);
        return window.location.assign("end.html");
    } else {
        console.log(availableQuestions, "second");

        availableQuestions = availableQuestions
            .map((a) => ({ value: a, num: Math.random() }))
            .sort((a, b) => a.num - b.num)
            .map((a) => a.value);

        console.log(availableQuestions);
        questionCounter++;
        progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
        progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

        //Radomize questions
        currentQuestion = availableQuestions[0];

        question.innerText = currentQuestion.question;

        choices.forEach((choice) => {
            const number = choice.getAttribute("data-number");

            choice.innerText = currentQuestion["choice" + number];
        });
        availableQuestions.splice(0, 1);

        acceptingAnswers = true;
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) {
            return;
        }

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = Number(selectedAnswer) === Number(currentQuestion.answer) ? "correct" : "wrong";

        choice.parentElement.classList.add(classToApply);
        if (classToApply === "correct") {
            incrementScore(SCORE_POINTS);
        }

        setTimeout(() => {
            choice.parentElement.classList.remove(classToApply);
        }, 1000);

        getNewQuestion();
    });
});

function incrementScore(x) {
    score += x;
    scoreText.innerText = score;
}

startGame();
