import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      {/* Enhanced Navbar with navigation tabs */}
      <nav className="border-b border-gray-700 px-4 py-3" style={{ backgroundColor: '#00225B' }}>
        <div className="flex items-center justify-between">
          {/* Mobile menu button and Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-300 hover:text-white lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* MovieHub Logo */}
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🎥</div>
              <div className="text-xl font-bold text-white">MovieHub</div>
            </div>
          </div>

          {/* Navigation Tabs - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-1">
            {['home', 'movies', 'tv-shows', 'favorites', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                  activeTab === tab 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                style={activeTab === tab ? { backgroundColor: '#FF8408' } : {}}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8 hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies, TV shows..."
                className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 border border-gray-600"
                style={{ '--tw-ring-color': '#FF8408' }}
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

          {/* Theme Toggle and User Profile */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="text-gray-300 hover:text-white p-2 rounded-lg transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/32x32/FF8408/ffffff?text=U"
                alt="User Avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-white text-sm hidden sm:block">John Doe</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;