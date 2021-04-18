//Define UI variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Function to load all event listners
loadEventListeners();

function loadEventListeners() {
  //Add task events
  form.addEventListener("submit", addTask);
}

//Add task function
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task");
  }
  //Create li to be added to list of tasks
  const li = document.createElement("li");
  //Add class
  li.className = "collection-item";
  //Create a text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link = document.createElement("a");
  //Add class
  link.className = "delete-item secondary-content";
  //Add icon html
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);
  //Clear input
  taskInput.value = " ";

  e.PreventDefault();
}
