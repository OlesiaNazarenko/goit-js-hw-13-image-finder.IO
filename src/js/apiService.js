const API_KEY = '23477819-44226e1e125dfcf9362a81201';
const BASE_URL = 'https://pixabay.com/api/';

let page = 1
const perPage = 12

 function searchImage(query) {
  let url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${perPage}&key=${API_KEY}`;
  console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data => data.hits)
      .then(array => {
        renderGalleryCard(array);
        
      })
      .catch(err => {
        console.log(err)// alert ({ text: 'Something went wrong.Please try again' })
      })

}
export  {searchImage, API_KEY,  BASE_URL, page, perPage}