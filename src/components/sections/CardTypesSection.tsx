import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';

interface CardTypesSectionProps {
  typeCounts: Record<string, number>;
}

const CardTypesSection: React.FC<CardTypesSectionProps> = ({ typeCounts }) => {
  const navigate = useNavigate();

  const handleChartClick = (params: any) => {
    const cardTypes = ['Pokémon', 'Trainer', 'Energy'];
    const cardType = cardTypes[params.dataIndex];
    navigate(`/cards?type=${cardType}&sort=name&sortOrder=asc`);
  };

  const typeChartOptions: echarts.EChartsOption = {
    title: { text: 'Pokémon Card Types Distribution', left: 'center' },
    tooltip: { trigger: 'item' },
    angleAxis: {
      type: 'category',
      data: ['Pokémon', 'Trainer', 'Energy'],
    },
    radiusAxis: {},
    polar: {},
    series: [
      {
        type: 'bar',
        data: Object.entries(typeCounts).map(([type, count]) => ({ name: type, value: count })),
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
      <p style={{ marginBottom: '20px', textAlign: 'center', fontStyle: 'italic' }}>
        Click on the chart to see the Pokémon cards of the selected type.
      </p>
      <ReactECharts
        option={typeChartOptions}
        style={{ height: '500px', width: '100%' }}
        onEvents={{ 'click': handleChartClick }}
      />
    </div>
  );
};

export default CardTypesSection;