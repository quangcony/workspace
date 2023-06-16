import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/plots';

const ChartTop5 = ({openListTop}) => {
  const data = [
    {
      year: 'Phụ huynh',
      value: 24,
    },
    {
      year: 'Giáo viên',
      value: 12,
    },
    {
      year: 'Operation',
      value: 21,
    },
    {
      year: 'Phần mềm',
      value: 17,
    },
    {
      year: 'Học sinh',
      value: 8,
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