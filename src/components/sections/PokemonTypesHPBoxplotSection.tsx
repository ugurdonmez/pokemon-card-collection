import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';

interface PokemonHPBoxplotSectionProps {
  pokemonData: { types?: string[]; hp?: string; rarity?: string; supertype?: string }[];
}

const PokemonHPBoxplotSection: React.FC<PokemonHPBoxplotSectionProps> = ({ pokemonData }) => {
  const navigate = useNavigate();
  const [xAxisOption, setXAxisOption] = useState<'types' | 'rarity' | 'supertype'>('types');

  const groupByOption = (option: 'types' | 'rarity' | 'supertype') => {
    const map: Record<string, number[]> = {};
    pokemonData.forEach((pokemon) => {
      if (pokemon.hp) {
        const hp = Number(pokemon.hp);
        if (option === 'types' && pokemon.types) {
          pokemon.types.forEach((type) => {
            if (!map[type]) {
              map[type] = [];
            }
            map[type].push(hp);
          });
        } else {
          const key = pokemon[option] as string | undefined;
          if (key) {
            if (!map[key]) {
              map[key] = [];
            }
            map[key].push(hp);
          }
        }
      }
    });
    return map;
  };

  const typeHPMap = groupByOption(xAxisOption);

  // Prepare data for boxplot
  const categories = Object.keys(typeHPMap);
  const data = categories.map((category) => {
    const hpValues = typeHPMap[category];
    hpValues.sort((a, b) => a - b);
    const min = hpValues[0];
    const max = hpValues[hpValues.length - 1];
    const q1 = hpValues[Math.floor(hpValues.length / 4)];
    const median = hpValues[Math.floor(hpValues.length / 2)];
    const q3 = hpValues[Math.floor((hpValues.length * 3) / 4)];
    return [min, q1, median, q3, max];
  });

  const handleChartClick = (params: any) => {
    const category = categories[params.dataIndex];

    if (xAxisOption === 'types') {
      navigate(`/cards?pokemonType=${category}&sort=name&sortOrder=asc`);
      return;
    }

    if (xAxisOption === 'supertype') {
      navigate(`/cards?type=${category}&sort=name&sortOrder=asc`);
      return;
    }

    navigate(`/cards?${xAxisOption}=${category}&sort=name&sortOrder=asc`);
  };

  const boxplotChartOptions: echarts.EChartsOption = {
    title: { text: 'HP Distribution by Pokémon', left: 'center' },
    tooltip: { trigger: 'item' },
    xAxis: {
      type: 'category',
      data: categories,
      name: xAxisOption.charAt(0).toUpperCase() + xAxisOption.slice(1),
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
      <h2>📊 HP Distribution by Pokémon</h2>
      <p>Explore the HP distribution of different Pokémon in the collection...</p>
      <div>
        <label>
          <input
            type="radio"
            value="types"
            checked={xAxisOption === 'types'}
            onChange={() => setXAxisOption('types')}
          />
          Type
        </label>
        <label>
          <input
            type="radio"
            value="rarity"
            checked={xAxisOption === 'rarity'}
            onChange={() => setXAxisOption('rarity')}
          />
          Rarity
        </label>
        <label>
          <input
            type="radio"
            value="supertype"
            checked={xAxisOption === 'supertype'}
            onChange={() => setXAxisOption('supertype')}
          />
          Supertype
        </label>
      </div>
      <ReactECharts
        option={boxplotChartOptions}
        style={{ height: '500px', width: '100%' }}
        onEvents={{ 'click': handleChartClick }}
      />
    </div>
  );
};

export default PokemonHPBoxplotSection;