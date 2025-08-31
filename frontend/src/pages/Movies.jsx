import React from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const { movies } = useMovies();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
