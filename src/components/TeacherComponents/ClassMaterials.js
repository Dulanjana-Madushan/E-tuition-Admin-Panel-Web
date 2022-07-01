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

export default function MaterialGrid({data}) {
  // const [width, setWidth] = React.useState(300)
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();



  const match = useMediaQuery(theme.breakpoints.down("sm"));

  const classitemList = [
    {
      _id: 1,
      text: "Class Materials",
      description: "desc",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOEuaL14xHFILfpNxSISzrJE3bnBckLdpHvA&usqp=CAU",
      onClick: () => history.push("/home/sinhala/classMaterials")
    },
    {
      _id: 2,
      text: "Announcements",
      description: "send and view announcements",
      image: "https://img.freepik.com/free-vector/noisy-big-megaphone_74855-7630.jpg?w=2000",
      onClick: () => history.push("/home/sinhala/announcements")
    },
    {
      _id: 3,
      text: "Payments",
      description: "payment list",
      image: "https://img.freepik.com/free-vector/concept-credit-card-payment-landing-page_52683-24923.jpg?1?w=360",
      onClick: () => history.push("/home/sinhala/payments")
    },
    {
      _id: 4,
      text: "Student list",
      description: "view the student list",
      image: "https://img.freepik.com/free-vector/set-social-people-media-profile-member_24877-53571.jpg?w=2000",
      onClick: () => history.push("/home/sinhala/studentList")
    },
    {
      _id: 5,
      text: "Add student",
      description: "add students to the class",
      image: "https://img.freepik.com/free-vector/focused-tiny-people-reading-books_74855-5836.jpg?w=2000",
      onClick: () => history.push("/home/sinhala/addStudent")
    },
    {
      _id: 6,
      text: "Quiz",
      description: "add quizzes",
      image: "https://img.freepik.com/free-vector/quiz-vector-abstract-banner-with-speech-bubble-megaphone-yellow-black-colors-vector-illustration-eps-10_532800-576.jpg?w=2000",
      onClick: () => history.push("/home/sinhala/quiz")
    },
  ];

  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{ mt: 8, pl:2,pr:2, width:'100%'}}  
    >
      <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:match?'center':'start'}}
            >
    {classitemList.map((item, index) => {
        const { _id,text,description,image,onClick } = item;
            return (
              <Box  sx={{backgroundColor:'white', m:1}}>
              <Card onClick={onClick}
        sx={{width:match?'85vw':200,height:match?'':275}} 
      >
      <CardActionArea>
        <CardMedia
          // component="img"
          alt="add material"
          className={classes.media}
          style={{height: 50, paddingTop: '50.25%'}}
          image={image}
          
        ></CardMedia>
        <CardContent>
          <Typography gutterBottom height={30} overflow='clip' variant="h5" component="div">
            {text}
          </Typography>
          <Typography height={55} overflow='clip' variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        </CardActionArea>  
      </Card> 
      </Box>      
       );
    })}
    </Box>
</Box>
  );
}

  {/*<Box>
    <Grid container spacing={1}>
    <Grid item md={3} sm={12}>
    <Card
        sx={{width:match?'85vw':200,height:match?'':316}}
      >
        <CardMedia
          // component="img"
          alt="add material"
          className={classes.media}
          style={{height: 50, paddingTop: '50.25%'}}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOEuaL14xHFILfpNxSISzrJE3bnBckLdpHvA&usqp=CAU"
          
        />
        <CardContent>
          <Typography gutterBottom height={30} overflow='clip' variant="h5" component="div">
            {//{data.subject}}Class materialS
          </Typography>
          <Typography height={55} overflow='clip' variant="body2" color="text.secondary">
            {//{data.description}}add notes and other documents
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item md={3} sm={12}>
    <Card
        sx={{width:match?'85vw':200,height:match?'':250}}
      >
        <CardMedia
          // component="img"
          alt="annoncements"
          className={classes.media}
          style={{height: 50, paddingTop: '50.25%'}}
          image="https://img.freepik.com/free-vector/noisy-big-megaphone_74855-7630.jpg?w=2000"
        />
        <CardContent>
          <Typography gutterBottom height={30} overflow='clip' variant="h5" component="div">
            {//{data.subject}}Announcements 
          </Typography>
          <Typography height={55} overflow='clip' variant="body2" color="text.secondary">
            {//{data.description}}Add and view notifications
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item md={3} sm={12}>
    <Card
        sx={{width:match?'85vw':200,height:match?'':316}}
      >
        <CardMedia
          // component="img"
          alt="payments"
          className={classes.media}
          style={{height: 50, paddingTop: '56.25%'}}
          image="https://img.freepik.com/free-vector/concept-credit-card-payment-landing-page_52683-24923.jpg?1?w=360"
        />
        <CardContent>
          <Typography gutterBottom height={30} overflow='clip' variant="h5" component="div">
            {//{data.subject}}Payments
          </Typography>
          <Typography height={55} overflow='clip' variant="body2" color="text.secondary">
            {//{data.description}}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item md={3} sm={12}>
    <Card
        sx={{width:match?'85vw':200,height:match?'':316}}
      >
        <CardMedia
          // component="img"
          alt="student list"
          className={classes.media}
          style={{height: 50, paddingTop: '56.25%'}}
          image="https://img.freepik.com/free-vector/set-social-people-media-profile-member_24877-53571.jpg?w=2000"
        />
        <CardContent>
          <Typography gutterBottom height={30} overflow='clip' variant="h5" component="div">
            {//{data.subject}}student list
          </Typography>
          <Typography height={55} overflow='clip' variant="body2" color="text.secondary">
            {//{data.description}}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item md={3} sm={12}>
    <Card
        sx={{width:match?'85vw':200,height:match?'':316}}
      >
        <CardMedia
          // component="img"
          alt="add student"
          className={classes.media}
          style={{height: 50, paddingTop: '56.25%'}}
          image="https://img.freepik.com/free-vector/focused-tiny-people-reading-books_74855-5836.jpg?w=2000"
        />
        <CardContent>
          <Typography gutterBottom height={30} overflow='clip' variant="h5" component="div">
            {//{data.subject}}add student
          </Typography>
          <Typography height={55} overflow='clip' variant="body2" color="text.secondary">
            {//{data.description}}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item md={3} sm={12}>
    <Card
        sx={{width:match?'85vw':200,height:match?'':316}}
      >
        <CardMedia
          // component="img"
          alt="quiz"
          className={classes.media}
          style={{height: 50, paddingTop: '56.25%'}}
          image="https://img.freepik.com/free-vector/quiz-vector-abstract-banner-with-speech-bubble-megaphone-yellow-black-colors-vector-illustration-eps-10_532800-576.jpg?w=2000"
        />
        <CardContent>
          <Typography gutterBottom height={30} overflow='clip' variant="h5" component="div">
            {//{data.subject}}quiz
          </Typography>
          <Typography height={55} overflow='clip' variant="body2" color="text.secondary">
            {//{data.description}}
          </Typography>
        </CardContent>
      </Card>                                                                                                                                                                                                                                                                                                              
    </Grid>
  </Grid>

  </Box>
  );
}*/}


