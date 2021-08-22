const todoList = document.querySelector('.todo-list')
const inputTodo = document.querySelector('.input-todo')
const insertButton = document.querySelector('button')
const toolbarInProgressCheckBox = document.querySelector('.input-in-progress')
const inProgressFilter = document.querySelector('.progress-checkbox')
const finishedFilter = document.querySelector('.finished-checkbox')
const allFilter = document.querySelector('.all-checkbox')
const errorMessage = document.querySelector('.error-message')

const db = window.localStorage


if (!db.getItem('inProgressFilter')) {
    setDefaultFilters(db);
}
else {
    setSavedFilters(db, inProgressFilter, finishedFilter, allFilter)
}

inProgressFilter.onchange = function () {

    db.setItem('inProgressFilter', this.checked)
    refresh(todoList, db)
}

finishedFilter.onchange = function () {
    db.setItem('finishedFilter', this.checked)
    refresh(todoList, db)
}

allFilter.onchange = function () {
    db.setItem('allFilter', this.checked)
    refresh(todoList, db)
}




inputTodo.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        insertButton.click()
    }
})


insertButton.onclick = () => {

    if (inputTodo.value === '') {
        errorMessage.style.display = 'initial'
        setTimeout(() => {
            errorMessage.style.display = 'none'
        }, 3000)

        return;
    }
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