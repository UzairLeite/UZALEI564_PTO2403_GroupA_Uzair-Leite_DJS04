import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

let page = 1;
let matches = books;

// Helper function to create a book preview element
/**
 * Creates a preview element for a book
 * @param {Object} book - The book object containing title, author, image, id
 * @returns {HTMLElement} - The preview button element
 */
function createBookPreviewElement(book) {
    const element = document.createElement('button');
    element.classList.add('preview');
    element.setAttribute('data-preview', book.id);
    
    element.innerHTML = `
        <img class="preview__image" src="${book.image}" />
        <div class="preview__info">
            <h3 class="preview__title">${book.title}</h3>
            <div class="preview__author">${authors[book.author]}</div>
        </div>
    `;
    
    return element;
}

// Function to render a list of books
/**
 * Renders a list of books to the specified container
 * @param {Array} bookList - Array of book objects to render
 */
function renderBooks(bookList) {
    const bookContainer = document.querySelector('[data-list-items]');
    const fragment = document.createDocumentFragment();
    
    bookList.slice(0, BOOKS_PER_PAGE).forEach(book => {
        fragment.appendChild(createBookPreviewElement(book));
    });

    bookContainer.innerHTML = '';
    bookContainer.appendChild(fragment);
}

// Function to create and append genre options
function createGenreOptions() {
    const genreHtml = document.createDocumentFragment();
    const firstGenreElement = document.createElement('option');
    firstGenreElement.value = 'any';
    firstGenreElement.innerText = 'All Genres';
    genreHtml.appendChild(firstGenreElement);

    for (const [id, name] of Object.entries(genres)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        genreHtml.appendChild(element);
    }

    document.querySelector('[data-search-genres]').appendChild(genreHtml);
}

// Function to create and append author options
function createAuthorOptions() {
    const authorsHtml = document.createDocumentFragment();
    const firstAuthorElement = document.createElement('option');
    firstAuthorElement.value = 'any';
    firstAuthorElement.innerText = 'All Authors';
    authorsHtml.appendChild(firstAuthorElement);

    for (const [id, name] of Object.entries(authors)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        authorsHtml.appendChild(element);
    }

    document.querySelector('[data-search-authors]').appendChild(authorsHtml);
}

// Function to handle theme switching
/**
 * Updates the theme of the page based on the selected theme
 * @param {string} theme - The selected theme ('day' or 'night')
 */
function updateTheme(theme) {
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
}

// Handle search form submission
/**
 * Handles the search form submission, filters books based on search input
 * @param {Event} event - The form submit event
 */
function handleSearchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const filteredBooks = filterBooks(books, filters);

    // Update page and matches
    page = 1;
    matches = filteredBooks;
    renderBooks(filteredBooks);
}

// Filters books based on provided filters
/**
 * Filters the books based on genre, title, and author
 * @param {Array} books - The array of all books
 * @param {Object} filters - The filters object containing genre, title, and author
 * @returns {Array} - The filtered list of books
 */
function filterBooks(books, filters) {
    return books.filter(book => {
        const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;

        return genreMatch && titleMatch && authorMatch;
    });
}

// Initialize genre and author options
createGenreOptions();
createAuthorOptions();

// Event listener for form submission
document.querySelector('[data-search-form]').addEventListener('submit', handleSearchSubmit);

// Initial render of books
renderBooks(books.slice(0, BOOKS_PER_PAGE));
