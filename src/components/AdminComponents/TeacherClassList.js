import * as React from 'react';
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
import { CardActionArea } from '@mui/material';
import { useHistory,useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MaterialGrid from './ClassMaterials';

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
  // const [width, setWidth] = React.useState(300)
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const { subjectid } = useParams();

  const match = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box  sx={{ m:1}}>
    <Card sx={{width:match?'85vw':350,height:match?'':170, display: 'flex'}} onClick={()=>{
           history.push("/classdetails/"+data._id);}} className={classes.media}>
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

    // <Box
    //   sx={{backgroundColor:'#EDF5E1', m:1}}
    // >
    //   <Card
    //     sx={{width:match?'85vw':200,height:match?'':316}} onClick={()=>{
    //       history.push("/classdetails/"+data._id);
    //   }}
    //   >
    //   <CardActionArea>
    //     <CardMedia
    //       // component="img"
    //       alt="class media"
    //       className={classes.media}
    //       style={{height: 50, paddingTop: '56.25%'}}
    //       image={data.post.webContentLink}
    //     />
    //     <CardContent>
    //       <Typography gutterBottom height={30} overflow='clip' variant="h5" component="div">
    //         {data.subject}
    //       </Typography>
    //       <Typography height={55} overflow='clip' variant="body2" color="text.secondary">
    //         {data.description}
    //       </Typography>
    //     </CardContent>
        
    //     </CardActionArea>
    //   </Card>
    // </Box>
  );
}