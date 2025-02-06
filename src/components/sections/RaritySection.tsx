import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';

interface RaritySectionProps {
  rarityCounts: Record<string, number>;
}

const RaritySection: React.FC<RaritySectionProps> = ({ rarityCounts }) => {
  const navigate = useNavigate();

  const handleChartClick = (params: any) => {
    if (!params.name) return;

    if (params.name === 'Common' || params.name === 'Uncommon' || params.name === 'Rare') {
      navigate(`/cards?hp=0-300&sort=name&sortOrder=asc&rarity=${params.name}`);
    }
  };

  const rarityChartOptions: echarts.EChartsOption = {
    title: { text: 'Pokémon Rarity Distribution', left: 'center' },
    tooltip: { trigger: 'item' },
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
    color: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40'],
    animationEasing: 'elasticOut',
    animationDelay: (idx) => idx * 100,
  };

  return (
    <div>
      <h2>🃏 Understanding Pokémon Rarity</h2>
      <p>Pokémon cards come in different rarities...</p>
      <p style={{ marginBottom: '20px', textAlign: 'center', fontStyle: 'italic' }}>
        Click on the pie chart to see the Pokémon cards with the selected rarity.
      </p>
      <ReactECharts
        option={rarityChartOptions}
        style={{ height: '500px', width: '100%' }}
        onEvents={{ 'click': handleChartClick }}
      />
    </div>
  );
};

export default RaritySection;