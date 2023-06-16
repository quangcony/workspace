import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/plots';

const ChartTop5 = ({openListTop}) => {
  const data = [
    {
      year: '2023',
      value: 56090981,
    },
    {
      year: '2022',
      value: 45938213,
    },
    {
      year: '2021',
      value: 12123421,
    },
    {
      year: '2020',
      value: 21813440,
    },
    {
      year: '2019',
      value: 12081930,
    },
  ];
  const config = {
    data,
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    onReady: (plot ) => {
      plot.on('element:click', (data) => 
      openListTop(data.data.data)
      );
    },
    legend: {
      position: 'top-left',
    },
    label: {
      position: 'middle',
      // 'top', 'bottom', 'middle',
      style: {
        fill: 'white',
        opacity: 1,
        fontSize: 20
      },
    },
  };
  return <Bar {...config} />;
};

export default ChartTop5;