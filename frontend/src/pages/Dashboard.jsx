import React, { useState, useEffect } from 'react';

const Dashboard = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero carousel data with real movies and TV shows
  const heroSlides = [
    {
      id: 1,
      title: "RAYA",
      subtitle: "THE LAST DRAGON",
      type: "movie",
      description: "Long ago, in the fantasy world of Kumandra, humans and dragons lived together in harmony. However, when sinister monsters known as the Druun threatened the land, the dragons sacrificed themselves to save humanity.",
      image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=1920&h=1080&fit=crop&q=80",
      year: "2021",
      rating: "98% Match",
      genres: ["Animation", "Action", "Adventure"],
      studio: "A Disney Original"
    },
    {
      id: 2,
      title: "STRANGER THINGS",
      subtitle: "SEASON 4",
      type: "tv",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&q=80",
      year: "2022",
      rating: "95% Match",
      genres: ["Drama", "Fantasy", "Horror"],
      studio: "Netflix Original"
    },
    {
      id: 3,
      title: "AVENGERS",
      subtitle: "ENDGAME",
      type: "movie",
      description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos' actions.",
      image: "https://images.unsplash.com/photo-1635863138275-d9864d4d1633?w=1920&h=1080&fit=crop&q=80",
      year: "2019",
      rating: "92% Match",
      genres: ["Action", "Adventure", "Drama"],
      studio: "Marvel Studios"
    },
    {
      id: 4,
      title: "THE MANDALORIAN",
      subtitle: "CHAPTER 1",
      type: "tv",
      description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080&fit=crop&q=80",
      year: "2019",
      rating: "89% Match",
      genres: ["Action", "Adventure", "Sci-Fi"],
      studio: "Disney+ Original"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleWatchNow = () => {
    const currentMovie = heroSlides[currentSlide];
    onNavigate && onNavigate(`${currentMovie.type}:${currentMovie.id}`);
  };

  const handleWatchTrailer = () => {
    const currentMovie = heroSlides[currentSlide];
    // Could open trailer modal or navigate to trailer page
    console.log(`Watch trailer for ${currentMovie.title}`);
  };

  const currentHero = heroSlides[currentSlide];

  const popularMovies = [
    {
      id: 1,
      title: "The Dark Knight",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop&q=80",
      rating: "9.0",
      genre: "Action"
    },
    {
      id: 2,
      title: "Inception",
      image: "https://images.unsplash.com/photo-1489599412792-c0cc2b30a9cd?w=300&h=450&fit=crop&q=80",
      rating: "8.8",
      genre: "Sci-Fi"
    },
    {
      id: 3,
      title: "Interstellar",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop&q=80",
      rating: "8.6",
      genre: "Drama",
      featured: true
    },
    {
      id: 4,
      title: "Avatar",
      image: "https://images.unsplash.com/photo-1635863138275-d9864d4d1633?w=300&h=450&fit=crop&q=80",
      rating: "7.8",
      genre: "Adventure"
    },
    {
      id: 5,
      title: "Avengers",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop&q=80",
      rating: "8.4",
      genre: "Action"
    },
    {
      id: 6,
      title: "Spider-Man",
      image: "https://images.unsplash.com/photo-1635863138275-d9864d4d1633?w=300&h=450&fit=crop&q=80",
      rating: "8.2",
      genre: "Action"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative">
      {/* Full-Screen Hero Carousel */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image - Full area including navbar */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${currentHero.image}')`
          }}
        >
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center h-full px-8 lg:px-16 pt-24">
          <div className="max-w-3xl">
            {/* Genre Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              {currentHero.genres.map((genre, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Studio and Title */}
            <div className="mb-8">
              <div className="text-white/80 text-lg mb-4 font-medium">{currentHero.studio}</div>
              <h1 className="text-6xl lg:text-8xl font-bold text-emerald-400 mb-2 tracking-wider">
                {currentHero.title}
              </h1>
              <h2 className="text-3xl lg:text-5xl font-light text-white mb-6 tracking-wide">
                {currentHero.subtitle}
              </h2>
              
              {/* Movie Info */}
              <div className="flex items-center space-x-6 text-white/80 mb-8">
                <span className="text-lg">{currentHero.studio}</span>
                <span className="flex items-center text-emerald-400">
                  <span className="text-2xl mr-2">★</span>
                  <span className="text-lg font-semibold">{currentHero.rating}</span>
                </span>
                <span className="text-lg">{currentHero.year}</span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">
                  {currentHero.type.toUpperCase()}
                </span>
              </div>

              {/* Description */}
              <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-2xl">
                {currentHero.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleWatchNow}
                className="flex items-center space-x-3 bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Watch Now</span>
              </button>
              
              <button 
                onClick={handleWatchTrailer}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 border border-white/30"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-7a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Watch Trailer</span>
              </button>

              <button className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl transition-all duration-300 border border-white/30">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex space-x-3 z-20">
          <button 
            onClick={prevSlide}
            className="w-14 h-14 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/20"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="w-14 h-14 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/20"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-emerald-400 w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Slide Information */}
        <div className="absolute bottom-8 right-8 text-white/60 text-sm z-20">
          {currentSlide + 1} / {heroSlides.length}
        </div>
      </div>

      {/* Popular Movies Section */}
      <div className="px-8 lg:px-16 py-16 bg-black">
        <h2 className="text-4xl font-bold text-white mb-12">Popular Movies</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {popularMovies.map((movie) => (
            <div 
              key={movie.id}
              className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                movie.featured ? 'ring-2 ring-emerald-400' : ''
              }`}
              onClick={() => onNavigate && onNavigate(`movie:${movie.id}`)}
            >
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4 shadow-2xl">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-emerald-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-semibold">
                  ★ {movie.rating}
                </div>

                {/* Featured Badge */}
                {movie.featured && (
                  <div className="absolute top-3 left-3 bg-emerald-500 text-black text-xs px-3 py-1 rounded-full font-bold">
                    FEATURED
                  </div>
                )}
              </div>
              
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-emerald-400 transition-colors">
                  {movie.title}
                </h3>
                <p className="text-white/60 text-sm">{movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-8 lg:px-16 py-16 bg-gray-900/50">
        <h2 className="text-4xl font-bold text-white mb-12">Trending This Week</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularMovies.slice(0, 4).map((movie, index) => (
            <div 
              key={`trending-${movie.id}`}
              className="group cursor-pointer"
              onClick={() => onNavigate && onNavigate(`movie:${movie.id}`)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-xl">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Ranking Number */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <h3 className="text-white font-semibold text-lg group-hover:text-emerald-400 transition-colors">
                {movie.title}
              </h3>
              <p className="text-white/60 text-sm">{movie.genre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
