/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
eval("// DOM selectors\nconst listsContainer = document.querySelector('[data-lists');\nconst newListForm = document.querySelector('[data-new-list-form');\nconst newListInput = document.querySelector('[data-new-list-input');\n\nconst LOCAL_STORAGE_LISTS_KEY = 'todos.lists';\nlet lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LISTS_KEY)) || [];\n\n// Event listeners\nnewListForm.addEventListener('submit', e => {\n  e.preventDefault();\n  const listName = newListInput.value;\n  console.log(listName);\n  if (listName == null || listName === \"\") {\n    console.log('no input value');\n    return;\n  }\n  const list = createList(listName);\n  lists.push(list);\n  render();\n})\n\n// Functions\nconst render = () => {\n  clearElement(listsContainer);\n  lists.forEach(list => {\n    const listElement = document.createElement('li');\n    listElement.dataset.listid = list.id;\n    listElement.classList.add('list-name');\n    listElement.innerText = list.name;\n    listsContainer.appendChild(listElement);\n  })\n\n}\n\nconst clearElement = (element) => {\n  while (element.firstChild) {\n    element.removeChild(element.firstChild);\n  }\n}\n\nconst createList = (name) => {\n  return { id: Date.now().toString, name: name, tasks: [] }\n}\n\nrender();\n\n//# sourceURL=webpack://todolist/./src/index.js?");
/******/ })()
;