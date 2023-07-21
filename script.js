const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const addBookButton = document.querySelector('button.add-book');
const formButton = document.querySelector('button.bring-up-form');
const formDiv = document.querySelector('form.add-book-form');
const closeForm = document.querySelector('button.cancel');
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
})

addBookButton.addEventListener('click', (event) => {
  event.preventDefault();
  let readValue;
  if (read.classList.contains('active')) {
    readValue = true;
  } else {
    readValue = false;
  }
  const book = new Book(title.value, author.value, pages.value, readValue);
  addBookToLibrary(book);
  formDiv.classList.remove('fade-in')
  formDiv.classList.add('fade-out');
});

function addBookToLibrary(book) {
  formDiv.classList.remove('fade-in')
  myLibrary.push(book);
  console.log(myLibrary);
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
  allRemoveButtons.forEach(item => item.addEventListener('click', () => {
    const itemIndex = item.getAttribute('index');
    const div = document.querySelector(`div[index="${itemIndex}"].fade-in-div`);
    containerDiv.removeChild(div);
    const libraryIndex = myLibrary.findIndex(item => item.index == itemIndex);
    myLibrary.splice(libraryIndex, 1);
    displayBooksRead();
  }))
}

// function addEventListenersToToggles() {
//   const toggleButtons = document.querySelectorAll('div.fade-in-div > div.toggle-btn');
//   toggleButtons.forEach(button => button.addEventListener('click', () => {
//     const itemIndex = button.getAttribute('index');
//     console.log(itemIndex);
//     const libraryIndex = myLibrary.findIndex(item => item.index == itemIndex);
//     console.log(libraryIndex);
//     if (myLibrary[libraryIndex].read == true) {
//       myLibrary[libraryIndex].read = false;
//     } else if (myLibrary[libraryIndex].read == false) {
//       myLibrary[libraryIndex].read = true;
//     }
//     displayBooksRead();
//   }))
// }

function addEventListenersToToggles() {
  const toggleButtons = document.querySelectorAll('div.fade-in-div > div.toggle-btn');
  toggleButtons.forEach(button => button.addEventListener('click', () => {
    const itemIndex = button.getAttribute('index');

    // Verify that itemIndex is not null or undefined
    if (itemIndex === null || itemIndex === undefined) {
      console.error('Invalid itemIndex:', itemIndex);
      return; // Return early to avoid further processing
    }

    // Parse the itemIndex as an integer (if needed) before searching
    const indexToFind = parseInt(itemIndex, 10);

    // Find the corresponding element in myLibrary
    const libraryIndex = myLibrary.findIndex(item => item.index === indexToFind);

    // Verify that the element was found in myLibrary
    if (libraryIndex === -1) {
      console.error('Item not found in myLibrary:', indexToFind);
      return; // Return early to avoid further processing
    }

    // Toggle the 'read' property
    myLibrary[libraryIndex].read = !myLibrary[libraryIndex].read;

    // Perform additional actions after toggling
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




