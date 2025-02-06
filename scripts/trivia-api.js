// class TriviaApi{
//     constructor(){
//         this.baseUrl = "https://opentdb.com/api.php";
//     }

//     //method to get questions based on parameters like number of questions, category and level of difficulty

//     async getQuestions(questions,category,level){

//         const url = `${this.baseUrl}?amount=${questions}&category=${category}&difficulty=${level}`;
//         try{
//             const response = await axios.get(url);
//             return response.data.results;
//         }
//         catch(error){
//             console.error(error);
//         }
//     }

// }

const questionEl = document.querySelector(".question");
const optionUl = document.querySelector(".options");
const scoreEl = document.querySelector(".score");
const nextBtn = document.querySelector(".next-question");
const formEl = document.querySelector(".preferences__form");
const baseUrl = "https://opentdb.com/api.php";
let score = 0;
let questions = [];
let index = 0;

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const question = document.getElementById("number").value;
    const level = document.getElementById("difficulty").value;
    const category = document.getElementById("category").value;

    //call the fetchQuestion function
    fetchQuestion(question,category,level);
    

})

async function fetchQuestion(question, category, level) {
  const url = `${baseUrl}?amount=${question}&category=${category}&difficulty=${level}&type=multiple`;
  try {
    const response = await axios.get(url);
    let result = response.data.results;
    console.log(result);
    questions = result.map((item) => ({
      question: item.question,
      answer: item.correct_answer,
      options: [...item.incorrect_answers, item.correct_answer],
    }));
    console.log(questions);
    displayQuiz();
  } catch (error) {
    console.error(error);
  }
}
// fetchQuestion(5, 19, "easy");
function displayQuiz() {
  if (index < questions.length) {
    questionEl.innerHTML = "";
    optionUl.innerHTML = "";
    const currentQuestion = questions[index];
    console.log(currentQuestion);
    console.log(currentQuestion.question);
    console.log(currentQuestion.answer);
    console.log(currentQuestion.options);
    let optionsList = currentQuestion.options.sort();
    let currentAnswer = currentQuestion.answer;
    questionEl.textContent = currentQuestion.question;

    //iterate through array
    optionsList.forEach((option) => {
      const li = document.createElement("div");
      li.textContent = option;
      li.addEventListener("click", () => checkAnswer(option, currentAnswer, li));
      optionUl.appendChild(li);
    });
    nextBtn.disabled = true;
    optionUl.addEventListener('click',()=>{
        nextBtn.disabled = false;
    })
  }
  else{
    console.log("Quiz completed");
    questionEl.textContent = "Quiz Completed!!!"
    optionUl.innerHTML = "";
    scoreEl.textContent = `final score is : ${score}/${questions.length}`;
    nextBtn.disabled = true;
  }

}

function checkAnswer(option, answer, selectedAnswer) {
  console.log("I have clicked " + option);
  if (option === answer) {
    console.log("My answer is correct");
    selectedAnswer.classList.add()
    score++;
  } else {
    console.log("Wrong answer");
    selectedAnswer.classList.add()
  }
}

nextBtn.addEventListener("click",()=>{
    index++;
    displayQuiz();
})

