import React from 'react';

const FilterTags = () => {
  const tags = ['Profile', 'New York', 'Relaxing', 'Person', 'Fashion'];

  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-6">
      {tags.map((tag, index) => (
        <button
          key={index}
          className="border border-gray-300 bg-white px-3 py-1.5 rounded text-sm text-gray-700 hover:bg-gray-100"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default FilterTags;