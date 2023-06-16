import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';


const ChartSaleTrafic = ({openListSale, newOrder, finished, cancel, delivery}) => {

    const data = [
        {
          type: '22-25',
          value: finished.length,
        },
        {
          type: '26-30',
          value: newOrder.length,
        },
        {
          type: '31-35',
          value: delivery.length,
        },
        {
          type: '>35',
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