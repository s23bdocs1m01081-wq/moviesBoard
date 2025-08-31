import React from 'react';
import HeroCarousel from '../components/HeroCarousel';

const Dashboard = ({ onNavigate }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Welcome Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="text-blue-600">MovieHub</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Discover, track, and enjoy your favorite movies and TV shows all in one place. 
          Create your personalized watchlist and never miss the latest releases.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate && onNavigate('movies')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Explore Movies
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('tv')}
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Browse TV Shows
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose MovieHub?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to enhance your movie and TV watching experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
               onClick={() => onNavigate && onNavigate('movies')}>
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Discover</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Find new movies and TV shows with our advanced search and recommendation system
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Start Exploring →
            </button>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
               onClick={() => onNavigate && onNavigate('favorites')}>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Track</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Keep track of what you've watched and create personalized watchlists
            </p>
            <button className="text-green-600 hover:text-green-700 font-medium">
              View Favorites →
            </button>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
               onClick={() => onNavigate && onNavigate('tv')}>
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Enjoy</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get detailed information, trailers, and reviews for all your favorite content
            </p>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Browse TV Shows →
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white mb-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of movie enthusiasts who use MovieHub to discover and track their favorite entertainment
        </p>
        <button 
          onClick={() => onNavigate && onNavigate('movies')}
          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Get Started Now
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
        <div className="cursor-pointer hover:transform hover:scale-105 transition-transform"
             onClick={() => onNavigate && onNavigate('movies')}>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10K+</div>
          <div className="text-gray-600 dark:text-gray-400">Movies</div>
        </div>
        <div className="cursor-pointer hover:transform hover:scale-105 transition-transform"
             onClick={() => onNavigate && onNavigate('tv')}>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">5K+</div>
          <div className="text-gray-600 dark:text-gray-400">TV Shows</div>
        </div>
        <div className="cursor-pointer hover:transform hover:scale-105 transition-transform">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">1M+</div>
          <div className="text-gray-600 dark:text-gray-400">Users</div>
        </div>
        <div className="cursor-pointer hover:transform hover:scale-105 transition-transform"
             onClick={() => onNavigate && onNavigate('favorites')}>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">99%</div>
          <div className="text-gray-600 dark:text-gray-400">Satisfaction</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;