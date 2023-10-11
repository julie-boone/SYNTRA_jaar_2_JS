const tasks = []
let taskId = 0; // A simple way to ensure unique IDs
function addTask() {​
  const taskDescription = document.getElementById('taskInput').value;
  if (taskDescription) {​
    tasks.push({​
      id: taskId++,
      description: taskDescription,
      status: 'pending',
    }​);
    document.getElementById('taskInput').value = ''; // Clear the input field
    displayTasks();
    updateInsights();
  }​
}​
function toggleTaskStatus(taskId) {​
  const task = tasks.find((t) => t.id === taskId);
  if (task) {​
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    displayTasks();
    updateInsights();
  }​
}​
function displayTasks() {​
  const filterValue = document.getElementById('taskFilter').value;
  const filteredTasks = tasks.filter(
    (task) => filterValue === 'all' || task.status === filterValue
  );
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear previous tasks
  filteredTasks.forEach((task) => {​
    const listItem = document.createElement('li');
    listItem.textContent = task.description;
    listItem.style.textDecoration =
      task.status === 'completed' ? 'line-through' : 'none';
    listItem.onclick = () => toggleTaskStatus(task.id);
    taskList.appendChild(listItem);
  }​);
}​
function updateInsights() {​
  const completedTasks = tasks.filter((task) => task.status === 'completed');
  const avgTaskLength =
    tasks.reduce((acc, task) => acc + task.description.length, 0) /
    tasks.length;
  document.getElementById('completedCount').textContent = completedTasks.length;
  document.getElementById('avgTaskLength').textContent =
    avgTaskLength.toFixed(2);
}​
    
    
  
  

