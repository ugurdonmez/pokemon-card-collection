import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import pokemonData from '../data/ash_collection.json';
import './SummaryPage.css';
import IntroSection from '@components/sections/IntroSection';
import RaritySection from '@components/sections/RaritySection';
import HPDistributionSection from '@components/sections/HPDistributionSection';
import CardTypesSection from '@components/sections/CardTypesSection';
import StrongestPokemonSection from '@components/sections/StrongestPokemonSection';
import AttackDamageSection from '@components/sections/AttackDamageSection';
import CollectionSummarySection from '@components/sections/CollectionSummarySection';
import PokemonTypesSection from '@components/sections/PokemonTypesSection';
import PokemonTypesHPBoxplotSection from '@components/sections/PokemonTypesHPBoxplotSection';

// Define Types
interface PokemonCard {
  rarity?: string;
  hp?: string;
  supertype?: string;
  name: string;
  types?: string[];
  attacks?: { damage?: string }[];
}

// Define Sections
// const sections = ['intro', 'type', 'rarity', 'hp', 'strongest', 'damage', 'collectionSize', 'pokemonTypes', 'hpBoxplot'];
const sections = ['intro', 'type', 'rarity', 'hp', 'damage', 'pokemonTypes', 'hpBoxplot'];


const SummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = sections.length;

  // State for processed data
  const [rarityCounts, setRarityCounts] = useState<Record<string, number>>({});
  const [hpBuckets, setHpBuckets] = useState<number[]>([0, 0, 0, 0, 0]);
  const [damageBuckets, setDamageBuckets] = useState<number[]>([0, 0, 0, 0, 0]);
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});
  const [pokemonTypeCounts, setPokemonTypeCounts] = useState<Record<string, number>>({});
  const [strongestPokemons, setStrongestPokemons] = useState<{ name: string; hp: string }[]>([]);
  const [totalCards, setTotalCards] = useState<number>(0);

  useEffect(() => {
    // Initialize maps
    const rarityMap: Record<string, number> = {};
    const typeMap: Record<string, number> = {};
    const pokemonTypeMap: Record<string, number> = {};
    const hpValues: number[] = [];
    const damageValues: number[] = [];
    const topHP: PokemonCard[] = [];

    pokemonData.forEach((card) => {
      if (card.rarity) rarityMap[card.rarity] = (rarityMap[card.rarity] || 0) + 1;
      if (card.supertype) typeMap[card.supertype] = (typeMap[card.supertype] || 0) + 1;

      if (card.types) {
        card.types.forEach((type) => {
          pokemonTypeMap[type] = (pokemonTypeMap[type] || 0) + 1;
        });
      }

      if (card.hp) {
        const hp = Number(card.hp);
        hpValues.push(hp);
        topHP.push(card);
      }

      if (card.attacks) {
        card.attacks.forEach((attack) => {
          const damageValue = parseInt(attack.damage);
          if (!isNaN(damageValue)) {
            damageValues.push(damageValue);
          }
        });
      }
    });

    // Sort top HP Pokémon
    topHP.sort((a, b) => Number(b.hp) - Number(a.hp));
    setStrongestPokemons(topHP.slice(0, 5).map(p => ({ name: p.name, hp: p.hp || 'N/A' })));

    // Group HP into buckets
    const hpRanges = [0, 0, 0, 0, 0];
    hpValues.forEach((hp) => {
      if (hp <= 50) hpRanges[0]++;
      else if (hp <= 100) hpRanges[1]++;
      else if (hp <= 150) hpRanges[2]++;
      else if (hp <= 200) hpRanges[3]++;
      else hpRanges[4]++;
    });
    setHpBuckets(hpRanges);

    // Group Attack Damage into buckets
    const damageRanges = [0, 0, 0, 0, 0];
    damageValues.forEach((damage) => {
      if (damage <= 30) damageRanges[0]++;
      else if (damage <= 60) damageRanges[1]++;
      else if (damage <= 90) damageRanges[2]++;
      else if (damage <= 120) damageRanges[3]++;
      else damageRanges[4]++;
    });
    setDamageBuckets(damageRanges);

    // Set final counts
    setRarityCounts(rarityMap);
    setTypeCounts(typeMap);
    setPokemonTypeCounts(pokemonTypeMap);
    setTotalCards(pokemonData.length);

    // Set initial section from URL
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section && sections.includes(section)) {
      setCurrentSection(sections.indexOf(section));
    }
  }, [location.search]);

  const sectionsData = [
    {
      text: <IntroSection totalCards={totalCards} rarityCounts={rarityCounts} strongestPokemons={strongestPokemons} />,
    },
    {
      text: <CardTypesSection typeCounts={typeCounts} />,
    },
    {
      text: <RaritySection rarityCounts={rarityCounts} />,
    },
    {
      text: <HPDistributionSection hpBuckets={hpBuckets} />,
    },
    // {
    //   text: <StrongestPokemonSection strongestPokemons={strongestPokemons} />,
    // },
    {
      text: <AttackDamageSection damageBuckets={damageBuckets} />,
    },
    // {
    //   text: <CollectionSummarySection totalCards={totalCards} />,
    // },
    {
      text: <PokemonTypesSection pokemonTypeCounts={pokemonTypeCounts} />,
    },
    {
      text: <PokemonTypesHPBoxplotSection pokemonData={pokemonData} />,
    },
  ];

  const handleNext = () => {
    const nextSection = Math.min(currentSection + 1, totalSections - 1);
    setCurrentSection(nextSection);
    navigate(`?section=${sections[nextSection]}`);
  };

  const handlePrev = () => {
    const prevSection = Math.max(currentSection - 1, 0);
    setCurrentSection(prevSection);
    navigate(`?section=${sections[prevSection]}`);
  };

  return (
    <div className="summary-container">
      {/* <h1>📜 Ash's Pokémon Collection Summary</h1> */}

      <div className="viewport">
        <AnimatePresence mode="wait">
          <motion.section key={currentSection} className="summary-section">
            <div>{sectionsData[currentSection].text}</div>
          </motion.section>
        </AnimatePresence>
      </div>

      <div className="navigation-buttons">
        <button onClick={handlePrev} disabled={currentSection === 0}>Previous</button>
        <button onClick={handleNext} disabled={currentSection === totalSections - 1}>Next</button>
      </div>
    </div>
  );
};

export default SummaryPage;