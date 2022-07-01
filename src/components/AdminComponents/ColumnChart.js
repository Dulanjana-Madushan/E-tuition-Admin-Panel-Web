import Chart from 'react-apexcharts';
import React from 'react'

function ColumnChart() {
  return (
    <Chart
      type="bar"
      height={400}
      width={500}
      series={[
        {
            //name:'teachers',
            data:[100,200,600],
            //color:['#cccccc','#666666','#777777']
        }
      ]}
      options={{
        //colors:['#555555','#222222','#888888']
        plotOptions: {
            bar: {
              columnWidth: '75%',
              distributed: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          stroke:{
            colors: ["transparent"],
            width: 5
          },
          chart:{
            toolbar:{
                show:false
              }
          },
          
          xaxis: {
            categories: [
              ['teachers'],
              ['students'],
              ['classes'],
            ],
            labels: {
              style: {
                fontSize: '15px'
              }
            }
          }
      }}
  >

    </Chart>
  )
}

export default ColumnChart