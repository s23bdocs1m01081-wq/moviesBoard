import React from 'react';

const Dashboard = () => {
  const featuredMovies = [
    {
      id: 1,
      title: "The Dark Knight",
      year: "2008",
      rating: "9.0",
      genre: "Action, Crime, Drama",
      image: "https://via.placeholder.com/300x450/1f2937/ffffff?text=The+Dark+Knight"
    },
    {
      id: 2,
      title: "Inception",
      year: "2010",
      rating: "8.8",
      genre: "Action, Sci-Fi, Thriller",
      image: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Inception"
    },
    {
      id: 3,
      title: "Interstellar",
      year: "2014",
      rating: "8.6",
      genre: "Adventure, Drama, Sci-Fi",
      image: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Interstellar"
    },
    {
      id: 4,
      title: "The Matrix",
      year: "1999",
      rating: "8.7",
      genre: "Action, Sci-Fi",
      image: "https://via.placeholder.com/300x450/1f2937/ffffff?text=The+Matrix"
    }
  ];

  const stats = [
    {
      label: "Total Movies",
      value: "1,247",
      icon: (
        <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5 6v12a2 2 0 002 2h10a2 2 0 002-2V6l-2-2" />
        </svg>
      )
    },
    {
      label: "Watched",
      value: "342",
      icon: (
        <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: "Favorites",
      value: "89",
      icon: (
        <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      label: "Watchlist",
      value: "156",
      icon: (
        <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your movies.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-700">
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
          <button className="text-blue-400 hover:text-blue-300 font-medium">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredMovies.map((movie) => (
            <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
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
                  <button className="text-blue-400 hover:text-blue-300">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
          <button className="text-blue-400 hover:text-blue-300 font-medium">
            View All
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-700">
          <div className="p-6">
            <div className="space-y-4">
              {featuredMovies.slice(0, 3).map((movie) => (
                <div key={movie.id} className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
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
                      <span className="text-gray-500 text-sm ml-4">Watched 2 days ago</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;