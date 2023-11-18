import Library from "./library.js";

const library = new Library();

function formFunctions() {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const formDiv = document.querySelector("form.add-book-form");
  const error = document.querySelector("p.error");

  function showForm() {
    formDiv.classList.remove("fade-out");
    formDiv.classList.add("fade-in");
    title.value = "";
    author.value = "";
    pages.value = "";
  }

  function hideForm(event) {
    event.preventDefault();
    formDiv.classList.remove("fade-in");
    formDiv.classList.add("fade-out");
    error.style.display = "none";
  }

  function checkForm() {
    if (
      title.validity.valueMissing ||
      author.validity.valueMissing ||
      pages.validity.valueMissing
    ) {
      error.style.display = "block";
      error.textContent = "Please fill out all fields";
      return true;
    } else if (pages.validity.rangeUnderflow) {
      error.style.display = "block";
      error.textContent = "We only accept books that have at least one page";
      return true;
    } else if (pages.validity.rangeOverflow) {
      error.style.display = "block";
      error.textContent = "We only accept books that have 10000 pages or less";
      return true;
    }
  }

  function clickAddBook(event) {
    event.preventDefault();
    if (checkForm() === true) return;
    const read = document.querySelector("#read");
    const readValue = read.classList.contains("active") ? true : false;
    library.addBook(title.value, author.value, pages.value, readValue);
    hideForm(event);
    ui.refreshUI();
  }

  return { showForm, hideForm, checkForm, clickAddBook };
}

const formFunc = formFunctions();

function UIFunctions() {
  const containerDiv = document.querySelector("div.book-container");

  function displayBook(book) {
    const toggle = book.read ? "active" : "";
    const div = document.createElement("div");
    div.innerHTML = `<h2>${book.title}</h2>
      <p>Author</p><p>${book.author}</p>
      <p>Pages</p><p>${book.pages}</p>
      <p>Read</p><div id="read" class="toggle-btn ${toggle}" onclick="this.classList.toggle('active')">
      <div class="inner-circle"></div>
      </div>`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Delete";
    removeButton.classList.add("remove");
    div.appendChild(removeButton);
    div.classList.add("fade-in-div");
    containerDiv.appendChild(div);
  }
  function displayBooks() {
    containerDiv.innerHTML = "";
    library.books.forEach((book) => displayBook(book));
  }

  function addIndexes() {
    library.books.forEach((book, index) => (book["index"] = index));

    const allDivs = containerDiv.querySelectorAll(".book-container>div");
    allDivs.forEach((item, index) => item.setAttribute("Index", index));

    const allRemoveButtons = containerDiv.querySelectorAll("button.remove");
    allRemoveButtons.forEach((item, index) =>
      item.setAttribute("Index", index)
    );

    const toggleButtons = document.querySelectorAll(
      "div.fade-in-div > div.toggle-btn"
    );
    toggleButtons.forEach((item, index) => item.setAttribute("Index", index));
  }

  function displayBooksRead() {
    const sumOfBooksRead = library.sumOfBooksRead();
    const booksRead = document.querySelector("div.books-read");
    booksRead.innerHTML = `${sumOfBooksRead} out of ${library.books.length} books read!`;
  }

  function refreshUI() {
    displayBooks();
    addIndexes();
    displayBooksRead();
  }
  return { refreshUI, displayBooksRead, containerDiv };
}

const ui = UIFunctions();

function toggleRead(e) {
  if (
    e.target.classList.contains("toggle-btn") ||
    e.target.parentElement.classList.contains("toggle-btn")
  ) {
    const index = e.target.parentElement.getAttribute("Index");
    library.toggleRead(index);
    ui.displayBooksRead();
  }
}

function clickDeleteBook(e) {
  if (e.target.classList.contains("remove")) {
    const itemIndex = e.target.getAttribute("index");
    library.deleteBook(itemIndex);
    ui.refreshUI();
  }
}

window.onload = eventListeners;

function eventListeners() {
  const addBookButton = document.querySelector("button.add-book");
  const formButton = document.querySelector("button.bring-up-form");
  const closeForm = document.querySelector("button.cancel");
  formButton.addEventListener("click", formFunc.showForm);
  closeForm.addEventListener("click", formFunc.hideForm);
  addBookButton.addEventListener("click", formFunc.clickAddBook);
  ui.containerDiv.addEventListener("click", toggleRead);
  ui.containerDiv.addEventListener("click", clickDeleteBook);
}
