const username = document.getElementById('username--input');
const saveScoreBtn = document.getElementById('save__score--btn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('final--score');
//everything in local storage is saved as a string, that's why we need to parse it with JSON
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;
finalScore.innerText = mostRecentScore;
username.addEventListener('keyup', () =>{
    //can press the button when an username is added
    saveScoreBtn.disabled = !username.value;

})
saveHighscore = (e) =>{
    e.preventDefault();
   const score = {
       score: mostRecentScore,
       name: username.value
   };
   highScores.push(score);
// if b > a => return b
   highScores.sort((a,b) => b.score - a.score);
   highScores.splice(5);
   localStorage.setItem('highScores', JSON.stringify(highScores));
   window.location.assign('/');
}