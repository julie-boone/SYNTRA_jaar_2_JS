/*
You are building a simple task management tool. Users should be able to:

Add new tasks.
Mark tasks as completed.
Filter tasks to view either all, completed, or pending tasks.
See the number of tasks completed and the average length of the task descriptions.
*/

const tasks = [];

function addTask() {
  const newTaskInput = document.querySelector("#taskInput");
  const newTaskName = newTaskInput.value;
  const newTask = { index: tasks.length, name: newTaskName, checked: false };
  newTaskInput.value = "";
  tasks.push(newTask);
  displayTasks();
  updateInsights();
}

function check(e, nr) {
  if (e.target.checked === true) {
    tasks[nr].checked = true;
  } else {
    tasks[nr].checked = false;
  }
}

function displayTasks() {
  const filterInput = document.querySelector("#taskFilter").value;
  let taskHtml;
  switch (filterInput) {
    case "completed":
      const completedTasks = tasks.filter((cv) => {
        return cv.checked === true;
      });
      tasksToShow = completedTasks;
      break;
    case "pending":
      const pendingTasks = tasks.filter((cv) => {
        return cv.checked === false;
      });
      tasksToShow = pendingTasks;
      break;
    case "all":
      const allTasks = tasks;
      tasksToShow = allTasks;
      break;
  }

  taskList = document.querySelector("#taskList");

  taskHtml = tasksToShow
    .map((task) => {
      const checkmark = task.checked === true ? "checked" : "";
      return `
      <li>
        <span>${task.name}</span>
        <input type="checkbox" onchange="check(event, '${task.index}')" ${checkmark}/>
      </li>
    `;
    })
    .join("");

  taskList.innerHTML = taskHtml;
}

function updateInsights() {
  const tasksCompleted = document.querySelector("#completedCount");
  const completedTasks = tasks.filter((task) => (task.checked = true));
  tasksCompleted.innerText = completedTasks.length;

  const avgTaskLength = document.querySelector("#avgTaskLength");
  const totalLength = tasks.reduce((acc, { name }) => acc + name.length, 0);
  console.log(totalLength);
  const avlength = totalLength / tasks.length;
  avgTaskLength.innerText = avlength.toFixed(2);
}

// problemen: avgtasklength werkt nog niet + nieuwe tasks zijn unchecked, oude automatisch checked
