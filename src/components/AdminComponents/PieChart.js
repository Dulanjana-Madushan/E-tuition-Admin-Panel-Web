//import React, { PureComponent } from 'react'
//import { PieChart, Pie, Legend,Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chart from 'react-apexcharts';


function FirstPieChart() {
  return (
    <Chart
      type="pie"
      width={400}
      height={400}
      series={[400,250]}
      options={{
        labels:['Students','Teachers']
      }}
  >

    </Chart>
  )
}


{/*const data = [
    { name: 'Students', value: 400 },
    { name: 'Teachers', value: 300 },
   
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  

function FirstPieChart() {

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ResponsiveContainer width="100%" aspect={2/1}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            labelLine={false}
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={110}
            fill="#05386b"
            label={renderCustomizedLabel}
          />

            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
     
  )
}*/}

export default FirstPieChart;