var quizQuestions = [
    {
        question: "The function and variable statements are know as?",
        choices: 
            ["A: declaration statements", 
            "B: keywords",
            "C: data types", 
            "D: None of the above"],

        answer: "A: declaration statements"
        
    },
    {
        question: "Using _________ statement is how you test for a specific condition.",
        choices: 
            ["A: else", 
            "B: if", 
            "C: constant", 
            "D: for"],

        answer: "B: if"
    },
    {
        question: "In the following given syntax of the switch statement, the Expression is compared with the labels using which one of the following operators?",
        choices: 
            ["A: ===", 
            "B: ==", 
            "C: =====", 
            "D: ="],

        answer: "A: ==="
    },
    {
        question: "Which one of these would be considered a string",
        choices: 
            ["A: 123456", 
            "B: 9739284", 
            "C: true", 
            "D: '9739284'"],

        answer: "D: '9739284'"
    },
    {
        question: "Which is the correct way to write a JavaScript array?",
        choices: 
            ["A: var nameArray = [1:'bobert',2:'robert',3:'bertbob']", 
            "B: var nameArray = 1=['bobert']2=['robert']3=['bertbob']", 
            "C: var nameArray = ['bobert','robert','bertbob']", 
            "D: var nameArray = {'bobert','robert','bertbob'}"],

        answer: "C: var nameArray = ['bobert','robert','bertbob']"
}]

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

function start() {

    timeLeft = 90;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000); 

    next();
}

function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` out of 5 questions correct!</h3>
    <input type="text" id="name" placeholder="Initials"> 
    <button class="btn" onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}

function getScore() {

    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button class="btn" onclick="clearScore()">Clear score!</button><button class="btn" onclick="resetGame()">Play Again!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button class="btn" onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function incorrect() {
    timeLeft -= 20; 
    next();
}

function correct() {
    score += 20;
    next();
}

function next() {
    currentQuestion++;

    if (currentQuestion > quizQuestions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + quizQuestions[currentQuestion].question + "</h2>"

    for (var buttonLoop = 0; buttonLoop < quizQuestions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button class= 'btn' onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", quizQuestions[currentQuestion].choices[buttonLoop]);
        if (quizQuestions[currentQuestion].choices[buttonLoop] === quizQuestions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}