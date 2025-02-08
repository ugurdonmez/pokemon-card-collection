import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Radio } from 'antd';
import './PokemonHPBoxplotSection.css';

interface PokemonHPBoxplotSectionProps {
  pokemonData: { types?: string[]; hp?: string; rarity?: string; supertype?: string }[];
}

const PokemonHPBoxplotSection: React.FC<PokemonHPBoxplotSectionProps> = ({ pokemonData }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialXAxisOption = (searchParams.get('xAxisOption') as 'types' | 'rarity' | 'supertype') || 'types';
  const [xAxisOption, setXAxisOption] = useState<'types' | 'rarity' | 'supertype'>(initialXAxisOption);

  useEffect(() => {
    // Preserve existing params and update only xAxisOption
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('xAxisOption', xAxisOption);
      return newParams;
    });
  }, [xAxisOption, setSearchParams]);

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
    title: {
      text: 'HP Distribution by Pokémon',
      left: 'center',
      textStyle: { fontSize: 20, color: '#333' },
      padding: [0, 0, 20, 0],
    },
    tooltip: { trigger: 'item' },
    xAxis: {
      type: 'category',
      data: categories,
      name: xAxisOption.charAt(0).toUpperCase() + xAxisOption.slice(1),
      nameTextStyle: { fontSize: 14, color: '#666' },
    },
    yAxis: {
      type: 'value',
      name: 'HP',
      nameTextStyle: { fontSize: 14, color: '#666' },
      splitLine: { lineStyle: { type: 'dashed', color: '#ddd' } },
    },
    series: [
      {
        name: 'boxplot',
        type: 'boxplot',
        data: data,
        itemStyle: { borderWidth: 1.5, borderColor: '#333' },
      },
    ],
    animationEasing: 'elasticOut',
    animationDelay: (idx) => idx * 100,
  };

  return (
    <div className="pokemon-hp-boxplot-section">
      <div className="section-header">
        <h2 className="section-title">📊 HP Distribution by Pokémon</h2>
        <p className="section-description">
          Explore the HP distribution of different Pokémon in the collection.
        </p>
        <p className="highlight">
          <em>Choose a grouping option to analyze the data.</em>
        </p>
      </div>
      <Radio.Group
        value={xAxisOption}
        onChange={(e) => setXAxisOption(e.target.value)}
        className="radio-group"
        buttonStyle="solid"
      >
        <Radio.Button value="types">Type</Radio.Button>
        <Radio.Button value="rarity">Rarity</Radio.Button>
        <Radio.Button value="supertype">Supertype</Radio.Button>
      </Radio.Group>
      <div className="chart-container">
        <ReactECharts
          option={boxplotChartOptions}
          style={{ height: '400px', width: '100%' }}
          onEvents={{ click: handleChartClick }}
        />
      </div>
    </div>
  );
};

export default PokemonHPBoxplotSection;
