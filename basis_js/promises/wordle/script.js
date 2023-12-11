const ANSWER_LENGTH = 5;
const ROUNDS = 6;
const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".spiral");

// the state for the app
let currentGuess = "";
let line = 0;
let wordOTDay;
let keepGuessing = true;

async function init() {
  // nab the word of the day
  loadingDiv.classList.add("hidden");
  wordOTDay = await fetch("https://words.dev-apis.com/word-of-the-day")
    .then((res) => res.json())
    .then((res) => res.word);
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
  if (currentGuess.length < ANSWER_LENGTH) {
    return;
  }

  checkWord(currentGuess).then((answer) => {
    if (answer === false) {
      alert("This word is not in our dictionary. Try again.");
      return;
    } else {
      colorLetters();
    }
  });
}

function colorLetters() {
  const correctWord = Array.from(wordOTDay);
  keepGuessing = false;
  const correctLetters = Array.from(currentGuess).map((letter, i) => {
    if (letter === correctWord[i]) {
      correctWord[i] = "found";
      return "correct";
    } else {
      return letter;
    }
  });
  const resultsArray = correctLetters.map((letter) => {
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
    letters[line * ANSWER_LENGTH + i].classList.add(resultsArray[i]);
  }

  if (!keepGuessing) {
    const winningWord = document.querySelector("body");
    winningWord.classList.add("winner");
    const infoBar = document.querySelector(".info-bar");
    const winner = document.createElement("p");
    winner.innerText = `Congratulations! You found the word of the day: ${wordOTDay.toUpperCase()}.`;
    infoBar.appendChild(winner);

    return;
  }

  if (line < ROUNDS - 1) {
    line++;
  } else {
    keepGuessing = false;
    const infoBar = document.querySelector(".info-bar");
    const loser = document.createElement("p");
    loser.innerText = `No more turns! The word you are looking for is ${wordOTDay.toUpperCase()}.`;
    infoBar.appendChild(loser);
  }

  currentGuess = "";
}

// user hits backspace, if the the length of the string is 0 then do
// nothing
function backspace() {
  currentGuess = currentGuess.substring(0, currentGuess.length - 1);
  letters[line * ANSWER_LENGTH + currentGuess.length].innerText = "";
}

// a little function to check to see if a character is alphabet letter
function isLetter(letter) {
  re = /^[a-zA-Z]$/;
  if (re.test(letter)) {
    return true;
  } else {
    return false;
  }
}

async function checkWord(currentGuess) {
  loadingDiv.classList.remove("hidden");
  const res = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({ word: currentGuess }),
  }).then((res) => res.json());
  loadingDiv.classList.add("hidden");
  return res.validWord;
}

init();
