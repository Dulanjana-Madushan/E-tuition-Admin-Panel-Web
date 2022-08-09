import Chart from 'react-apexcharts';
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../../Const/Const';


function ColumnChart(data) {
  console.log(data);
  //console.log(data.data.length);
  // var i;
  // for(i=0;i<3;i++){
  //   console.log(data.data[i]);
  // }

async function getData(){
  const number = [];
  await axios.get(base_url+"/admin/",{
    method: 'GET',
    headers: {"Content-Type":"application/json",
      "Authorization": "Bearer " + localStorage.getItem('token')}
  })
  .then(Response=>{
    console.log("Response",Response);
  })
};
  


  return (
    <Chart
      type="bar"
      height={400}
      width={500}
      series={[
        // {
        //     //name:'teachers',
        //     data:[4,4,8],
        //     //color:['#cccccc','#666666','#777777']
        // }
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