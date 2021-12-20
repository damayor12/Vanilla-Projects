"use strict";
const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

function saveHighScore(event) {
    event.preventDefault();
    let score = { name: username.value, score: mostRecentScore };

    highScores.push(score);
    console.log(highScores);

    highScores = highScores.sort((a, b) => a.score - b.score);

    console.log(highScores);

    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    //window.location.assign("/");
}

saveHighScore(event);

// function saveHighScore(e) {
//     //e.preventDefault();

//     const score = {
//         score: mostRecentScore,
//         name: username.value,
//     };

//     highScores.push(score);

//     highScores.sort((a, b) => {
//         return b.score - a.score;
//     });

//     highScores.splice(5);

//     localStorage.setItem("highScores", JSON.stringify(highScores));
//     window.location.assign("/");
// }

// saveHighScore();
