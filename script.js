const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const addBookButton = document.querySelector("button.add-book");
const formButton = document.querySelector("button.bring-up-form");
const formDiv = document.querySelector("form.add-book-form");
const closeForm = document.querySelector("button.cancel");
const error = document.querySelector("p.error");
const containerDiv = document.querySelector("div.book-container");
const booksRead = document.querySelector("div.books-read");

let myLibrary = [];

window.onload = eventListeners;

function eventListeners() {
  formButton.addEventListener("click", showForm);
  closeForm.addEventListener("click", hideForm);
  addBookButton.addEventListener("click", clickAddBook);
  document.addEventListener("click", toggleRead);
  document.addEventListener("click", clickDeleteBook);
}

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

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function clickAddBook(event) {
  event.preventDefault();
  // if (title.value == "" || author.value == "" || pages.value == "") {
  //   error.style.display = "block";
  //   return;
  // }
  let readValue;
  if (read.classList.contains("active")) {
    readValue = true;
  } else {
    readValue = false;
  }
  const book = new Book(title.value, author.value, pages.value, readValue);
  formDiv.classList.remove("fade-in");
  myLibrary.push(book);
  displayBooks();
  addIndexes();
  displayBooksRead();
  hideForm(event);
}

function displayBook(book) {
  let toggle;
  if (book.read) {
    toggle = "active";
  } else {
    toggle = "";
  }
  const div = document.createElement("div");
  div.innerHTML = `<h2>${book.title}</h2>
    <p>Author</p><p>${book.author}</p>
    <p>Pages</p><p>${book.pages}</p>
    <p>Read</p><div id="read" class="book toggle-btn ${toggle}" onclick="this.classList.toggle('active')">
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
  myLibrary.forEach((book) => displayBook(book));
}

function addIndexes() {
  myLibrary.forEach((book, index) => (book["index"] = index));

  const allDivs = containerDiv.querySelectorAll(".book-container>div");
  allDivs.forEach((item, index) => item.setAttribute("Index", index));

  const allRemoveButtons = containerDiv.querySelectorAll("button.remove");
  allRemoveButtons.forEach((item, index) => item.setAttribute("Index", index));

  const toggleButtons = document.querySelectorAll(
    "div.fade-in-div > div.toggle-btn"
  );
  toggleButtons.forEach((item, index) => item.setAttribute("Index", index));
}

function displayBooksRead() {
  let sumOfBooksRead = myLibrary.reduce((accumulator, currentValue) => {
    if (currentValue.read == true) {
      accumulator++;
    }
    return accumulator;
  }, 0);
  booksRead.innerHTML = `${sumOfBooksRead} out of ${myLibrary.length} books read!`;
}

function toggleRead(e) {
  if (
    (e.target.classList.contains("book") &&
      e.target.classList.contains("toggle-btn")) ||
    (e.target.parentElement.classList.contains("book") &&
      e.target.parentElement.classList.contains("toggle-btn"))
  ) {
    const index = e.target.parentElement.getAttribute("Index");
    const libraryIndex = myLibrary.findIndex((item) => item.index == index);
    myLibrary[libraryIndex].read === true
      ? (myLibrary[libraryIndex].read = false)
      : (myLibrary[libraryIndex].read = true);
    displayBooksRead();
  }
}

function clickDeleteBook(e) {
  if (e.target.classList.contains("remove")) {
    const itemIndex = e.target.getAttribute("index");
    const libraryIndex = myLibrary.findIndex((item) => item.index == itemIndex);
    myLibrary.splice(libraryIndex, 1);
    displayBooks();
    addIndexes();
    displayBooksRead();
  }
}
