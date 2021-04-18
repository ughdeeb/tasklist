//Define UI variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Function to load all event listners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task events
  form.addEventListener("submit", addTask);
  //Remove task events
  taskList.addEventListener("click", removeTask);
  //Clear task event button
  clearBtn.addEventListener("click", clearTasks);
  //Filter Tasks
  filter.addEventListener("keyup", filterTasks);
}

// ***TASK GETTING FROM LOCAL STORAGE FUNCTIONALITY*** //
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //Create li to be added to list of tasks
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item";
    //Create a text node and append to li
    li.appendChild(document.createTextNode(task));
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
  });
}

// ***TASK ADDING FUNCTIONALITY*** //
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
  //Store in local storage
  storeTaskInLocalStorage(taskInput.value);
  //Clear input
  taskInput.value = " ";

  e.PreventDefault();
}

// ***TASK STORING FUNCTIONALITY*** //
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// ***TASK REMOVING FUNCTIONALITY*** //

function removeTask(e) {
  //Target the specific delete-item buttom using event delegation
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure broooooo?")) {
      e.target.parentElement.parentElement.remove();
      //Remove from Local Srtofae
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

  e.PreventDefault();
}

// ***TASK REMOVING FROM LOCAL STORAGE FUNCTIONALITY*** //
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ***TASK CLEARING FUNCTIONALITY*** //
function clearTasks(e) {
  //innerHTML way
  // taskList.innerHTML = "";
  //remove child way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //Clear from Local Storage
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}
// ***TASK CLEARING FUNCTIONALITY*** //

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
