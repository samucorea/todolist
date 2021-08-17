function refresh(parentNode, db) {
    parentNode.innerHTML = ''
    loadTodos(db, parentNode)
}

function insertTodos(db, parentNode, todos) {
    db.setItem('todos', JSON.stringify(todos))


    refresh(parentNode, db)

}

function deleteTodo(db, parentNode, todo) {
    const todos = JSON.parse(db.getItem('todos'))
    const newTodos = todos.filter(todoItem => {
        const todoParsed = JSON.parse(todoItem)

        return todoParsed.key !== todo.key
    })

    db.setItem('todos', JSON.stringify(newTodos))
    refresh(parentNode, db)
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
    editInput.type = 'text'
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.inProgress

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

    spanDelete.onclick = () => deleteTodo(db, parentNode, todo)
    spanEdit.onclick = () => {
        divContent.textContent = ''
        editInput.value = todo.content
        divContent.append(editInput)
    }

    checkbox.onchange = () => {
        todo.inProgress = checkbox.checked
    }

    divTodo.append(divContent, divOptions)
    divOptions.append(spanDelete, spanEdit, spanMove, label)
    label.append(checkbox)

    parentNode.append(divTodo)


}

function loadTodos(db, parentNode) {
    const todos = JSON.parse(db.getItem('todos'))

    if (todos === null) {
        return
    }


    for (const todo of todos) {
        createTodo(parentNode, db, JSON.parse(todo))
    }
}