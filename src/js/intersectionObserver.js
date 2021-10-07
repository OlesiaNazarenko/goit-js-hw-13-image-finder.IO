const options = {
      root: null,
      rootMargin: '5px',
      threshold: 0.5
   }
   
   const getObserver = (cb) => new IntersectionObserver(getObserverCb(cb),options )


   function getObserverCb (cb) {
       return function infiniteScroll(entries, observer) {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
             cb()
       }
       })
   }
   }
export default getObserver
