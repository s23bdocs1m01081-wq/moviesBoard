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

  const goToDetails = (e) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('navigate-to', { detail: `tv:${show.id}` }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      {showTrailer && trailerKey ? (
        <VideoPreview 
          videoKey={trailerKey} 
          poster={poster} 
          title={show.name} 
        />
      ) : (
        <div className="relative">
          <img 
            onClick={goToDetails} 
            src={poster} 
            alt={show.name} 
            className="w-full h-44 object-cover cursor-pointer" 
          />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              fetchTrailer();
              setShowTrailer(true);
            }}
            className="absolute bottom-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-colors"
            aria-label="Play trailer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
      <div className="p-2 text-gray-900 dark:text-white text-sm">
        <div className="font-semibold">{show.name}</div>
        <div className="text-gray-600 dark:text-gray-400 text-xs">{show.first_air_date?.split('-')[0]}</div>
        <div className="mt-2 flex justify-between items-center">
          {loading && (
            <span className="text-gray-500 dark:text-gray-400 text-xs">Loading...</span>
          )}
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              goToDetails(e); 
            }} 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;

