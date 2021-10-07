// function fetchImage(query, page, perPage) {
//   // let url = ;
//   return fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       return data.hits;
     
//     })
     
// }

export default class ApiService {
 #API_KEY = '23477819-44226e1e125dfcf9362a81201';
 #BASE_URL = 'https://pixabay.com/api/';
  constructor(perPage) {
    this._query = '',
      this.page = 1,
      this.perPage = perPage
  }

  get query() {
    return this._query
  }
   set query(query) {
     this._query = query
  }

  getImage = async () => {
    const queryString = this.getQueryString()
    try {
      const response = await fetch(queryString)
      
      const { hits} = await response.json()
        if (hits.length === 0) {
       throw new ErrorInfo('There are no more images. Please, try another request ')
      }
      return hits
    }
    catch (error) {
      if (error.status === 408) {
        throw error
      }
      throw new ErrorDanger('Something went wrong.Please try again')
      }
    
  }
    resetPage =()=> this.page = 1;
    incrementPage= ()=> this.page +=1;
  getQueryString = () => `${this.#BASE_URL}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${this.#API_KEY}`
  
  
}
function ErrorInfo(message) {
  this.name = 'MyError';
  this.message = message || 'Сообщение по умолчанию';
  this.status = 408;
}
ErrorInfo.prototype = Object.create(Error.prototype);
ErrorInfo.prototype.constructor = ErrorInfo;

function ErrorDanger(message) {
  this.name = 'MyError';
  this.message = message || 'Сообщение по умолчанию';
  this.status = 404;
}
ErrorDanger.prototype = Object.create(ErrorDanger.prototype);
ErrorDanger.prototype.constructor = ErrorDanger;