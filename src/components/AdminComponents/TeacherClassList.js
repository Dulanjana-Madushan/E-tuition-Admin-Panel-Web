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
      transform: "scale3d(1.2, 1.2, 1)",
      transition: "1s"
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
    <Box
      sx={{backgroundColor:'#EDF5E1', m:1}}
    >
      <Card
        sx={{width:match?'85vw':200,height:match?'':316}} onClick={()=>{
          history.push("/classdetails/"+data._id);
      }}
      >
      <CardActionArea>
        <CardMedia
          // component="img"
          alt="class media"
          className={classes.media}
          style={{height: 50, paddingTop: '56.25%'}}
          image={data.post.webContentLink}
        />
        <CardContent>
          <Typography gutterBottom height={30} overflow='clip' variant="h5" component="div">
            {data.subject}
          </Typography>
          <Typography height={55} overflow='clip' variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
        
        </CardActionArea>
      </Card>
    </Box>
  );
}