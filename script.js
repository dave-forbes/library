const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const addBookButton = document.querySelector('button.add-book');
const formButton = document.querySelector('button.bring-up-form');
const formDiv = document.querySelector('form.add-book-form');
const closeForm = document.querySelector('button.cancel');
const error = document.querySelector('p.error');
const containerDiv = document.querySelector('div.book-container');
const booksRead = document.querySelector('div.books-read');

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

formButton.addEventListener('click', () => {
  formDiv.classList.remove('fade-out')
  formDiv.classList.add('fade-in');
  title.value = '';
  author.value = '';
  pages.value = '';
})

closeForm.addEventListener('click', (event) => {
  event.preventDefault();
  formDiv.classList.remove('fade-in');
  formDiv.classList.add('fade-out');
  error.style.display = 'none';
})

addBookButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (title.value == '' || author.value == '' || pages.value == '') {
    error.style.display = 'block';
    return;
  }
  let readValue;
  if (read.classList.contains('active')) {
    readValue = true;
  } else {
    readValue = false;
  }
  const book = new Book(title.value, author.value, pages.value, readValue);
  addBookToLibrary(book);
  formDiv.classList.remove('fade-in');
  formDiv.classList.add('fade-out');
  error.style.display = 'none';
});

function addBookToLibrary(book) {
  formDiv.classList.remove('fade-in')
  myLibrary.push(book);
  displayBook(book);
  addIndexes();
  addEventListenersToRemoveButtons();
  addEventListenersToToggles();
  displayBooksRead();
}

function displayBook(book) {
  let toggle;
  if (book.read) {
    toggle = 'active';
  } else {
    toggle = '';
  }
  const div = document.createElement('div');
  div.innerHTML = `
  <h2>Title</h2><h2>${book.title}</h2>
  <p>Author</p><p>${book.author}</p>
  <p>Pages</p><p>${book.pages}</p>
  <p>Read</p><div id="read" class="toggle-btn ${toggle}" onclick="this.classList.toggle('active')">
  <div class="inner-circle"></div>
</div>`;
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Delete';
  removeButton.classList.add('remove');
  div.appendChild(removeButton);
  div.classList.add('fade-in-div');
  containerDiv.appendChild(div);
}

function addIndexes() {
  myLibrary.forEach((book, index) => book['index'] = index);

  const allDivs = containerDiv.querySelectorAll('.book-container>div');
  allDivs.forEach((item, index) => item.setAttribute('Index', index));

  const allRemoveButtons = containerDiv.querySelectorAll('button.remove');
  allRemoveButtons.forEach((item, index) => item.setAttribute('Index', index));

  const toggleButtons = document.querySelectorAll('div.fade-in-div > div.toggle-btn');
  toggleButtons.forEach((item, index) => item.setAttribute('Index', index));
}

function addEventListenersToRemoveButtons() {
  const allRemoveButtons = containerDiv.querySelectorAll('button.remove');
  allRemoveButtons.forEach(button => button.addEventListener('click', () => {
    const itemIndex = button.getAttribute('index');
    const div = document.querySelector(`div[index="${itemIndex}"].fade-in-div`);
    if (div !== null) {
      div.remove();
    } else {
      return;
    }
    const libraryIndex = myLibrary.findIndex(item => item.index == itemIndex);
    myLibrary.splice(libraryIndex, 1);
    addEventListenersToToggles();
    displayBooksRead();
  }))
}

function addEventListenersToToggles() {
  const toggleButtons = document.querySelectorAll('div.fade-in-div > div.toggle-btn');
  toggleButtons.forEach((toggle, index) => toggle.addEventListener('click', () => {
    addIndexes()
    const libraryIndex = myLibrary.findIndex(item => item.index == index);
    if ((toggleButtons.length - libraryIndex) > 1) return;
    if (myLibrary[libraryIndex].read == true) {
      myLibrary[libraryIndex].read = false;
    } else if (myLibrary[libraryIndex].read == false) {
      myLibrary[libraryIndex].read = true;
    }
    displayBooksRead();
  }))
}


function displayBooksRead() {
  let sumOfBooksRead = myLibrary.reduce((accumulator, currentValue) => {
    if (currentValue.read == true) {
      accumulator++;
    } return accumulator;
  }, 0);
  booksRead.innerHTML = `<div>${sumOfBooksRead} out of ${myLibrary.length} books read!<div>`
}




