const inputTodo = document.querySelector('.input-todo')
const insertButton = document.querySelector('button')
const toolbarInProgressCheckBox = document.querySelector('input-in-progress')
const db = window.localStorage

const parentNode = document.querySelector('.todo-list')


insertButton.onclick = () => {
    const todo = {
        content: inputTodo.value,
        inProgress: toolbarInProgressCheckBox.checked,
        hasFinished: false
    }

    insertTodo(db, todo)
}