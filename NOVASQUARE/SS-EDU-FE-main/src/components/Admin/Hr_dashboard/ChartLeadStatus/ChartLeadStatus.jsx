import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

const ChartLeadStatus = ({openListLeadStatus}) => {
    const data = [
        {
          type: 'Giáo viên',
          sales: 12,
        },
        {
          type: 'Operation',
          sales: 8,
        },
        {
          type: 'PM',
          sales: 2,
        },
        {
          type: 'Dev',
          sales: 7,
        },
        {
          type: 'Tester',
          sales: 2,
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