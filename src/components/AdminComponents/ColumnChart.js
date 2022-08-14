import Chart from 'react-apexcharts';
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../../Const/Const';
import useFetch from '../../services/useFetch';


function ColumnChart() {
  // const {data, isLoading, error} = useFetch(base_url+"/admin/");
  // console.log(data);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [science, setScience] = useState(null);
  const [art, setArt] = useState(null);
  const [commerece,setCommerce] = useState(null);

  useEffect(()=>{
    const abortCont = new AbortController();

    fetch(base_url+"/admin/analytics", {
        method: 'GET',
        headers: {"Content-Type":"application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')}},
    {signal:abortCont.signal})
        .then(res =>{
            // if(!res.ok){
            //     throw Error('Could not fetch data');
            // }
            return res.json();
        })
        .then(data => {
            if(data['success']){
                setData(data['data']);
                console.log("blaaah",data);
                setScience(data.science);
                console.log(data.science);
            }else{
                setError(data['error'])
            }
            setIsLoading(false);
            // setError(null);
        })
        .catch(err => {
            if(err.name === "AbortError"){
                console.log('Fetch aborted');
            }else{
                setIsLoading(false);
                setError(err.message);
            }
        })

        return () => abortCont.abort();

},[base_url+"/admin/analytics"])
 

  return (
    <Chart
      type="bar"
      height={400}
      width={500}
      series={[
         {
        //     //name:'teachers',
            data : [4,4,6]
        //data : data && data.map(o => o.count)
        //     //color:['#cccccc','#666666','#777777']
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