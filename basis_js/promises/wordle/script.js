const ANSWER_LENGTH = 5;
const ROUNDS = 6;
const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");

async function init() {
  // the state for the app
  let currentGuess = 0;
  let currentLetterIndex = 0;
  let currentLetter;
  // nab the word of the day
  const wordOTDay = await fetch("https://words.dev-apis.com/word-of-the-day")
    .then((res) => res.json())
    .then((res) => res.word);
  console.log(wordOTDay);

  // user adds a letter to the current guess
  function addLetter(letter) {}

  // use tries to enter a guess
  async function commit() {}

  // user hits backspace, if the the length of the string is 0 then do
  // nothing
  function backspace() {
    if (currentLetterIndex % 5 === 0) {
      return;
    } else {
      letters[currentLetterIndex - 1].innerHTML = "";
      currentLetterIndex -= 1;
    }
  }

  // let the user know that their guess wasn't a real word
  // skip this if you're not doing guess validation
  function markInvalidWord() {}

  // listening for event keys and routing to the right function
  // we listen on keydown so we can catch Enter and Backspace
  document.addEventListener("keydown", function handleKeyPress(event) {
    console.log(event.key);
    currentLetter = event.key;
    if (event.key === "Backspace") {
      backspace();
    } else {
      isLetter();
    }
  });
}

// a little function to check to see if a character is alphabet letter
// this uses regex (the /[a-zA-Z]/ part) but don't worry about it
// you can learn that later and don't need it too frequently
function isLetter(letter) {}

// show the loading spinner when needed
function setLoading(isLoading) {}

// takes an array of letters (like ['E', 'L', 'I', 'T', 'E']) and creates
// an object out of it (like {E: 2, L: 1, T: 1}) so we can use that to
// make sure we get the correct amount of letters marked close instead
// of just wrong or correct
function makeMap(array) {}

init();
