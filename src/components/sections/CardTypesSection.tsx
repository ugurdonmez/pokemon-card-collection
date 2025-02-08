import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';
import './CardTypesSection.css';

interface CardTypesSectionProps {
  typeCounts: Record<string, number>;
}

const CardTypesSection: React.FC<CardTypesSectionProps> = ({ typeCounts }) => {
  const navigate = useNavigate();

  const handleChartClick = (params: any) => {
    const cardTypes = Object.keys(typeCounts);
    const cardType = cardTypes[params.dataIndex];
    navigate(`/cards?type=${cardType}&sort=name&sortOrder=asc`);
  };

  const typeChartOptions: echarts.EChartsOption = {
    title: { 
      text: 'Pokémon Card Types Distribution', 
      left: 'center',
      textStyle: { fontSize: 20, color: '#333' }
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const percentage = ((params.value / Object.values(typeCounts).reduce((a, b) => a + b, 0)) * 100).toFixed(2);
        return `
          <strong>${params.name}</strong><br />
          Count: ${params.value}<br />
          Percentage: ${percentage}%
        `;
      },
      backgroundColor: 'rgba(50, 50, 50, 0.7)',
      borderColor: '#fff',
      borderWidth: 1,
      textStyle: { color: '#fff' },
    },
    angleAxis: {
      type: 'category',
      data: Object.keys(typeCounts),
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
            const colors = ['#f76c6c', '#36a2eb', '#ffce56'];
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
    <div className="card-types-section">
      <div className="section-header">
        <h2 className="section-title">📚 Pokémon Card Types</h2>
        <p className="section-description">
          Explore the distribution of Pokémon card types in the collection. Click on a segment of the chart to view cards of that type.
        </p>
      </div>
      <div className="chart-container">
        <ReactECharts
          option={typeChartOptions}
          style={{ height: '400px', width: '100%' }}
          onEvents={{ click: handleChartClick }}
        />
      </div>
    </div>
  );
};

export default CardTypesSection;
