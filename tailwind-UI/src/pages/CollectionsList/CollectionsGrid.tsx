import React from 'react';
import CollectionCard from './CollectionsCard';

const collectionsData = [
  {
    id: 1,
    title: 'People',
    count: '144',
    mainImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    ],
  },
  {
    id: 2,
    title: 'Nature',
    count: '7K',
    mainImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=200&q=80',
    ],
  },
  {
    id: 3,
    title: 'History',
    count: '431',
    mainImage: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=600&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=200&q=80',
    ],
  },
];

const CollectionsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collectionsData.map((collection) => (
        <CollectionCard
          key={collection.id}
          title={collection.title}
          count={collection.count}
          mainImage={collection.mainImage}
          thumbnails={collection.thumbnails}
        />
      ))}
    </div>
  );
};

export default CollectionsGrid;