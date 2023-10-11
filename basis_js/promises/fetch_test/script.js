const paragraph = document.querySelector("#categories");
const joke = document.querySelector("#joke");

fetch("https://api.chucknorris.io/jokes/categories")
  .then((res) => res.json())
  .then((res) => {
    for (let i = 0; i < res.length; i++) {
      paragraph.insertAdjacentHTML(
        "beforeend",
        `<button onclick="getJoke(event)">${res[i]}</button><br>`
      );
    }
  })
  .catch((err) => alert(err));

function getJoke(category) {
  const urlCat = `https://api.chucknorris.io/jokes/random?category=${category.target.innerHTML}`;
  fetch(urlCat)
    .then((res) => res.json())
    .then((res) => {
      joke.innerText = res.value;
    });
}
