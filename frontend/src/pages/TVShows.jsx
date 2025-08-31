import React, { useEffect, useState, useRef } from 'react';
import { discoverTV, getTVGenres } from '../api';
import TVCard from '../components/TVCard';

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [filters, setFilters] = useState({ with_genres: '', sort_by: 'popularity.desc', year: '' });
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

  // Load shows when page or filters change
  useEffect(() => {
    let mounted = true;
    const load = async (p = 1) => {
      setLoading(true);
      try {
        const params = {};
        if (filters.with_genres) params.with_genres = filters.with_genres;
        if (filters.sort_by) params.sort_by = filters.sort_by;
        if (filters.year) params.first_air_date_year = filters.year;

        const res = await discoverTV(params, p);
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
  }, [page, filters.with_genres, filters.sort_by, filters.year]);

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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">TV Shows</h1>

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
          <button className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200" onClick={() => { setFilters({ with_genres: '', sort_by: 'popularity.desc', year: '' }); setShows([]); setPage(1); }}>
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {shows.map(s => (
          <TVCard key={s.id} show={s} />
        ))}
      </div>

      <div ref={loader} className="h-16 flex items-center justify-center">
        {loading ? <div className="text-gray-600 dark:text-gray-400">Loading more...</div> : (page >= totalPages ? <div className="text-gray-600 dark:text-gray-400">End of results</div> : null)}
      </div>
    </div>
  );
};

export default TVShows;
