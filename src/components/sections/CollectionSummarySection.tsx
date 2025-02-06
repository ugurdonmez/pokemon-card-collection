import React from 'react';

interface CollectionSummarySectionProps {
  totalCards: number;
}

const CollectionSummarySection: React.FC<CollectionSummarySectionProps> = ({ totalCards }) => {
  return (
    <div>
      <h2>📦 Collection Summary</h2>
      <p>Ash has collected <strong>{totalCards} Pokémon cards</strong>.</p>
    </div>
  );
};

export default CollectionSummarySection;