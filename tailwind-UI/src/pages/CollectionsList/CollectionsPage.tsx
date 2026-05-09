import React from 'react';
import FilterTags from './FilterTags';
import CollectionsGrid from './CollectionsGrid';

const CollectionsList = () => {
  return (
    <div className="min-h-screen bg-[#DFE2E9] p-4 md:p-10 flex items-center justify-center font-sans">
      
      <div className="w-full max-w-[1200px] bg-[#F2F4F7] rounded-[40px] p-8 md:p-14 shadow-lg relative overflow-hidden">
        
        <h1 className="text-3xl font-bold text-[#1c1b4b] tracking-tight">
          Popular Collections
        </h1>

        <FilterTags />
        <CollectionsGrid />
        
      </div>
    </div>
  );
};

export default CollectionsList;