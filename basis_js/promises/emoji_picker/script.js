const ENDPOINT = "https://api.api-ninjas.com/v1/emoji";

let offset = 0;

const headersList = {
  Accept: "*/*",
  "content-type": "application/json",
  "X-API-Key": "mthxEJ3ZlK7T7d+JtlJs7g==RBod17v8d1tY4p77",
};

window.addEventListener("DOMContentLoaded", () => {
  const previousBtn = document.getElementById("previous");
  const nextBtn = document.getElementById("next");
  const emojiGrid = document.querySelector("#emojis");

  function fetchEmojis() {
    fetch(`${ENDPOINT}?offset=${offset}&group=animals_nature`, {
      method: "GET",
      headers: headersList,
    })
      .then((res) => res.json())
      .then(showEmojis);
  }

  function showEmojis(res) {
    const emojiArray = Array.from(res);
    emojiArray.forEach((emoji) => {
      emojiGrid.innerHTML += emoji.character;
    });
  }

  function showPrevious() {
    if (offset > 29) {
      emojiGrid.innerHTML = "";
      offset -= 30;
      fetchEmojis();
    }
  }

  function showNext() {
    emojiGrid.innerHTML = "";
    offset += 30;
    fetchEmojis();
  }

  previousBtn.addEventListener("click", showPrevious);
  nextBtn.addEventListener("click", showNext);

  fetchEmojis();
});
