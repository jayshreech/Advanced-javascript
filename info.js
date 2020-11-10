const API_KEY = 'f51b7a4f8cd4f93d8866c287714989a8';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=f51b7a4f8cd4f93d8866c287714989a8';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const searchButton = document.querySelector('#search');
const searchInput = document.querySelector('#exampleInputEmail1');
const moviesSearchable = document.querySelector('#movies-searchable');
const moviesContainer = document.querySelector('#movies-container');


function generateUrl(path){
    const url= `https://api.themoviedb.org/3${path}?api_key=f51b7a4f8cd4f93d8866c287714989a8` ;
    return url;
}

function requestMovies(url,onComplete,onError){
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onerror) ;
            
}

function movieSection(movies) {
    return movies.map((movie)=> 
    { if(movie.poster_path){
        return  ` 
          <img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}/>
        `;
    }
    })
}

function renderSearchMovies(data) {
    const movies = data.results;
    const movieBlock =  createMovieContainer(movies);
     moviesSearchable.appendChild(movieBlock)
    console.log('Data:',data);
}

function renderMovies(data) {
    const movies = data.results;
    const movieBlock =  createMovieContainer(movies,this.title);
    moviesContainer.appendChild(movieBlock)
    
}


function createMovieContainer(movies,title = '') {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const template = `
         <h2>${title}</h2>
         <section class="section">
         ${movieSection(movies)}
         </section>
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

    movieElement.innerHTML = template;
   
    return movieElement;
}

function searchMovie(value){
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;
     
    requestMovies(url,renderSearchMovies,handleError);
}

function getUpcomingMovies(){
    const path = '/movie/upcoming';
    const url = generateUrl(path);
    const render = renderMovies.bind({title:'Upcoming Movies'}); 
    requestMovies(url,render,handleError);
}
getUpcomingMovies();

function getTopRatedMovies(){
    const path = '/movie/top_rated';
    const url = generateUrl(path);
    const render = renderMovies.bind({title:'Top Rated Movies'});  
    requestMovies(url,render,handleError);
}
getTopRatedMovies();

function getPopularMovies(){
    const path = '/movie/popular';
    const url = generateUrl(path);
    const render = renderMovies.bind({title:'Most Popular Movies'});  
    requestMovies(url,render,handleError);
}
getPopularMovies();

function handleError(error){
    console.log('Error: ',error);
}
searchButton.onclick= function(event) {
    event.preventDefault();
    const value = searchInput.value;
    
    searchMovie(value);
    console.log('Value:',value);
}

function createIframe(video) {
   
    const iframe = document.createElement('iframe');
    iframe.src = `http://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;
    return iframe;
}

function createVideoTemplate(data,content){
    content.innerHTML = '<p id="content-close">X</p>';
    console.log('Videos: ',data);
    const videos = data.results;
    const length = videos.length > 4 ? 4: videos.length;
    const iframeContainer = document.createElement('div');
    for(let i=0;i<videos.length;i++){
          const video = videos[i] ;
          const iframe = createIframe(video);
          iframeContainer.appendChild(iframe);
          content.appendChild(iframeContainer);
    }
}

document.onclick = function(event) {
          const target = event.target;
          if(target.tagName.toLowerCase() === 'img'){
              const movieId = target.dataset.movieId;
              console.log('Movie ID: ',movieId);
              console.log('Event:', event);
              const section = event.target.parentElement;
              const content = section.nextElementSibling;
              content.classList.add('content-display');
      
      const path=`/movie/${movieId}videos`;
      const url = generateUrl(path);


    fetch(url)
        .then((res) => res.json())
        .then((data)=> createVideoTemplate(data,content))
            
        
        .catch((error) => {
            console.log('Error:',error);
            });
           

          }

          if(target.id === 'content-close'){
              const content = target.parentElement;
              content.classList.remove('content-display');
          }
}