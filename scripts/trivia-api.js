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

// const questionEl = document.querySelector(".questions__question");
// const optionUl = document.querySelector(".questions__options");
// const scoreEl = document.querySelector(".questions__score");
// const nextBtn = document.querySelector(".questions__button");

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
const questionEl = document.querySelector(".questions__question");
const optionUl = document.querySelector(".questions__options");
const scoreEl = document.querySelector(".questions__score");
const nextBtn = document.querySelector(".questions__button");
const formEl = document.querySelector(".preferences__form");
const preference = document.querySelector(".preferences");
const questionSection = document.querySelector(".questions");
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
questionSection.classList.remove("questions--hidden");
preference.classList.add("preferences--hidden");
})

async function fetchQuestion(question, category, level) {
  const url = `${baseUrl}?amount=${question}&category=${category}&difficulty=${level}&type=multiple`;
  try {
    console.log(url);
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
    questionEl.textContent = decode(currentQuestion.question);

    //iterate through array
    optionsList.forEach((option) => {
      const li = document.createElement("div");
      li.classList.add("questions__answer");
      li.textContent = option;
      li.addEventListener("click", () => checkAnswer(option, currentAnswer, li));
      optionUl.appendChild(li);
    });
    nextBtn.disabled = true;
    const li = document.querySelector(".questions__answer");
    li.addEventListener('click',()=>{
        nextBtn.disabled = false;
    })
  }
  else{
    console.log("Quiz completed");
    questionEl.classList.add("questions__question--hidden");
    optionUl.innerHTML = "";
    scoreEl.textContent = `Your score is : ${score}/${questions.length}`;
    nextBtn.disabled = true;
    nextBtn.classList.add("questions__button--hidden");
  }

}

function checkAnswer(option, answer, selectedAnswer) {
  console.log("I have clicked " + option);
  if (option === answer) {
    console.log("My answer is correct");
    selectedAnswer.classList.add("questions__answer--correct")
    score++;
  } else {
    console.log("Wrong answer");
    selectedAnswer.classList.add()
    selectedAnswer.classList.add("questions__answer--incorrect")
  }
}

nextBtn.addEventListener("click",()=>{
    index++;
    displayQuiz();
})

function decode(text) {
    let doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent;
}