import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  //const navigate = useNavigate();
  const location = useLocation();

  // Отримуємо адресу, з якої прийшли, або корінь
  const fromPage = location.state?.from || '/';
  console.log(location);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWRkNGUwZjcwNWI5MmY0ZTkzYTExMDhlMjMwOGIzYSIsIm5iZiI6MTcyODIyNTY5Ny41Mzk0NjEsInN1YiI6IjY3MDE4MWY1NzgzMGMxMzAxZTdkMGU3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xSgDc-sdnYAw5F92tonMxwIOIhQmG6nTX9Hv67FFh-g`,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  // const handleGoBack = () => {
  //   // Повертаємося на адресу, звідки прийшли
  //   navigate(fromPage);
  // };

  return (
    <div className={styles.details}>
      {/* Кнопка Go Back над зображенням */}
      <Link 
        to={location.state}
        className={styles.back} 
        //onClick={handleGoBack} // Виклик функції для повернення
      >
        Go back
      </Link>

      <div className={styles.movieContent}>
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
          className={styles.poster} 
        />
        <div className={styles.movieInfo}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      </div>

      <hr className={styles.separator} />
      <h3>Additional information</h3>
      <div className={styles.additionalLinks}>
        {/* Додаємо state для лінків Cast і Reviews */}
        <Link to="cast" state={{ from: fromPage }}>Cast</Link>
        <Link to="reviews" state={{ from: fromPage }}>Reviews</Link>
      </div>
      <hr className={styles.separator} />
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
