let myLibrary = [];
const inputForm =  document.getElementById("input-form-modal");
const newBook = document.getElementById("new-book");
const saveBook = document.getElementById("save-book");
const bookCon = document.getElementById("book-con");
newBook.addEventListener("click", (e) => {
    inputForm.style.display = "flex"
});

saveBook.addEventListener("click", (e) => {
    inputForm.style.display === "none" ? inputForm.style.display = "flex" : inputForm.style.display = "none";
    let bookName = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;
    addBookToLibrary(bookName, author, pages, read)
    displayBooks();
});


function Book(bookName, author, pages, read) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(bookName, author, pages, read) {
    bookName = new Book(bookName, author, pages, read);
    myLibrary.push(bookName);
}

function displayBooks() {
    const list = document.createElement("ul");
    list.classList.add("card");
    bookCon.appendChild(list);
    for (const book of myLibrary) {
        Object.keys(book).forEach(value => {
            const listEl = document.createElement("li");
            list.appendChild(listEl);
            listEl.textContent = book[value];
        });
    }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read yet");
// console.log(theHobbit.info());