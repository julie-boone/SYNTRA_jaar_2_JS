// opdracht: minstens 2 API-calls, dus één doorklik

const characterList = document.getElementById("character_list");
const storiesAbout = document.getElementById("stories_about");
const storiesList = document.getElementById("stories_list");
let charactersArray;

fetchCharacters()
  .then((res) => res.json())
  .then(printCharacters);

function fetchCharacters() {
  return fetch(
    "http://gateway.marvel.com/v1/public/characters?apikey=941031dc21b50276e43d6f1f463eea23"
  );
}

function printCharacters(res) {
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
