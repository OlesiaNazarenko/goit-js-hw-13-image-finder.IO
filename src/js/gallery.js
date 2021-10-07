import refs from './refs'
import ApiService from './apiService'
import RenderGallery from './renderGallery'
import getObserver from './intersectionObserver'
import * as basicLightbox from 'basiclightbox'


import { alert, error, info } from '@pnotify/core/dist/PNotify.js'
import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/dist/BrightTheme.css'
import { defaults } from '@pnotify/core'
defaults.delay = '3000'
defaults.width = '400px'
defaults.minHeight = '56px'

const api = new ApiService(12)
const renderGallery = new RenderGallery()

function onSearch() {
  const query = renderGallery.refs.input.value
  if (query.length === 0 || query.length < 2) {
    alert({ text: 'Enter a search word and try again' })
  } else {
     api.query = query;
     api.resetPage();
     onsearchImage()
  }
   }

function loadMoreImage() {
  onsearchImage()
}
const observer = getObserver(observerCb);

function onsearchImage() {
  api.getImage().then((gallery) => {
    renderGallery.renderGalleryCard(gallery);
    
  }).then(() => {
    observer.observe(renderGallery.refs.gallery.lastElementChild)
  })
    .catch((err) => {
      if (err.status === 408) {
        info({ text: err.message })
      }
      if (err.status === 404) {
        error({ text: err.message })
      }
  })
}
function observerCb() {
      api.incrementPage()
      observer.unobserve(renderGallery.refs.gallery.lastElementChild)
      loadMoreImage()
}

function handleSubmit(e) {
  e.preventDefault();
  renderGallery.clearContainer();
  onSearch()
}
  function openModal(e) {
    if (e.target.className === 'photo') {
      basicLightbox.create(`
      <div class="modal">
      <img src="${e.target.src}" alt="" class="modal-photo" />
      </div>`).show()
    }
  }

renderGallery.refs.form.addEventListener('submit',  handleSubmit);
renderGallery.refs.gallery.addEventListener('click', openModal);