import React, { useState } from 'react';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const topRatedMovies = [
    { id: 1, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, genre: 'Drama' },
    { id: 2, title: 'The Godfather', year: 1972, rating: 9.2, genre: 'Crime' },
    { id: 3, title: 'The Dark Knight', year: 2008, rating: 9.0, genre: 'Action' },
    { id: 4, title: 'Pulp Fiction', year: 1994, rating: 8.9, genre: 'Crime' },
    { id: 5, title: 'Forrest Gump', year: 1994, rating: 8.8, genre: 'Drama' },
  ];

  const filteredMovies = topRatedMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, John! Here's what's happening with your movies.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Add New Movie
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Genre Overview Card */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Genre Overview</h3>
              <p className="text-gray-400 text-sm">Most watched genres</p>
            </div>
            <div className="text-2xl">🎭</div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Action</span>
              <span className="text-white font-medium">35%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Drama</span>
              <span className="text-white font-medium">28%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Comedy</span>
              <span className="text-white font-medium">22%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '22%' }}></div>
            </div>
          </div>
        </div>

        {/* Subscription Stats Card */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Subscription Stats</h3>
              <p className="text-gray-400 text-sm">Current period</p>
            </div>
            <div className="text-2xl">📊</div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-white">1,247</div>
            <p className="text-gray-400 text-sm">Active subscribers</p>
            <div className="flex items-center mt-2">
              <span className="text-green-400 text-sm">↗ +12.5%</span>
              <span className="text-gray-400 text-sm ml-2">vs last month</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Premium</span>
              <span className="text-white">892</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">Basic</span>
              <span className="text-white">355</span>
            </div>
          </div>
        </div>

        {/* Device Usage Card */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Device Usage</h3>
              <p className="text-gray-400 text-sm">Last 30 days</p>
            </div>
            <div className="text-2xl">📱</div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-gray-300">Mobile</span>
              </div>
              <span className="text-white font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-gray-300">Desktop</span>
              </div>
              <span className="text-white font-medium">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-gray-300">Tablet</span>
              </div>
              <span className="text-white font-medium">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                <span className="text-gray-300">Smart TV</span>
              </div>
              <span className="text-white font-medium">8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Rated Movies Section */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Top Rated Movies</h3>
            <p className="text-gray-400 text-sm">Highest rated movies in our collection</p>
          </div>
          <div className="mt-4 sm:mt-0 w-full sm:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Search movies..."
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium py-3 px-4">Movie</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Year</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Genre</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Rating</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-medium text-white">{movie.title}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{movie.year}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full">
                      {movie.genre}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-white font-medium">{movie.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
                      <button className="text-green-400 hover:text-green-300 text-sm">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Viewership Analytics Chart Placeholder */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Viewership Analytics</h3>
            <p className="text-gray-400 text-sm">Monthly viewing trends</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
              7D
            </button>
            <button className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg">
              30D
            </button>
            <button className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
              90D
            </button>
          </div>
        </div>
        
        {/* Chart placeholder */}
        <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-gray-400">Viewership Analytics Chart</p>
            <p className="text-gray-500 text-sm">Chart implementation pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;