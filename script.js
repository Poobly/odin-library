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

function saveValues(editing = false, bookName) {
    if (editing) {
        bookName.bookName = document.getElementById("bookName").value;
        bookName.author = document.getElementById("author").value;
        bookName.pages = document.getElementById("pages").value;
        bookName.read = document.getElementById("read").checked;
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

function assignValues(editing = false, bookName) {
    if (editing) {
        const list = document.querySelectorAll(`ul[data-key="${objectIndex(bookName)}"] > li`);
        const inputs = document.querySelectorAll("#input-form-con > input");
        for (let i = 0; i < list.length; i++) {
            inputs[i].value = list[i].textContent;
        }

    }
    else {
        let bookName = document.getElementById("bookName").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        let read = document.getElementById("read").checked;
        bookName = addBookToLibrary(bookName, author, pages, read);
    }
}

function Book(bookName, author, pages, read) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages;
    this.read = getRead(read, bookName);
}

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
    editButton.addEventListener("click", (e) => {
        inputForm.style.display === "none" ? inputForm.style.display = "flex" : inputForm.style.display = "none";
        assignValues(true, bookName);
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

function displayBooks(bookName, list, editing = false) {
    for (value in bookName) {
        const listEl = document.createElement("li");
        list.appendChild(listEl);

        editValues(bookName, listEl, value);
    }
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
            if (bookName[value] === "N/A") {
                console.log("apple")
            }
            listEl.textContent = bookName[value];
            break;
    }
}
