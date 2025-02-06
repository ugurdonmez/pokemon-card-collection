import React from 'react';
import ReactECharts from 'echarts-for-react';

interface HPDistributionSectionProps {
  hpBuckets: number[];
}

const HPDistributionSection: React.FC<HPDistributionSectionProps> = ({ hpBuckets }) => {
  const hpChartOptions: echarts.EChartsOption = {
    title: { text: 'HP Distribution', left: 'center' },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: ['0-50', '51-100', '101-150', '151-200', '201+'],
      name: 'HP Range',
      axisTick: { alignWithLabel: true },
      axisLine: { show: false }, // Remove the x-axis line
    },
    yAxis: {
      type: 'value',
      name: 'Number of Pokémon',
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
                  color: index === 0 ? '#ff6384' : index === 1 ? '#36a2eb' : index === 2 ? '#ffce56' : index === 3 ? '#4bc0c0' : '#9966ff',
                },
                {
                  offset: 1,
                  color: index === 0 ? '#ff9aa2' : index === 1 ? '#9ad0f5' : index === 2 ? '#ffe29a' : index === 3 ? '#a3e4e4' : '#c3a6ff',
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
    <div>
      <h2>💪 What is HP (Health Points)?</h2>
      <p>HP represents a Pokémon’s endurance...</p>
      <ReactECharts option={hpChartOptions} style={{ height: '500px', width: '100%' }} />
    </div>
  );
};

export default HPDistributionSection;