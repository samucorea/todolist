const todoList = document.querySelector('.todo-list')
const inputTodo = document.querySelector('.input-todo')
const insertButton = document.querySelector('button')
const toolbarInProgressCheckBox = document.querySelector('.input-in-progress')

toolbarInProgressCheckBox.checked = true
const db = window.localStorage
const todos = db.getItem('todos') ? JSON.parse(db.getItem('todos')) : []


const parentNode = document.querySelector('.todo-list')


insertButton.onclick = () => {
    const todo = {
        key: Math.random(1, 100),
        content: inputTodo.value,
        inProgress: toolbarInProgressCheckBox.checked,
        hasFinished: false
    }

    todos.unshift(JSON.stringify(todo))
    console.log(todos)

    insertTodos(db, todos)
}

loadTodos(db, todoList)