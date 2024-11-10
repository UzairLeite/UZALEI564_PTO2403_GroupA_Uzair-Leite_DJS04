// BookPreview Web Component
class BookPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['book'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'book') {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const book = JSON.parse(this.getAttribute('book'));

        if (!book) return;

        this.shadowRoot.innerHTML = `
            <style>
                .preview {
                    width: 100%;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    border-radius: 8px;
                    border: 1px solid rgba(var(--color-dark), 0.15);
                    background: rgba(var(--color-light), 1);
                }
                .preview:hover {
                    background: rgba(var(--color-blue), 0.05);
                }
                .preview__image {
                    width: 48px;
                    height: 70px;
                    object-fit: cover;
                    border-radius: 2px;
                    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2);
                }
                .preview__info {
                    padding: 1rem;
                }
                .preview__title {
                    font-weight: bold;
                    color: rgba(var(--color-dark), 0.8);
                }
                .preview__author {
                    color: rgba(var(--color-dark), 0.4);
                }
            </style>
            <div class="preview" data-preview="${book.id}">
                <img class="preview__image" src="${book.image}" alt="${book.title}" />
                <div class="preview__info">
                    <h3 class="preview__title">${book.title}</h3>
                    <div class="preview__author">${authors[book.author]}</div>
                </div>
            </div>
        `;
    }
}

customElements.define('book-preview', BookPreview);

// GenreSelector Component
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
                ${Object.entries(genres)
                    .map(([id, name]) => `<option value="${id}">${name}</option>`)
                    .join('')}
            </select>
        `;
    }
}

customElements.define('genre-selector', GenreSelector);

