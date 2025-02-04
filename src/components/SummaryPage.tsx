import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion, AnimatePresence } from 'framer-motion';
import pokemonData from '../data/ash_collection.json';
import * as echarts from 'echarts';
import './SummaryPage.css';

// TODO: use same type for both
interface PokemonCard {
  rarity?: string;
  hp?: string;
  supertype?: string;
  name: string;
  attacks?: { damage?: string }[];
}

const sections = ['rarity', 'hp', 'type', 'strongest', 'damage', 'collectionSize'];

const SummaryPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0); 
  const totalSections = sections.length;
  const [isScrolling, setIsScrolling] = useState(false);  

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (isScrolling) {
        return;
      }
      
      setIsScrolling(true);

      if (event.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, totalSections - 1));
      } else if (event.deltaY < 0) {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => setIsScrolling(false), 2000);
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [totalSections, isScrolling]);


  // Data Calculations
  const rarityCounts: Record<string, number> = {};
  const hpValues: number[] = [];
  const typeCounts: Record<string, number> = {};
  let strongestPokemons: PokemonCard[] = [];
  let attackDamages: number[] = [];

  pokemonData.forEach((card) => {
    if (card.rarity) rarityCounts[card.rarity] = (rarityCounts[card.rarity] || 0) + 1;
    if (card.hp) hpValues.push(Number(card.hp));
    if (card.supertype) typeCounts[card.supertype] = (typeCounts[card.supertype] || 0) + 1;

    if (card.hp) {
      strongestPokemons.push(card);
    }

    if (card.attacks) {
      card.attacks.forEach((attack) => {
        if (attack.damage) attackDamages.push(parseInt(attack.damage.replace(/\D/g, '')) || 0);
      });
    }
  });

  strongestPokemons = strongestPokemons.sort((a, b) => Number(b.hp) - Number(a.hp)).slice(0, 5);
  attackDamages.sort((a, b) => b - a);

  // Chart Configs
  const rarityChartOptions: echarts.EChartsOption = {
    title: { text: 'Pokémon Rarity Distribution', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [{ type: 'pie', radius: '65%', data: Object.entries(rarityCounts).map(([rarity, count]) => ({ name: rarity, value: count })) }],
  };

  const hpChartOptions: echarts.EChartsOption = {
    title: { text: 'HP Distribution', left: 'center' },
    tooltip: {},
    xAxis: { type: 'category', data: hpValues.sort((a, b) => a - b) },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: hpValues }],
  };

  const typeChartOptions: echarts.EChartsOption = {
    title: { text: 'Card Type Distribution', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [{ type: 'pie', radius: '65%', data: Object.entries(typeCounts).map(([type, count]) => ({ name: type, value: count })) }],
  };

  const damageChartOptions: echarts.EChartsOption = {
    title: { text: 'Attack Damage Distribution', left: 'center' },
    tooltip: {},
    xAxis: { type: 'category', data: attackDamages },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: attackDamages }],
  };

  // Section Data
  const sectionsData = [
    { title: '🃏 Pokémon Rarity', text: 'How rare are Ash’s Pokémon?', chart: rarityChartOptions },
    { title: '💪 HP Distribution', text: 'Which Pokémon have the most HP?', chart: hpChartOptions },
    { title: '📚 Card Type Breakdown', text: 'Pokémon, Trainer, or Energy?', chart: typeChartOptions },
    { title: '🔥 Ash’s Strongest Pokémon', text: 'Top 5 Pokémon with the highest HP', chart: null, list: strongestPokemons.map((p) => `${p.name} - HP: ${p.hp}`) },
    { title: '⚔️ Attack Damage Stats', text: 'Pokémon Attack Damage Analysis', chart: damageChartOptions },
    { title: '📦 Collection Size', text: `Ash has collected **${pokemonData.length}** Pokémon cards!`, chart: null },
  ];

  return (
    <div className="summary-container">
      <h1>📜 Ash's Pokémon Collection Summary</h1>

                  <blockquote className="pokemon-quote">
        "A Caterpie may change into a Butterfree, but the heart that beats inside remains the same." <br />— Brock, Pokémon Anime
      </blockquote>


      {/* Animated Sections */}
      <div className="viewport">
        <AnimatePresence mode="wait">
          <motion.section
            key={currentSection}
            className="summary-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2>{sectionsData[currentSection].title}</h2>
            <p>{sectionsData[currentSection].text}</p>
            {sectionsData[currentSection].chart ? (
              <ReactECharts option={sectionsData[currentSection].chart} style={{ height: '1000px', width: '100%' }} />
            ) : sectionsData[currentSection].list ? (
              <ul>{sectionsData[currentSection].list.map((item, index) => <li key={index}>{item}</li>)}</ul>
            ) : null}
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SummaryPage;
