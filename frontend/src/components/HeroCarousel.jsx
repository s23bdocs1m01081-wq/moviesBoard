import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    title: 'Trending: The Dark Knight',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=500&fit=crop&q=80',
    genre: 'Action, Crime, Drama'
  },
  {
    id: 2,
    title: 'Featured: Inception',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    image: 'https://images.unsplash.com/photo-1489599387954-9cb1d624e25b?w=1200&h=500&fit=crop&q=80',
    genre: 'Action, Sci-Fi, Thriller'
  },
  {
    id: 3,
    title: 'Spotlight: Interstellar',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=500&fit=crop&q=80',
    genre: 'Adventure, Drama, Sci-Fi'
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full mb-12 overflow-hidden rounded-2xl">
      <div className="relative h-64 md:h-80 lg:h-96">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                filter: 'brightness(0.4)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="relative z-10 flex items-center h-full p-6 md:p-12">
              <div className="max-w-2xl text-white">
                <div className="text-sm font-medium text-blue-400 mb-2">{slide.genre}</div>
                <h2 className="text-2xl md:text-5xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg text-gray-200 mb-6 line-clamp-3">
                  {slide.overview}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l7-5z"/>
                    </svg>
                    Watch Trailer
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
