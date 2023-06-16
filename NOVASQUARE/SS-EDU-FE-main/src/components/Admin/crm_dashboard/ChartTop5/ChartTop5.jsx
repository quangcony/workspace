import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/plots';

const ChartTop5 = ({openListTop}) => {
  const data = [
    {
      year: 'TQC',
      value: 38,
    },
    {
      year: 'LVH',
      value: 52,
    },
    {
      year: 'PD',
      value: 61,
    },
    {
      year: 'TVO',
      value: 85,
    },
    {
      year: 'LL',
      value: 48,
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