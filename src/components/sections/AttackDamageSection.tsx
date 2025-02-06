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
      <p>In the Pokémon Trading Card Game, each Pokémon card can have one or more attacks. These attacks deal damage to the opponent's Pokémon, reducing their HP (Health Points). The amount of damage an attack deals is indicated on the card, usually next to the attack's name.</p>
      <p>Attacks can have various effects in addition to dealing damage. Some attacks may cause status conditions like Poison or Paralysis, while others may have special effects like drawing additional cards or discarding energy from the opponent's Pokémon.</p>
      <p>The damage dealt by an attack can be influenced by several factors, including the Pokémon's type, any attached energy cards, and any effects from Trainer cards or abilities. Understanding how to maximize attack damage is crucial for building effective strategies and winning battles.</p>
      <ReactECharts
        option={damageChartOptions}
        style={{ height: '500px', width: '100%' }}
      />
    </div>
  );
};

export default AttackDamageSection;