import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box } from '@mui/system';
import { 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActionArea, 
  useTheme, 
  useMediaQuery } from '@mui/material';

import add_materials from '../../images/ClassGrid/add_materials.png';
import quiz from '../../images/ClassGrid/quiz.png';
import announcements from '../../images/ClassGrid/announcements.png';
import payments from '../../images/ClassGrid/payments.png';
import list from '../../images/ClassGrid/list.png';
import add_students from '../../images/ClassGrid/add_students.png';
import review from '../../images/ClassGrid/review.png';

//"https://img.freepik.com/free-vector/quiz-word-concept_23-2147844150.jpg?w=2000"
//"https://img.freepik.com/free-vector/noisy-big-megaphone_74855-7630.jpg?w=2000"
//"https://img.freepik.com/free-vector/concept-credit-card-payment-landing-page_52683-24923.jpg?1?w=360"
//"https://img.freepik.com/free-vector/set-social-people-media-profile-member_24877-53571.jpg?w=2000"
//"https://img.freepik.com/free-vector/focused-tiny-people-reading-books_74855-5836.jpg?w=2000"
//"https://img.freepik.com/free-vector/organic-flat-feedback-concept_52683-62653.jpg?size=626&ext=jpg&ga=GA1.2.1329645765.1658573936"

export default function Class({data}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const match = useMediaQuery(theme.breakpoints.down("sm"));
  const { subjectid } = useParams();

  const classitemList = [
    {
      _id: 1,
      text: "Class Materials",
      description: "notes,documents,tutorials and other materials",
      image: add_materials,
      onClick: () => navigate("/teacher/subjects/" + subjectid + "/lms")
    },
    {
      _id: 2,
      text: "Quiz",
      description: "create quizzes",
      image: quiz,
      onClick: () => navigate("/teacher/subjects/" + subjectid + "/quiz")
    },
    {
      _id: 3,
      text: "Announcements",
      description: "send and view announcements",
      image: announcements,
      onClick: () => navigate("/teacher/subjects/" + subjectid + "/announcements")
    },
    {
      _id: 4,
      text: "Payments",
      description: "student payment list",
      image: payments,
      onClick: () => navigate("/teacher/subjects/" + subjectid + "/payments")
    },
    {
      _id: 5,
      text: "Student list",
      description: "view the student list",
      image: list,
      onClick: () => navigate("/teacher/subjects/" + subjectid + "/studentList")
    },
    {
      _id: 6,
      text: "Add student",
      description: "add students to the class manually",
      image: add_students,
      onClick: () => navigate("/teacher/subjects/" + subjectid + "/addStudents")
    },
    {
      _id: 7,
      text: "Reviews",
      description: "view reviews",
      image: review,
      onClick: () => navigate("/teacher/subjects/" + subjectid + "/reviews")
    },
    
  ];

  return (
            <Box
                display='flex'
                flexWrap="wrap"
                paddingBottom={4}
                sx={{ mt: 9, pl:2,pr:2,justifyContent:match?'center':'center'}}
            >
                {classitemList.map((item) => {
                  const { _id,text,description,image,onClick } = item;
                  return (
                    <Box margin = {1}>
                      <Card 
                        onClick={onClick}
                        sx={{width:match?'85vw':350,height:match?225:225,boxShadow:5}} 
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="image"
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
    
    // <Box
    //   display='flex'
    //   flexWrap='wrap'
    //   sx={{ mt: 9, pl:2,pr:2, justifyContent:match?'center':'start'}}  
    // >
    //   {classitemList.map((item) => {
    //     const { _id,text,description,image,onClick } = item;
    //     return (
    //       <Box margin = {1}>
    //         <Card 
    //           onClick={onClick}
    //           sx={{width:match?'85vw':350,height:match?225:225}} 
    //         >
    //           <CardActionArea>
    //             <CardMedia
    //               component="img"
    //               alt="add material"
    //               style={{height: 140}}
    //               image={image}
    //             ></CardMedia>
    //             <CardContent>
    //               <Typography variant="h6" component="div">
    //                 {text}
    //               </Typography>
    //               <Typography variant="body2" color="text.secondary">
    //                 {description}
    //               </Typography>
    //             </CardContent>
    //           </CardActionArea>  
    //         </Card> 
    //       </Box>      
    //     );
    //   })}
    // </Box>
  );
}