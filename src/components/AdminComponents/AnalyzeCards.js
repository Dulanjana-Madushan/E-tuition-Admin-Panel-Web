import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles }from '@mui/styles';
import List from '@mui/material/List';
import { CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';

//import add from './images/class/add.png';
//import announcemet from './images/class/announcement.png';
//import clipboard from './images/class/clipboard.png';
//import online from './images/class/online.png';
//import students from './images/class/students.png';
//import add from './images/class/add.png';


const useStyles = makeStyles({
  media: {
    "&:hover": {
      transform: "scale3d(1.2, 1.2, 1)",
      transition: "1s"
    }
  }
});

export default function AnalyzeCard({data}) {
  // const [width, setWidth] = React.useState(300)
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const match = useMediaQuery(theme.breakpoints.down("sm"));



  return (
    <Box  sx={{backgroundColor:"#EDf5E1" , m:1}}>
      <Card sx={{width:match?'85vw':350,height:match?'':170, display: 'flex', boxShadow: 12}}  >
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5"  sx={{fontSize:20,mb:1,mt:1,color:"#05386B"}}>
            {data.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {data.count}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image={data.image} 
      />
    </Card>
        
      </Box>    
  );
}



