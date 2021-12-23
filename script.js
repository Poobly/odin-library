let myLibrary = [];
const inputForm =  document.getElementById("input-form");
const button = document.querySelector("button");
button.addEventListener("click", (e) => {
    inputForm.style.display == "none" ? inputForm.style.display = "flex" : inputForm.style.display = "none";
    bookName = 
    author = 
    pages = 
    read = 
    console.log("aioweg");
    addBookToLibrary(bookName, author, pages, read)
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

}

const theHobbit = new book("The Hobbit", "J.R.R. Tolkien", 295, "Not read yet");
console.log(theHobbit.info());