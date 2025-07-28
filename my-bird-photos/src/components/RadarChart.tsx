import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  stats: { [key: string]: number };
}

const RadarChart: React.FC<RadarChartProps> = ({ stats }) => {
  const { t } = useTranslation();

  const labels = [
    t('popularity'),
    t('individualCount'),
    t('cuteness'),
    t('coolness'),
    t('visibility'),
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: t('stats'),
        data: [
          stats.popularity || 0,
          stats.individualCount || 0,
          stats.cuteness || 0,
          stats.coolness || 0,
          stats.visibility || 0,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 5, // 仮の最大値。ユーザーからの情報で調整
        ticks: {
          display: false, // 数値を非表示
        },
      },
    },
    plugins: {
      legend: {
        display: false, // 凡例を非表示
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 3,
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
