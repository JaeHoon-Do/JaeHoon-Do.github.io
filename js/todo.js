const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input")
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(e) {
    const parentList = e.target.parentElement;
    parentList.remove();
    toDos = toDos.filter((toDo) => {
        return toDo.id != parentList.id
    });
    saveToDos();
}

function paintToDo(newTodo) {
    const list = document.createElement("li");
    list.id = newTodo.id;
    const span = document.createElement("span");
    const button = document.createElement("button")
    list.appendChild(span);
    span.innerText = newTodo.text;
    button.innerText = "💣";
    button.addEventListener("click", deleteToDo);
    list.appendChild(button);
    toDoList.appendChild(list);
}

function handleTodoSubmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now()
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleTodoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}