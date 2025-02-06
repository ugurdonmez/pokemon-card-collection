import React from 'react';
import ReactECharts from 'echarts-for-react';

interface PokemonTypesHPBoxplotSectionProps {
  pokemonData: { types?: string[]; hp?: string }[];
}

const PokemonTypesHPBoxplotSection: React.FC<PokemonTypesHPBoxplotSectionProps> = ({ pokemonData }) => {
  const typeHPMap: Record<string, number[]> = {};

  // Group HP values by Pokémon types
  pokemonData.forEach((pokemon) => {
    if (pokemon.types && pokemon.hp) {
      const hp = Number(pokemon.hp);
      pokemon.types.forEach((type) => {
        if (!typeHPMap[type]) {
          typeHPMap[type] = [];
        }
        typeHPMap[type].push(hp);
      });
    }
  });

  // Prepare data for boxplot
  const types = Object.keys(typeHPMap);
  const data = types.map((type) => {
    const hpValues = typeHPMap[type];
    hpValues.sort((a, b) => a - b);
    const min = hpValues[0];
    const max = hpValues[hpValues.length - 1];
    const q1 = hpValues[Math.floor(hpValues.length / 4)];
    const median = hpValues[Math.floor(hpValues.length / 2)];
    const q3 = hpValues[Math.floor((hpValues.length * 3) / 4)];
    return [min, q1, median, q3, max];
  });

  const boxplotChartOptions: echarts.EChartsOption = {
    title: { text: 'HP Distribution by Pokémon Types', left: 'center' },
    tooltip: { trigger: 'item' },
    xAxis: {
      type: 'category',
      data: types,
      name: 'Pokémon Types',
    },
    yAxis: {
      type: 'value',
      name: 'HP',
    },
    series: [
      {
        name: 'boxplot',
        type: 'boxplot',
        data: data,
      },
    ],
    animationEasing: 'elasticOut',
    animationDelay: (idx) => idx * 100,
  };

  return (
    <div>
      <h2>📊 HP Distribution by Pokémon Types</h2>
      <p>Explore the HP distribution of different Pokémon types in the collection...</p>
      <ReactECharts option={boxplotChartOptions} style={{ height: '500px', width: '100%' }} />
    </div>
  );
};

export default PokemonTypesHPBoxplotSection;