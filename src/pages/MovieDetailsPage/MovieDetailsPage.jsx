import { useParams, Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWRkNGUwZjcwNWI5MmY0ZTkzYTExMDhlMjMwOGIzYSIsIm5iZiI6MTcyODIyNTY5Ny41Mzk0NjEsInN1YiI6IjY3MDE4MWY1NzgzMGMxMzAxZTdkMGU3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xSgDc-sdnYAw5F92tonMxwIOIhQmG6nTX9Hv67FFh-g`,
          },
        }
      );
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className={styles.details}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <div>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <div className={styles.links}>
          <Link to="cast">Cast</Link>
          <Link to="reviews">Reviews</Link>
        </div>
      </div>
      <Outlet />
      <Link to="/movies" className={styles.back}>
        Go back
      </Link>
    </div>
  );
};

export default MovieDetailsPage;
