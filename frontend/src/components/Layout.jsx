import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MovieModal from './MovieModal';
import { useEffect } from 'react';

const Layout = ({ children, activePage, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const handler = async (e) => {
      const id = e.detail;
      try {
        // fetch details via context function dispatched globally
        // we import via window to avoid cyclic imports in this small app
        const { fetchMovieDetailsById } = await import('../contexts/MovieContext').then(m => m);
        if (fetchMovieDetailsById) await fetchMovieDetailsById(id);
      } catch (err) {
        // ignore
      }
      setModalOpen(true);
    };
    window.addEventListener('open-movie-modal', handler);
    return () => window.removeEventListener('open-movie-modal', handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors duration-200">
      {/* Use Navbar component and pass handlers */}
      <Navbar
        onToggleSidebar={toggleSidebar}
        activePage={activePage}
        onNavigate={onNavigate}
      />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} onNavigate={onNavigate} />
        
        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
      <MovieModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};



export default Layout;