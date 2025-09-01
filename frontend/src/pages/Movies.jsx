import React, { useState, useMemo, useEffect } from 'react';
import { useMovies } from '../contexts/MovieContext';
import { searchMovies, discoverMovies, getSimilarMovies, getMovieRecommendations } from '../api';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const { movies } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [trailerMovies, setTrailerMovies] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loadingTrailers, setLoadingTrailers] = useState(false);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [showOnlyWithTrailers, setShowOnlyWithTrailers] = useState(false);

  // Search movies and their trailers using API when search query changes
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
        const moviesWithTrailers = [];
        
        // Get trailer data for search results
        for (const movie of results.results.slice(0, 8)) {
          try {
            const movieDetails = await import('../api').then(api => api.getMovieDetails(movie.id, { append_to_response: 'videos' }));
            const trailers = movieDetails.videos?.results?.filter(v => 
              v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
            ) || [];
            
            moviesWithTrailers.push({
              ...movie,
              videos: trailers,
              hasTrailer: trailers.length > 0
            });
          } catch (error) {
            console.error('Error loading movie trailers for search:', error);
            moviesWithTrailers.push({
              ...movie,
              videos: [],
              hasTrailer: false
            });
          }
        }
        
        setSearchResults(moviesWithTrailers);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      }
      setIsSearching(false);
    };

    const timeoutId = setTimeout(searchMoviesAPI, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Load popular movies with trailers
  useEffect(() => {
    const loadTrailerMovies = async () => {
      setLoadingTrailers(true);
      try {
        const response = await discoverMovies({ sort_by: 'popularity.desc' }, 1);
        const moviesWithVideos = [];
        
        // Get first 6 popular movies and check for videos
        for (const movie of response.results.slice(0, 6)) {
          try {
            const movieDetails = await import('../api').then(api => api.getMovieDetails(movie.id));
            if (movieDetails.videos && movieDetails.videos.results.length > 0) {
              moviesWithVideos.push({
                ...movie,
                videos: movieDetails.videos.results.filter(v => v.site === 'YouTube')
              });
            }
            if (moviesWithVideos.length >= 6) break;
          } catch (error) {
            console.error('Error loading movie details:', error);
          }
        }
        
        setTrailerMovies(moviesWithVideos);
        if (moviesWithVideos.length > 0 && moviesWithVideos[0].videos.length > 0) {
          setSelectedVideo(moviesWithVideos[0].videos[0]);
        }
      } catch (error) {
        console.error('Error loading trailer movies:', error);
      }
      setLoadingTrailers(false);
    };

    loadTrailerMovies();
  }, []);

  // Load similar movies based on first popular movie
  useEffect(() => {
    const loadSimilarMovies = async () => {
      if (movies.length === 0) return;
      
      setLoadingSimilar(true);
      try {
        const response = await getSimilarMovies(movies[0].id);
        setSimilarMovies(response.results.slice(0, 8) || []);
      } catch (error) {
        console.error('Error loading similar movies:', error);
        // Fallback to recommendations
        try {
          const response = await getMovieRecommendations(movies[0].id);
          setSimilarMovies(response.results.slice(0, 8) || []);
        } catch (fallbackError) {
          console.error('Error loading movie recommendations:', fallbackError);
        }
      }
      setLoadingSimilar(false);
    };

    loadSimilarMovies();
  }, [movies]);

  // Display either search results or default movies, with trailer filter
  const displayMovies = useMemo(() => {
    const baseMovies = searchQuery.trim() ? searchResults : movies;
    if (showOnlyWithTrailers && searchQuery.trim()) {
      return baseMovies.filter(movie => movie.hasTrailer);
    }
    return baseMovies;
  }, [searchQuery, searchResults, movies, showOnlyWithTrailers]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">Movies</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          {/* Trailer Filter Toggle */}
          {searchQuery.trim() && (
            <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={showOnlyWithTrailers}
                onChange={(e) => setShowOnlyWithTrailers(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span>Only show movies with trailers</span>
            </label>
          )}
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <input
              type="search"
              placeholder="Search movies and trailers..."
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
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {searchQuery ? (
            isSearching ? 'Searching movies and trailers...' : 
            `Found ${displayMovies.length} movie(s) for "${searchQuery}" ${searchResults.filter(m => m.hasTrailer).length > 0 ? `(${searchResults.filter(m => m.hasTrailer).length} with trailers)` : ''}`
          ) : (
            `Showing ${movies.length} movies`
          )}
        </p>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {displayMovies.length > 0 ? (
          displayMovies.map((m) => (
            <MovieCard 
              key={m.id} 
              movie={m} 
              showTrailerInfo={searchQuery.trim() !== ''} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {isSearching ? 'Searching movies and trailers...' : (
                searchQuery ? 'No movies found matching your search.' : 'No movies available.'
              )}
            </p>
          </div>
        )}
      </div>

      {/* Available Video Trailers Section - Just Cards */}
      {trailerMovies.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Available Video Trailers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trailerMovies.map((movie) => (
              movie.videos.map((video) => (
                <div
                  key={`${movie.id}-${video.key}`}
                  className="cursor-pointer rounded-lg overflow-hidden transition-transform hover:scale-105"
                  onClick={() => {
                    // Navigate to movie details page when trailer card is clicked
                    window.dispatchEvent(new CustomEvent('navigate-to', { detail: `movie:${movie.id}` }));
                  }}
                >
                  <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      alt={video.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = movie.poster_path 
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : '/placeholder-movie.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="p-2 bg-white dark:bg-gray-800">
                    <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{movie.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate capitalize">{video.type}</p>
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>
      )}

      {/* Similar Movies Section */}
      {similarMovies.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Similar Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {similarMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
