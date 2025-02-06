import React from 'react';
import ReactECharts from 'echarts-for-react';

interface RaritySectionProps {
  rarityCounts: Record<string, number>;
}

const RaritySection: React.FC<RaritySectionProps> = ({ rarityCounts }) => {
  const rarityChartOptions: echarts.EChartsOption = {
    title: { text: 'Pokémon Rarity Distribution', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: ['40%', '80%'],
        data: Object.entries(rarityCounts).map(([rarity, count]) => ({ name: rarity, value: count })),
      },
    ],
  };

  return (
    <div>
      <h2>🃏 Understanding Pokémon Rarity</h2>
      <p>Pokémon cards come in different rarities...</p>
      <ReactECharts option={rarityChartOptions} style={{ height: '500px', width: '100%' }} />
    </div>
  );
};

export default RaritySection;