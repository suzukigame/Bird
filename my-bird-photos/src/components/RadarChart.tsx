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
        backgroundColor: 'rgba(0, 191, 255, 0.4)', // 濃い水色
        borderColor: 'rgba(0, 191, 255, 1)',     // 濃い水色
        borderWidth: 3, // 線の太さを調整
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        pointLabels: {
          font: {
            size: 40, // フォントサイズを調整
            family: 'Noto Sans JP', // 書体を指定
            weight: 'bold', // 太字にする
          },
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
        backgroundColor: 'rgba(0, 191, 255, 1)', // 濃い水色
      },
    },
  };

  return (
    <div style={{ width: '66%', height: '66%', margin: '0 auto' }}> {/* サイズを2/3に縮小 */}
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;