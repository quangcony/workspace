import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';


const ChartSaleTrafic = ({openListSale, newOrder, finished, cancel, delivery}) => {

    const data = [
        {
          type: 'Đà Nẵng',
          value: finished.length,
        },
        {
          type: 'Hà Nội',
          value: newOrder.length,
        },
        {
          type: 'HCM',
          value: delivery.length,
        },
        {
          type: 'Hội An',
          value: cancel.length,
        },
      ];
      const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        onReady: (plot ) => {
          plot.on('element:click', (data) => 
            openListSale(data.data)
          );
        },
        label: {
          type: 'inner',
          offset: '-40%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 25,
            textAlign: 'center',
          },
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
      };
    return (
        <div>
            <Pie {...config}/>
        </div>
    );
};

export default ChartSaleTrafic;