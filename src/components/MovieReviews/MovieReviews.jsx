import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWRkNGUwZjcwNWI5MmY0ZTkzYTExMDhlMjMwOGIzYSIsIm5iZiI6MTcyODIyNTY5Ny41Mzk0NjEsInN1YiI6IjY3MDE4MWY1NzgzMGMxMzAxZTdkMGU3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xSgDc-sdnYAw5F92tonMxwIOIhQmG6nTX9Hv67FFh-g`,
          },
        }
      );
      setReviews(response.data.results);
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.reviewSection}>
      {reviews.length === 0 ? (
        <p className={styles.noReviews}>We don&apos;t have any review for this movie.</p>
      ) : (
        <ul className={styles.reviewList}>
          {reviews.map(review => (
            <li key={review.id} className={styles.review}>
              <p>{review.content}</p>
              <p><strong>Author:</strong> {review.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
