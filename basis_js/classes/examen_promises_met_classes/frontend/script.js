import todoclient from "./todoclient.js";
import Todo from "./Todo.js";

window.addEventListener("DOMContentLoaded", () => {
  const newTaskInput = document.getElementById("new-task");
  const newTaskSubmit = document.getElementById("add-task");
  newTaskSubmit.addEventListener("", () => {
    todoclient.create(new Todo(newTaskInput.value).get());
  });
});
