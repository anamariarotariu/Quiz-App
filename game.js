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

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];
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
incrementScore = num =>{
    score += num;
    scoreHud.innerText = score;
}
startGame();