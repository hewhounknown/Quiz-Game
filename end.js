const userName = document.getElementById('userName');
const saveBtn = document.getElementById('save');
const finalScore = document.getElementById('finalScore');
const storedScore = localStorage.getItem("totalScore");

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

finalScore.innerText = storedScore;

userName.addEventListener('keyup', () => {
    saveBtn.disabled = !userName.value;
})

saveScore = (e) =>{
    e.preventDefault();

    const score = {
        score : storedScore,
        name : userName.value,
    };

    highScores.push(score);
    highScores.sort( (a, b) => b.score - a.score );
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    //window.location.assign('/');
};
