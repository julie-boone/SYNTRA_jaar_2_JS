const ANSWER_LENGTH = 5;
const ROUNDS = 6;
const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");

// the state for the app
let currentGuess = "";
let line = 0;
let wordOTDay;
let keepGuessing = true;

async function init() {
  // nab the word of the day
  wordOTDay = await fetch("https://words.dev-apis.com/word-of-the-day")
    .then((res) => res.json())
    .then((res) => res.word);
  console.log(wordOTDay);
}

// listening for event keys and routing to the right function
// we listen on keydown so we can catch Enter and Backspace
document.addEventListener("keydown", function handleKeyPress(event) {
  if (keepGuessing === true) {
    if (event.key === "Backspace") {
      backspace();
    } else if (event.key === "Enter") {
      commit();
    } else if (isLetter(event.key)) {
      addLetter(event.key);
    } else {
      // other keys ignored
    }
  }
});

// user adds a letter to the current guess
function addLetter(letter) {
  if (currentGuess.length < ANSWER_LENGTH) {
    currentGuess += letter;
  } else {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
  }
  letters[line * ANSWER_LENGTH + currentGuess.length - 1].innerText = letter;
}

// use tries to enter a guess
function commit() {
  const correctWord = Array.from(wordOTDay);
  const correctLetters = Array.from(currentGuess).map((letter, i) => {
    if (letter === correctWord[i]) {
      return "correct";
    } else {
      return letter;
    }
  });
  const resultsArray = correctLetters.map((letter) => {
    keepGuessing = false;
    if (letter === "correct") {
      return "correct";
    } else if (correctWord.includes(letter)) {
      const indexOfLetter = correctWord.indexOf(letter);
      correctWord[indexOfLetter] = "found";
      keepGuessing = true;
      return "close";
    } else {
      keepGuessing = true;
      return "wrong";
    }
  });

  for (let i = 0; i < resultsArray.length; i++) {
    console.log("colored " + resultsArray[i]);
    letters[line * ANSWER_LENGTH + i].classList.add(resultsArray[i]);
  }

  if (line < ROUNDS) {
    line++;
  } else {
    keepGuessing = false;
  }

  currentGuess = "";

  // const res = await fetch("https://words.dev-apis.com/validate-word", {
  //   method: "POST",
  //   body: JSON.stringify({ word: currentGuess }),
  // });
}

// user hits backspace, if the the length of the string is 0 then do
// nothing
function backspace() {
  currentGuess = currentGuess.substring(0, currentGuess.length - 1);
  letters[line * ANSWER_LENGTH + currentGuess.length].innerText = "";
}

// let the user know that their guess wasn't a real word
// skip this if you're not doing guess validation
function markInvalidWord() {}

// a little function to check to see if a character is alphabet letter
// this uses regex (the /[a-zA-Z]/ part) but don't worry about it
// you can learn that later and don't need it too frequently
function isLetter(letter) {
  re = /^[a-zA-Z]$/;
  if (re.test(letter)) {
    return true;
  } else {
    return false;
  }
}

// show the loading spinner when needed
function setLoading(isLoading) {
  //loadingDiv.classList.toggle("hidden", !isLoading);
}

init();
