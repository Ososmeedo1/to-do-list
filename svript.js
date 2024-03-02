let allTodos = [];

const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const tbody = document.getElementById("tbody");
const submit = document.getElementById("submit");
const update = document.getElementById("updateBtn");

if (localStorage.getItem("todos") != null) {
  allTodos = JSON.parse(localStorage.getItem("todos"));
  display();
}

function add() {
if(titleInput.value == "") {
  swal({
    icon: "error",
    title: "Please Enter Your Title",
  });
}
else if(contentInput.value == "") {
  swal({
    icon: "error",
    title: "Please Enter Your Content",
  });
}
else {
  swal({
    icon: "success",
  });
  let todo = {
    title: titleInput.value,
    content: contentInput.value
  };

  allTodos.push(todo);
  display();
  clear();
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

  
}

function display() {
  let cartoona = "";

  for (let i = 0; i < allTodos.length; i++) {
    cartoona += `
    <tr>
          <td>${allTodos[i].title}</td>
          <td>${allTodos[i].content}</td>
          <td><i class="fa-solid fa-trash text-danger" onclick="deleteTodo(${i})"></i></td>
          <td><i class="fa-solid fa-edit text-success" onclick="preUpdate(${i})" id="update"></i></td>
    </tr>
    `;
  }

  tbody.innerHTML = cartoona;
}

function clear() {
  titleInput.value = "";
  contentInput.value = "";
}

function deleteTodo(index) {
  allTodos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(allTodos));
  display();
}

let updatedIndex;

function preUpdate(index) {
  updatedIndex = index;
  titleInput.value = allTodos[index].title;
  contentInput.value = allTodos[index].content;
  submit.classList.add("d-none");
  update.classList.remove("d-none");
}


function updateTodo() {
  let updatedTodo = {
    title : titleInput.value,
    content : contentInput.value,
  }

  allTodos.splice(updatedIndex, 1, updatedTodo);
  display();
  update.classList.add("d-none");
  submit.classList.remove("d-none");
  clear();
}


function searchByTitle(term) {
  let cartoona = "";
  for (let i = 0; i < allTodos.length; i++) {
    if(allTodos[i].title.toLowerCase().includes(term.toLowerCase())) {
      cartoona += `
      <tr>
          <td>${allTodos[i].title}</td>
          <td>${allTodos[i].content}</td>
          <td><i class="fa-solid fa-trash text-danger" onclick="deleteTodo(${i})"></i></td>
          <td><i class="fa-solid fa-edit text-success" onclick="preUpdate(${i})" id="update"></i></td>
      </tr>
      `
    }
    
  }

  tbody.innerHTML = cartoona;
}

function searchByContent(term) {
  let cartoona = "";
  for (let i = 0; i < allTodos.length; i++) {
    if (allTodos[i].content.toLowerCase().includes(term.toLowerCase())) {
      cartoona += `
      <tr>
          <td>${allTodos[i].title}</td>
          <td>${allTodos[i].content}</td>
          <td><i class="fa-solid fa-trash text-danger" onclick="deleteTodo(${i})"></i></td>
          <td><i class="fa-solid fa-edit text-success" onclick="preUpdate(${i})" id="update"></i></td>
      </tr>
      `
    }
    
  }

  tbody.innerHTML = cartoona;
}
