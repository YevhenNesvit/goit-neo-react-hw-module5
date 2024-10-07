import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Отримуємо параметр query з URL при завантаженні компонента
  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam) {
      setQuery(queryParam);
      // Відправляємо запит на API для отримання фільмів
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${queryParam}`,
            {
              headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWRkNGUwZjcwNWI5MmY0ZTkzYTExMDhlMjMwOGIzYSIsIm5iZiI6MTcyODIyNTY5Ny41Mzk0NjEsInN1YiI6IjY3MDE4MWY1NzgzMGMxMzAxZTdkMGU3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xSgDc-sdnYAw5F92tonMxwIOIhQmG6nTX9Hv67FFh-g',
              },
            }
          );
          setMovies(response.data.results);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
      fetchMovies(); // Викликаємо функцію для отримання фільмів
    }
  }, [searchParams]); // Оновлюється при зміні параметрів запиту

  // Обробка сабміту форми
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ query });
    }
  };

  return (
    <div className={styles.movies}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
