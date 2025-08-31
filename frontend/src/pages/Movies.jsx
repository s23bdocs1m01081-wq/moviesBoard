import React, { useState, useMemo, useEffect } from 'react';
import { useMovies } from '../contexts/MovieContext';
import { searchMovies } from '../api';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const { movies } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Search movies using API when search query changes
  useEffect(() => {
    const searchMoviesAPI = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchMovies(searchQuery.trim());
        setSearchResults(results.results || []);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      }
      setIsSearching(false);
    };

    const timeoutId = setTimeout(searchMoviesAPI, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Display either search results or default movies
  const displayMovies = searchQuery.trim() ? searchResults : movies;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">Movies</h1>
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-96">
          <input
            type="search"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 dark:border-gray-600 transition-colors duration-200"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {searchQuery ? (
            isSearching ? 'Searching...' : `Found ${displayMovies.length} movie(s) for "${searchQuery}"`
          ) : (
            `Showing ${movies.length} movies`
          )}
        </p>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayMovies.length > 0 ? (
          displayMovies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {isSearching ? 'Searching...' : (
                searchQuery ? 'No movies found matching your search.' : 'No movies available.'
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
