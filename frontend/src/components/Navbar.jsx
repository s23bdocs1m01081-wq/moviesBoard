import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold text-white">
          🎬 Movies
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-5 5-5-5h5v-12"
            />
          </svg>
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/32x32/64748b/ffffff?text=U"
            alt="User Avatar"
            className="h-8 w-8 rounded-full"
          />
          <span className="text-white text-sm">John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;