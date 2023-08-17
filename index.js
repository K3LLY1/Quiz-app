//this are the questions
const questions = [
    {question: "Which is largest animal in the world?", answer:[
        {text: "Shark", correctAnswer: false},
        {text: "Blue Whale", correctAnswer: true},
        {text: "Elephant", correctAnswer: false},
        {text: "lion", correctAnswer: false},
    ]
 },
    {question: "Which is the smallest city in the world?", answer:[
        {text: "vatican", correctAnswer: true},
        {text: "Bhutan", correctAnswer: false},
        {text: "Nepal", correctAnswer: false},
        {text: "sri lanka", correctAnswer: false},
     ]
    }, 
    {question: "Which is the largest dersert in the world?", answer:[
        {text: "kalahari", correctAnswer: false},
        {text: "gobi", correctAnswer: true},
        {text: "Sahara", correctAnswer: false},
        {text: "Antartica", correctAnswer: false},
     ]
    },
    {question: "Which is the smallest continent in the world?", answer:[
        {text: "asia", correctAnswer: false},
        {text: "Austrailia", correctAnswer: true},
        {text: "Artic", correctAnswer: false},
        {text: "Afica", correctAnswer: false},
     ]
    }
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

//function to start the quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + " " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correctAnswer){
            button.dataset.correctAnswer = answer.correctAnswer
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correctAnswer === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correctAnswer === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
            showQuestion();
        }
        else{
            showScore();
        }
    }

    
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else {
         startQuiz();
    }
           
       
})


startQuiz();