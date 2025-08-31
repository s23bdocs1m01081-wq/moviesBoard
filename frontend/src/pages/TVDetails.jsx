import React, { useEffect, useState } from 'react';
import { getTVDetails } from '../api';

const TVDetails = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await getTVDetails(id, { append_to_response: 'videos,credits,images,similar,reviews' });
        if (mounted) {
          setData(res);
          // Set the first trailer as active video by default
          const trailer = res.videos?.results?.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
          setActiveVideo(trailer || res.videos?.results?.[0]);
        }
      } catch (e) {
        if (mounted) setError(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="text-gray-600 dark:text-gray-400">Loading...</div>;
  if (error) return <div className="text-red-500 dark:text-red-400">Error loading tv details.</div>;
  if (!data) return null;

  const banner = data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : (data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : null);
  
  // Get all available videos
  const videos = data.videos?.results?.filter(v => v.site === 'YouTube') || [];

  return (
    <div className="text-gray-900 dark:text-white">
      {activeVideo ? (
        <div className="mb-4" style={{ paddingTop: '56.25%', position: 'relative' }}>
          <iframe
            title="video"
            src={`https://www.youtube.com/embed/${activeVideo.key}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        </div>
      ) : banner ? (
        <div className="w-full h-96 bg-center bg-cover rounded mb-6" style={{ backgroundImage: `url(${banner})` }} />
      ) : null}

      <div className="p-6">
        <div className="flex items-start gap-4">
          <button onClick={() => window.dispatchEvent(new CustomEvent('navigate-to', { detail: 'tv' }))} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-3 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">Back to list</button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{data.first_air_date} • {data.episode_run_time?.[0] || '-'}m • {data.genres?.map(g => g.name).join(', ')}</p>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">{data.overview}</p>

        {videos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Videos & Trailers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {videos.map(video => (
                <div 
                  key={video.id} 
                  onClick={() => setActiveVideo(video)}
                  className={`
                    cursor-pointer rounded overflow-hidden border-2 transition-all
                    ${activeVideo?.id === video.id 
                      ? 'border-blue-500 transform scale-105' 
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <div className="relative">
                    <img 
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} 
                      alt={video.name}
                      className="w-full aspect-video object-cover" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-10 transition-all">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 text-xs">
                    <div className="font-medium truncate">{video.name}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">{video.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h3 className="text-xl font-semibold mb-2">Cast</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {data.credits?.cast?.slice(0, 12).map(c => (
            <div key={c.cast_id || c.credit_id} className="text-center text-sm">
              <img src={c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : 'https://via.placeholder.com/80x120?text=No'} alt={c.name} className="w-20 h-28 object-cover rounded mb-1" />
              <div className="text-gray-800 dark:text-gray-200">{c.name}</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs">as {c.character}</div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-2">Seasons</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {data.seasons?.map(s => (
            <div key={s.id} className="bg-white dark:bg-gray-900 rounded overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src={s.poster_path ? `https://image.tmdb.org/t/p/w300${s.poster_path}` : 'https://via.placeholder.com/200x300?text=No'} alt={s.name} className="w-full h-44 object-cover" />
              <div className="p-2 text-sm text-gray-900 dark:text-white">
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {s.episode_count} episodes • {s.air_date?.split('-')[0] || 'TBA'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVDetails;


