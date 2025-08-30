import React, { useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
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
      id: 'tv-shows',
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
    },
    {
      id: 'watchlist',
      name: 'Watchlist',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    }
  ];

  const filterOptions = [
    { id: 'trending', name: 'Trending', icon: '🔥' },
    { id: 'popular', name: 'Popular', icon: '⭐' },
    { id: 'top-rated', name: 'Top Rated', icon: '🏆' },
    { id: 'upcoming', name: 'Upcoming', icon: '📅' }
  ];

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
    'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-full ${isCollapsed ? 'w-16' : 'w-64'} border-r border-gray-700 transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `} style={{ backgroundColor: '#00225B' }}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            {!isCollapsed && <h2 className="text-lg font-semibold text-white">Navigation</h2>}
            <div className="flex items-center space-x-2">
              {/* Collapse/Expand button for desktop */}
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-gray-300 hover:text-white hidden lg:block p-1 rounded transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                </svg>
              </button>
              {/* Close button for mobile */}
              <button 
                onClick={toggleSidebar}
                className="text-gray-300 hover:text-white lg:hidden p-1 rounded transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveItem(item.id)}
                    className={`
                      w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-3 rounded-lg text-left transition-colors duration-200
                      ${activeItem === item.id 
                        ? 'text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }
                    `}
                    style={activeItem === item.id ? { backgroundColor: '#FF8408' } : {}}
                    title={isCollapsed ? item.name : ''}
                  >
                    {item.icon}
                    {!isCollapsed && <span>{item.name}</span>}
                  </button>
                </li>
              ))}
            </ul>

            {/* Filter Options */}
            {!isCollapsed && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 px-3">FILTERS</h3>
                <ul className="space-y-1">
                  {filterOptions.map((filter) => (
                    <li key={filter.id}>
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors text-sm">
                        <span className="text-base">{filter.icon}</span>
                        <span>{filter.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Genres */}
            {!isCollapsed && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 px-3">GENRES</h3>
                <div className="max-h-48 overflow-y-auto">
                  <ul className="space-y-1">
                    {genres.map((genre) => (
                      <li key={genre}>
                        <button className="w-full text-left px-3 py-1.5 text-gray-400 hover:bg-gray-700 hover:text-white rounded transition-colors text-sm">
                          {genre}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </nav>

          {/* Sidebar Footer */}
          {!isCollapsed && (
            <div className="p-4 border-t border-gray-700">
              <div className="text-xs text-gray-400">
                MovieHub v1.0
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;