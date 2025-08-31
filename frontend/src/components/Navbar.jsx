import React, { useEffect, useState } from 'react';

const Navbar = ({ onNavigate, activePage }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    {
      id: 'home',
      name: 'Home',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
        </svg>
      )
    },
    {
      id: 'movies',
      name: 'Movies',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5 6v12a2 2 0 002 2h10a2 2 0 002-2V6l-2-2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V9h4v2" />
        </svg>
      )
    },
    {
      id: 'tv',
      name: 'TV Shows',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'favorites',
      name: 'Favorites',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
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
      <nav 
        className="border-b px-4 py-3 transition-colors duration-200 sticky top-0 z-40"
        style={{
          backgroundColor: theme === 'dark' ? 'rgb(17, 24, 39)' : 'white',
          borderColor: theme === 'dark' ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Top section with logo and controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="text-xl font-bold flex items-center space-x-2"
                style={{
                  color: theme === 'dark' ? 'white' : 'rgb(17, 24, 39)'
                }}
              >
                <span className="text-2xl">🎬</span>
                <span>MovieHub</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${activePage === item.id 
                      ? 'bg-blue-600 text-white' 
                      : ''
                    }
                  `}
                  style={{
                    color: activePage === item.id 
                      ? 'white' 
                      : theme === 'dark' ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)',
                    backgroundColor: activePage === item.id 
                      ? 'rgb(37, 99, 235)' 
                      : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (activePage !== item.id) {
                      e.target.style.backgroundColor = theme === 'dark' ? 'rgb(31, 41, 55)' : 'rgb(243, 244, 246)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activePage !== item.id) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-2">
              {/* Search button */}
              <button
                onClick={toggleSearch}
                className="p-2 rounded-full transition-colors duration-200"
                style={{
                  color: theme === 'dark' ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)'
                }}
                aria-label="Search"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)',
                  color: theme === 'dark' ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)'
                }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-lg"
                style={{
                  color: theme === 'dark' ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)'
                }}
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
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="grid grid-cols-2 gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                      ${activePage === item.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search Section - Below Navbar */}
      {isSearchOpen && (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-4 transition-colors duration-200 z-30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Search Movies & TV Shows</h2>
              <button
                onClick={toggleSearch}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-full"
                aria-label="Close search"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative">
              <input
                type="search"
                placeholder="Search movies, TV shows..."
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 dark:border-gray-600 transition-colors duration-200"
                autoFocus
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400"
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
        </div>
      )}
    </>
  );
};


export default Navbar;