import React from 'react';
import CardList from '../components/CardList';

const PokemonCardListView: React.FC = () => {
  return (
    <div
      style={{
        padding: '20px',
        background: 'linear-gradient(45deg, #fff, #f5f5f5)',
        borderRadius: '8px',
      }}
    >
      <h1
        style={{
          fontFamily: '"Comic Sans MS", cursive, sans-serif',
          color: '#ff6ec4',
          textAlign: 'center',
        }}
      >
        Candy Crush Card Collection
      </h1>
      <CardList />
    </div>
  );
};

export default PokemonCardListView;
