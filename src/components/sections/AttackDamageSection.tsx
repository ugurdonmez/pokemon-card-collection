import React from 'react';
import ReactECharts from 'echarts-for-react';
import './AttackDamageSection.css';

interface AttackDamageSectionProps {
  damageBuckets: number[];
}

const AttackDamageSection: React.FC<AttackDamageSectionProps> = ({ damageBuckets }) => {
  const damageChartOptions: echarts.EChartsOption = {
    title: {
      text: 'Attack Damage Distribution',
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
      data: ['0-30', '31-60', '61-90', '91-120', '121+'],
      name: 'Damage Range',
      axisTick: { alignWithLabel: true },
      axisLine: { show: false },
      nameTextStyle: { fontSize: 14, color: '#666' },
    },
    yAxis: {
      type: 'value',
      name: 'Number of Attacks',
      nameTextStyle: { fontSize: 14, color: '#666' },
      axisLine: { show: false },
      splitLine: { lineStyle: { type: 'dashed', color: '#ddd' } },
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
    <div className="attack-damage-section">
      <div className="section-header">
        <h2 className="section-title">⚔️ Attack Damage Explained</h2>
        <p className="section-description">
          In the Pokémon Trading Card Game, each Pokémon card can have one or more attacks. These attacks deal damage to the opponent's Pokémon, reducing their HP (Health Points).
        </p>
        <p className="section-description">
          The damage dealt by an attack can be influenced by several factors, including the Pokémon's type, attached energy cards, and Trainer cards. Understanding attack damage is vital for building strategies and winning battles.
        </p>
      </div>
      <div className="chart-container">
        <ReactECharts
          option={damageChartOptions}
          style={{ height: '400px', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default AttackDamageSection;
