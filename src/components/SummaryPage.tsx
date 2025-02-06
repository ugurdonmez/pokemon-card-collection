import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import pokemonData from '../data/ash_collection.json';
import * as echarts from 'echarts';
import './SummaryPage.css';
import IntroSection from '@components/sections/IntroSection';
import RaritySection from '@components/sections/RaritySection';
import HPDistributionSection from './sections/HPDistributionSection';
import CardTypesSection from './sections/CardTypesSection';

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
const sections = ['intro', 'rarity', 'hp', 'type', 'strongest', 'damage', 'collectionSize', 'pokemonTypes'];

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
    let topHP: PokemonCard[] = [];

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

  const pokemonTypeChartOptions: echarts.EChartsOption = {
    title: { text: 'Pokémon Types Distribution', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: '70%',
        data: Object.entries(pokemonTypeCounts).map(([type, count]) => ({ name: type, value: count })),
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    ],
    animationEasing: 'elasticOut',
    animationDelay: (idx) => idx * 100,
  };

  const damageChartOptions: echarts.EChartsOption = {
    title: { text: 'Attack Damage Distribution', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['0-30', '31-60', '61-90', '91-120', '121+'], name: 'Damage Range' },
    yAxis: { type: 'value', name: 'Number of Attacks' },
    series: [{ type: 'bar', data: damageBuckets }],
  };

  const sectionsData = [
    {
      title: '🎴 Welcome to Ash’s Pokémon Card Collection!',
      text: <IntroSection totalCards={totalCards} rarityCounts={rarityCounts} strongestPokemons={strongestPokemons} />,
      chart: null,
    },
    {
      title: '🃏 Understanding Pokémon Rarity',
      text: <RaritySection rarityCounts={rarityCounts} />,
      chart: null,
    },
    {
      title: '💪 What is HP (Health Points)?',
      text: <HPDistributionSection hpBuckets={hpBuckets} />,
      chart: null,
    },
    {
      title: '📚 What are Pokémon Card Types?',
      text: <CardTypesSection typeCounts={typeCounts} />,
      chart: null,
    },
    { title: '🔥 Ash’s Strongest Pokémon', text: 'These are the Pokémon with the highest HP...', chart: null, list: strongestPokemons.map((p) => `${p.name} - HP: ${p.hp}`) },
    { title: '⚔️ Attack Damage Explained', text: 'Attacks deal damage to the opponent...', chart: damageChartOptions },
    { title: '📦 Collection Summary', text: `Ash has collected **${totalCards} Pokémon cards**.`, chart: null },
    { title: '🌊 Pokémon Types', text: 'Explore the distribution of different Pokémon types in the collection...', chart: pokemonTypeChartOptions },
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
      <h1>📜 Ash's Pokémon Collection Summary</h1>

      <div className="viewport">
        <AnimatePresence mode="wait">
          <motion.section key={currentSection} className="summary-section">
            {/* <h2>{sectionsData[currentSection].title}</h2> */}
            <div>{sectionsData[currentSection].text}</div>
            {sectionsData[currentSection].chart && <ReactECharts option={sectionsData[currentSection].chart} style={{ height: '500px', width: '100%' }} />}
            {sectionsData[currentSection].list && <ul>{sectionsData[currentSection].list.map((item, index) => <li key={index}>{item}</li>)}</ul>}
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