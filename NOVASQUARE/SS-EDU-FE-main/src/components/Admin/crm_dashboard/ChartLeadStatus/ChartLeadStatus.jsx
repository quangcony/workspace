import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

const ChartLeadStatus = ({openListLeadStatus}) => {
    const data = [
        {
          type: 'Level 1',
          sales: 38,
        },
        {
          type: 'Level 2',
          sales: 80,
        },
        {
          type: 'Level 3',
          sales: 61,
        },
        {
          type: 'Level 4',
          sales: 78,
        },
        {
          type: 'Level 5',
          sales: 48,
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