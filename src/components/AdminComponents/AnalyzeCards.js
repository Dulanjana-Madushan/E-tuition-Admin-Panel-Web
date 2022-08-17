import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function AnalyzeCard({data}) {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box  sx={{ m:1}}>
      <Card sx={{width:match?'85vw':350,height:match?'':170, display: 'flex', boxShadow: 12}}  >
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{ flex: '1 0 auto'}}>
          <Typography component="div" variant="h5"  sx={{fontSize:20,mb:1,mt:1,color:"#3F51B5"}}>
            {data.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {data.count}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        sx={{ width: 300 }}
        image={data.image} 
      />
    </Card>   
    </Box>    
  );
}



