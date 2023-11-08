const headersList = {
  Accept: "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "X-API-Key": "mthxEJ3ZlK7T7d+JtlJs7g==RBod17v8d1tY4p77",
};

const cardNumber = document.getElementById("card-number");

function debounce(fn, delay = 300) {
  // debounce-functie moet je niet vanbuiten leren
  // delay = 300 is een default argument, dus als je een andere waarde meegeeft bij het callen van de functie
  // wordt die gebruikt, en anders de default waarde
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args); //"elk argument"
    }, delay);
  };
}

function checkNumber() {
  cardNumber.classList = "";
  if (
    cardNumber.value.length >= 16 &&
    cardNumber.value[0].match(/[A-Z]/) &&
    cardNumber.value[1].match(/[A-Z]/)
  ) {
    console.log(cardNumber.value);
    const input = cardNumber.value;
    fetch(`https://api.api-ninjas.com/v1/iban?iban=${input}`, {
      method: "GET",
      headers: headersList,
    })
      .then((res) => res.json())
      .then((res) => showResult(res));
  } else {
    console.log("wrong format");
    cardNumber.classList.add("red");
  }
}

function showResult(res) {
  if (res.valid) {
    cardNumber.classList.add("green");
  } else {
    cardNumber.classList.add("red");
  }
}

cardNumber.addEventListener("keyup", debounce(checkNumber, 300));

//BE89736002737585
