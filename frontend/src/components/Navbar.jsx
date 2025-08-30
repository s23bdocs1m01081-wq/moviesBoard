import React from 'react';

const Navbar = ({ onToggleSidebar, showLogo = false }) => {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
      {/* Left side - Logo for mobile and menu toggle */}
      <div className="flex items-center space-x-4">
        {/* Menu toggle button for mobile */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Logo for mobile view */}
        {showLogo && (
          <div className="lg:hidden flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-white font-semibold">CineMax</span>
          </div>
        )}
      </div>

      {/* Center - Search bar */}
      <div className="flex-1 max-w-lg mx-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Search movies, TV shows..."
          />
        </div>
      </div>

      {/* Right side - User profile and notifications */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-white focus:outline-none relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5-5 5h5zm0 0v-1.5a2.5 2.5 0 00-5 0V17m5 0H10" />
          </svg>
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User profile */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-right">
            <p className="text-white text-sm font-medium">John Doe</p>
            <p className="text-gray-400 text-xs">Premium Member</p>
          </div>
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">JD</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;