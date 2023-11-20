// opdracht: minstens 2 API-calls, dus één doorklik
// pagination met pijltjes vorige/volgende, met limit & offset
// eventueel cijfertjes met pagina's
// eventueel ook limit laten instellen met knopjes

// nog te doen: firstPage en lastPage + alles via JS in HTML zetten

const characterList = document.getElementById("character_list");
const storiesAbout = document.getElementById("stories_about");
const storiesList = document.getElementById("stories_list");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const limitButton = document.querySelector("#limit");
const pagination = document.querySelector("#pagination");
const first = document.querySelector("#first");
const last = document.querySelector("#last");

let charactersArray;
let totalCharacters;

let limit = 9;
let offset = 0;

function init() {
  fetchCharacters()
    .then((res) => res.json())
    .then(printCharacters);
}

function fetchCharacters() {
  return fetch(
    `http://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}&apikey=941031dc21b50276e43d6f1f463eea23`
  );
}

function printCharacters(res) {
  totalCharacters = res.data.total;
  showPagination();
  characterList.innerHTML = "";
  charactersArray = Array.from(res.data.results);
  charactersArray.forEach(
    (cv) =>
      (characterList.innerHTML += `<li onclick="moreInfo('${cv.id}', '${cv.name}')">${cv.name}</li>`)
  );
}

function moreInfo(id, name) {
  storiesAbout.innerText = `Stories about ${name}`;
  fetch(
    `http://gateway.marvel.com/v1/public/characters/${id}/stories?apikey=941031dc21b50276e43d6f1f463eea23`
  )
    .then((res) => res.json())
    .then(logStories);
}

function logStories(res) {
  storiesList.innerHTML = "";
  storiesArray = Array.from(res.data.results);
  storiesArray.forEach(
    (cv) =>
      (storiesList.innerHTML += `<li id="${cv.id}" class="notCreatedBy" onclick="createdBy('${cv.id}')">${cv.title}</li>`)
  );
}

function createdBy(id) {
  fetch(
    `http://gateway.marvel.com/v1/public/stories/${id}?apikey=941031dc21b50276e43d6f1f463eea23`
  )
    .then((res) => res.json())
    .then(showCreator);
}

function showCreator(res) {
  const story = res.data.results[0].id;
  const listItem = document.getElementById(`${story}`);
  const creatorsArray = Array.from(res.data.results[0].creators.items);
  let creatorsNames;
  if (creatorsArray.length === 0) {
    creatorsNames = "unknown";
  } else {
    creatorsNames = creatorsArray.reduce((acc, cv, i) => {
      if (i === creatorsArray.length - 2) {
        return acc + `${cv.name} and `;
      } else if (i < creatorsArray.length - 1) {
        return acc + `${cv.name}, `;
      } else {
        return acc + cv.name;
      }
    }, "");
  }
  if (listItem.classList.contains("notCreatedBy")) {
    listItem.innerHTML += `<span> (created by ${creatorsNames})</span>`;
    listItem.classList.replace("notCreatedBy", "createdBy");
  } else {
    listItem.removeChild(listItem.firstElementChild);
    listItem.classList.replace("createdBy", "notCreatedBy");
  }
}

function getNext() {
  if (offset + limit <= totalCharacters) {
    next.classList = offset + limit;
    offset += limit;
  } else {
    return;
  }
  init();
}

function getPrevious() {
  if (offset - limit >= 0) {
    next.classList = offset - limit;
    offset -= limit;
  } else {
    return;
  }

  init();
}

function setLimit(e) {
  if (e.target.matches("button")) {
    limit = e.target.innerHTML;
    init();
  }
}

function showPagination() {
  pagination.innerHTML = "";
  if (offset === 0) {
    for (let i = 1; i <= 3; i++) {
      const page = document.createElement("button");
      page.innerHTML = offset / limit + i;
      pagination.appendChild(page);
    }
  } else if (offset + limit > totalCharacters) {
    for (let i = 1; i <= 3; i++) {
      const page = document.createElement("button");
      page.innerHTML = offset / limit + i - 2;
      pagination.appendChild(page);
    }
  } else {
    for (let i = 1; i <= 3; i++) {
      const page = document.createElement("button");
      page.innerHTML = offset / limit + i - 1;
      pagination.appendChild(page);
    }
  }
}

function jumpToPage(e) {
  if (e.target.matches("button")) {
    offset = (e.target.innerHTML - 1) * limit;
  }
  init();
}

function firstPage() {
  offset = 0;
  init();
}

function lastPage() {
  const numberOfPages = Math.ceil(totalCharacters / limit);
  offset = limit * numberOfPages;
  init();
}

previous.addEventListener("click", getPrevious);
next.addEventListener("click", getNext);
limitButton.addEventListener("click", setLimit);
pagination.addEventListener("click", jumpToPage);
first.addEventListener("click", firstPage);
last.addEventListener("click", lastPage);

init();
