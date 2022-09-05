import React from 'react';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import Chart from 'react-apexcharts';
import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';


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
              data : [data.science,data.art,data.commerce,data.tech,data.others]
          }
        ]}
        options={{
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