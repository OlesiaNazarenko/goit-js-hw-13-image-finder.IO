const API_KEY = '23477819-44226e1e125dfcf9362a81201';
const BASE_URL = 'https://pixabay.com/api/';

export default function fetchImage(query, page, perPage) {
  let url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${perPage}&key=${API_KEY}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data.hits;
     
    })
     .catch((error) => {
        alert({ text: 'Something went wrong.Please try again' })
        Promise.reject(error)
      })
}