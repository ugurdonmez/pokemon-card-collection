import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';
import './HPDistributionSection.css';

interface HPDistributionSectionProps {
  hpBuckets: number[];
}

const HPDistributionSection: React.FC<HPDistributionSectionProps> = ({ hpBuckets }) => {
  const navigate = useNavigate();

  const handleChartClick = (params: any) => {
    const hpRanges = ['0-50', '51-100', '101-150', '151-200', '201+'];
    const hpRange = hpRanges[params.dataIndex];
    navigate(`/cards?hp=${hpRange}&sort=name&sortOrder=asc`);
  };

  const hpChartOptions: echarts.EChartsOption = {
    title: {
      text: 'HP Distribution',
      left: 'center',
      textStyle: { fontSize: 20, color: '#333' },
      padding: [0, 0, 20, 0], // Add space between title and chart
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(50, 50, 50, 0.7)',
      borderColor: '#fff',
      borderWidth: 1,
      textStyle: { color: '#fff' },
    },
    xAxis: {
      type: 'category',
      data: ['0-50', '51-100', '101-150', '151-200', '201+'],
      name: 'HP Range',
      axisTick: { alignWithLabel: true },
      axisLine: { show: false },
      nameTextStyle: { fontSize: 14, color: '#666' },
    },
    yAxis: {
      type: 'value',
      name: 'Number of Pokémon',
      nameTextStyle: { fontSize: 14, color: '#666' },
      axisLine: { show: false },
      splitLine: { lineStyle: { type: 'dashed', color: '#ddd' } },
    },
    series: [
      {
        name: 'Count',
        type: 'bar',
        barWidth: '60%',
        data: hpBuckets.map((count, index) => ({
          value: count,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color:
                    index === 0
                      ? '#ff6384'
                      : index === 1
                      ? '#36a2eb'
                      : index === 2
                      ? '#ffce56'
                      : index === 3
                      ? '#4bc0c0'
                      : '#9966ff',
                },
                {
                  offset: 1,
                  color:
                    index === 0
                      ? '#ff9aa2'
                      : index === 1
                      ? '#9ad0f5'
                      : index === 2
                      ? '#ffe29a'
                      : index === 3
                      ? '#a3e4e4'
                      : '#c3a6ff',
                },
              ],
            },
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        })),
      },
    ],
    animationEasing: 'elasticOut',
    animationDelay: (idx) => idx * 100,
  };

  return (
    <div className="hp-distribution-section">
      <div className="section-header">
        <h2 className="section-title">💪 HP Distribution</h2>
        <p className="section-description">
          HP (Health Points) represents a Pokémon’s endurance and ability to withstand attacks. Check out the distribution below!
        </p>
        <p className="highlight">
          <em>Click on a bar to see Pokémon cards within the selected HP range.</em>
        </p>
      </div>
      <div className="chart-container">
        <ReactECharts
          option={hpChartOptions}
          style={{ height: '400px', width: '100%' }}
          onEvents={{ click: handleChartClick }}
        />
      </div>
    </div>
  );
};

export default HPDistributionSection;
