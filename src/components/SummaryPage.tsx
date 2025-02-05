import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion, AnimatePresence } from 'framer-motion';
import pokemonData from '../data/ash_collection.json';
import * as echarts from 'echarts';
import './SummaryPage.css';

// Define Types
interface PokemonCard {
  rarity?: string;
  hp?: string;
  supertype?: string;
  name: string;
  attacks?: { damage?: string }[];
}

// Define Sections
const sections = ['intro', 'rarity', 'hp', 'type', 'strongest', 'damage', 'collectionSize'];

const SummaryPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = sections.length;

  // State for processed data
  const [rarityCounts, setRarityCounts] = useState<Record<string, number>>({});
  const [hpBuckets, setHpBuckets] = useState<number[]>([0, 0, 0, 0, 0]);
  const [damageBuckets, setDamageBuckets] = useState<number[]>([0, 0, 0, 0, 0]);
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});
  const [strongestPokemons, setStrongestPokemons] = useState<PokemonCard[]>([]);
  const [totalCards, setTotalCards] = useState<number>(0);

  useEffect(() => {
    // Initialize maps
    const rarityMap: Record<string, number> = {};
    const typeMap: Record<string, number> = {};
    const hpValues: number[] = [];
    const damageValues: number[] = [];
    let topHP: PokemonCard[] = [];

    pokemonData.forEach((card) => {
      if (card.rarity) rarityMap[card.rarity] = (rarityMap[card.rarity] || 0) + 1;
      if (card.supertype) typeMap[card.supertype] = (typeMap[card.supertype] || 0) + 1;

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
    setStrongestPokemons(topHP.slice(0, 5));

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
    setTotalCards(pokemonData.length);
  }, []);

  // Chart Configurations
  const rarityChartOptions: echarts.EChartsOption = {
    title: { text: 'Pokémon Rarity Distribution', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: ['40%', '80%'], // Inner radius and outer radius for donut chart
        data: Object.entries(rarityCounts).map(([rarity, count]) => ({ name: rarity, value: count })),
      },
    ],
  };
const hpChartOptions: echarts.EChartsOption = {
  title: { text: 'HP Distribution', left: 'center' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: {
    type: 'category',
    data: ['0-50', '51-100', '101-150', '151-200', '201+'],
    name: 'HP Range',
    axisTick: { alignWithLabel: true },
  },
  yAxis: {
    type: 'value',
    name: 'Number of Pokémon',
  },
  series: [
    {
      name: 'Count',
      type: 'bar',
      barWidth: '60%',
      data: hpBuckets.map((count, index) => ({
        value: count,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: index === 0 ? '#ff6384' : index === 1 ? '#36a2eb' : index === 2 ? '#ffce56' : index === 3 ? '#4bc0c0' : '#9966ff',
              },
              {
                offset: 1,
                color: index === 0 ? '#ff9aa2' : index === 1 ? '#9ad0f5' : index === 2 ? '#ffe29a' : index === 3 ? '#a3e4e4' : '#c3a6ff',
              },
            ],
          },
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      })),
    },
  ],
  animationEasing: 'elasticOut',
  animationDelay: (idx) => idx * 100,
};
  const typeChartOptions: echarts.EChartsOption = {
    title: { text: 'Card Type Distribution', left: 'center' },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: Object.keys(typeCounts),
      axisTick: { alignWithLabel: true },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Count',
        type: 'bar',
        barWidth: '60%',
        data: Object.entries(typeCounts).map(([type, count]) => ({
          value: count,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: type === 'Pokémon' ? '#ff6384' : type === 'Trainer' ? '#36a2eb' : '#ffce56',
                },
                {
                  offset: 1,
                  color: type === 'Pokémon' ? '#ff9aa2' : type === 'Trainer' ? '#9ad0f5' : '#ffe29a',
                },
              ],
            },
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        })),
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

  // Section Data (Your original content is kept)
  const sectionsData = [
    { title: '🎴 Welcome to Ash’s Pokémon Card Collection!', text: 'This page is a complete breakdown of Ash’s card collection...', chart: null },
    { title: '🃏 Understanding Pokémon Rarity', text: 'Pokémon cards come in different rarities...', chart: rarityChartOptions },
    { title: '💪 What is HP (Health Points)?', text: 'HP represents a Pokémon’s endurance...', chart: hpChartOptions },
    { title: '📚 What are Pokémon Card Types?', text: 'There are three main types of Pokémon cards...', chart: typeChartOptions },
    { title: '🔥 Ash’s Strongest Pokémon', text: 'These are the Pokémon with the highest HP...', chart: null, list: strongestPokemons.map((p) => `${p.name} - HP: ${p.hp}`) },
    { title: '⚔️ Attack Damage Explained', text: 'Attacks deal damage to the opponent...', chart: damageChartOptions },
    { title: '📦 Collection Summary', text: `Ash has collected **${totalCards} Pokémon cards**.`, chart: null },
  ];

  const handleNext = () => {
    setCurrentSection((prev) => Math.min(prev + 1, totalSections - 1));
  };

  const handlePrev = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="summary-container">
      <h1>📜 Ash's Pokémon Collection Summary</h1>

      <div className="viewport">
        <AnimatePresence mode="wait">
          <motion.section key={currentSection} className="summary-section">
            <h2>{sectionsData[currentSection].title}</h2>
            <p>{sectionsData[currentSection].text}</p>
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