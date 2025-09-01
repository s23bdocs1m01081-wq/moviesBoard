import React, { useEffect, useState } from 'react';

const Navbar = ({ onNavigate, activePage }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    {
      id: 'home',
      name: 'Home',
    },
    {
      id: 'movies',
      name: 'Movies',
    },
    {
      id: 'tv',
      name: 'TV Shows',
    }
  ];

  const handleNavigation = (itemId) => {
    if (onNavigate) {
      onNavigate(itemId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Left - Navigation Menu */}
            <div className="flex items-center space-x-12">
              {/* Logo */}
              <button
                onClick={() => handleNavigation('home')}
                className="text-white text-2xl font-bold hover:text-emerald-400 transition-colors"
              >
                WatchRadar
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-10">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`text-lg font-medium transition-all duration-300 relative ${
                      activePage === item.id 
                        ? 'text-white' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {/* Active indicator */}
                    {activePage === item.id && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Search and Profile */}
            <div className="flex items-center space-x-6">
              {/* Search Icon */}
              <button className="text-white/80 hover:text-white transition-colors p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Notifications */}
              <button className="text-white/80 hover:text-white transition-colors p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5 5-5m-10 10H5m5-5L5 7l5-5" />
                </svg>
              </button>

              {/* Profile */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center border-2 border-white/20">
                  <span className="text-white text-sm font-bold">U</span>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-white/80 hover:text-white p-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-6 pt-6 border-t border-white/10">
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`block w-full text-left text-lg font-medium transition-colors ${
                      activePage === item.id 
                        ? 'text-emerald-400' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              
              {/* Mobile Search */}
              <div className="mt-6 flex items-center bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <svg className="h-5 w-5 text-white/60 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search movies, shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white text-sm focus:outline-none placeholder-white/60 flex-1"
                />
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
