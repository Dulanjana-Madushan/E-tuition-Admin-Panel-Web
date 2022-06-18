
 import { Box } from '@mui/system';
 import ClassCard from '../../components/AdminComponents/TeacherClassList';
 import Typography from '@mui/material/Typography';
 import useFetch from '../../useFetch';
 import { useTheme } from '@mui/material/styles';
 import useMediaQuery from '@mui/material/useMediaQuery';
 import CircularProgress from '@mui/material/CircularProgress';
 
 import { useState } from 'react';
 import { makeStyles } from '@mui/styles';
import AnalyzeCard from '../../components/AdminComponents/AnalyzeCards';
import { useHistory } from 'react-router-dom';
import FirstPieChart from '../../components/AdminComponents/PieChart';
 
// const useStyles = makeStyles({
//   container:{
//     backgroundColor: "#EDF5E1"
//   }
// }); 

 const AdminHome = () => {
 
     //const {data, isLoading, error} = useFetch('http://localhost:5000/subjects/myclasses/5d7a514b5d2c12c7449be041');
 
     const theme = useTheme();
     const history = useHistory();
     //const classes =useStyles();
     const match = useMediaQuery(theme.breakpoints.down("sm"));
     const [open, setOpen] = useState(false);
 
     const classitemList = [
        {
          _id: 1,
          text: "All students",
          number: "2000",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOEuaL14xHFILfpNxSISzrJE3bnBckLdpHvA&usqp=CAU",
 
        },
        {
          _id: 2,
          text: "All Teachers",
          number: "82",
          image: "https://img.freepik.com/free-vector/noisy-big-megaphone_74855-7630.jpg?w=2000"
          
        },
        {
          _id: 3,
          text: "All Classes",
          number: "3257",
          image: "https://img.freepik.com/free-vector/focused-tiny-people-reading-books_74855-5836.jpg?w=2000"
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
                 backgroundColor="#EDf5e1"
                 paddingLeft={2}
                 paddingBottom={7}
                 sx={{justifyContent:'left'}}
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
                paddingBottom={2}
                sx={{justifyContent:match?'center':'start'}}
            >

                {classitemList.map((item) => (
                    <div key={item._id}>
                        <AnalyzeCard data={item} />
                    </div>
                ))}
            </Box>


            <Box
               display='flex'
               flexWrap="wrap"
               paddingLeft={2}
               sx={{justifyContent:'left'}}
              >
              <Typography
               sx={{fontFamily:"Times New Roman" , fontSize:20,mb:1,mt:1,color:"#05386B"}} 
              >
               User Details
             </Typography>

            </Box>
            <Box
              display='flex'
              flexWrap="wrap"
              
              paddingLeft={4}
            >
                 <FirstPieChart/>
             </Box>
             
            
         </Box>

     );
 }
 export default AdminHome;
  
 