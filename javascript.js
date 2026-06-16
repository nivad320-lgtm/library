const myLibrary = [];

function Book(name, author, pages, read) {
  // the constructor...
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, pages, read) {
  // take params, create a book then store it in the array
  myLibrary.push(new Book(name, author, pages, read));
}

addBookToLibrary('steve', 'walter', 333, true);
console.table(myLibrary);

