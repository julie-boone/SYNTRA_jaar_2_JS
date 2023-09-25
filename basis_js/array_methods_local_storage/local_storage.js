const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value; //this staat voor het element waar we al inzitten (door de event listener)
  const item = {
    text, //shorthand voor text: text (werkt bij variables)
    done: false,
  };
  items.push(item);
  localStorage.setItem("item", JSON.stringify(items));
  populateList(items, itemsList);
}

function populateList(plates = [], platesList) {
  //default in JS, als plates leeg is, maak er een lege array van
  platesList.innerHTML = plates
    .map(function (plate, i) {
      const isChecked = plate.done ? "checked" : "";
      // let isChecked
      // if (plate.done === false) {
      //     isChecked = "checked"
      // }
      return `
              <li>
                  <input type="checkbox" data-index=${i} id="item${i}" ${isChecked} />
                  <label for="item${i}">${plate.text}</label>
              </li>
          `;
    })
    .join("");
}

addItems.addEventListener("submit", addItem);

populateList(items, itemsList);
