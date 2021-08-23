
function setDefaultFilters(db) {
    db.setItem('inProgressFilter', false)
    db.setItem('finishedFilter', false)
    db.setItem('allFilter', true)
}

function setSavedFilters(db, inProgressFilter, finishedFilter, allFilter) {
    inProgressFilter.checked = JSON.parse(db.getItem('inProgressFilter'))
    finishedFilter.checked = JSON.parse(db.getItem('finishedFilter'))
    allFilter.checked = JSON.parse(db.getItem('allFilter'))

}

function createNotFoundElement(parentNode) {
    const header = document.createElement('h2')

    header.textContent = 'No todos found.'

    header.classList.add('not-found-message')

    parentNode.appendChild(header)
}

function refresh(parentNode, db) {
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

function updateTodo(db, parentNode, todoUpdated) {
    db.setItem(todoUpdated.key, JSON.stringify(todoUpdated))

    refresh(parentNode, db)
}

function handleEdit(db, todo, parentNode, divContent, editInput, editButton) {
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
        updateTodo(db, parentNode, todo)
        overlay.style.display = 'none'
    }
}


function createTodo(db, parentNode, todo) {
    const divTodo = document.createElement('div')
    const divContent = document.createElement('div')
    const divOptions = document.createElement('div')

    const spanDelete = document.createElement('span')
    const spanEdit = document.createElement('span')
    const inProgressLabel = document.createElement('label')
    const inProgressCheckBox = document.createElement('input')
    const hasFinishedLabel = document.createElement('label')
    const hasFinishedCheckBox = document.createElement('input')
    const editInput = document.createElement('input')
    const editButton = document.createElement('button')

    editInput.type = 'text'
    editInput.maxLength = inputTodo.maxLength
    inProgressCheckBox.type = 'checkbox'
    inProgressCheckBox.checked = todo.inProgress
    hasFinishedCheckBox.type = 'checkbox'
    hasFinishedCheckBox.checked = todo.hasFinished

    editButton.textContent = 'Edit'
    divContent.textContent = todo.content
    spanDelete.textContent = 'delete_forever'
    spanEdit.textContent = 'edit'
    inProgressLabel.textContent = 'P'
    hasFinishedLabel.textContent = 'F'

    divTodo.classList.add('todo')
    divContent.classList.add('content')
    divOptions.classList.add('options')
    spanDelete.classList.add('material-icons', 'delete-icon', 'icon')
    spanEdit.classList.add('material-icons', 'edit-icon', 'icon');
    editButton.classList.add('edit-button')
    editInput.classList.add('edit-input')

    if (todo.inProgress) {
        hasFinishedLabel.style.display = ''
    }
    else if (!todo.hasFinished) {
        hasFinishedLabel.style.display = 'none'
    }
    else {
        inProgressLabel.style.display = 'none'
    }





    spanDelete.onclick = () => deleteTodo(db, parentNode, todo)
    spanEdit.onclick = () => handleEdit(db, todo, parentNode, divContent, editInput, editButton)

    inProgressCheckBox.onchange = function () {
        todo.inProgress = this.checked
        todo.hasFinished = this.checked ? todo.hasFinished : false;
        updateTodo(db, parentNode, todo)
    }

    hasFinishedCheckBox.onchange = function () {
        todo.hasFinished = this.checked
        if (this.checked) {
            todo.inProgress = false;
        }
        updateTodo(db, parentNode, todo)
    }

    divTodo.append(divContent, divOptions)
    inProgressLabel.append(inProgressCheckBox)
    hasFinishedLabel.append(hasFinishedCheckBox)
    divOptions.append(spanDelete, spanEdit, inProgressLabel, hasFinishedLabel)


    parentNode.append(divTodo)



}

function extractTodos(todos) {

    const inProgressFilter = JSON.parse(db.getItem('inProgressFilter'))
    const finishedFilter = JSON.parse(db.getItem('finishedFilter'))
    const allFilter = JSON.parse(db.getItem('allFilter'))
    let filteredTodos;

    todos.sort(function compareDates(todoA, todoB) {
        if (todoA.createdAt < todoB.createdAt) {
            return 1;
        }
        else {
            return -1;
        }
    })

    if (allFilter) {
        filteredTodos = todos
    }
    else if (inProgressFilter && finishedFilter) {
        filteredTodos = todos.filter(todo => {
            return todo.inProgress
                || todo.hasFinished
        })
    }
    else {
        filteredTodos = todos.filter(todo => {
            return todo.inProgress === inProgressFilter
                && todo.hasFinished === finishedFilter
        })
    }



    return filteredTodos
}

function loadTodos(db, parentNode) {

    const keys = Object.keys(db).filter(key => {
        return key !== 'inProgressFilter'
            && key !== 'finishedFilter'
            && key !== 'allFilter'
    })


    const todos = []

    for (const key of keys) {
        const todo = JSON.parse(db.getItem(key))
        todos.push(todo)
    }

    const filteredTodos = extractTodos(todos)


    if (filteredTodos.length === 0) {
        createNotFoundElement(parentNode)
        return;
    }

    for (const todo of filteredTodos) {
        createTodo(db, parentNode, todo)
    }
}