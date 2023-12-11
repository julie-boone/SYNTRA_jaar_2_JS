const ANSWER_LENGTH = 5;
const ROUNDS = 6;
const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
let currentGuess = "";
let wordOfTheDay = "";
let currentRow = 0;
let allRight = false;
 
function setLoading(isLoading) {
  loadingDiv.classList.toggle("hidden", !isLoading);
}
 
function isLetter(char) {
  const regex = new RegExp(/[a-zA-Z]/i);
  return regex.test(char);
}
 
function backspace() {
  if (currentGuess.length > 0) {
    currentGuess = currentGuess.slice(0, -1);
    const index = currentRow * ANSWER_LENGTH + currentGuess.length;
    letters[index].textContent = "";
  }
}
 
async function commit() {
  if (currentGuess.length < ANSWER_LENGTH) {
    return;
  }
 
  allRight = true;
 
  setLoading(true);
  const res = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({ word: currentGuess }),
  });
  const { validWord } = await res.json();
  setLoading(false);
 
  if (!validWord) {
    markInvalidWord();
    return;
  }
 
  // mark the correct letters in green
  const currentGuessLetters = currentGuess.split("");
  const wordOfTheDayLetters = wordOfTheDay.split("");
 
  for (let i = 0; i < ANSWER_LENGTH; i++) {
    if (currentGuessLetters[i] === wordOfTheDayLetters[i]) {
      letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
    }
  }
 
  // mark the correct but misplaced letters in yellow
  for (let i = 0; i < ANSWER_LENGTH; i++) {
    if (currentGuessLetters[i] === wordOfTheDayLetters[i]) {
      // do nothing
    } else if (wordOfTheDayLetters.includes(currentGuessLetters[i])) {
      // mark as close
      allRight = false;
      letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
    } else {
      // wrong
      allRight = false;
      letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
    }
  }
 
  if (allRight) {
    alert("You won!");
  } else if (!allRight && currentRow === ROUNDS - 1) {
    alert("You lost!");
  }
 
  currentRow++;
  currentGuess = "";
}
 
function markInvalidWord() {
  for (let i = 0; i < ANSWER_LENGTH; i++) {
    letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");
 
    // long enough for the browser to repaint without the "invalid class" so we can then add it again
    setTimeout(() => letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid"), 10);
  }
}
 
function addLetter(letter) {
  if (currentGuess.length < ANSWER_LENGTH) {
    currentGuess += letter;
    const index = currentRow * ANSWER_LENGTH + currentGuess.length - 1;
    letters[index].textContent = letter;
  }
}
 
async function init() {
  // fetch the word of the day using fetch API of the browser
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  // destructure the word property from the response
  const { word } = await res.json();
  wordOfTheDay = word;
  setLoading(false);
 
  // core orechastrator of the game
  // backspace is to remove the last letter
  // commit is to check if the word is correct
  // addLetter is only called if the key pressed is a letter
  // ignore all other keypresses
  document.addEventListener("keydown", (e) => {
    if (allRight) return;
    if (e.key === "Backspace") {
      backspace();
    } else if (e.key === "Enter") {
      commit();
    } else if (isLetter(e.key)) {
      addLetter(e.key);
    }
  });
}
 
init();
 
has context menu
Compose