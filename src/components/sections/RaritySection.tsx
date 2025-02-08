import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';
import './RaritySection.css';

interface RaritySectionProps {
  rarityCounts: Record<string, number>;
}

const RaritySection: React.FC<RaritySectionProps> = ({ rarityCounts }) => {
  const navigate = useNavigate();

  const handleChartClick = (params: any) => {
    if (!params.name) return;

    if (['Common', 'Uncommon', 'Rare'].includes(params.name)) {
      navigate(`/cards?hp=0-300&sort=name&sortOrder=asc&rarity=${params.name}`);
    }
  };

  const rarityChartOptions: echarts.EChartsOption = {
    title: {
      text: 'Pokémon Rarity Distribution',
      left: 'center',
      textStyle: { fontSize: 20, color: '#333' },    
      // TODO: fix the space between chart and title  
      padding: [0, 0, 40, 0],
      top: -1,
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
        radius: ['40%', '80%'],
        data: Object.entries(rarityCounts).map(([rarity, count]) => ({ name: rarity, value: count })),
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
        label: {
          formatter: '{b}: {c} ({d}%)',
          fontSize: 14,
        },
        labelLine: {
          lineStyle: {},
        },
      },
    ],
    color: ['#f76c6c', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40'],
    animationEasing: 'elasticOut',
    animationDelay: (idx) => idx * 100,
  };

  return (
    <div className="rarity-section">
      <div className="section-header">
        <h2 className="section-title">🃏 Pokémon Rarity Distribution</h2>
        <p className="section-description">
          Pokémon cards come in different rarities that define their uniqueness and value. Explore the distribution below!
        </p>
        <p className="highlight">
          <em>Click on the chart segments to view cards of the selected rarity.</em>
        </p>
      </div>
      <div className="chart-container">
        <ReactECharts
          option={rarityChartOptions}
          style={{ height: '400px', width: '100%' }}
          onEvents={{ click: handleChartClick }}
        />
      </div>
    </div>
  );
};

export default RaritySection;
