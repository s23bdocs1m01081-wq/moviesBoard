import React, { useEffect, useState, useRef } from 'react';
import { discoverTV, searchTV, getTVGenres, getSimilarTV, getTVRecommendations, getTVDetails } from '../api';
import TVCard from '../components/TVCard';

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [filters, setFilters] = useState({ with_genres: '', sort_by: 'popularity.desc', year: '', search: '' });
  const [trailerShows, setTrailerShows] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loadingTrailers, setLoadingTrailers] = useState(false);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [showOnlyWithTrailers, setShowOnlyWithTrailers] = useState(false);
  const loader = useRef(null);

  // Load genres for filter dropdown
  useEffect(() => {
    let mounted = true;
    const loadGenres = async () => {
      setLoadingGenres(true);
      try {
        const res = await getTVGenres();
        if (mounted && res && res.genres) setGenres(res.genres);
      } catch (err) {
        // ignore
      } finally {
        setLoadingGenres(false);
      }
    };
    loadGenres();
    return () => { mounted = false; };
  }, []);

  // Load popular TV shows with trailers
  useEffect(() => {
    const loadTrailerShows = async () => {
      setLoadingTrailers(true);
      try {
        const response = await discoverTV({ sort_by: 'popularity.desc' }, 1);
        const showsWithVideos = [];
        
        // Get first 6 popular shows and check for videos
        for (const show of response.results.slice(0, 6)) {
          try {
            const showDetails = await getTVDetails(show.id);
            if (showDetails.videos && showDetails.videos.results.length > 0) {
              showsWithVideos.push({
                ...show,
                videos: showDetails.videos.results.filter(v => v.site === 'YouTube')
              });
            }
            if (showsWithVideos.length >= 6) break;
          } catch (error) {
            console.error('Error loading show details:', error);
          }
        }
        
        setTrailerShows(showsWithVideos);
        if (showsWithVideos.length > 0 && showsWithVideos[0].videos.length > 0) {
          setSelectedVideo(showsWithVideos[0].videos[0]);
        }
      } catch (error) {
        console.error('Error loading trailer shows:', error);
      }
      setLoadingTrailers(false);
    };

    loadTrailerShows();
  }, []);

  // Load similar shows based on first popular show
  useEffect(() => {
    const loadSimilarShows = async () => {
      if (shows.length === 0) return;
      
      setLoadingSimilar(true);
      try {
        const response = await getSimilarTV(shows[0].id);
        setSimilarShows(response.results.slice(0, 8) || []);
      } catch (error) {
        console.error('Error loading similar shows:', error);
        // Fallback to recommendations
        try {
          const response = await getTVRecommendations(shows[0].id);
          setSimilarShows(response.results.slice(0, 8) || []);
        } catch (fallbackError) {
          console.error('Error loading TV recommendations:', fallbackError);
        }
      }
      setLoadingSimilar(false);
    };

    loadSimilarShows();
  }, [shows]);

  // Load shows when page or filters change
  useEffect(() => {
    let mounted = true;
    const load = async (p = 1) => {
      setLoading(true);
      try {
        let res;
        
        // Use search API if there's a search query
        if (filters.search && filters.search.trim()) {
          res = await searchTV(filters.search.trim(), p);
          
          // Add trailer data for search results
          if (res.results && res.results.length > 0) {
            const showsWithTrailers = [];
            for (const show of res.results.slice(0, 8)) {
              try {
                const showDetails = await getTVDetails(show.id, { append_to_response: 'videos' });
                const trailers = showDetails.videos?.results?.filter(v => 
                  v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
                ) || [];
                
                showsWithTrailers.push({
                  ...show,
                  videos: trailers,
                  hasTrailer: trailers.length > 0
                });
              } catch (error) {
                console.error('Error loading show trailers for search:', error);
                showsWithTrailers.push({
                  ...show,
                  videos: [],
                  hasTrailer: false
                });
              }
            }
            res.results = showsWithTrailers;
          }
        } else {
          // Use discover API with filters
          const params = {};
          if (filters.with_genres) params.with_genres = filters.with_genres;
          if (filters.sort_by) params.sort_by = filters.sort_by;
          if (filters.year) params.first_air_date_year = filters.year;
          res = await discoverTV(params, p);
        }
        
        if (!mounted) return;
        setShows(prev => p === 1 ? res.results : [...prev, ...res.results]);
        setTotalPages(res.total_pages || 1);
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load(page);
    return () => { mounted = false; };
  }, [page, filters.with_genres, filters.sort_by, filters.year, filters.search]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !loading && page < totalPages) {
          setPage(p => p + 1);
        }
      });
    }, { root: null, rootMargin: '200px', threshold: 0.1 });

    const el = loader.current;
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [loading, page, totalPages]);

  const onFilterChange = (patch) => {
    setFilters(f => ({ ...f, ...patch }));
    // reset results/page so effect will fetch page 1 with new filters
    setShows([]);
    setPage(1);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">TV Shows</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          {/* Trailer Filter Toggle */}
          {filters.search && filters.search.trim() && (
            <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={showOnlyWithTrailers}
                onChange={(e) => setShowOnlyWithTrailers(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span>Only show shows with trailers</span>
            </label>
          )}
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-96 mb-4 sm:mb-0">
            <input
              type="search"
              placeholder="Search TV shows and trailers..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 dark:border-gray-600 transition-colors duration-200"
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

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400 block">Genre</label>
          <select className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600 transition-colors duration-200" value={filters.with_genres} onChange={e => onFilterChange({ with_genres: e.target.value })}>
            <option value="">All</option>
            {loadingGenres ? <option>Loading...</option> : genres.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400 block">Sort</label>
          <select className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600 transition-colors duration-200" value={filters.sort_by} onChange={e => onFilterChange({ sort_by: e.target.value })}>
            <option value="popularity.desc">Most Popular</option>
            <option value="popularity.asc">Least Popular</option>
            <option value="first_air_date.desc">Newest</option>
            <option value="first_air_date.asc">Oldest</option>
            <option value="vote_average.desc">Highest Rated</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400 block">Year</label>
          <input className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded w-24 border border-gray-300 dark:border-gray-600 transition-colors duration-200" placeholder="e.g. 2020" value={filters.year} onChange={e => onFilterChange({ year: e.target.value })} />
        </div>

        <div className="ml-auto">
          <button className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200" onClick={() => { setFilters({ with_genres: '', sort_by: 'popularity.desc', year: '', search: '' }); setShows([]); setPage(1); }}>
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {shows
          .filter(show => !showOnlyWithTrailers || !filters.search.trim() || show.hasTrailer)
          .map(s => (
            <TVCard 
              key={s.id} 
              show={s} 
              showTrailerInfo={filters.search && filters.search.trim() !== ''} 
            />
          ))}
      </div>

      {/* Available Video Trailers Section - Just Cards */}
      {trailerShows.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Available Video Trailers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trailerShows.map((show) => (
              show.videos.map((video) => (
                <div
                  key={`${show.id}-${video.key}`}
                  className="cursor-pointer rounded-lg overflow-hidden transition-transform hover:scale-105"
                  onClick={() => {
                    // Navigate to TV show details page when trailer card is clicked
                    window.dispatchEvent(new CustomEvent('navigate-to', { detail: `tv:${show.id}` }));
                  }}
                >
                  <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      alt={video.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = show.poster_path 
                          ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                          : '/placeholder-show.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="p-2 bg-white dark:bg-gray-800">
                    <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{show.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate capitalize">{video.type}</p>
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>
      )}

      {/* Similar TV Shows Section */}
      {similarShows.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Similar TV Shows</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {similarShows.map((show) => (
              <TVCard key={show.id} show={show} />
            ))}
          </div>
        </div>
      )}

      <div ref={loader} className="h-16 flex items-center justify-center">
        {loading ? <div className="text-gray-600 dark:text-gray-400">Loading more...</div> : (page >= totalPages ? <div className="text-gray-600 dark:text-gray-400">End of results</div> : null)}
      </div>
    </div>
  );
};

export default TVShows;
