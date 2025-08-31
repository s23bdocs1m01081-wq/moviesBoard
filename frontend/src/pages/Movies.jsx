import React from 'react';
import { useMovies } from '../contexts/MovieContext';

const Movies = () => {
  const { movies } = useMovies();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((m) => (
          <div key={m.id} className="bg-white dark:bg-gray-900 rounded overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <img src={m.image} alt={m.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-gray-900 dark:text-white font-semibold">{m.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{m.year} • ⭐ {m.rating}</p>
              <div className="mt-3">
                <button
                  onClick={(e) => {
                    window.dispatchEvent(new CustomEvent('navigate-to', { detail: `movie:${m.id}` }));
                    if (e.ctrlKey || e.metaKey) {
                      window.dispatchEvent(new CustomEvent('open-movie-modal', { detail: m.id }));
                    }
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
