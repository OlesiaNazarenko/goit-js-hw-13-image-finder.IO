import refs from './refs'
import fetchObj from './fetchObj'
// import apiService from './apiService'
import galleryCards from '../templates/galleryCards.hbs';

import { alert,error } from '@pnotify/core/dist/PNotify.js'
import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/dist/BrightTheme.css'
import { defaults } from '@pnotify/core'
defaults.delay = '3000'
defaults.width = '400px'
defaults.minHeight = '56px'
const debounce = require('lodash.debounce');

const { element, form, input, gallery, searchBtn, loadMoreBtn } = refs;


const API_KEY = '23477819-44226e1e125dfcf9362a81201';
const BASE_URL = 'https://pixabay.com/api/';

const options = {
  headers: {
    Authorization: API_KEY,
  },
}

   let page = 1
    const perPage = 12

//  get query() {
//     return this._query
//   }
//   set query(value) {
//     return (this._query = value)
//   }

//   get page() {
//     return this._page
//   }
//   set page(value) {
//     return (this._page += value)
//   }
function renderGalleryCard(array) {
    const markup = galleryCards(array);
    gallery.insertAdjacentHTML('beforeend', markup);
}
function clearContainer() {
  gallery.innerHTML = '';
}
function onSearch() {
    const searchQuery = input.value;
    searchImage(searchQuery)
   }
function searchImage(query) {
    let url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${perPage}&key=${API_KEY}`;
    fetch(url)
      .then(response => response.json())
      .then(data => data.hits)
      .then(array => {
        renderGalleryCard(array);
        
      })
      .catch(err => {
        error ({ text: 'Something went wrong.Please try again' })
      })

}

form.addEventListener('submit', ((e) => { e.preventDefault(); clearContainer(); onSearch(); console.log('jggjj')}))
loadMoreBtn.addEventListener('click', ((e) => {
  e.preventDefault();
  page = page + 1;
  onSearch();
  element.scrollIntoView({behavior: 'smooth',  block: 'end',  });
}))