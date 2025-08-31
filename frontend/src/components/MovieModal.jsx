import React from 'react';
import { useMovies } from '../contexts/MovieContext';

const YouTubeEmbed = ({ keyId }) => {
  if (!keyId) return null;
  return (
    <div className="w-full" style={{ paddingTop: '56.25%', position: 'relative' }}>
      <iframe
        title="trailer"
        src={`https://www.youtube.com/embed/${keyId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
};

const MovieModal = ({ isOpen, onClose }) => {
  const { currentDetails } = useMovies();

  if (!isOpen || !currentDetails) return null;

  const trailer = currentDetails.videos && currentDetails.videos.results
    ? currentDetails.videos.results.find(v => v.site === 'YouTube' && v.type === 'Trailer')
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full overflow-hidden transition-colors duration-200">
        <div className="p-4 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{currentDetails.title || currentDetails.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{currentDetails.release_date || currentDetails.first_air_date}</p>
          </div>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Close</button>
        </div>

        {trailer ? (
          <YouTubeEmbed keyId={trailer.key} />
        ) : (
          <div className="p-4 text-gray-600 dark:text-gray-400">No trailer available</div>
        )}

        <div className="p-4">
          <p className="text-gray-700 dark:text-gray-300 mb-2">{currentDetails.overview}</p>
          {currentDetails.credits && (
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-2">Cast</h4>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {currentDetails.credits.cast.slice(0, 8).map((c) => (
                  <div key={c.cast_id} className="text-center text-sm">
                    <img src={c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : 'https://via.placeholder.com/80x120?text=No'} alt={c.name} className="w-20 h-28 object-cover rounded mb-1" />
                    <div className="text-gray-700 dark:text-gray-200">{c.name}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs">as {c.character}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
