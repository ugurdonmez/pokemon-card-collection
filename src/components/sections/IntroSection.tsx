import React from 'react';
import './IntroSection.css';

interface IntroSectionProps {
  totalCards: number;
  rarityCounts: Record<string, number>;
  strongestPokemons: { name: string; hp: string }[];
}

const IntroSection: React.FC<IntroSectionProps> = ({ totalCards, rarityCounts, strongestPokemons }) => {
  const rarestCard = Object.keys(rarityCounts).reduce((a, b) => rarityCounts[a] < rarityCounts[b] ? a : b, '');
  const strongestPokemon = strongestPokemons[0] || { name: 'N/A', hp: 'N/A' };

  return (
    <div className="intro-section">
      <div className="intro-header">
        <h2 className="intro-title">🎴 Welcome to Ash’s Pokémon Card Collection!</h2>
        <p className="intro-description">
          Discover the highlights and fun facts about Ash's amazing Pokémon card collection. Dive in to explore!
        </p>
      </div>

      <div className="intro-content">
        <div className="card fun-facts">
          <h3>🌟 Fun Facts</h3>
          <ul>
            <li><strong>Total Cards:</strong> {totalCards}</li>
            <li><strong>Rarest Card:</strong> {rarestCard}</li>
            <li><strong>Strongest Pokémon:</strong> {strongestPokemon.name} ({strongestPokemon.hp} HP)</li>
          </ul>
        </div>

        <div className="card what-to-expect">
          <h3>🔍 What to Expect</h3>
          <ul>
            <li><strong>Card Types:</strong> Learn about different card types.</li>
            <li><strong>Rarity Distribution:</strong> Breakdown by rarity levels.</li>
            <li><strong>HP Insights:</strong> Explore the HP distribution.</li>
            <li><strong>Strongest Pokémon:</strong> Uncover the top Pokémon.</li>
            <li><strong>Attack Analysis:</strong> Analyze attack damage stats.</li>
            <li><strong>Collection Summary:</strong> Get an overview of the collection.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
