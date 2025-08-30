import React, { useState, useEffect } from 'react';
import MovieDetailsModal from '../components/MovieDetailsModal';

// Sample data - moved outside component to avoid dependency issues
const sampleFavorites = [
  {
    id: 1,
    title: "The Dark Knight",
    year: "2008",
    rating: "9.0",
    genre: "Action, Crime, Drama",
    image: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    addedDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Inception",
    year: "2010",
    rating: "8.8",
    genre: "Action, Sci-Fi, Thriller",
    image: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    overview: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.",
    addedDate: "2024-01-10"
  },
  {
    id: 3,
    title: "Interstellar",
    year: "2014",
    rating: "8.6",
    genre: "Adventure, Drama, Sci-Fi",
    image: "https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    addedDate: "2024-01-08"
  }
];

const sampleWatchlist = [
  {
    id: 4,
    title: "Dune",
    year: "2021",
    rating: "8.0",
    genre: "Adventure, Drama, Sci-Fi",
    image: "https://image.tmdb.org/t/p/w300/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    overview: "Paul Atreides, a brilliant young man born into a great destiny, must travel to the most dangerous planet in the universe to ensure his family's future.",
    addedDate: "2024-01-20"
  },
  {
    id: 5,
    title: "Top Gun: Maverick",
    year: "2022",
    rating: "8.3",
    genre: "Action, Drama",
    image: "https://image.tmdb.org/t/p/w300/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
    overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission.",
    addedDate: "2024-01-18"
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [activeTab, setActiveTab] = useState('favorites');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load from localStorage or use sample data
    const savedFavorites = localStorage.getItem('movieFavorites');
    const savedWatchlist = localStorage.getItem('movieWatchlist');
    
    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : sampleFavorites);
    setWatchlist(savedWatchlist ? JSON.parse(savedWatchlist) : sampleWatchlist);
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
  };

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('movieWatchlist', JSON.stringify(updatedWatchlist));
  };

  const moveToWatched = (movie) => {
    removeFromWatchlist(movie.id);
    // In a real app, you might add to a "watched" list here
  };

  const currentList = activeTab === 'favorites' ? favorites : watchlist;
  const removeFunction = activeTab === 'favorites' ? removeFromFavorites : removeFromWatchlist;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Collection</h1>
        <p className="text-gray-400">Manage your favorite movies and watchlist</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 mb-8">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'favorites'
              ? 'text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
          style={activeTab === 'favorites' ? { backgroundColor: '#FF8408' } : {}}
        >
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Favorites ({favorites.length})</span>
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('watchlist')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'watchlist'
              ? 'text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
          style={activeTab === 'watchlist' ? { backgroundColor: '#FF8408' } : {}}
        >
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Watchlist ({watchlist.length})</span>
          </div>
        </button>
      </div>

      {/* Content */}
      {currentList.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-4">
            {activeTab === 'favorites' ? (
              <svg className="h-24 w-24 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            ) : (
              <svg className="h-24 w-24 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {activeTab === 'favorites' ? 'No favorites yet' : 'Your watchlist is empty'}
          </h3>
          <p className="text-gray-400 mb-6">
            {activeTab === 'favorites' 
              ? 'Start building your favorite movies collection'
              : 'Add movies you want to watch later'
            }
          </p>
          <button className="px-6 py-3 text-white font-semibold rounded-lg transition-colors hover:opacity-90" style={{ backgroundColor: '#FF8408' }}>
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentList.map((movie) => (
            <div 
              key={movie.id} 
              className="rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-200 cursor-pointer hover:scale-105 group" 
              style={{ backgroundColor: '#000000' }}
              onClick={() => handleMovieClick(movie)}
            >
              <div className="relative">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-3">
                    {activeTab === 'watchlist' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveToWatched(movie);
                        }}
                        className="px-4 py-2 text-white font-medium rounded-lg transition-colors hover:opacity-80"
                        style={{ backgroundColor: '#FF8408' }}
                      >
                        Mark Watched
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFunction(movie.id);
                      }}
                      className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{movie.year}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-medium">⭐ {movie.rating}</span>
                  <span className="text-gray-500 text-xs">
                    Added {new Date(movie.addedDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-2">{movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Movie Details Modal */}
      <MovieDetailsModal 
        movie={selectedMovie} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default Favorites;