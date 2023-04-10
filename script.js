// Modal control
const openButton = document.getElementById('open-modal');
const closeButton = document.getElementById('close-modal');
const modal = document.querySelector('.new-book');

openButton.addEventListener('click', () => {
    modal.classList.add('show');
});

closeButton.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Script
let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// function addBookToLibrary() {
//     // let title = document.getElementById('title').value;
//     // let author = document.getElementById('author').value;
//     // let pages = document.getElementById('pages').value;
//     // let isRead = document.getElementById('isRead').checked;

//     // return new Book(title, author, pages, isRead);
// }

const collection = document.querySelector('.collection');

const form = document.forms['form'];
form.onsubmit = function (e) {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let isRead = document.getElementById('isRead').checked;

    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);

    form.reset();
    modal.classList.remove('show');

    collection.innerHTML = '';
    console.log(myLibrary);
    populateCollection();
};

function populateCollection() {
    for (let book in myLibrary) {
        // Elements
        const bookCard = document.createElement('div');
        const titleElement = document.createElement('h2');
        const authorElement = document.createElement('h3');
        const details = document.createElement('div');
        const pageContainer = document.createElement('div');
        const pageTitle = document.createElement('p');
        const pagesElement = document.createElement('p');
        const isReadElement = document.createElement('p');

        // Classlists
        bookCard.classList.add('book');
        titleElement.classList.add('title');
        authorElement.classList.add('author');
        details.classList.add('details');
        pageContainer.classList.add('pages-container');
        pagesElement.classList.add('page');
        isReadElement.classList.add('isRead');

        // Append
        collection.appendChild(bookCard);
        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(details);
        details.appendChild(pageContainer);
        details.appendChild(isReadElement);
        pageContainer.appendChild(pageTitle);
        pageContainer.appendChild(pagesElement);

        // Content
        pageTitle.textContent = 'Pages';

        titleElement.textContent = myLibrary[book].title;
        authorElement.textContent = myLibrary[book].author;
        pagesElement.textContent = myLibrary[book].pages;
        myLibrary[book].isRead ? isReadElement.textContent = 'Already read' : isReadElement.textContent = 'Not read';
    }
}