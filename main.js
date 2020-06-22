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
    inputDOM.innerHTML = ''
    //show success
    // showAlert("success");
  } else {
    //show alert
    // showAlert("fail");
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

//creates ui
function createUI(inputValue) {
  //create element
  const li = document.createElement("li");
  //add class to li
  li.classList.add("list-group-item");
  //add content inside li
  li.innerText = inputValue;
  //add to DOM
  display.appendChild(li);
  // // removeAlert()
}

//display items from local storage
function getItemsFromLS() {
  const items = getLS();
  items.forEach((items) => {
    createUI(items)
  });
}



//alert
function showAlert(err) {
  if (err === "success") {
    //create alert div
    const div = document.createElement("div");
    //add text
    // div.append(document.createTextNode("Item has been added successfully"));
    //add class
    div.classList.add("alert", "alert-success");

    //add to before
    alertDOM.appendChild(div);
  } else {
    //create alert div
    const div = document.createElement("div");
    //add text
    div.textContent = "You need to type something!";
    //add class
    div.classList.add("alert", "alert-danger");

    //add to before
    alertDOM.append(div);
  }
}
//fix this later

// function removeAlert() {
//   setTimeout(() => {
//     const alert = document.querySelector(".alert");
//     if (alert.classList.contains("alert-success")) {
//       alert.classList.remove('alert');
//       alert.classList.remove('alert-success');
//     }
//   }, 2000);
// }


btnSubmit.addEventListener("click", addTodo);
addTodo();

document.addEventListener('DOMContentLoaded', () => {
  getItemsFromLS()
})
