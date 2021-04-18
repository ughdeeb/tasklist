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
  //Remove task events
  taskList.addEventListener("click", removeTask);
  //Clear task event button
  clearBtn.addEventListener("click", clearTasks);
  //Filter Tasks
  filter.addEventListener("keyup", filterTasks);
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
  //Clear input
  taskInput.value = " ";

  e.PreventDefault();
}

// ***TASK REMOVING FUNCTIONALITY*** //

function removeTask(e) {
  //Target the specific delete-item buttom using event delegation
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure broooooo?")) {
      e.target.parentElement.parentElement.remove();
    }
  }

  e.PreventDefault();
}

// ***TASK CLEARING FUNCTIONALITY*** //
function clearTasks(e) {
  //innerHTML way
  // taskList.innerHTML = "";
  //remove child way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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
