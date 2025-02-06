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
      <h2 className="intro-title">🎴 Welcome to Ash’s Pokémon Card Collection!</h2>
      <p className="intro-text">
        Welcome to the ultimate breakdown of Ash's Pokémon card collection! Here, you'll find detailed insights and fun facts about the cards Ash has collected over the years.
      </p>
      <div className="fun-facts">
        <h3>Fun Facts:</h3>
        <ul>
          <li>The collection includes a total of <strong>{totalCards}</strong> Pokémon cards.</li>
          <li>The rarest card in the collection is the <strong>{rarestCard}</strong> card.</li>
          <li>The Pokémon with the highest HP is <strong>{strongestPokemon.name}</strong> with <strong>{strongestPokemon.hp} HP</strong>.</li>
        </ul>
      </div>
      <div className="what-to-expect">
        <h3>What to Expect:</h3>
        <ul>
          <li><strong>Rarity Distribution:</strong> See how the cards are distributed across different rarity levels.</li>
          <li><strong>HP Distribution:</strong> Understand the health points distribution of the Pokémon cards.</li>
          <li><strong>Card Types:</strong> Explore the different types of cards in the collection.</li>
          <li><strong>Strongest Pokémon:</strong> Discover the Pokémon with the highest HP.</li>
          <li><strong>Attack Damage:</strong> Analyze the attack damage distribution of the Pokémon cards.</li>
          <li><strong>Collection Summary:</strong> Get a summary of the entire collection.</li>
        </ul>
      </div>
      <p className="intro-footer">Let's dive in and explore Ash's amazing Pokémon card collection!</p>
    </div>
  );
};

export default IntroSection;