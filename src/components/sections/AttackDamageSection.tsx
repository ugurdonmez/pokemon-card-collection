import React from 'react';
import ReactECharts from 'echarts-for-react';

interface AttackDamageSectionProps {
  damageBuckets: number[];
}

const AttackDamageSection: React.FC<AttackDamageSectionProps> = ({ damageBuckets }) => {
  const damageChartOptions: echarts.EChartsOption = {
    title: { text: 'Attack Damage Distribution', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['0-30', '31-60', '61-90', '91-120', '121+'], name: 'Damage Range' },
    yAxis: { type: 'value', name: 'Number of Attacks' },
    series: [{ type: 'bar', data: damageBuckets }],
    animationEasing: 'elasticOut',
    animationDelay: (idx) => idx * 100,
  };

  return (
    <div>
      <h2>⚔️ Attack Damage Explained</h2>
      <p>Attacks deal damage to the opponent...</p>
      <ReactECharts option={damageChartOptions} style={{ height: '500px', width: '100%' }} />
    </div>
  );
};

export default AttackDamageSection;