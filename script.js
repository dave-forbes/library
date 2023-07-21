const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const addBookButton = document.querySelector('button.add-book');
const formButton = document.querySelector('button.bring-up-form');
const formDiv = document.querySelector('form.add-book-form');
const closeForm = document.querySelector('button.cancel');
const containerDiv = document.querySelector('div.book-container');

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
})

addBookButton.addEventListener('click', (event) => {
  event.preventDefault();
  const book = new Book(title.value, author.value, pages.value, read.value);
  addBookToLibrary(book);
  formDiv.classList.remove('fade-in')
  formDiv.classList.add('fade-out');
  addBookButton.style.display = 'block';
});

function addBookToLibrary(book) {
  formDiv.classList.remove('fade-in')
  myLibrary.push(book);
  console.log(myLibrary);
  displayBook(book);
  addIndexes();
  addEventListenersToRemoveButtons();
}

function displayBook(book) {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = `Title: ${book.title}`;
  const author = document.createElement('p');
  author.textContent = `Author: ${book.author}`;
  const pages = document.createElement('p');
  pages.textContent = `Pages: ${book.pages}`;
  const read = document.createElement('p');
  read.textContent = `Read: ${book.read}`;
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Delete';
  removeButton.classList.add('remove');
  div.appendChild(title);
  div.appendChild(author);
  div.appendChild(pages);
  div.appendChild(read);
  div.appendChild(removeButton);
  div.classList.add('fade-in-div');
  containerDiv.appendChild(div);
}

function addIndexes() {
  myLibrary.forEach((book, index) => book['index'] = index);

  const allDivs = containerDiv.querySelectorAll('div');
  allDivs.forEach((item, index) => item.setAttribute('Index', index));

  const allRemoveButtons = containerDiv.querySelectorAll('button.remove');
  allRemoveButtons.forEach((item, index) => item.setAttribute('Index', index));
}

function addEventListenersToRemoveButtons() {
  const allRemoveButtons = containerDiv.querySelectorAll('button.remove');
  allRemoveButtons.forEach(item => item.addEventListener('click', () => {
    const itemIndex = item.getAttribute('index');
    const div = document.querySelector(`div[index="${itemIndex}"]`);
    containerDiv.removeChild(div);
    const libraryIndex = myLibrary.findIndex(item => item.index == itemIndex);
    myLibrary.splice(libraryIndex, 1);
    console.log(myLibrary);
  }))
}




