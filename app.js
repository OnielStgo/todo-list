const formAddTodo = document.querySelector(".form-add-todo");
const inputSearchTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector(".todos-container");

const addTodo = (inputValue) => {
  if (inputValue.length) {
    todosContainer.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
      </li>
    `;
    // event.target.reset();
  }
}

formAddTodo.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = event.target.add.value.trim();

  addTodo(inputValue);
  
  event.target.reset();

});

const removeTodo = (clickedElement) => {
  const trashDataValue = clickedElement.dataset.trash;
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)

  if (trashDataValue) {
    todo.remove();
  }
}

todosContainer.addEventListener('click', (event) => {
  const clickedElement = event.target;
  
  removeTodo(clickedElement)
})

const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
  .filter(todo => {
    const matchedTodo = todo.textContent.toLowerCase().includes(inputValue);
    return returnMatchedTodos ? matchedTodo : !matchedTodo;
  })

const manipulateClasses = (todos, classToRemove, classToAdd) => {
  todos.forEach(todo => {
    todo.classList.remove(classToRemove);
    todo.classList.add(classToAdd);
  })
}

const hideTodos = (todos, inputValue) => {
  const todosToHide = filterTodos(todos, inputValue, false);

  manipulateClasses(todosToHide, 'd-flex', 'hidden');
}

const showTodos = (todos, inputValue) => {
  const todosToShow = filterTodos(todos, inputValue, true);

  manipulateClasses(todosToShow, 'hidden', 'd-flex');
}

inputSearchTodo.addEventListener('input', (event) => {
  const inputValue = event.target.value.trim().toLowerCase();
  const todos = Array.from(todosContainer.children)

  hideTodos(todos, inputValue);
  showTodos(todos, inputValue);
})
