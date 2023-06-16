import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/plots';

const ChartTop5 = ({openListTop}) => {
  const data = [
    {
      year: '2023',
      value: 24,
    },
    {
      year: '2022',
      value: 9,
    },
    {
      year: '2021',
      value: 5,
    },
    {
      year: '2020',
      value: 33,
    },
    {
      year: '2019',
      value: 6,
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