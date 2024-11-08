// Define the BookPreview Web Component
class BookPreview extends HTMLElement {
    // Constructor - Initializes the element and attaches Shadow DOM
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // Set observed attributes if the component's properties need to be dynamic
    static get observedAttributes() {
        return ['book'];
    }

    // Attribute change callback (optional, if you need to update when the property changes)
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'book') {
            this.render();
        }
    }

    // Connected callback (runs when the element is added to the DOM)
    connectedCallback() {
        this.render();
    }

    // Render the book preview element inside the Shadow DOM
    render() {
        const book = JSON.parse(this.getAttribute('book'));

        // Exit early if the book data is not set
        if (!book) return;

        // Shadow DOM template (HTML + CSS)
        this.shadowRoot.innerHTML = `
    }

// Register the custom element
customElements.define('book-preview', BookPreview);

// Function to render a list of books using the BookPreview Web Component
function renderBooks(bookList) {
    const bookContainer = document.querySelector('[data-list-items]');
    const fragment = document.createDocumentFragment();

    bookList.slice(0, BOOKS_PER_PAGE).forEach(book => {
        const bookPreview = document.createElement('book-preview');
        
        // Pass the book data as a JSON string to the book-preview component
        bookPreview.setAttribute('book', JSON.stringify(book));
        
        // Append the book preview to the fragment
        fragment.appendChild(bookPreview);
    });

    bookContainer.innerHTML = '';  // Clear the container before appending new books
    bookContainer.appendChild(fragment);  // Append the updated list of book previews
}

class GenreSelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const genres = JSON.parse(this.getAttribute('genres'));
        
        if (!genres) return;

        this.shadowRoot.innerHTML = `
            <style>
                select {
                    font-size: 16px;
                    padding: 5px;
                    margin: 5px 0;
                }
            </style>
            <select>
                <option value="any">All Genres</option>
                ${genres.map(genre => `<option value="${genre.id}">${genre.name}</option>`).join('')}
            </select>
        `;
    }
}

class GenreSelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const genres = JSON.parse(this.getAttribute('genres'));
        
        if (!genres) return;

        this.shadowRoot.innerHTML = `
            <style>
                select {
                    font-size: 16px;
                    padding: 5px;
                    margin: 5px 0;
                }
            </style>
            <select>
                <option value="any">All Genres</option>
                ${genres.map(genre => `<option value="${genre.id}">${genre.name}</option>`).join('')}
            </select>
        `;
    }
}
class GenreSelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['genres'];
    }

    connectedCallback() {
        this.render();
    }

    set genres(value) {
        this._genres = value;
        this.render();
    }

    get genres() {
        return this._genres;
    }

    render() {
        if (!this._genres) return;

        const genreOptions = Object.entries(this._genres).map(([id, name]) => 
            `<option value="${id}">${name}</option>`
        ).join('');

        this.shadowRoot.innerHTML = `
            <style>
                select {
                    font-size: 16px;
                    padding: 5px;
                }
            </style>
            <select>
                <option value="any">All Genres</option>
                ${genreOptions}
            </select>
        `;
    }
}

customElements.define('genre-selector', GenreSelector);
