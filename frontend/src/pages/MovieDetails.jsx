import React, { useEffect, useState } from 'react';
import { getMovieDetails, getSimilarMovies, getMovieRecommendations } from '../api';
import MovieCard from '../components/MovieCard';

const MovieDetails = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await getMovieDetails(id, { append_to_response: 'videos,credits,images' });
        if (mounted) {
          setData(res);
          // Set the first trailer as active video by default
          const trailer = res.videos?.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer');
          setActiveVideo(trailer || res.videos?.results?.[0]);
        }
      } catch (e) {
        console.error('Error loading movie details', e);
        if (mounted) setError(e?.message || String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  // Load similar movies and recommendations for this specific movie
  useEffect(() => {
    let mounted = true;
    const loadSimilar = async () => {
      if (!id) return;
      setLoadingSimilar(true);
      try {
        const [similarRes, recommendRes] = await Promise.all([
          getSimilarMovies(id),
          getMovieRecommendations(id)
        ]);
        
        if (mounted) {
          // Combine similar and recommendations, remove duplicates
          const similar = similarRes.results || [];
          const recommendations = recommendRes.results || [];
          const allRelated = [...similar, ...recommendations];
          const uniqueMovies = allRelated.filter((movie, index, self) => 
            index === self.findIndex(m => m.id === movie.id)
          );
          setSimilarMovies(uniqueMovies.slice(0, 12));
          setRecommendations([]); // Clear separate recommendations since we combined them
        }
      } catch (e) {
        console.error('Error loading similar content', e);
      } finally {
        if (mounted) setLoadingSimilar(false);
      }
    };
    loadSimilar();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="text-gray-600 dark:text-gray-400">Loading...</div>;
  if (error) return <div className="text-red-500 dark:text-red-400">Error loading movie details.</div>;
  if (!data) return null;

  // choose a good backdrop or poster for banner
  const banner = data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : (data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : null);
  
  // Get all available videos
  const videos = data.videos?.results?.filter(v => v.site === 'YouTube') || [];

  return (
    <div className="text-gray-900 dark:text-white">
      {/* Single Video Trailer Section */}
      {activeVideo && (
        <div className="mb-8">
          <div className="relative aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.key}`}
              title={activeVideo.name}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{activeVideo.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="capitalize bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                {activeVideo.type}
              </span>
              <span>YouTube</span>
              <span>•</span>
              <span>{data.title}</span>
            </div>
            {activeVideo.type === 'Trailer' && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Watch the official trailer for "{data.title}" ({new Date(data.release_date).getFullYear()})
              </p>
            )}
          </div>
        </div>
      )}

      {/* Movie Information Section */}
      {!activeVideo && banner && (
        <div className="w-full h-96 bg-center bg-cover rounded mb-6" style={{ backgroundImage: `url(${banner})` }} />
      )}

      <div className="p-6">
        <div className="flex items-start gap-4">
          <button onClick={() => window.dispatchEvent(new CustomEvent('navigate-to', { detail: 'movies' }))} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">Back to Movies</button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              <span>{new Date(data.release_date).getFullYear()}</span> • 
              <span className="ml-1">{Math.floor(data.runtime / 60)}h {data.runtime % 60}m</span> • 
              <span className="ml-1">{data.genres?.map(g => g.name).join(', ')}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-2">★</span>
              <span className="font-medium">{data.vote_average?.toFixed(1)}</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">({data.vote_count} votes)</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{data.overview}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Cast</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2 mb-8">
          {data.credits?.cast?.slice(0, 12).map(c => (
            <div key={c.cast_id || c.credit_id || c.id} className="text-center text-sm">
              <img src={c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : 'https://via.placeholder.com/80x120?text=No'} alt={c.name} className="w-20 h-28 object-cover rounded mb-1" />
              <div className="text-gray-800 dark:text-gray-200">{c.name}</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs">as {c.character}</div>
            </div>
          ))}
        </div>

        {/* Similar Movies Section - Only for this specific movie */}
        {similarMovies.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Similar Movies</h3>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('navigate-to', { detail: 'movies' }))}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
              >
                View All Movies →
              </button>
            </div>
            {loadingSimilar ? (
              <div className="text-gray-600 dark:text-gray-400 text-center py-8">Loading similar movies...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {similarMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default MovieDetails;
