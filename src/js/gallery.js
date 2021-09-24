import refs from './refs'
import fetchImage from './apiService'
import galleryCards from '../templates/galleryCards.hbs'
import * as basicLightbox from 'basiclightbox'


import { alert, error, info } from '@pnotify/core/dist/PNotify.js'
import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/dist/BrightTheme.css'
import { defaults } from '@pnotify/core'
defaults.delay = '3000'
defaults.width = '400px'
defaults.minHeight = '56px'


const { form, input, gallery, loadMoreBtn} = refs;

let page = 1
const perPage = 12

function renderGalleryCard(array) {
    const markup = galleryCards(array);
    gallery.insertAdjacentHTML('beforeend', markup);
}
function clearContainer() {
  gallery.innerHTML = '';
   loadMoreBtn.classList.remove('is-hidden');
}
function onSearch() {
    const searchQuery = input.value;
    onsearchImage(searchQuery, page, perPage)
   }

 function resetPage() {
        page = 1;
}
    
function onsearchImage(query, page, perPage) {
  loadMoreBtn.classList.remove('is-hidden');
  if (query.length === 0 || query.length < 2) {
    alert({ text: 'Enter a search word and try again' })
  } else {
    fetchImage(query, page, perPage).then(array => {
      if (array.length == 0) {
        info({ text: 'There are no more images. Please, try another request ' })
        return;
      } else {
        renderGalleryCard(array);
        loadMoreBtn.classList.add('is-hidden');
      }
    }).catch((err) => {
      error({ text: 'Something went wrong.Please try again' })

  
    }
    )
  }
}


form.addEventListener('submit', ((e) => { e.preventDefault(); resetPage(); clearContainer(); onSearch() }));
loadMoreBtn.addEventListener('click', ((e) => {
  e.preventDefault();
  page = page + 1;
  onSearch();
}));


  gallery.addEventListener('click', ((e) => {
    if (e.target.className === 'photo') {
      basicLightbox.create(`
    <div class="modal">
        <img src="${e.target.src}" alt="" class="modal-photo" />
      </div>`).show()
    }
  }))