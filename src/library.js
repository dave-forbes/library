import Book from "./book.js";

export default class Library {
  constructor() {
    this.books = [];
  }
  addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    this.books.push(book);
  }

  findIndex(itemIndex) {
    return this.books.findIndex((item) => item.index == itemIndex);
  }

  deleteBook(itemIndex) {
    const libraryIndex = this.findIndex(itemIndex);
    this.books.splice(libraryIndex, 1);
  }

  toggleRead(itemIndex) {
    const libraryIndex = this.findIndex(itemIndex);
    const book = this.books[libraryIndex];
    book.read = book.read ? false : true;
  }

  sumOfBooksRead() {
    return this.books.reduce((totalBooksRead, currentBook) => {
      if (currentBook.read == true) {
        ++totalBooksRead;
      }
      return totalBooksRead;
    }, 0);
  }
}
