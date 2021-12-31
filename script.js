let myLibrary = [];
const inputForm =  document.getElementById("input-form-modal");
const newBook = document.getElementById("new-book");
const saveBook = document.getElementById("save-book");
const bookCon = document.getElementById("book-con");
const inputModal = document.getElementById("input-form-modal");

newBook.addEventListener("click", (e) => {
    inputForm.style.display = "flex"
});

inputModal.addEventListener("mousedown", (e) => {
    if (e.target === e.currentTarget) {
        saveBook.click();
    }
});

saveBook.addEventListener("click", (e) => {
    inputForm.style.display === "none" ? inputForm.style.display = "flex" : inputForm.style.display = "none";
    let bookName = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    bookName = addBookToLibrary(bookName, author, pages, read);
    createCards(bookName);
    document.querySelectorAll("#input-form-con > input").forEach((input) => {
        input.type == "checkbox" ? input.checked = false : input.value = ""; 
    });
});


function Book(bookName, author, pages, read) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages;
    this.read = getRead(read, bookName);
};

function getRead(read, bookName) {
    let re = /^[ ]+$/g;
    if (re.test(bookName) || bookName === "") bookName = "N/A";
    return read == true ? `${bookName} has been read` : `${bookName} has not been read`;
}


function addBookToLibrary(bookName, author, pages, read) {
    bookName = new Book(bookName, author, pages, read);
    myLibrary.push(bookName);
    return bookName;
}

function createCards(bookName) {
    const card = document.createElement("div");
    card.className = "card-con";
    bookCon.appendChild(card);

    const buttonDiv = document.createElement("div");
    buttonDiv.id = "card-botton-con";
    card.appendChild(buttonDiv);

    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.classList.add("card-buttons")
    editButton.textContent = "Edit";
    // editButton.addEventListener("click", editCards(bookName))
    buttonDiv.appendChild(editButton);
    
    const delButton = document.createElement("button");
    delButton.className = "delete-button";
    delButton.classList.add("card-buttons")
    delButton.textContent = "Close";
    delButton.addEventListener("click", (e) => {
        bookName = deleteCard(bookName, e);
    });
    buttonDiv.appendChild(delButton);

    const list = document.createElement("ul");
    list.className = "card";
    card.appendChild(list);

    displayBooks(bookName, list);
}

function editCards(bookName, e) {

}

function deleteCard(bookName, e) {
    e.target.parentElement.parentElement.remove();
    return bookName = {};
    
}

function displayBooks(bookName, list) {
    for (value in bookName) {
        let re = /^[ ]+$/g;
        const listEl = document.createElement("li");
        list.appendChild(listEl);
        if (re.test(bookName[value]) || bookName[value] === "") {
            bookName[value] = "N/A";
        }
        switch (value) {
            case "bookName": 
                listEl.textContent = `Book Name: ${bookName[value]}`;
                break;
            case "author":
                listEl.textContent = `Author: ${bookName[value]}`;
                break;
            case "pages":
                listEl.textContent = `Pages read: ${bookName[value]}`;
                break;
            case "read":
                if (bookName[value] === "N/A") {
                    console.log("apple")
                }
                listEl.textContent = bookName[value];
                break;
        }
    }
}

// document.querySelector(".delete-button").attachEvent("click", deleteCard());

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read yet");
// console.log(theHobbit.info());