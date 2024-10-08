import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWRkNGUwZjcwNWI5MmY0ZTkzYTExMDhlMjMwOGIzYSIsIm5iZiI6MTcyODIyNTY5Ny41Mzk0NjEsInN1YiI6IjY3MDE4MWY1NzgzMGMxMzAxZTdkMGU3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xSgDc-sdnYAw5F92tonMxwIOIhQmG6nTX9Hv67FFh-g`,
          },
        }
      );
      setCast(response.data.cast);
    };
    fetchCast();
  }, [movieId]);

  return (
    <ul className={styles.castList}>
      {cast.map(actor => (
        <li key={actor.id} className={styles.actor}>
          <img 
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} 
          alt=''
          className={styles.poster}
        />
          {actor.name} as {actor.character}
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
