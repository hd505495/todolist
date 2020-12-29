///////////////////
// DOM selectors //
///////////////////
const listsContainer = document.querySelector('[data-lists');
const newListForm = document.querySelector('[data-new-list-form');
const newListInput = document.querySelector('[data-new-list-input');
const deleteListBtn = document.querySelector('[data-delete-list-btn]');
const clearCompletedTodos = document.querySelector('[data-clear-completeds]');
const listDisplayContainer = document.querySelector('.todos-pane');
const listTitleElement = document.querySelector('.list-title');
const listCountElement = document.querySelector('.todo-count');
const todosContainer = document.querySelector('.todos');
const todoTemplate = document.getElementById('todo-template');
const newTodoForm = document.querySelector('[data-new-todo-form]');
const newTodoInput = document.querySelector('[data-new-todo-input]');

// localStorage keys
const LOCAL_STORAGE_LISTS_KEY = 'todos.lists';
const LOCAL_STORAGE_ACTIVE_LIST_ID_KEY = 'todos.activeListId';

// retrieve lists from local storage or set to empty array
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LISTS_KEY)) || [];
// retrieve id of active list if exists
let activeListId = localStorage.getItem(LOCAL_STORAGE_ACTIVE_LIST_ID_KEY);


/////////////////////
// Event listeners //
/////////////////////

// when a list is clicked, set it to active, save, render
listsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    activeListId = e.target.dataset.listId;
    save();
    render();
  }
})

// when new list submitted, save it and re-render
newListForm.addEventListener('submit', e => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") {
    console.log('no input value');
    return;
  }
  const list = createList(listName);
  newListInput.value = null;
  if (lists.length == 0) {
    activeListId = list.id;
  }
  lists.push(list);
  save();
  render();
})

// when new todo submitted, save it and re-render
newTodoForm.addEventListener('submit', e => {
  e.preventDefault();
  const todoName = newTodoInput.value;
  if (todoName == null || todoName === "") {
    console.log('no input value');
    return;
  }
  const todo = createTodo(todoName);
  newTodoInput.value = null;
  const activeList = lists.find(list => list.id == activeListId);
  activeList.todos.push(todo);
  save();
  render();
})

todosContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const activeList = lists.find(list => list.id == activeListId);
    const selectedTodo = activeList.todos.find(todo => todo.id == e.target.id);
    selectedTodo.complete = e.target.checked;
    save();
    renderTodoCount(activeList);
  }
})

clearCompletedTodos.addEventListener('click', e => {
  const activeList = lists.find(list => list.id == activeListId);
  activeList.todos = activeList.todos.filter(todo => !todo.complete);
  save();
  render();
})

deleteListBtn.addEventListener('click', e => {
  lists = lists.filter(list => list.id != activeListId);
  activeListId = null;
  save();
  render();
})

///////////////
// Functions //
///////////////

// dynamically render lists as list element
const render = () => {
  destroyChildren(listsContainer); // empties listsContainer
  renderLists();

  const activeList = lists.find(list => list.id == activeListId);

  if (activeListId == null) {
    listDisplayContainer.style.display = 'none';
  } else {
    listDisplayContainer.style.display = '';
    listTitleElement.innerText = activeList.name;
    renderTodoCount(activeList);

    destroyChildren(todosContainer); // empties todosContainer
    renderTodos(activeList);
  }
}

const renderTodos = (activeList) => {
  activeList.todos.forEach(todo => {
    const todoElement = document.importNode(todoTemplate.content, true);
    const checkbox = todoElement.querySelector('input');
    checkbox.id = todo.id;
    checkbox.checked = todo.complete;
    const label = todoElement.querySelector('label');
    label.htmlFor = todo.id;
    label.append(todo.name);
    todosContainer.appendChild(todoElement);
  })
}

const renderLists = () => {
  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-name');
    listElement.innerText = list.name;
    if (list.id == activeListId) {
      listElement.classList.add('active-list');
    }
    listsContainer.appendChild(listElement);
  })
}

const renderTodoCount = (activeList) => {
  const incompleteTodoCount = activeList.todos.filter(todo => !todo.complete).length;
  const todoString = incompleteTodoCount == 1 ? 'todo' : 'todos';
  listCountElement.innerText = `${incompleteTodoCount} ${todoString} remaining`;
}

// save lists and active list ID to local storage
const save = () => {
  localStorage.setItem(LOCAL_STORAGE_LISTS_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_ACTIVE_LIST_ID_KEY, activeListId);
}

// clears all children of element (was called clearElement.. couldn't miss the opportunity)
const destroyChildren = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// todo list factory
const createList = (name) => {
  return { id: Date.now(), name: name, todos: [] }
}

// todo item factory
const createTodo = (name) => {
  return { id: Date.now(), name: name, complete: false }
}

render();