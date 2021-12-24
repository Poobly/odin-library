let myLibrary = [];
const inputForm =  document.getElementById("input-form");
const newBook = document.getElementById("new-book");
const saveBook = document.getElementById("save-book")
newBook.addEventListener("click", (e) => {
    inputForm.style.display == "none" ? inputForm.style.display = "flex" : inputForm.style.display = "none";
    console.log("bookName");
});

saveBook.addEventListener("click", (e) => {
    inputForm.style.display == "none" ? inputForm.style.display = "flex" : inputForm.style.display = "none";
    let bookName = document.getElementById("bookName");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let read = document.getElementById("read");
    addBookToLibrary(bookName, author, pages, read)
    displayBooks();
});


function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${name} by ${author}, ${pages} pages, ${read}`
    }
}

function addBookToLibrary(bookName, author, pages, read) {
    bookName = new Book(bookName, author, pages, read);
    myLibrary.push(bookName);
}

function displayBooks () {
    console.log(myLibrary);
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read yet");
// console.log(theHobbit.info());