import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Use useCallback to memoize the handleSearch function
  const handleSearch = useCallback(async (searchQuery) => {
    // Change the URL with the query
    navigate(`?query=${searchQuery}`);

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`,
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWRkNGUwZjcwNWI5MmY0ZTkzYTExMDhlMjMwOGIzYSIsIm5iZiI6MTcyODIyNTY5Ny41Mzk0NjEsInN1YiI6IjY3MDE4MWY1NzgzMGMxMzAxZTdkMGU3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xSgDc-sdnYAw5F92tonMxwIOIhQmG6nTX9Hv67FFh-g',
        },
      }
    );
    setMovies(response.data.results);
  }, [navigate]); // Make sure to include navigate as a dependency

  // Retrieve query from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('query');
    if (queryParam) {
      setQuery(queryParam);
      handleSearch(queryParam);
    }
  }, [location.search, handleSearch]); // Include handleSearch in the dependency array

  return (
    <div className={styles.movies}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search movies"
      />
      <button onClick={() => handleSearch(query)}>Search</button>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
