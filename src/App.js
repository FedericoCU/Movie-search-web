import React from 'react';
import { useEffect, useState } from 'react';
import "./App.css";
import SearchIcon from './search.svg'
import MovieCard from './components/MovieCard';


const API_URL = 'http://www.omdbapi.com?apikey=4204626';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchterm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`); //The API url
    const data = await response.json();

    setMovies(data.Search);
  }

  //Movie showed as default, in this case Iron Man
  useEffect(() => {
    searchMovies('Iron Man');
  }, []);


  //search by pressing ENTER
  useEffect(() => {
    const inputEl = document.querySelector('input');
    inputEl.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        searchMovies(inputEl.value)
      }
    });
  }, []);

  return (
    <div className='app'>
      <h1>MovieWorld</h1>
      <h3>A movie search page</h3>
      {/* Search bar*/}
      <div className='search'>
        <input
          placeholder='Find a movie!'
          value={searchTerm}
          onChange={(event) => setSearchterm(event.target.value)} />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {/*Show all movies found at the API, if not, show a message error*/}
      {movies?.length > 0
        ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }
    </div >

  );
}


export default App;
