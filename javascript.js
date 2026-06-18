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
addBookToLibrary('Diary', 'walter', 333, true);
console.table(myLibrary);


const container = document.querySelector('.container');
const bookList = document.createElement('div');
container.appendChild(bookList);

for(book of myLibrary) {
  const bookDescription = document.createElement('p');
  bookDescription.textContent = `${book.name} by ${book.author}. ${book.pages}pages. Status: ${book.read}`;
  bookList.appendChild(bookDescription);
}


const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const selectEl = favDialog.querySelector("select");
const bookAuthor = favDialog.querySelector("#author");
const bookPages = favDialog.querySelector("#pages");
const bookTitle = favDialog.querySelector("#title");
const confirmBtn = favDialog.querySelector("#confirmBtn");

showButton.addEventListener('click', () => {
  favDialog.showModal();
});

favDialog.addEventListener('close', (e) => {
  outputBox.value = 
    favDialog.returnValue === "default" ? "No return value."
    : `ReturnValue: ${favDialog.returnValue}.`;
})

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  favDialog.close(selectEl.value); // Have to send the select box value here.
  favDialog.close(bookAuthor.value);
  favDialog.close(bookPages.value);
  favDialog.close(bookTitle.value);
  
  const bookDescription = document.createElement('p');
  bookDescription.textContent = `${bookTitle.value} by ${bookAuthor.value}. ${bookPages.value}pages. Status: ${selectEl.value}`;
  bookList.appendChild(bookDescription);


});