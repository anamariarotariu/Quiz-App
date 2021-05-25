const highScoresList = document.getElementById('highScores--list');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
//it takes an array and allow you to cast its element to another type
highScoresList.innerHTML = highScores.map( score =>{
return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join();