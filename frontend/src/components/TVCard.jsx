import React, { useState } from 'react';
import { getTVDetails } from '../api';
import VideoPreview from './VideoPreview';

const TVCard = ({ show, onClick }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(false);

  const poster = show.poster_path ? `https://image.tmdb.org/t/p/w300${show.poster_path}` : 'https://via.placeholder.com/200x300?text=No';

  // Fetch trailer data when requested
  const fetchTrailer = async () => {
    if (trailerKey || loading) return;
    
    setLoading(true);
    try {
      const details = await getTVDetails(show.id, { append_to_response: 'videos' });
      const trailer = details.videos?.results?.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.error('Failed to load trailer:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToDetails = () => {
    window.dispatchEvent(new CustomEvent('navigate-to', { detail: `tv:${show.id}` }));
  };

  return (
    <div 
      className="bg-white dark:bg-gray-900 rounded overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl"
      onClick={goToDetails}
    >
      {showTrailer && trailerKey ? (
        <VideoPreview 
          videoKey={trailerKey} 
          poster={poster} 
          title={show.name} 
        />
      ) : (
        <div className="relative group">
          <img 
            src={poster} 
            alt={show.name} 
            className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              fetchTrailer();
              setShowTrailer(true);
            }}
            className="absolute bottom-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-all duration-200 hover:scale-110 hover:shadow-lg"
            aria-label="Play trailer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-2 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-center">
            <span className="inline-block bg-purple-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
              TV Show
            </span>
          </div>
        </div>
      )}
      <div className="p-2 text-gray-900 dark:text-white text-sm">
        <div className="font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{show.name}</div>
        <div className="text-gray-600 dark:text-gray-400 text-xs">{show.first_air_date?.split('-')[0]}</div>
        <div className="mt-2 flex justify-between items-center">
          {loading && (
            <span className="text-gray-500 dark:text-gray-400 text-xs">Loading...</span>
          )}
          <div className="text-xs">
            <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded-full">
              {show.first_air_date?.split('-')[0] || 'Upcoming'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVCard;

