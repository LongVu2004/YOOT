import React from 'react';

interface UserProps {
  name: string;
  location: string;
  tags: string[];
  avatar: string;
  isActive?: boolean;
}

const UserGrid = ({ name, location, tags, avatar, isActive }: UserProps) => {
  return (
    <div className={`flex flex-col p-5 rounded-2xl transition-all ${
      isActive 
        ? 'border border-gray-200 bg-[#f1f3f5] shadow-sm' 
        : 'border border-transparent bg-white' // Các thẻ khác trong suốt
    }`}>
      {/* Container chính Avatar | Info */}
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar với class grayscale */}
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-full object-covergrayscale"
        />
        
        {/* Container Text và Tags thẳng hàng với Avatar */}
        <div className="flex flex-col">
          <h3 className="font-bold text-gray-900 text-[17px] leading-tight">{name}</h3>
          <p className="text-gray-600 text-[14px] mt-0.5">{location}</p>
        </div>
      </div>
      
      {/* Tags được đẩy thụt vào để thẳng hàng với Text [Name, Location] */}
      <div className="flex flex-wrap gap-2 pl-[72px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-[13px] text-gray-600 border border-gray-300 rounded-full bg-transparent whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserGrid;