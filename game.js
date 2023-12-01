const Q = document.getElementById("question");
const CHOICES = Array.from(document.getElementsByClassName("choice-text"));
const NUMOFQ = document.getElementById("numofquestion");
const PBAR = document.getElementById("fullbar");
const SCORE = document.getElementById("score");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQ = {};
let acceptAnswer = false;
let score = 0;
let countQ = 0;
let availableQs = [];

let Qs = [];

fetch("https://opentdb.com/api.php?amount=25&category=9&difficulty=medium&type=multiple")
    .then(res => {

        return res.json();
    })
    .then(loadQ => {
        // console.log(loadQ);
        Qs = loadQ.results.map(loadQ => {
            const formattedQ = { question : loadQ.question };

            const ansChoices = [...loadQ.incorrect_answers];
            formattedQ.answer = Math.floor(Math.random() * 4) + 1;
            ansChoices.splice( formattedQ.answer - 1, 0, loadQ.correct_answer);

            ansChoices.forEach( (choice, index) => {
                formattedQ['choice' + (index + 1)] = choice;
            });

            return formattedQ;
        })
        // console.log(Qs);
        startGame();
    })

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    countQ = 0;
    score = 0;
    availableQs = [...Qs];
    // console.log(availableQs);
    getNewQ();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
}

getNewQ = () => {

    if(availableQs.length == 0 || countQ >= MAX_QUESTIONS){
        localStorage.setItem("totalScore", score);   // store scores in brow
        return window.location.assign('/end.html');
    }

    countQ++;
    NUMOFQ.innerText = `Question : ${countQ}/${MAX_QUESTIONS}`;
    PBAR.style.width = `${countQ/MAX_QUESTIONS*100}%`;

    const qIndex = Math.floor(Math.random() * availableQs.length); //!
    currentQ = availableQs[qIndex];
    //console.log(currentQ);
    question.innerText = currentQ.question;
    
    CHOICES.forEach( choice => {
        const NUM = choice.dataset['num'];
        choice.innerText = currentQ['choice' + NUM];
    } );

    availableQs.splice(qIndex, 1); //!

    acceptAnswer=true;
    console.log("question count : " + countQ);
}

CHOICES.forEach(choice => {
    choice.addEventListener("click", e=> {
        if(!acceptAnswer) return; //!

        acceptAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['num'];
        
        const classtoApply = selectedAnswer == currentQ.answer ? "correct" : "incorrect";
        console.log(classtoApply);
        selectedChoice.parentElement.classList.add(classtoApply);

        if(classtoApply == "correct"){
            score += CORRECT_BONUS;
            SCORE.innerText = score;
        }

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classtoApply);
            getNewQ();
        }, 1000)
        
    })
})

// incrementScore = (num) => {
//     score += num;
//     SCORE.innerText = score;
// }

// startGame();