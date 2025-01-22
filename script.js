// select the form, input field, and the list
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

//ad an even listener to handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    const task = input.value.trim();
    if(task) {
        addTask(task);
        input.value = '';
    }
});

function addTask(task) {
    // create a new list item
    const li = document.createElement('li');
    li.textContent = task;

    //create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.backgroundColor = '#dc3545';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '4px';
    deleteBtn.style.cursor = 'pointer';

    //Append the delete button to the list item
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    deleteBtn.addEventListener('click', () => {
        todoList.removeChild(li);
        saveTasks();
    });

    saveTasks();
}

function saveTasks(){
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach((li) => {
        tasks.push(li.textContent.replace('Delete', '').trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        addTask(task);
    });
}

document.addEventListener('DOMContentLoaded', loadTasks);