
 import { Box } from '@mui/system';
 import ClassCard from '../components/TeacherClassList';
 import Typography from '@mui/material/Typography';
 import useFetch from '../useFetch';
 import { useTheme } from '@mui/material/styles';
 import useMediaQuery from '@mui/material/useMediaQuery';
 import CircularProgress from '@mui/material/CircularProgress';
 
 import { useState } from 'react';
 import { makeStyles } from '@mui/styles';
import AnalyzeCard from '../components/AnalyzeCards';
import { useHistory } from 'react-router-dom';
 
 
 const AdminHome = () => {
 
     //const {data, isLoading, error} = useFetch('http://localhost:5000/subjects/myclasses/5d7a514b5d2c12c7449be041');
 
     const theme = useTheme();
     const history = useHistory();
     const match = useMediaQuery(theme.breakpoints.down("sm"));
     const [open, setOpen] = useState(false);
 
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
          text: "Quiziz",
          description: "add quizzes",
          image: "https://img.freepik.com/free-vector/quiz-vector-abstract-banner-with-speech-bubble-megaphone-yellow-black-colors-vector-illustration-eps-10_532800-576.jpg?w=2000",
          onClick: () => history.push("/home/sinhala/quiz")
        },
      ];
     
 
     return (  
         <Box
             display='flex'
             flexDirection='column'
             sx={{  mt: 8, pl:2,pr:2, width:'100%', backgroundColor:"#EDF5E1"}}
         >
             <Box
                 display='flex'
                 flexWrap="wrap"
                 backgroundColor="#edf5e1"
                 sx={{justifyContent:'center'}}
             >
             <Typography
               sx={{fontFamily:"Times New Roman" , fontSize:30,mb:1,mt:1,color:"#05386B"}} 
             >
               Admin Home
             </Typography>
             </Box>
         

             <Box
                display='flex'
                flexWrap="wrap"
                backgroundColor="#EDF5E1"
                sx={{justifyContent:match?'center':'start'}}
            >

                {classitemList.map((item) => (
                    <div key={item._id}>
                        <AnalyzeCard data={item} />
                    </div>
                ))}
            </Box>
             
         </Box>
     );
 }
 export default AdminHome;
  
 