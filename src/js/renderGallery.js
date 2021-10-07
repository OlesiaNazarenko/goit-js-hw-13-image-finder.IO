import galleryCards from '../templates/galleryCards.hbs'


export default class RenderGallery{
    #refs = {
        element: document.getElementById('.my-element-selector'),
        form: document.querySelector('.search-form'),
        input: document.querySelector('[name="query"]'),
        gallery: document.querySelector('.gallery'),
        searchBtn: document.querySelector('.searchBtn'),
        loadMoreBtn: document.querySelector('.loadBtn'),
        modal: document.querySelector('.modal'),
        galleryContainer: document.querySelector('.gallery-container')

    }
    constructor() {
        
    }
    get refs() {
        return this.#refs
    }
    
 renderGalleryCard = array=> {
    const markup = galleryCards(array);
    this.refs.gallery.insertAdjacentHTML('beforeend', markup);
}
 clearContainer= ()=> {
 this.refs.gallery.innerHTML = '';
   this.refs.loadMoreBtn.classList.remove('is-hidden');
}
}