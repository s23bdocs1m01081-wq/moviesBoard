import React, { useState } from 'react';

const VideoPreview = ({ videoKey, poster, title }) => {
  const [showVideo, setShowVideo] = useState(false);
  
  if (!videoKey) return null;
  
  return (
    <div className="relative">
      {!showVideo ? (
        <div className="relative">
          <img 
            src={poster} 
            alt={title} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <button
              onClick={() => setShowVideo(true)}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 flex items-center justify-center transition-all transform hover:scale-110"
              aria-label="Play trailer"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
            <div className="text-white font-bold">Watch Trailer</div>
          </div>
        </div>
      ) : (
        <div className="w-full" style={{ paddingTop: '56.25%', position: 'relative' }}>
          <iframe
            title={`${title} trailer`}
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPreview;
