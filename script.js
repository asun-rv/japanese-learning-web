const words = [
    { jp: "こんにちは", en: "Hello" },
    { jp: "ありがとう", en: "Thank you" },
    { jp: "さようなら", en: "Goodbye" },
    { jp: "すみません", en: "Excuse me" }
];

let index = 0;
let currentQuestion;
let currentAnswers = [];
let score = 0;
let questionNumber = 1;
let totalQuestions = 20;

//cambiar de modo
function showFlashcards() {
    document.getElementById("flashcards").style.display = "block";
    document.getElementById("quiz").style.display = "none";
}

function showQuiz() {
    document.getElementById("flashcards").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    score = 0;
    questionNumber = 1;

    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("progress").textContent = "Question " + questionNumber;

    loadQuestion();
}

// flip de la tarjeta
function flipCard() {
    document.getElementById("card").classList.toggle("flipped");
}

// siguiente palabra
function nextWord() {
    index = (index + 1) % words.length;

    document.getElementById("word").textContent = words[index].jp;
    document.getElementById("translation").textContent = words[index].en;

    // importante: reset del flip
    document.getElementById("card").classList.remove("flipped");
}

function loadQuestion() {

    document.getElementById("progress").textContent = "Question " + questionNumber + " / " + totalQuestions;

    // Elegir palabra aleatoria
    currentQuestion = words[Math.floor(Math.random() * words.length)];

    document.getElementById("question").textContent = currentQuestion.jp;

    // Crear respuestas
    currentAnswers = [...words]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    // Asegurar que la correcta está incluida
    if (!currentAnswers.includes(currentQuestion)) {
        currentAnswers[Math.floor(Math.random() * 4)] = currentQuestion;
    }

    // Mostrar respuestas
    const buttons = document.querySelectorAll(".answer");

    buttons.forEach((button, index) => {
        button.textContent = currentAnswers[index].en;
        button.style.backgroundColor = "";
        button.disabled = false;
    });

}

function checkAnswer(index) {

    const buttons = document.querySelectorAll(".answer");

    buttons.forEach(button => button.disabled = true);

    if (currentAnswers[index] === currentQuestion) {

        score++;
        document.getElementById("score").textContent = "Score: " + score;

        buttons[index].style.backgroundColor = "lightgreen";

    } else {

        buttons[index].style.backgroundColor = "#ff8a8a";

        const correctIndex = currentAnswers.indexOf(currentQuestion);

        buttons[correctIndex].style.backgroundColor = "lightgreen";
    }

    questionNumber++;

    if (questionNumber > totalQuestions) {

        setTimeout(() => {

            alert("Quiz finished!\nScore: " + score + "/" + totalQuestions);

            questionNumber = 1;
            score = 0;

            document.getElementById("score").textContent = "Score: " + score;

            loadQuestion();

        }, 1000);

    } else {

        setTimeout(loadQuestion, 1000);

    }

}