import React from 'react';

const FilterBar = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-6 border border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        <div className="flex items-center space-x-2">
          <select className="bg-gray-800 text-gray-200 px-3 py-2 rounded">
            <option>All Genres</option>
            <option>Action</option>
            <option>Comedy</option>
            <option>Drama</option>
          </select>
          <select className="bg-gray-800 text-gray-200 px-3 py-2 rounded">
            <option>All Years</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
          <select className="bg-gray-800 text-gray-200 px-3 py-2 rounded">
            <option>Sort: Popular</option>
            <option>Top Rated</option>
            <option>Newest</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 bg-gray-800 rounded hover:bg-gray-700">Movies</button>
          <button className="px-3 py-2 bg-gray-800 rounded hover:bg-gray-700">TV Shows</button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
