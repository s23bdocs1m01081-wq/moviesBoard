import React, { useState, useEffect } from 'react';
import { getMovieDetails } from '../api';
import VideoPreview from './VideoPreview';

const MovieCard = ({ movie }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch trailer data when requested
  const fetchTrailer = async () => {
    if (trailerKey || loading) return;
    
    setLoading(true);
    try {
      const details = await getMovieDetails(movie.id, { append_to_response: 'videos' });
      const trailer = details.videos?.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer');
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.error('Failed to load trailer:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToDetails = (e) => {
    // Normal click navigates to details page
    window.dispatchEvent(new CustomEvent('navigate-to', { detail: `movie:${movie.id}` }));
    // If user held ctrl/cmd, also open modal (backward compatible)
    if (e.ctrlKey || e.metaKey) {
      window.dispatchEvent(new CustomEvent('open-movie-modal', { detail: movie.id }));
    }
  };

  return (
    <div 
      className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl"
      onClick={navigateToDetails}
    >
      {showTrailer && trailerKey ? (
        <VideoPreview 
          videoKey={trailerKey} 
          poster={movie.image} 
          title={movie.title} 
        />
      ) : (
        <div className="relative group">
          <img 
            src={movie.image} 
            alt={movie.title} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              fetchTrailer();
              setShowTrailer(true);
            }}
            className="absolute bottom-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors hover:scale-110 hover:shadow-lg"
            aria-label="Play trailer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="inline-block bg-yellow-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
              ⭐ {movie.rating}
            </span>
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{movie.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{movie.year}</p>
        <div className="flex items-center justify-between">
          {loading && (
            <span className="text-gray-500 dark:text-gray-400 text-sm">Loading...</span>
          )}
          <div className="text-xs inline-flex items-center">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
              {movie.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
