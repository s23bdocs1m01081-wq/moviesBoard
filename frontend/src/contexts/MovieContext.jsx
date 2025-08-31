import React, { createContext, useContext, useEffect, useState } from 'react';
import { getMovieDetails } from '../api';

const MovieContext = createContext(null);


const DEMO_MOVIES = [
  {
    id: 1,
    title: 'The Dark Knight',
    year: '2008',
    rating: 9.0,
    genre: 'Action, Crime, Drama',
    backdrop_path: '/gqby0RhyehP3uRrzmdyUZ0CgPPe.jpg',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    image: 'https://image.tmdb.org/t/p/w500/gqby0RhyehP3uRrzmdyUZ0CgPPe.jpg',
  },
  {
    id: 2,
    title: 'Inception',
    year: '2010',
    rating: 8.8,
    genre: 'Action, Sci-Fi, Thriller',
    backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    image: 'https://image.tmdb.org/t/p/w500/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
  },
  {
    id: 3,
    title: 'Interstellar',
    year: '2014',
    rating: 8.6,
    genre: 'Adventure, Drama, Sci-Fi',
    backdrop_path: '/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    image: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
  },
  {
    id: 4,
    title: 'The Matrix',
    year: '1999',
    rating: 8.7,
    genre: 'Action, Sci-Fi',
    backdrop_path: '/7u3pxc0K1wx32IleAkLv78MKgrw.jpg',
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    image: 'https://image.tmdb.org/t/p/w500/7u3pxc0K1wx32IleAkLv78MKgrw.jpg',
  }
];

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    // Load the static demo movies first
    setMovies(DEMO_MOVIES);

    // Try to fetch a real movie from TMDb (id: 27205) and merge into demo list.
    const tmdbId = import.meta.env.VITE_TMDB_DEMO_ID || '27205';
    const fetchDemo = async () => {
      try {
        const data = await getMovieDetails(tmdbId, { append_to_response: 'videos,credits,images,similar,reviews' });
        if (data) {
          const mapped = {
            id: data.id,
            title: data.title || data.name,
            year: data.release_date ? data.release_date.split('-')[0] : (data.first_air_date ? data.first_air_date.split('-')[0] : ''),
            rating: data.vote_average || 0,
            genre: data.genres ? data.genres.map(g => g.name).join(', ') : '',
            backdrop_path: data.backdrop_path,
            overview: data.overview,
            image: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
            raw: data
          };

          // Insert or replace the movie with same id
          setMovies(prev => {
            const exists = prev.find(m => m.id === mapped.id);
            if (exists) return prev.map(m => (m.id === mapped.id ? mapped : m));
            return [mapped, ...prev];
          });
        }
      } catch (e) {
        // ignore network errors; keep demo data
        // console.error('TMDb fetch failed', e);
      }
    };

    fetchDemo();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {
      // ignore
    }
  }, [favorites]);

  const addFavorite = (movieId) => {
    setFavorites((prev) => {
      if (prev.includes(movieId)) return prev;
      return [...prev, movieId];
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((id) => id !== movieId));
  };

  const isFavorite = (movieId) => favorites.includes(movieId);

  const getMovieById = (id) => movies.find((m) => m.id === id);

  // Fetch full details for a movie on demand
  const [currentDetails, setCurrentDetails] = useState(null);
  const fetchMovieDetailsById = async (id) => {
    try {
      const data = await getMovieDetails(id);
      setCurrentDetails(data);
      return data;
    } catch (e) {
      setCurrentDetails(null);
      throw e;
    }
  };

  const featured = movies.slice(0, 4);

  return (
    <MovieContext.Provider value={{ movies, featured, favorites, addFavorite, removeFavorite, isFavorite, getMovieById, currentDetails, fetchMovieDetailsById }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error('useMovies must be used within MovieProvider');
  return ctx;
};
