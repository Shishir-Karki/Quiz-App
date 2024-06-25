Questions =[]
quesTag = document.getElementById("ques");
async function fetchQuestions(){
  try{
  const resp = await fetch("https://opentdb.com/api.php?amount=10");
  if (!resp.ok) {
    throw new Error(`Couldnt fetch questions}`);
  }
  const data = await resp.json();
  Questions = data.results;
  loadQues();
}catch(err){
  console.error(err);
  quesTag.innerHTML = `<h5> ${err}</h5>`;
}
}

let currentQuestion = 0;
let score =0;

if(Questions.length ===0){
  quesTag.innerHTML = `<h5>Please wait the questiopns are loading</h5>`;
}
function previousQuestion(){
  if(currentQuestion > 0){
    currentQuestion--;
    loadQues();
    if(currentQuestion <=1)   document.getElementById("prevBtn").remove();
  }
 }

function loadQues(){
  const opt = document.getElementById("opt");

  let currentQuestext = Questions[currentQuestion].question;
  console.log(currentQuestext);
  quesTag.innerText = currentQuestext;

  opt.innerHTML = "";
  const correctAnswer = Questions[currentQuestion].correct_answer;

  const incorrectAnswers = Questions[currentQuestion].incorrect_answers;

  const options = [correctAnswer, ...incorrectAnswers]; //(...) Sprerad operator 

  options.sort((o1, o2) => Math.random() < 0.5); //priority can also be handled


 
  options.forEach((option, idx) => {
    const optDiv = document.createElement('div');
    const optTag = document.createElement('input');
    const labelTag = document.createElement('label');

    optTag.type = 'radio';
    optTag.name = 'answer';
    optTag.value = option;
    optTag.id = `option${idx}`;//add unique id for each option
   

    labelTag.textContent = option;
    labelTag.htmlFor = `option${idx}`; //add htmFor to label to link to the radio button

    optDiv.appendChild(optTag);
    optDiv.appendChild(labelTag);
    opt.appendChild(optDiv);
  });
}



// setTimeout(()=>{
//   loadQues();
//   if(Questions.length === 0){
//     quesTag.innerHTML = `<h5>Sorry, no questions available</h5>`;
//   }
// },2000)
function handleSubmit(){}

  function checkAnswer(){
    const selectedAns = document.querySelector('input[name = "answer"]:checked').value;
     
    if (selectedAns === Questions[currentQuestion].correct_answer){
      score++;
  }
  nextQuestion();
 }

 function skipQuestion(){
  nextQuestion();
 }



 function prevQuestion(){
  if(currentQuestion > 1){
    currentQuestion--;
    loadQues();
    if(currentQuestion <=1)   document.getElementById("prevBtn").remove();
  }
 }


function nextQuestion (){
  if (currentQuestion < Questions.length - 1){
    currentQuestion++;
    loadQues();
  }else{
    document.getElementById("opt").remove();
    document.getElementById("ques").remove();
    document.getElementById("btn").remove();
    document.getElementById("skpBtn").remove();
    document.getElementById("prevBtn").remove();
    showTotal();
  }
}
function showTotal(){
 const totalScore = document.querySelector('#score');
 totalScore.innerText = `Your Score: ${score}/10`;
 Questions.forEach((ques, idx) => {
  totalScore.innerHTML += `<p>${idx +1}: ${ques.correct_answer}`;
 });

}

fetchQuestions();


