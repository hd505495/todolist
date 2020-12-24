// DOM selectors
const listsContainer = document.querySelector('[data-lists');
const newListForm = document.querySelector('[data-new-list-form');
const newListInput = document.querySelector('[data-new-list-input');

const LOCAL_STORAGE_LISTS_KEY = 'todos.lists';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LISTS_KEY)) || [];

// Event listeners
newListForm.addEventListener('submit', e => {
  e.preventDefault();
  const listName = newListInput.value;
  console.log(listName);
  if (listName == null || listName === "") {
    console.log('no input value');
    return;
  }
  const list = createList(listName);
  lists.push(list);
  render();
})

// Functions
const render = () => {
  clearElement(listsContainer);
  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listid = list.id;
    listElement.classList.add('list-name');
    listElement.innerText = list.name;
    listsContainer.appendChild(listElement);
  })

}

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

const createList = (name) => {
  return { id: Date.now().toString, name: name, tasks: [] }
}

render();