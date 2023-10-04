//items-array eigenlijk beter een object van maken, met text en done, zie code Simon

const itemsList = document.querySelector(".plates");
let items = [];

function removeToDo(event) {
  const article = event.target.parentElement;
  article.remove();
  const item = event.target.previousElementSibling.innerText;
  items = items.filter((cv) => {
    return cv != item;
  });
  window.localStorage.setItem("items", JSON.stringify(items));
}

function loadPage() {
  items = JSON.parse(window.localStorage.getItem("items")) || [];
  console.log(items);
  const localStorageHTML = items.map((cv) => {
    return `<li> 
    <input type="checkbox" name="" id="">
    <label for="">${cv}</label>
    <button onclick="removeToDo(event)">🌮</button>
    </li>`;
  });
  itemsList.innerHTML = localStorageHTML.join("");
}

function onSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("[name=item]"); //attribute selector
  const value = input.value;
  items.push(value);
  window.localStorage.setItem("items", JSON.stringify(items));
  const valueHTML = `<li> 
  <input type="checkbox" name="" id="">
  <label for="">${input.value}</label>
  <button onclick="removeToDo(event)">🌮</button>
  </li>`;
  itemsList.insertAdjacentHTML("beforeend", valueHTML);
  this.reset(); //zorgt ervoor dat je inputveld terug leeg is
}

window.addEventListener("load", function () {
  loadPage();
  const addItems = document.querySelector(".add-items");
  addItems.addEventListener("submit", onSubmit);
});
