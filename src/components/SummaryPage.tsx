import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useInView } from 'react-intersection-observer';
import pokemonData from '../data/ash_collection.json';
import * as echarts from 'echarts';
import './SummaryPage.css';

// Define Types
interface PokemonCard {
  rarity?: string;
  hp?: string;
}

const SummaryPage: React.FC = () => {
  const [rarityCounts, setRarityCounts] = useState<Record<string, number>>({});
  const [hpDistribution, setHpDistribution] = useState<number[]>([]);
  const { ref: chartRef, inView: chartVisible } = useInView({ triggerOnce: true });

  useEffect(() => {
    const rarityMap: Record<string, number> = {};
    const hpValues: number[] = [];

    (pokemonData as PokemonCard[]).forEach((card) => {
      if (card.rarity) rarityMap[card.rarity] = (rarityMap[card.rarity] || 0) + 1;
      if (card.hp) hpValues.push(Number(card.hp));
    });

    setRarityCounts(rarityMap);
    setHpDistribution(hpValues);
  }, []);

  const rarityChartOptions: echarts.EChartsOption = {
    title: { text: 'Pokémon Rarity Distribution', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: Object.entries(rarityCounts).map(([rarity, count]) => ({ name: rarity, value: count })),
        animationDuration: 1500,
      },
    ],
  };

  const hpChartOptions: echarts.EChartsOption = {
    title: { text: 'Pokémon HP Distribution', left: 'center' },
    tooltip: {},
    xAxis: { type: 'category', data: hpDistribution.sort((a, b) => a - b) },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: hpDistribution, animationDuration: 1500 }],
  };

  return (
    <div className="summary-container">
      <h1>📜 Ash's Pokémon Collection Summary</h1>

      <blockquote className="pokemon-quote">
        "Strong Pokémon. Weak Pokémon. That is only the selfish perception of people. Truly skilled trainers should try to win with their favorites."
        <br />— Karen, Pokémon Gold/Silver
      </blockquote>

      <section className="summary-section">
        <h2>🃏 How Rare is Ash’s Collection?</h2>
        <p>Ash has collected a variety of Pokémon cards, ranging from **common** to **legendary**. Let’s take a look at the rarity breakdown.</p>
        <div ref={chartRef} className={`chart-container ${chartVisible ? 'visible' : ''}`}>
          <ReactECharts option={rarityChartOptions} style={{ height: '400px' }} />
        </div>
      </section>

      <section className="summary-section">
        <h2>💪 How Strong Are Ash’s Pokémon?</h2>
        <p>We analyzed the **HP** of all Pokémon in Ash’s collection. Check out the distribution below!</p>
        <div ref={chartRef} className={`chart-container ${chartVisible ? 'visible' : ''}`}>
          <ReactECharts option={hpChartOptions} style={{ height: '400px' }} />
        </div>
      </section>

      <section className="summary-section">
        <h2>🎩 Fun Fact</h2>
        <p>Did you know? Ash once traded a Butterfree only to realize it was one of his most powerful Pokémon. Sometimes, the rarest gems are hidden in plain sight!</p>
      </section>
    </div>
  );
};

export default SummaryPage;
