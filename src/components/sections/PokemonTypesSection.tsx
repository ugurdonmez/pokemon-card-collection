import React from 'react';
import ReactECharts from 'echarts-for-react';

interface PokemonTypesSectionProps {
  pokemonTypeCounts: Record<string, number>;
}

const PokemonTypesSection: React.FC<PokemonTypesSectionProps> = ({ pokemonTypeCounts }) => {
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

  return (
    <div>
      <h2>🌊 Pokémon Types</h2>
      <p>Explore the distribution of different Pokémon types in the collection...</p>
      <ReactECharts option={pokemonTypeChartOptions} style={{ height: '500px', width: '100%' }} />
    </div>
  );
};

export default PokemonTypesSection;