import React from 'react';
import { useMovies } from '../contexts/MovieContext';

const Dashboard = () => {
  const { featured } = useMovies();

  const stats = [
    { label: 'Total Movies', value: featured.length + 1243 },
    { label: 'Watched', value: 342 },
    { label: 'Favorites', value: 89 },
    { label: 'Watchlist', value: 156 }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your movies.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className="flex-shrink-0">
                {/* icon placeholder */}
                <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Movies Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Movies</h2>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200">View All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((movie) => (
            <div key={movie.id} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
              <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{movie.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{movie.year}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-500 font-medium">⭐ {movie.rating}</span>
                  <button
                    onClick={(e) => {
                      window.dispatchEvent(new CustomEvent('navigate-to', { detail: `movie:${movie.id}` }));
                      if (e.ctrlKey || e.metaKey) {
                        window.dispatchEvent(new CustomEvent('open-movie-modal', { detail: movie.id }));
                      }
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    Details
                  </button>
                </div>
                <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">{movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;