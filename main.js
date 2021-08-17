const todoList = document.querySelector('.todo-list')
const inputTodo = document.querySelector('.input-todo')
const insertButton = document.querySelector('button')
const toolbarInProgressCheckBox = document.querySelector('.input-in-progress')

toolbarInProgressCheckBox.checked = true
const db = window.localStorage
// const todos = db.getItem('todos') ? JSON.parse(db.getItem('todos')) : []


inputTodo.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        insertButton.click()
    }
})


insertButton.onclick = () => {
    const todo = {
        key: Math.random(1, 100),
        content: inputTodo.value,
        inProgress: toolbarInProgressCheckBox.checked,
        hasFinished: false,
        createdAt: new Date().getTime()
    }

    inputTodo.value = ''


    insertTodo(db, todoList, todo)
}

loadTodos(db, todoList)