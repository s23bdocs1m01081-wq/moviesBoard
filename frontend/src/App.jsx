
import React, { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import TVDetails from './pages/TVDetails'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import { MovieProvider } from './contexts/MovieContext'
import MovieDetails from './pages/MovieDetails'

function App() {
  const [page, setPage] = useState('home')

  const renderPage = () => {
    // movie:<id> custom route
    if (page && page.startsWith('movie:')) {
      const id = page.split(':')[1];
      return <MovieDetails id={id} />
    }

    // tv:<id> details route
    if (page && page.startsWith('tv:')) {
      const id = page.split(':')[1];
      return <TVDetails id={id} />
    }

    switch (page) {
      case 'home':
        return <Dashboard onNavigate={setPage} />
      case 'movies':
        return <Movies />
      case 'tv':
        return <TVShows />
      case 'favorites':
        return <Favorites />
      case 'profile':
        return <Profile />
      default:
        return <Dashboard onNavigate={setPage} />
    }
  }

  useEffect(() => {
    const handler = (e) => {
      const to = e.detail;
      if (typeof to === 'string' && to.startsWith('movie:')) {
        setPage(to);
      } else if (typeof to === 'string' && to.startsWith('tv:')) {
        setPage(to);
      } else if (to === 'home' || to === 'movies' || to === 'tv' || to === 'favorites' || to === 'profile') {
        setPage(to);
      }
    };
    window.addEventListener('navigate-to', handler);
    return () => window.removeEventListener('navigate-to', handler);
  }, []);

  return (
    <MovieProvider>
      <Layout activePage={page} onNavigate={setPage}>
        {renderPage()}
      </Layout>
    </MovieProvider>
  )
}

export default App