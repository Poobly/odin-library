let myLibrary = [];
let editing = false;
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
    list = document.querySelector;
    saveValues(e);
});

function saveValues(e) {
    if (editing) {
        console.log(myLibrary[bookIndex]);
        bookName = myLibrary[bookIndex];
        bookName.bookName = document.getElementById("bookName").value;
        bookName.author = document.getElementById("author").value;
        bookName.pages = document.getElementById("pages").value;
        bookName.read = document.getElementById("read").checked;
        const list = document.querySelectorAll(`ul[data-key="${objectIndex(bookName)}"] > li`);
        displayBooks(bookName, list)
    }
    else {
        let bookName = document.getElementById("bookName").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        let read = document.getElementById("read").checked;
        bookName = addBookToLibrary(bookName, author, pages, read);
        createCards(bookName);
    }
    document.querySelectorAll("#input-form-con > input").forEach((input) => {
        input.type == "checkbox" ? input.checked = false : input.value = ""; 
    });
}

// assigns editing input values for modal
function assignValues(bookName) {
    const inputs = document.querySelectorAll("#input-form-con > input");
    let i = 0;
    for (value in bookName) {
        if (bookName[value] === "N/A") bookName[value] = "";

        else if (bookName[value] === bookName.read && inputs[i].type === "checkbox") {
        inputs[i].checked = bookName[value];
        }

        if (bookName[value] !== bookName.read) inputs[i].value = bookName[value];
        i++;
    }
}

function Book(bookName, author, pages, read) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages;
    this.read = read; 
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
    editButton.addEventListener("click", (e) => {
        editing = true;
        bookIndex = e.target.parentElement.parentElement.querySelector("ul").dataset.key;
        assignValues(bookName);
        inputForm.style.display === "none" ? inputForm.style.display = "flex" : inputForm.style.display = "none";
    });
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
    list.setAttribute("data-key", objectIndex(bookName));
    list.className = "card";
    card.appendChild(list);

    displayBooks(bookName, list);
}

function objectIndex(bookName) {
    return myLibrary.findIndex((object) => {
        return object === bookName;
    });
}

function deleteCard(bookName, e) {
    e.target.parentElement.parentElement.remove();
    return bookName = {};
    
}

function displayBooks(bookName, list) {
    let i = 0;
    for (value in bookName) {
        let listEl;
        if (!editing) {
            listEl = document.createElement("li");
            list.appendChild(listEl);
        }
        else {
            listEl = list[i];
        }
        editValues(bookName, listEl, value);
        i++;
    }
    editing = false;
}

function editValues(bookName, listEl, value) {
    let re = /^[ ]+$/g;
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
            bookName[value] ? 
            listEl.textContent = `${bookName.bookName} has been read` :
            listEl.textContent = `${bookName.bookName} has not been read`;
            break;
    }
}
