import React from 'react';

interface StrongestPokemonSectionProps {
  strongestPokemons: { name: string; hp: string }[];
}

const StrongestPokemonSection: React.FC<StrongestPokemonSectionProps> = ({ strongestPokemons }) => {
  return (
    <div>
      <h2>🔥 Ash’s Strongest Pokémon</h2>
      <p>These are the Pokémon with the highest HP...</p>
      <ul>
        {strongestPokemons.map((pokemon, index) => (
          <li key={index}>{pokemon.name} - HP: {pokemon.hp}</li>
        ))}
      </ul>
    </div>
  );
};

export default StrongestPokemonSection;