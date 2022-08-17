import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles }from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  media: {
    "&:hover": {
      backgroundColor: "#f2f2f2",
      transform: "scale3d(1, 1, 1)",
      transition: "0.5s"
    }
  }
});

export default function ClassCard({data}) {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();

  const match = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box  sx={{ m:1}}>
    <Card sx={{width:match?'85vw':350,height:match?'':170, display: 'flex'}} onClick={()=>{
           navigate("/admin/classdetails/"+data._id);}} className={classes.media}>
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <CardContent sx={{ flex: '1 0 auto'}}>
        <Typography component="div" variant="h5"  sx={{fontSize:20,mb:1,mt:1,color:"#3F51B5"}}>
          {data.subject}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {data.description}
        </Typography>
      </CardContent>
    </Box>
    <CardMedia
      component="img"
      sx={{ width: 151 }}
      image={data.post.webContentLink} 
    />
  </Card>
  </Box>
  );
}