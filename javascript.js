const container = document.querySelector('.container');
const myLibrary = [];

const bookList = document.createElement('div');
container.appendChild(bookList);

function Book(name, author, pages, read) {
  // the constructor...
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.changeRead = function() {
    this.read = this.read === true ? false : true;
    updateLibraryList(myLibrary);
}

function addBookToLibrary(name, author, pages, read) {
  // take params, create a book then store it in the array
  myLibrary.push(new Book(name, author, pages, read));
  updateLibraryList(myLibrary);
}

// Testing the function
addBookToLibrary('steve', 'walter', 333, true);
addBookToLibrary('Diary', 'walter', 333, true);
console.table(myLibrary);


function updateLibraryList(libraryArray){
  bookList.replaceChildren();
  for(let book of libraryArray) {
    const bookDescription = document.createElement('p');
    bookDescription.textContent = `${book.name} by ${book.author}. ${book.pages}pages. Status: ${book.read}`;
    bookDescription.dataset.indexNumber = book.id;

    const bookChangeReadBtn = document.createElement('button');
    bookChangeReadBtn.classList.add("changeReadBtn");
    bookChangeReadBtn.textContent = 'switch';
    bookChangeReadBtn.addEventListener('click', () => {
      console.log(myLibrary.findIndex(({id}) => id === bookChangeReadBtn.parentElement.dataset.indexNumber));
      myLibrary[myLibrary.findIndex(({id}) => id === bookChangeReadBtn.parentElement.dataset.indexNumber)].changeRead();
      console.log(book.id);
      // myLibrary[findIndex(({id}) => id === bookChangeReadBtn.parentElement.dataset.indexNumber)].changeRead();
    })

    bookDescription.appendChild(bookChangeReadBtn);

    const bookDeleteBtn = document.createElement('button');
    bookDeleteBtn.classList.add("removeBtn");
    bookDeleteBtn.textContent = 'remove';
    bookDeleteBtn.addEventListener('click', () => {
      console.log(bookDeleteBtn.parentElement.dataset.indexNumber);
      myLibrary.splice(myLibrary.findIndex(({id}) => id === bookDeleteBtn.parentElement.dataset.indexNumber), 1);
      updateLibraryList(myLibrary);
    });

    bookDescription.appendChild(bookDeleteBtn);

    bookList.appendChild(bookDescription);
  }
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
  
  let bool = selectEl.value === "yes";

  addBookToLibrary(bookTitle.value, bookAuthor.value, Number(bookPages.value), bool)
});