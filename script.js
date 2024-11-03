const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const questionContainerElement = document.getElementById('question-container')

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex 
startButton.addEventListener('click',startGame)
nextButton.addEventListener('click',()=> {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(()=>Math.random()-0.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(element => {
        const button = document.createElement('button');
        button.innerText = element.text;
        button.classList.add('button');
        if (element.correct) {
            button.dataset.correct = element.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}


function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild 
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    setStatusClass(document.body, correct);
    
    Array.from(answerButtonsElement.children).forEach(button => {
        const buttonCorrect = button.dataset.correct === "true";
        setStatusClass(button, buttonCorrect);
    });
    
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}


function setStatusClass(element,correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is the capital of India?',
        answers: [
            {text: 'Kolkata', correct:false},
            {text: 'New Delhi', correct:true},
            {text:'Jaipur', correct: false},
            {text:'Mumbai',correct:false}
        ]
    },
    {
        question: 'What is 1120+14?',
        answers: [
            {text: '1134', correct: true},
            {text: '1129', correct:false },
            {text: '1124',correct:false},
            {text: '1034',correct: false}
        ]
    },
    {
        question: 'How many months have 28 days?',
        answers: [
            {text:'1',correct:false},
            {text:'10',correct:false},
            {text:'12',correct:true},
            {text:'None',correct:false}
        ]
    }
]