const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const readYes = document.querySelector('#yes');
const readNo = document.querySelector('#no');
const addBookButton = document.querySelector('button.add-book');
const formButton = document.querySelector('button.bring-up-form');
const formDiv = document.querySelector('div.add-book-form');
const containerDiv = document.querySelector('.book-container');
let read;

let myLibrary = [
  {
    title: 'The Hobbit',
    author: 'Tolkien',
    pages: 345,
    read: 'yes'
  }
];

displayLibrary();

function displayLibrary() {
  containerDiv.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const div = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = `Title: ${book['title']}`;
    const author = document.createElement('p');
    author.textContent = `Author: ${book['author']}`;
    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book['pages']}`;
    const read = document.createElement('p');
    read.textContent = `Read: ${book['read']}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Delete';
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(read);
    div.appendChild(removeButton);
    containerDiv.appendChild(div);
    div.setAttribute('Index', index);
    removeButton.setAttribute('Index', index);
  })
  allRemoveButtons = containerDiv.querySelectorAll('button');
  allRemoveButtons.forEach(item => item.addEventListener('click', () => {
    const index = item.getAttribute('index');
    const div = document.querySelector(`div[index="${index}"]`);
    containerDiv.removeChild(div);
    myLibrary.splice(index, index + 1);
  }))
}

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayLibrary();
}

addBookButton.addEventListener('click', () => {
  if (readYes.checked === true) {
    read = 'yes';
  } else {
    read = 'no';
  }
  const book = new Book(title.value, author.value, pages.value, read);
  addBookToLibrary(book);
  formDiv.style.display = 'none';
});

formButton.addEventListener('click', () => {
  if (formDiv.style.display = 'none') {
    formDiv.style.display = 'grid';
  }
})

