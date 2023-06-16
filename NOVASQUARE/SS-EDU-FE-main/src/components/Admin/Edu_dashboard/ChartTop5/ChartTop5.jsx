import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/plots';

const ChartTop5 = ({openListTop}) => {
  const data = [
    {
      year: '2023',
      value: 56,
    },
    {
      year: '2022',
      value: 45,
    },
    {
      year: '2021',
      value: 12,
    },
    {
      year: '2020',
      value: 218,
    },
    {
      year: '2019',
      value: 120,
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