// import React from 'react';

interface CollectionCardProps {
  title: string;
  count: string;
  mainImage: string;
  thumbnails: string[];
}

const CollectionCard = ({ title, count, mainImage, thumbnails }: CollectionCardProps) => {
  return (
    <div className="bg-white p-3 border border-gray-200 rounded-md">
      <img
        src={mainImage}
        alt={title}
        className="w-full h-48 object-cover rounded mb-2"
      />

      <div className="flex gap-2 mb-3">
        {thumbnails.map((thumb, index) => (
          <img
            key={index}
            src={thumb}
            alt={`${title} thumbnail ${index + 1}`}
            className="w-1/3 h-16 object-cover rounded"
          />
        ))}
      </div>

      <div className="flex justify-between items-center px-1">
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
        <span className="text-gray-500 text-sm">{count} photos</span>
      </div>
    </div>
  );
};

export default CollectionCard;