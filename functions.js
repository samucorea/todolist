

function refresh(parentNode, db, tempTodo = null) {
    parentNode.innerHTML = ''
    loadTodos(db, parentNode)
}

function insertTodo(db, parentNode, todo) {
    db.setItem(todo.key, JSON.stringify(todo))


    refresh(parentNode, db)

}

function deleteTodo(db, parentNode, todo) {

    db.removeItem(todo.key)
    refresh(parentNode, db)
}

function updateTodo(db, todoUpdated) {
    db.setItem(todoUpdated.key, JSON.stringify(todoUpdated))

    refresh(todoList, db)
}

function handleEdit(todo, divContent, editInput, editButton) {

    const overlay = document.querySelector('.overlay')
    divContent.textContent = ''
    editInput.value = todo.content

    divContent.append(editInput, editButton)

    divContent.classList.add('editing-content')
    overlay.style.display = 'initial'
    editInput.focus();

    editInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            editButton.click()
        }
    })

    document.addEventListener('keydown', e => {

        if (e.key === 'Escape') {
            divContent.innerHTML = ''
            divContent.textContent = todo.content
            divContent.classList.remove('editing-content')
            overlay.style.display = 'none'
        }

    })

    editButton.onclick = e => {
        todo.content = editInput.value
        divContent.classList.remove('editing-content')
        updateTodo(db, todo)
        overlay.style.display = 'none'
    }
}

function createTodo(parentNode, db, todo) {
    const divTodo = document.createElement('div')
    const divContent = document.createElement('div')
    const divOptions = document.createElement('div')

    const spanDelete = document.createElement('span')
    const spanEdit = document.createElement('span')
    const spanMove = document.createElement('span')
    const label = document.createElement('label')
    const editInput = document.createElement('input')
    const checkbox = document.createElement('input')
    const editButton = document.createElement('button')

    editInput.type = 'text'
    editInput.maxLength = inputTodo.maxLength
    checkbox.type = 'checkbox'
    checkbox.checked = todo.inProgress


    editButton.textContent = 'Edit'
    divContent.textContent = todo.content
    spanDelete.textContent = 'delete_forever'
    spanEdit.textContent = 'edit'
    spanMove.textContent = 'open_with'
    label.textContent = 'P'

    divTodo.classList.add('todo')
    divContent.classList.add('content')
    divOptions.classList.add('options')
    spanDelete.classList.add('material-icons', 'delete-icon', 'icon')
    spanEdit.classList.add('material-icons', 'edit-icon', 'icon');
    spanMove.classList.add('material-icons', 'move-icon')
    editButton.classList.add('edit-button')
    editInput.classList.add('edit-input')

    spanDelete.onclick = () => deleteTodo(db, parentNode, todo)
    spanEdit.onclick = () => handleEdit(todo, divContent, editInput, editButton)

    checkbox.onchange = e => {
        todo.inProgress = e.target.checked
        updateTodo(db, todo)
    }

    divTodo.append(divContent, divOptions)
    divOptions.append(spanDelete, spanEdit, spanMove, label)
    label.append(checkbox)

    parentNode.append(divTodo)



}

function loadTodos(db, parentNode) {
    const keys = Object.keys(db)
    const todos = []

    for (const key of keys) {
        const todo = JSON.parse(db.getItem(key))
        todos.push(todo)
    }

    todos.sort(function compareDates(todoA, todoB) {
        if (todoA.createdAt < todoB.createdAt) {
            return 1;
        }
        else {
            return -1;
        }
    })

    for (const todo of todos) {
        createTodo(parentNode, db, todo)
    }
}