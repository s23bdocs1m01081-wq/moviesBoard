import React from 'react';

const MovieDetailsModal = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null;

  const relatedMovies = [
    {
      id: 101,
      title: "Spider-Man: Into the Spider-Verse",
      image: "https://image.tmdb.org/t/p/w300/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
      rating: "8.4"
    },
    {
      id: 102,
      title: "The Dark Knight",
      image: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: "9.0"
    },
    {
      id: 103,
      title: "Iron Man",
      image: "https://image.tmdb.org/t/p/w300/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
      rating: "7.9"
    },
    {
      id: 104,
      title: "Thor: Ragnarok",
      image: "https://image.tmdb.org/t/p/w300/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
      rating: "7.9"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header with backdrop */}
        <div className="relative h-64 md:h-80">
          <img
            src={movie.backdrop || movie.image}
            alt={movie.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Play button */}
          <button className="absolute bottom-4 left-4 flex items-center space-x-2 px-6 py-3 text-white font-semibold rounded-lg transition-colors hover:opacity-90" style={{ backgroundColor: '#FF8408' }}>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span>Watch Trailer</span>
          </button>
        </div>

        <div className="p-6">
          {/* Movie Info */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-48 h-72 object-cover rounded-lg mx-auto lg:mx-0"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
              
              <div className="flex items-center space-x-4 mb-4 text-gray-300">
                <span>{movie.year}</span>
                <span>•</span>
                <span className="flex items-center">
                  <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.rating}/10 (IMDb)
                </span>
                <span>•</span>
                <span>2h 29m</span>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full mr-2" style={{ backgroundColor: '#FF8408' }}>
                  {movie.genre}
                </span>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {movie.overview || "An epic adventure that spans generations, this breathtaking film takes viewers on an unforgettable journey through incredible landscapes and compelling characters. With stunning visuals and a powerful story, it's a cinematic experience that will leave you wanting more."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Add to Favorites</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add to Watchlist</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Director:</span>
                  <span className="text-white ml-2">Christopher Nolan</span>
                </div>
                <div>
                  <span className="text-gray-400">Writers:</span>
                  <span className="text-white ml-2">Jonathan Nolan, Christopher Nolan</span>
                </div>
                <div>
                  <span className="text-gray-400">Stars:</span>
                  <span className="text-white ml-2">Christian Bale, Heath Ledger, Aaron Eckhart</span>
                </div>
                <div>
                  <span className="text-gray-400">Language:</span>
                  <span className="text-white ml-2">English</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Movies */}
          <div className="mt-8 border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Related Movies</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedMovies.map((relatedMovie) => (
                <div key={relatedMovie.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer">
                  <img
                    src={relatedMovie.image}
                    alt={relatedMovie.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="text-white text-sm font-medium mb-1 truncate">{relatedMovie.title}</h4>
                    <div className="flex items-center">
                      <svg className="h-3 w-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-400 text-xs">{relatedMovie.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;