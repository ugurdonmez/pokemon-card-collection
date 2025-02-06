import React from 'react';
import ReactECharts from 'echarts-for-react';

interface AttackDamageSectionProps {
  damageBuckets: number[];
}

const AttackDamageSection: React.FC<AttackDamageSectionProps> = ({ damageBuckets }) => {

  const damageChartOptions: echarts.EChartsOption = {
    title: { text: 'Attack Damage Distribution', left: 'center' },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: ['0-30', '31-60', '61-90', '91-120', '121+'],
      name: 'Damage Range',
      axisTick: { alignWithLabel: true },
      axisLine: { show: false },
    },
    yAxis: {
      type: 'value',
      name: 'Number of Attacks',
    },
    series: [
      {
        name: 'Count',
        type: 'bar',
        barWidth: '60%',
        data: damageBuckets.map((count, index) => ({
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
      <h2>⚔️ Attack Damage Explained</h2>
      <p>Attacks deal damage to the opponent...</p>
      <ReactECharts
        option={damageChartOptions}
        style={{ height: '500px', width: '100%' }}
      />
    </div>
  );
};

export default AttackDamageSection;