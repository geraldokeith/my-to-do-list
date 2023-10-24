const inputBox = document.getElementById('inputText');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
let todoCount = document.getElementById('todoCount');
count = 0;
todoCount.innerHTML = count;
let editTodo = null;

const updateLocalStorage = () => {
    const todos = Array.from(todoList.children).map(todo => {
        return {
            text: todo.querySelector('p').innerHTML,
            done: todo.classList.contains('checked')
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
};

const loadFromLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = todo.text;
        li.appendChild(p);

        if (todo.done) {
            li.classList.add('checked');
        }
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");

        const doneBtn = document.createElement("button");
        doneBtn.innerText = "Done";
        doneBtn.classList.add("btn", "doneBtn");

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        li.appendChild(doneBtn);

        todoList.appendChild(li);
    });
    count = todos.length;
    todoCount.innerHTML = count;
};


const addtodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("Write Something");
        return false;
    }
    if (addBtn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    }

    else {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);
        todoCount.innerHTML = count + 1;
        count = count + 1;
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        const doneBtn = document.createElement("button");
        doneBtn.innerText = "Done";
        doneBtn.classList.add("btn", "doneBtn");
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        li.appendChild(doneBtn)
        todoList.appendChild(li);
        inputBox.value = "";
    }
    updateLocalStorage();
}



const updatetodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
        todoCount.innerHTML = count - 1;
        count = count - 1;
    }
    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
    if (e.target.innerHTML === "Done") {
        e.target.parentElement.classList.toggle("checked");
    }
    updatetodo();
    updateLocalStorage();
}
loadFromLocalStorage();
todoList.addEventListener("click", updatetodo);
