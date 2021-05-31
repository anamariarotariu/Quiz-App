const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progress');
const scoreHud = document.getElementById('score');
const progressBarFull = document.getElementById('progress--bar--full');
let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [];
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple").then((res) =>{
    return res.json();
}).then(loadedQuestions =>{
   questions = loadedQuestions.results.map((loadedQuestions) => {
       const formattedQuestion = {
           question: loadedQuestions.question
       };
       const answerChoices = [... loadedQuestions.incorrect_answers];
       formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
       answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestions.correct_answer);

       answerChoices.forEach((choice, index) =>{
           formattedQuestion["choice" + (index+1)] = choice;
       });
       return formattedQuestion;
   });
   startGame();
}).catch(err =>{
    console.error(err);
});
//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    // spread operator => copy the content of the questions array inside the availableQuestion array (when we change one, the other changes as well)
    availableQuestion = [...questions];
    getNewQuestion();
}
getNewQuestion = () =>{
    if(availableQuestion.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/end.html');
    }
    //populate the question container
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //update the progress bar
    progressBarFull.style.width = `${questionCounter/MAX_QUESTIONS * 100}%`;
  const questionIndex =  Math.floor(Math.random() * availableQuestion.length)
  currentQuestion = availableQuestion[questionIndex];
  question.innerText = currentQuestion.question;
  //populate the answer fields
  choices.forEach(choice => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
  });
  availableQuestion.splice(questionIndex, 1);
  acceptingAnswer = true;
};
choices.forEach(choice => {choice.addEventListener('click', e => {
   if(!acceptingAnswer) return;

   acceptingAnswer = false;
   const selectedChoice = e.target;
   const selectedAnswer = selectedChoice.dataset['number'];

   let classToApply = 'incorrect';
   if (selectedAnswer == currentQuestion.answer){
       classToApply = 'correct';
   }
  selectedChoice.parentElement.classList.add(classToApply);
  if(classToApply === 'correct'){
      incrementScore(CORRECT_BONUS);
  }
  setTimeout( () =>{
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
  }, 1000);
  
   
}); 
});
incrementScore = (num) =>{
    score += num;
    scoreHud.innerText = score;
}
