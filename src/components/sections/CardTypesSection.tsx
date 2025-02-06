import React from 'react';
import ReactECharts from 'echarts-for-react';

interface CardTypesSectionProps {
  typeCounts: Record<string, number>;
}

const CardTypesSection: React.FC<CardTypesSectionProps> = ({ typeCounts }) => {
  const typeChartOptions: echarts.EChartsOption = {
    title: { text: 'Card Type Distribution', left: 'center' },
    tooltip: { trigger: 'item' },
    angleAxis: {
      type: 'category',
      data: Object.keys(typeCounts),
      axisLine: { show: false }, // Remove the x-axis line
    },
    radiusAxis: {
      type: 'value',
    },
    polar: {},
    series: [
      {
        type: 'bar',
        data: Object.values(typeCounts),
        coordinateSystem: 'polar',
        itemStyle: {
          color: (params) => {
            const colors = ['#ff6384', '#36a2eb', '#ffce56'];
            return colors[params.dataIndex % colors.length];
          },
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
      <h2>📚 What are Pokémon Card Types?</h2>
      <p>There are three main types of Pokémon cards...</p>
      <ReactECharts option={typeChartOptions} style={{ height: '500px', width: '100%' }} />
    </div>
  );
};

export default CardTypesSection;