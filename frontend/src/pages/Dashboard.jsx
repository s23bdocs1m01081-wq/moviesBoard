import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import FilterSortBar from '../components/FilterSortBar';
import MovieDetailsModal from '../components/MovieDetailsModal';

const Dashboard = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredMovies = [
    {
      id: 1,
      title: "The Dark Knight",
      year: "2008",
      rating: "9.0",
      genre: "Action, Crime, Drama",
      image: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
      overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    {
      id: 2,
      title: "Inception",
      year: "2010",
      rating: "8.8",
      genre: "Action, Sci-Fi, Thriller",
      image: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
      overview: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state."
    },
    {
      id: 3,
      title: "Interstellar",
      year: "2014",
      rating: "8.6",
      genre: "Adventure, Drama, Sci-Fi",
      image: "https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
      id: 4,
      title: "The Matrix",
      year: "1999",
      rating: "8.7",
      genre: "Action, Sci-Fi",
      image: "https://image.tmdb.org/t/p/w300/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
      overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
    },
    {
      id: 5,
      title: "Avengers: Endgame",
      year: "2019",
      rating: "8.4",
      genre: "Action, Adventure, Drama",
      image: "https://image.tmdb.org/t/p/w300/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
      overview: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe."
    },
    {
      id: 6,
      title: "Spider-Man: No Way Home",
      year: "2021",
      rating: "8.2",
      genre: "Action, Adventure, Sci-Fi",
      image: "https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
      overview: "Peter Parker's secret identity is revealed to the entire world. When he asks for help from Doctor Strange, the stakes become even more dangerous."
    },
    {
      id: 7,
      title: "Dune",
      year: "2021",
      rating: "8.0",
      genre: "Adventure, Drama, Sci-Fi",
      image: "https://image.tmdb.org/t/p/w300/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
      overview: "Paul Atreides, a brilliant young man born into a great destiny, must travel to the most dangerous planet in the universe to ensure his family's future."
    },
    {
      id: 8,
      title: "Top Gun: Maverick",
      year: "2022",
      rating: "8.3",
      genre: "Action, Drama",
      image: "https://image.tmdb.org/t/p/w300/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
      overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission."
    }
  ];

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const stats = [
    {
      label: "Total Movies",
      value: "1,247",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FF8408' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5 6v12a2 2 0 002 2h10a2 2 0 002-2V6l-2-2" />
        </svg>
      )
    },
    {
      label: "Watched",
      value: "342",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FF8408' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: "Favorites",
      value: "89",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FF8408' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      label: "Watchlist",
      value: "156",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FF8408' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Filter & Sort Bar */}
      <FilterSortBar />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-lg p-6 border border-gray-700" style={{ backgroundColor: '#000000' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className="flex-shrink-0">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Movies Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Movies</h2>
          <button className="font-medium transition-colors hover:opacity-80" style={{ color: '#FF8408' }}>
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredMovies.map((movie) => (
            <div 
              key={movie.id} 
              className="rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-200 cursor-pointer hover:scale-105" 
              style={{ backgroundColor: '#000000' }}
              onClick={() => handleMovieClick(movie)}
            >
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{movie.year}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-medium">⭐ {movie.rating}</span>
                  <button 
                    className="transition-colors hover:opacity-80"
                    style={{ color: '#FF8408' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to favorites functionality
                    }}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-500 text-xs mt-2">{movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Watched Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recently Watched</h2>
          <button className="font-medium transition-colors hover:opacity-80" style={{ color: '#FF8408' }}>
            View All
          </button>
        </div>

        <div className="rounded-lg border border-gray-700" style={{ backgroundColor: '#000000' }}>
          <div className="p-6">
            <div className="space-y-4">
              {featuredMovies.slice(0, 3).map((movie) => (
                <div 
                  key={movie.id} 
                  className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{movie.title}</h4>
                    <p className="text-gray-400 text-sm">{movie.year} • {movie.genre}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-400 text-sm">⭐ {movie.rating}</span>
                      <div className="flex-1"></div>
                      <button className="px-3 py-1 text-xs font-medium rounded-full transition-colors hover:opacity-80" style={{ backgroundColor: '#FF8408', color: 'white' }}>
                        Watch Again
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details Modal */}
      <MovieDetailsModal 
        movie={selectedMovie} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default Dashboard;