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
const retryButton = document.querySelector(".questions__retry");

const baseUrl = "https://opentdb.com/api.php";
let score = 0;
let questions = [];
let index = 0;

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const question = document.getElementById("number").value;
    const level = document.getElementById("difficulty").value;
    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;
    const hero = document.querySelector(".hero");
    hero.classList.add("hero--hidden");

    //call the fetchQuestion function
    fetchQuestion(question,category,level, type);
questionSection.classList.remove("questions--hidden");
preference.classList.add("preferences--hidden");
})

async function fetchQuestion(question, category, level, type) {
  const url = `${baseUrl}?amount=${question}&category=${category}&difficulty=${level}&type=${type}`;
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
  nextBtn.classList.add("questions__button--hidden");
  if (index < questions.length) {
    questionEl.innerHTML = "";
    optionUl.innerHTML = "";
    const currentQuestion = questions[index];
    console.log(currentQuestion);
    console.log(currentQuestion.question);
    console.log(currentQuestion.answer);
    console.log(currentQuestion.options);
    let optionsList = currentQuestion.options.sort();
    let currentAnswer = decode(currentQuestion.answer);
    questionEl.textContent = decode(currentQuestion.question);

    //iterate through array
    optionsList.forEach((option) => {
      const li = document.createElement("div");
      li.classList.add("questions__answer");
      li.textContent = decode(option);
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
    const questionTitle= document.querySelector(".questions__title");
    questionTitle.textContent = "Results";
    questionEl.classList.add("questions__question--hidden");
    retryButton.classList.remove("questions__retry--hidden");
    optionUl.innerHTML = "";
    if ((score/questions.length) >= 0.8 && (score/questions.length) < 1 )
    {
    scoreEl.textContent = `Great job! Score : ${score}/${questions.length}`;
    }    else  if ((score/questions.length) === 1 )
      {
      scoreEl.textContent = `Perfect! Score : ${score}/${questions.length}`;
      } else if ((score/questions.length) >= 0.5 && (score/questions.length) < 0.8 )
      {
        scoreEl.textContent = `Nice! Score : ${score}/${questions.length}`;
      } else if ((score/questions.length) < 0.5 && (score/questions.length) > 0 )
        {
          scoreEl.textContent = `Better luck next time. Score : ${score}/${questions.length}`;
        }
        else  if ((score/questions.length) === 0 )
          {
            scoreEl.textContent = `Oops... Score : ${score}/${questions.length}`;
          }
    nextBtn.disabled = true;
    nextBtn.classList.add("questions__button--hidden");
  }

}

function checkAnswer(option, answer, selectedAnswer) {
  nextBtn.classList.remove("questions__button--hidden");
  console.log("I have clicked " + option);
  const nodes = document.querySelectorAll(".questions__answer");
  console.log(nodes);
  nodes.forEach((node)=>{
    node.style.pointerEvents ="none";
  })
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

const homeBtn = document.querySelector(".navbar__home");
homeBtn.addEventListener("click",()=>{
  location.reload();
  console.log("Click");
  return false;
})
