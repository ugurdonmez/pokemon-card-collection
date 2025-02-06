import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';

interface PokemonTypesSectionProps {
  pokemonTypeCounts: Record<string, number>;
}

const PokemonTypesSection: React.FC<PokemonTypesSectionProps> = ({ pokemonTypeCounts }) => {
  const navigate = useNavigate();

  const handleChartClick = (params: any) => {
    const pokemonType = params.name;
    navigate(`/cards?pokemonType=${pokemonType}&sort=name&sortOrder=asc`);
  };

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
      <p style={{ marginBottom: '20px', textAlign: 'center', fontStyle: 'italic' }}>
        Click on the pie chart to see the Pokémon cards of the selected type.
      </p>
      <ReactECharts
        option={pokemonTypeChartOptions}
        style={{ height: '500px', width: '100%' }}
        onEvents={{ 'click': handleChartClick }}
      />
    </div>
  );
};

export default PokemonTypesSection;