import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Box } from '@mui/system';
import { makeStyles }from '@mui/styles';
import { Typography, Card, CardMedia, CardContent, CardActionArea, useTheme, useMediaQuery } from '@mui/material';

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
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const match = useMediaQuery(theme.breakpoints.down("sm"));
  const { subjectid } = useParams();

  const classitemList = [
    {
      _id: 1,
      text: "Class Materials",
      description: "desc",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOEuaL14xHFILfpNxSISzrJE3bnBckLdpHvA&usqp=CAU",
      onClick: () => history.push("/subjects/" + subjectid + "/lms")
    },
    {
      _id: 2,
      text: "Quiz",
      description: "add quizzes",
      image: "https://img.freepik.com/free-vector/quiz-word-concept_23-2147844150.jpg?w=2000",
      onClick: () => history.push("/subjects/" + subjectid + "/quiz")
    },
    {
      _id: 3,
      text: "Announcements",
      description: "send and view announcements",
      image: "https://img.freepik.com/free-vector/noisy-big-megaphone_74855-7630.jpg?w=2000",
      onClick: () => history.push("/home/sinhala/announcements")
    },
    {
      _id: 4,
      text: "Payments",
      description: "payment list",
      image: "https://img.freepik.com/free-vector/concept-credit-card-payment-landing-page_52683-24923.jpg?1?w=360",
      onClick: () => history.push("/home/sinhala/payments")
    },
    {
      _id: 5,
      text: "Student list",
      description: "view the student list",
      image: "https://img.freepik.com/free-vector/set-social-people-media-profile-member_24877-53571.jpg?w=2000",
      onClick: () => history.push("/home/sinhala/studentList")
    },
    {
      _id: 6,
      text: "Add student",
      description: "add students to the class",
      image: "https://img.freepik.com/free-vector/focused-tiny-people-reading-books_74855-5836.jpg?w=2000",
      onClick: () => history.push("/home/sinhala/addStudent")
    },
    {
      _id: 7,
      text: "Reviews",
      description: "view reviews",
      image: "https://img.freepik.com/free-vector/organic-flat-feedback-concept_52683-62653.jpg?size=626&ext=jpg&ga=GA1.2.1329645765.1658573936",
      onClick: () => history.push("/subjects/" + subjectid + "/reviews")
    },
    
  ];

  return (
    <Box
      display='flex'
      flexWrap='wrap'
      sx={{ mt: 9, pl:2,pr:2, justifyContent:match?'center':'start'}}  
    >
      {classitemList.map((item) => {
        const { _id,text,description,image,onClick } = item;
        return (
          <Box margin = {1}>
            <Card 
              onClick={onClick}
              sx={{width:match?'85vw':350,height:match?225:225}} 
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="add material"
                  className={classes.media}
                  style={{height: 140}}
                  image={image}
                ></CardMedia>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {text}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
              </CardActionArea>  
            </Card> 
          </Box>      
        );
      })}
    </Box>
  );
}