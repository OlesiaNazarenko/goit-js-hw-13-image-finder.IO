import refs from './refs'
import fetchImage from './apiService'
import galleryCards from '../templates/galleryCards.hbs'
import * as basicLightbox from 'basiclightbox'


import { alert, error } from '@pnotify/core/dist/PNotify.js'
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
  // observer.unobserve(loadMoreBtn);
 
  if (query.length === 0 || query.length < 2) {
    error({ text: 'Enter a search word and try again' })
    return;
  } else {
    fetchImage(query, page, perPage).then(array => {
      if (page === 1 && array.length === 0) {
        alert({ text: 'There are no images for your request' })
       
        console.log('1');
        
      }
      if ( page >1 || array.length === 0) {
        observer.unobserve(loadMoreBtn);
        console.log('2')
        console.log(page)
        alert({ text: 'There are no more images for your request' })
        return 
        }
      else {
        renderGalleryCard(array);
        loadMoreBtn.classList.add('is-hidden');
        observer.observe(loadMoreBtn)        
      }
      }).catch((error) => {
        alert({ text: 'Something went wrong.Please try again' })
        
      })
  }
   }

const options = {
      root: null,
      rootMargin: '0px'
   }
const observer = new IntersectionObserver(infiniteScroll,options )

function infiniteScroll(entries, observer) {
  if (!entries.isIntersecting) {
    page = page + 1;
    onSearch()
  } else {
    return alert({ text: 'There are no more images for your request' })}
}

form.addEventListener('submit', ((e) => { e.preventDefault(); resetPage(); clearContainer(); onSearch() }));
// loadMoreBtn.addEventListener('click', ((e) => {
//   e.preventDefault();
//   page = page + 1;
//   onSearch();
// }));

gallery.addEventListener('click', ((e) => {
  if (e.target.className === 'photo') {
    basicLightbox.create(`
    <div class="modal">
        <img src="${e.target.src}" alt="" class="modal-photo" />
      </div>`
      
    ).show()

  }
}))
