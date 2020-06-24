//DOM
const inputDOM = document.getElementById("new-todo-input");
const btnSubmit = document.getElementById("submit-new-todo-btn");
const display = document.getElementById("todo-list-container");
const alertDOM = document.getElementById("alert-div");

//add todo to dom
function addTodo(event) {
  //store input value
  const inputValue = inputDOM.value;

  if (inputValue !== "") {
    //add to local storage
    addToLS(inputValue);
    //create ui
    createUI(inputValue);
    //clear input
    clearInput();
    //show success
    showAlert("success", "Successfully added");
  } else {
    //show alert
    showAlert("fail", "You did not add any item. Please type again");
  }
}

// add to local storage
function addToLS(value) {
  let items;
  if (localStorage.getItem("todos") === null) {
    items = [];
    items.push(value);
    localStorage.setItem("todos", JSON.stringify(items));
  } else {
    items = JSON.parse(localStorage.getItem("todos"));
    items.push(value);
    localStorage.setItem("todos", JSON.stringify(items));
  }
}

//get local strage
function getLS() {
  let items;
  if (localStorage.getItem("todos") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("todos"));
  }

  return items;
}

//creates UI
function createUI(inputValue) {
  //create element
  const li = document.createElement("li");
  //add class to li
  li.classList.add("list-group-item");
  //add content inside li
  li.innerText = inputValue;
  //add to DOM
  display.appendChild(li);
}

//display items from local storage
function getItemsFromLS() {
  const items = getLS();
  items.forEach((items) => {
    createUI(items);
  });
}

//creates alert div and message
function showAlert(err, msg) {
  if (err === "success") {
    removeAlert();
    //create alert div
    const div = document.createElement("div");
    //add text
    div.append(document.createTextNode(msg));
    //add class
    div.classList.add("alert", "alert-success");

    //add to before
    alertDOM.appendChild(div);
  } else {
    removeAlert();
    //create alert div
    const div = document.createElement("div");
    //add text
    div.append(document.createTextNode(msg));
    //add class
    div.classList.add("alert", "alert-danger");

    //add to before
    alertDOM.append(div);
  }
  //remove alert after 1
  setTimeout(() => {
    removeAlert();
  }, 1000);
}
//removes the alert from DOM
function removeAlert() {
  const alert = document.querySelector(".alert");
  if (alert) {
    alert.remove();
  }
}

function clearInput() {
  inputDOM.value = "";
}

//removing elements from the DOM
function removeFromDOM(e) {
  const target = e.target;
  if (target.classList.contains("list-group-item")) {
    if (confirm("Are you sure you want to delete this")) {
      //remove item from DOM
      target.remove();
      removeFromLS(target);
    } else {
      //reload page
      window.location.reload();
    }
  }
}
//removes items from local storage
function removeFromLS(item) {
  const itemName = item.innerText;
  if (localStorage.getItem("todos") !== null) {
    const items = JSON.parse(localStorage.getItem("todos"));
    const newItems = items.filter((item) => item !== itemName);
    localStorage.setItem("todos", JSON.stringify(newItems));
  }
}

btnSubmit.addEventListener("click", addTodo);

display.addEventListener("click", removeFromDOM);

document.addEventListener("DOMContentLoaded", () => {
  getItemsFromLS();
});
