/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/book.js":
/*!*********************!*\
  !*** ./src/book.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Book)\n/* harmony export */ });\nclass Book {\n  constructor(title, author, pages, read) {\n    this.title = title;\n    this.author = author;\n    this.pages = pages;\n    this.read = read;\n  }\n}\n\n\n//# sourceURL=webpack://library/./src/book.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _library_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./library.js */ \"./src/library.js\");\n\n\nconst library = new _library_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\nfunction formFunctions() {\n  const title = document.querySelector(\"#title\");\n  const author = document.querySelector(\"#author\");\n  const pages = document.querySelector(\"#pages\");\n  const formDiv = document.querySelector(\"form.add-book-form\");\n  const error = document.querySelector(\"p.error\");\n\n  function showForm() {\n    formDiv.classList.remove(\"fade-out\");\n    formDiv.classList.add(\"fade-in\");\n    title.value = \"\";\n    author.value = \"\";\n    pages.value = \"\";\n  }\n\n  function hideForm(event) {\n    event.preventDefault();\n    formDiv.classList.remove(\"fade-in\");\n    formDiv.classList.add(\"fade-out\");\n    error.style.display = \"none\";\n  }\n\n  function checkForm() {\n    if (\n      title.validity.valueMissing ||\n      author.validity.valueMissing ||\n      pages.validity.valueMissing\n    ) {\n      error.style.display = \"block\";\n      error.textContent = \"Please fill out all fields\";\n      return true;\n    } else if (pages.validity.rangeUnderflow) {\n      error.style.display = \"block\";\n      error.textContent = \"We only accept books that have at least one page\";\n      return true;\n    } else if (pages.validity.rangeOverflow) {\n      error.style.display = \"block\";\n      error.textContent = \"We only accept books that have 10000 pages or less\";\n      return true;\n    }\n  }\n\n  function clickAddBook(event) {\n    event.preventDefault();\n    if (checkForm() === true) return;\n    const read = document.querySelector(\"#read\");\n    const readValue = read.classList.contains(\"active\") ? true : false;\n    library.addBook(title.value, author.value, pages.value, readValue);\n    hideForm(event);\n    ui.refreshUI();\n  }\n\n  return { showForm, hideForm, checkForm, clickAddBook };\n}\n\nconst formFunc = formFunctions();\n\nfunction UIFunctions() {\n  const containerDiv = document.querySelector(\"div.book-container\");\n\n  function displayBook(book) {\n    const toggle = book.read ? \"active\" : \"\";\n    const div = document.createElement(\"div\");\n    div.innerHTML = `<h2>${book.title}</h2>\n      <p>Author</p><p>${book.author}</p>\n      <p>Pages</p><p>${book.pages}</p>\n      <p>Read</p><div id=\"read\" class=\"toggle-btn ${toggle}\" onclick=\"this.classList.toggle('active')\">\n      <div class=\"inner-circle\"></div>\n      </div>`;\n    const removeButton = document.createElement(\"button\");\n    removeButton.textContent = \"Delete\";\n    removeButton.classList.add(\"remove\");\n    div.appendChild(removeButton);\n    div.classList.add(\"fade-in-div\");\n    containerDiv.appendChild(div);\n  }\n  function displayBooks() {\n    containerDiv.innerHTML = \"\";\n    library.books.forEach((book) => displayBook(book));\n  }\n\n  function addIndexes() {\n    library.books.forEach((book, index) => (book[\"index\"] = index));\n\n    const allDivs = containerDiv.querySelectorAll(\".book-container>div\");\n    allDivs.forEach((item, index) => item.setAttribute(\"Index\", index));\n\n    const allRemoveButtons = containerDiv.querySelectorAll(\"button.remove\");\n    allRemoveButtons.forEach((item, index) =>\n      item.setAttribute(\"Index\", index)\n    );\n\n    const toggleButtons = document.querySelectorAll(\n      \"div.fade-in-div > div.toggle-btn\"\n    );\n    toggleButtons.forEach((item, index) => item.setAttribute(\"Index\", index));\n  }\n\n  function displayBooksRead() {\n    const sumOfBooksRead = library.sumOfBooksRead();\n    const booksRead = document.querySelector(\"div.books-read\");\n    booksRead.innerHTML = `${sumOfBooksRead} out of ${library.books.length} books read!`;\n  }\n\n  function refreshUI() {\n    displayBooks();\n    addIndexes();\n    displayBooksRead();\n  }\n  return { refreshUI, displayBooksRead, containerDiv };\n}\n\nconst ui = UIFunctions();\n\nfunction toggleRead(e) {\n  if (\n    e.target.classList.contains(\"toggle-btn\") ||\n    e.target.parentElement.classList.contains(\"toggle-btn\")\n  ) {\n    const index = e.target.parentElement.getAttribute(\"Index\");\n    library.toggleRead(index);\n    ui.displayBooksRead();\n  }\n}\n\nfunction clickDeleteBook(e) {\n  if (e.target.classList.contains(\"remove\")) {\n    const itemIndex = e.target.getAttribute(\"index\");\n    library.deleteBook(itemIndex);\n    ui.refreshUI();\n  }\n}\n\nwindow.onload = eventListeners;\n\nfunction eventListeners() {\n  const addBookButton = document.querySelector(\"button.add-book\");\n  const formButton = document.querySelector(\"button.bring-up-form\");\n  const closeForm = document.querySelector(\"button.cancel\");\n  formButton.addEventListener(\"click\", formFunc.showForm);\n  closeForm.addEventListener(\"click\", formFunc.hideForm);\n  addBookButton.addEventListener(\"click\", formFunc.clickAddBook);\n  ui.containerDiv.addEventListener(\"click\", toggleRead);\n  ui.containerDiv.addEventListener(\"click\", clickDeleteBook);\n}\n\n\n//# sourceURL=webpack://library/./src/index.js?");

/***/ }),

/***/ "./src/library.js":
/*!************************!*\
  !*** ./src/library.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Library)\n/* harmony export */ });\n/* harmony import */ var _book_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./book.js */ \"./src/book.js\");\n\n\nclass Library {\n  constructor() {\n    this.books = [];\n  }\n  addBook(title, author, pages, read) {\n    const book = new _book_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](title, author, pages, read);\n    this.books.push(book);\n  }\n\n  findIndex(itemIndex) {\n    return this.books.findIndex((item) => item.index == itemIndex);\n  }\n\n  deleteBook(itemIndex) {\n    const libraryIndex = this.findIndex(itemIndex);\n    this.books.splice(libraryIndex, 1);\n  }\n\n  toggleRead(itemIndex) {\n    const libraryIndex = this.findIndex(itemIndex);\n    const book = this.books[libraryIndex];\n    book.read = book.read ? false : true;\n  }\n\n  sumOfBooksRead() {\n    return this.books.reduce((totalBooksRead, currentBook) => {\n      if (currentBook.read == true) {\n        ++totalBooksRead;\n      }\n      return totalBooksRead;\n    }, 0);\n  }\n}\n\n\n//# sourceURL=webpack://library/./src/library.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;