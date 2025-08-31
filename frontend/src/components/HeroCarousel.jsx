import React from 'react';

const slides = [
  {
    id: 1,
    title: 'Trending: The Dark Knight',
    overview: 'A gritty superhero film that redefined the genre.',
    image: 'https://via.placeholder.com/1200x500/111827/ffffff?text=The+Dark+Knight'
  },
  {
    id: 2,
    title: 'Featured: Inception',
    overview: 'A mind-bending thriller about dreams within dreams.',
    image: 'https://via.placeholder.com/1200x500/111827/ffffff?text=Inception'
  },
  {
    id: 3,
    title: 'Spotlight: Interstellar',
    overview: 'An epic journey through space and time.',
    image: 'https://via.placeholder.com/1200x500/111827/ffffff?text=Interstellar'
  }
];

const HeroCarousel = () => {
  return (
    <div className="w-full mb-8">
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
        {/* static first slide as placeholder */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[0].image})`, filter: 'brightness(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="relative z-10 p-6 md:p-12 text-white max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">{slides[0].title}</h2>
          <p className="text-sm md:text-base text-gray-200 mb-4">{slides[0].overview}</p>
          <div className="space-x-3">
            <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">Watch Trailer</button>
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
