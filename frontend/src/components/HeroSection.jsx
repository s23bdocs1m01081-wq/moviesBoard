import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroItems = [
    {
      id: 1,
      title: "Avengers: Endgame",
      overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos' actions.",
      backdrop: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
      year: "2019",
      rating: "8.4",
      genre: "Action, Adventure, Drama"
    },
    {
      id: 2,
      title: "Spider-Man: No Way Home",
      overview: "Peter Parker's secret identity is revealed to the entire world. When he asks for help from Doctor Strange, the stakes become even more dangerous.",
      backdrop: "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
      year: "2021",
      rating: "8.2",
      genre: "Action, Adventure, Sci-Fi"
    },
    {
      id: 3,
      title: "Dune",
      overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe.",
      backdrop: "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
      year: "2021",
      rating: "8.0",
      genre: "Adventure, Drama, Sci-Fi"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroItems.length]);

  const currentItem = heroItems[currentSlide];

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg mb-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${currentItem.backdrop})`
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12">
        <div className="max-w-2xl">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full" style={{ backgroundColor: '#FF8408' }}>
              TRENDING NOW
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {currentItem.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-4 text-gray-300">
            <span>{currentItem.year}</span>
            <span>•</span>
            <span className="flex items-center">
              <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {currentItem.rating}
            </span>
            <span>•</span>
            <span>{currentItem.genre}</span>
          </div>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            {currentItem.overview}
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-3 text-white font-semibold rounded-lg transition-colors hover:opacity-90" style={{ backgroundColor: '#FF8408' }}>
              <div className="flex items-center justify-center space-x-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Watch Trailer</span>
              </div>
            </button>
            
            <button className="px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg transition-colors hover:bg-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>More Info</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + heroItems.length) % heroItems.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-white hover:bg-black hover:bg-opacity-50 rounded-full transition-colors"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % heroItems.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white hover:bg-black hover:bg-opacity-50 rounded-full transition-colors"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default HeroSection;