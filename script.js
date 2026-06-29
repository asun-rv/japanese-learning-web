const words = [
    { jp: "こんにちは", en: "Hello" },
    { jp: "ありがとう", en: "Thank you" },
    { jp: "さようなら", en: "Goodbye" },
    { jp: "すみません", en: "Excuse me" }
];

let index = 0;

//cambiar de modo
function showFlashcards() {
    document.getElementById("flashcards").style.display = "block";
    document.getElementById("quiz").style.display = "none";
}

function showQuiz() {
    document.getElementById("flashcards").style.display = "none";
    document.getElementById("quiz").style.display = "block";
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