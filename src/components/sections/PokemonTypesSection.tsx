import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';
import './PokemonTypesSection.css';

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
    title: {
      text: 'Pokémon Types Distribution',
      left: 'center',
      textStyle: { fontSize: 20, color: '#333' },
      padding: [0, 0, 20, 0], // Add space between title and chart
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      backgroundColor: 'rgba(50, 50, 50, 0.7)',
      borderColor: '#fff',
      borderWidth: 1,
      textStyle: { color: '#fff' },
    },
    series: [
      {
        type: 'pie',
        radius: '70%',
        data: Object.entries(pokemonTypeCounts).map(([type, count]) => ({
          name: type,
          value: count,
        })),
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
        label: {
          formatter: '{b}: {c} ({d}%)',
          fontSize: 14,
        },
      },
    ],
    animationEasing: 'elasticOut',
    animationDelay: (idx) => idx * 100,
  };

  return (
    <div className="pokemon-types-section">
      <div className="section-header">
        <h2 className="section-title">🌊 Pokémon Types</h2>
        <p className="section-description">
          Explore the distribution of different Pokémon types in the collection. 
        </p>
        <p className="highlight">
          <em>Click on a segment of the pie chart to view Pokémon cards of the selected type.</em>
        </p>
      </div>
      <div className="chart-container">
        <ReactECharts
          option={pokemonTypeChartOptions}
          style={{ height: '400px', width: '100%' }}
          onEvents={{ click: handleChartClick }}
        />
      </div>
    </div>
  );
};

export default PokemonTypesSection;
