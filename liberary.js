const addBook = document.querySelector(".open-dialog");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector(".close");
const Books = document.querySelector(".books");
const form = document.querySelector("form");

// open dialog to Add a book

addBook.addEventListener("click", () => {
  dialog.showModal();
});

// close dialog When adding a book

closeButton.addEventListener("click", (e) => {
  dialog.close();
});
//Adding a book

form.addEventListener("submit", addBookToLibrary);

const myLibrary = [];

function Book(author, title, pages, status) {
  // the constructor...
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggleRead = function () {
  this.status = this.status === "Read" ? "Not-Read" : "Read";
};

function toggleRead(index) {
  myLibrary[index].toggleRead();
  displayBooks();
}

function addBookToLibrary(event) {
  event.preventDefault();
  let authorName = document.getElementById("Author").value;
  let bookName = document.getElementById("title").value;
  let pagesNumber = document.getElementById("number-page").value;
  let statusRead = document.getElementById("Read").checked;

  let status = statusRead ? "Read" : "Not-Read";

  const newBook = new Book(authorName, bookName, pagesNumber, status);

  myLibrary.push(newBook);
  dialog.close();
  form.reset();

  displayBooks();
}

function displayBooks() {
  Books.innerHTML = "";
  myLibrary.forEach((newbook, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
        <div class="heading">
        <h3>Author : ${newbook.author}</h3>
        <h3>Title : ${newbook.title}</h3>
        </div>

        <div class="content">
        <p>Pages : ${newbook.pages}</p>
        <p>Status : ${newbook.status}</p>
        <button class="remove-card" onclick="remove(${index})">Remove</button>
        <button class="status-btn ${newbook.status.toLowerCase()}" 
        onclick="toggleRead(${index})">
    ${newbook.status}
</button>
        </div>
        
        `;
    Books.appendChild(bookCard);
  });
}

function remove(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function status() {}
