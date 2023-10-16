// https://api.chucknorris.io/
fetchCategories().then(mapCategoryToHTML).then(showCategoriesOnPage);

function fetchCategories() {
  return fetch("https://api.chucknorris.io/jokes/categories").then((res) =>
    res.json()
  );
}

function getRandomJoke(category) {
  return fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
    .then((res) => res.json())
    .then(showRandomJokeOnThePage);
}

function showRandomJokeOnThePage(joke) {
  const jokeElem = document.getElementById("randomJoke");
  jokeElem.innerText = joke.value;
}

function mapCategoryToHTML(categoryArray) {
  return categoryArray.map((category) => {
    const li = document.createElement("li");
    li.innerText = category;
    li.style = "cursor:pointer";
    li.onclick = () => getRandomJoke(category);
    return li;
  });
}

function showCategoriesOnPage(htmlArray) {
  const categories = document.getElementById("categories");
  for (const elem of htmlArray) {
    categories.appendChild(elem);
  }
}
