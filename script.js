// MAIN SCRIPT

// Array to store book objects
let myLibrary = [];

// Book object(s) constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Global variable for refresh e.g. connection.innerHTML = ''; before populateCollection();
const collection = document.querySelector('.collection');

// Hide collection
const collectionContainer = document.querySelector('.collection-container');
collectionContainer.style.display = 'none';

// Add object to myLibrary[] on form submit
const form = document.forms['form'];
form.onsubmit = e => {
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
    populateCollection();
};

function populateCollection() {
    // Show collection
    collectionContainer.style.display = '';

    // i to iterate IDs
    let i = -1;
    for (let book in myLibrary) {
        i += 1;

        // Create elements
        const bookCard = document.createElement('div');
        const titleElement = document.createElement('h2');
        const authorElement = document.createElement('h3');
        const details = document.createElement('div');
        const pageContainer = document.createElement('div');
        const pageTitle = document.createElement('p');
        const pagesElement = document.createElement('p');
        const isReadElement = document.createElement('p');
        const cardButtons = document.createElement('div');
        const removeButton = document.createElement('button');
        const readButton = document.createElement('button');

        // Assign an id to each book card
        bookCard.setAttribute('id', `book-${i}`);

        // Add classes
        bookCard.classList.add('book');
        titleElement.classList.add('title');
        authorElement.classList.add('author');
        details.classList.add('details');
        pageContainer.classList.add('pages-container');
        pagesElement.classList.add('page');
        cardButtons.classList.add('card-buttons');
        removeButton.classList.add('remove-button');
        readButton.classList.add('read-button');

        // Add elements
        collection.appendChild(bookCard);

        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(details);
        bookCard.appendChild(cardButtons);

        details.appendChild(isReadElement);
        details.appendChild(pageContainer);

        pageContainer.appendChild(pageTitle);
        pageContainer.appendChild(pagesElement);

        if (myLibrary[book].isRead === false) { cardButtons.appendChild(readButton); }
        cardButtons.appendChild(removeButton);

        // Add contents
        pageTitle.textContent = 'Pages';
        removeButton.textContent = 'X';
        readButton.textContent = 'Mark as read';

        titleElement.textContent = myLibrary[book].title;
        authorElement.textContent = myLibrary[book].author;
        pagesElement.textContent = myLibrary[book].pages;

        // Determine read/not read status
        if (myLibrary[book].isRead === true) {
            isReadElement.textContent = 'Already read';
            isReadElement.classList.add('already-read');
        }
        else {
            isReadElement.textContent = 'Not read';
            isReadElement.classList.add('not-read');
        }

        // Add clicks listeners to 'remove' and 'mark as read' buttons
        removeButton.addEventListener('click', removeBook);
        readButton.addEventListener('click', markAsRead);
    }
}

function removeBook(e) {
    let bookId = e.target.parentNode.parentNode.id;
    bookId = bookId.slice(-1);

    myLibrary.splice(bookId, 1);
    collection.innerHTML = '';
    populateCollection();

    if (myLibrary.length === 0) {
        collectionContainer.style.display = 'none';
    }
}

function markAsRead(e) {
    let bookId = e.target.parentNode.parentNode.id;
    bookId = bookId.slice(-1);

    myLibrary[bookId].isRead = true;
    e.target.remove();
    collection.innerHTML = '';
    populateCollection();
}


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
