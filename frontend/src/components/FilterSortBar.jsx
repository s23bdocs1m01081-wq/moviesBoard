import React, { useState } from 'react';

const FilterSortBar = () => {
  const [contentType, setContentType] = useState('movies');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const genres = [
    'all', 'action', 'adventure', 'animation', 'comedy', 'crime', 'documentary',
    'drama', 'family', 'fantasy', 'history', 'horror', 'music', 'mystery',
    'romance', 'sci-fi', 'thriller', 'war', 'western'
  ];

  const years = ['all', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
  const ratings = ['all', '9+', '8+', '7+', '6+', '5+'];
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'title', label: 'A-Z' }
  ];

  return (
    <div className="rounded-lg p-4 mb-6 border border-gray-700" style={{ backgroundColor: '#00225B' }}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Content Type Toggle */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setContentType('movies')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              contentType === 'movies'
                ? 'text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
            style={contentType === 'movies' ? { backgroundColor: '#FF8408' } : {}}
          >
            Movies
          </button>
          <button
            onClick={() => setContentType('tv-shows')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              contentType === 'tv-shows'
                ? 'text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
            style={contentType === 'tv-shows' ? { backgroundColor: '#FF8408' } : {}}
          >
            TV Shows
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Genre Filter */}
          <div className="relative">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 appearance-none text-sm"
              style={{ '--tw-ring-color': '#FF8408' }}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre.charAt(0).toUpperCase() + genre.slice(1)}
                </option>
              ))}
            </select>
            <svg className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Year Filter */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 appearance-none text-sm"
              style={{ '--tw-ring-color': '#FF8408' }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : year}
                </option>
              ))}
            </select>
            <svg className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Rating Filter */}
          <div className="relative">
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 appearance-none text-sm"
              style={{ '--tw-ring-color': '#FF8408' }}
            >
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating === 'all' ? 'All Ratings' : `${rating} Stars`}
                </option>
              ))}
            </select>
            <svg className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 appearance-none text-sm"
              style={{ '--tw-ring-color': '#FF8408' }}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            setSelectedGenre('all');
            setSelectedYear('all');
            setSelectedRating('all');
            setSortBy('popularity');
          }}
          className="text-gray-300 hover:text-white text-sm transition-colors flex items-center space-x-1"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Clear Filters</span>
        </button>
      </div>
    </div>
  );
};

export default FilterSortBar;