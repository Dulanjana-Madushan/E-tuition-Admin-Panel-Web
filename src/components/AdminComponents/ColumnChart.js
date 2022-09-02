import Chart from 'react-apexcharts';
import React from 'react';
import { base_url } from '../../Const/Const';
import useFetch from '../../services/useFetch';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';


function ColumnChart() {
   const {data, isLoading, error} = useFetch(base_url+"/admin/analytics");

  return (
    <Box>
      {isLoading && <CircularProgress color="primary" />}
      {data && <div>
      <Chart
        type="bar"
        height={400}
        width={500}
        series={[
          {
          //  name:'teachers',
              data : [data.science,data.art,data.commerce,data.tech,data.others]
          //  color:['#cccccc','#666666','#777777']
          }
        ]}
        options={{
          //colors:['green','blue','#888888'],
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
                ['Scinece'],
                ['Arts'],
                ['Commerce'],
                ['Technology'],
                ['Others'],
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
    </div>}
  </Box>
  )
}

export default ColumnChart