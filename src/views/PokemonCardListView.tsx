import React from 'react';
import CardList from '../components/CardList';

const PokemonCardListView: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Pokémon Card Collection</h1>
      <CardList />
    </div>
  );
};

export default PokemonCardListView;
