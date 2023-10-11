window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const textField = document.querySelector(".words");

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";

recognition.addEventListener("result", (e) => {
  if (e.results[0].isFinal) {
    let spoken = e.results[0][0].transcript;

    const spokenTextWithEmoji = spoken
      .replace(/sushi|cold fish/gi, "🍣") //gi betekent global (dus over de hele tekst) en case insensitive, dus hoofdletters irrelevant
      .replace(/skull/gi, "💀");

    // const spokenArray = spoken.split(" ");
    // let spokenWithEmoji;

    // if (spokenArray.includes("sushi")) {
    //   spokenWithEmoji = spokenArray.map((word) => {
    //     let emoji = word;
    //     if (word === "sushi") {
    //       emoji = "🍣";
    //     }
    //     return emoji;
    //   });
    // } else {
    //   spokenWithEmoji = spokenArray;
    // }
    // let spokenTextWithEmoji = spokenWithEmoji.join(" ");

    textField.innerHTML += `<p>${spokenTextWithEmoji}</p>`;
  }
});

recognition.addEventListener("end", recognition.start);
//dient om de microfoon af te zetten als je het venster sluit

recognition.start();

//if .includes() uithalen
//werken met RegEx
