import React from 'react';

const Sidebar = ({ isOpen, onToggle }) => {
  const menuItems = [
    { icon: '🏠', label: 'Dashboard', active: true },
    { icon: '🎬', label: 'All Movies', active: false },
    { icon: '📺', label: 'TV Shows', active: false },
    { icon: '📝', label: 'Playlists', active: false },
    { icon: '⭐', label: 'Favorites', active: false },
    { icon: '📊', label: 'Analytics', active: false },
    { icon: '🔒', label: 'Security', active: false },
  ];

  const settingsItems = [
    { icon: '⚙️', label: 'Settings' },
    { icon: '❓', label: 'Help & Support' },
    { icon: '🚪', label: 'Logout' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-700 z-30 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">CineMax</h1>
              <p className="text-gray-400 text-sm">Movie Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation menu */}
        <div className="flex-1 py-6">
          <nav className="space-y-2 px-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${item.active 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Subscription info */}
          <div className="mx-4 mt-8 p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg">
            <div className="text-white">
              <h3 className="font-semibold text-sm">Premium Plan</h3>
              <p className="text-red-100 text-xs mt-1">Unlimited access to all content</p>
              <button className="mt-3 text-xs bg-white text-red-600 px-3 py-1 rounded-full font-medium hover:bg-red-50 transition-colors">
                Manage Plan
              </button>
            </div>
          </div>
        </div>

        {/* Settings section */}
        <div className="border-t border-gray-700 p-4">
          <nav className="space-y-2">
            {settingsItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200"
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;