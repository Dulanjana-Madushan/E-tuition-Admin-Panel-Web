import React from 'react';
import Chart from 'react-apexcharts'

export default function PieChart({total, count}) {
    const data = {
          type:["donut"],
          series: [count,(total-count)],
          options:{
            labels: ['NO. student who submitted', 'NO. student who did not submitted']
          }
        }
 
    return (
      <div className="donut" align="center">
        <Chart options={data.options} series={data.series} type="donut" width="600" height="200"/>
      </div>
    );
  
}