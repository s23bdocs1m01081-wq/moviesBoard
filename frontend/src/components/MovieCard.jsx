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

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      {showTrailer && trailerKey ? (
        <VideoPreview 
          videoKey={trailerKey} 
          poster={movie.image} 
          title={movie.title} 
        />
      ) : (
        <div className="relative">
          <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />
          <button 
            onClick={() => {
              fetchTrailer();
              setShowTrailer(true);
            }}
            className="absolute bottom-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors"
            aria-label="Play trailer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{movie.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{movie.year}</p>
        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-medium">⭐ {movie.rating}</span>
          <div className="flex space-x-2">
            {loading && (
              <span className="text-gray-500 dark:text-gray-400 text-sm">Loading...</span>
            )}
            <button
              onClick={(e) => {
                // Normal click navigates to details page
                window.dispatchEvent(new CustomEvent('navigate-to', { detail: `movie:${movie.id}` }));
                // If user held ctrl/cmd, also open modal (backward compatible)
                if (e.ctrlKey || e.metaKey) {
                  window.dispatchEvent(new CustomEvent('open-movie-modal', { detail: movie.id }));
                }
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
