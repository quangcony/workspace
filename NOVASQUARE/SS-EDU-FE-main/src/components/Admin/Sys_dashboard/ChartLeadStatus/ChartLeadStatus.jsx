import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

const ChartLeadStatus = ({openListLeadStatus}) => {
    const data = [
        {
          type: '2022/02/18',
          sales: 200,
        },
        {
          type: '2022/02/19',
          sales: 134,
        },
        {
          type: '2022/02/20',
          sales: 300,
        },
        {
          type: '2022/02/21',
          sales: 98,
        },
        {
          type: '2022/02/22',
          sales: 157,
        },
        
      ];
      const config = {
        data,
        xField: 'type',
        yField: 'sales',
        seriesField: 'type',
        // onReady: (plot ) => {
        //   plot.on('element:click', (data) => 
        //     openListLeadStatus(data.data.data)
        //   );
        // },
        label: {
          position: 'middle',
          // 'top', 'bottom', 'middle',
          style: {
            fill: 'white',
            opacity: 1,
            fontSize: 20
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
            
          },
        },
        meta: {
          type: {
            alias: '类别',
          },
          sales: {
            alias: 'sales',
          },
        },
      };
      return (
        <Column 
          {...config} 
          onReady={(plot) => {
            plot.on('plot:click', (evt) => {
              const { x, y } = evt;
              const { xField } = plot.options;
              const tooltipData = plot.chart.getTooltipItems({ x, y });
              openListLeadStatus(tooltipData)
            });
          }}
        />
      );
};

export default ChartLeadStatus;