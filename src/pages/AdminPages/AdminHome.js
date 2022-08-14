
 import { Box } from '@mui/system';
 import ClassCard from '../../components/AdminComponents/TeacherClassList';
 import Typography from '@mui/material/Typography';
 import useFetch from '../../services/useFetch';
 import { useTheme } from '@mui/material/styles';
 import useMediaQuery from '@mui/material/useMediaQuery';
 import CircularProgress from '@mui/material/CircularProgress';
 
import { makeStyles } from '@mui/styles';
import AnalyzeCard from '../../components/AdminComponents/AnalyzeCards';
import { useHistory } from 'react-router-dom';
import FirstPieChart from '../../components/AdminComponents/PieChart';
import ColumnChart from '../../components/AdminComponents/ColumnChart';
import { base_url } from '../../Const/Const';
import { useState, useEffect } from "react";
import { StudentDetails,TeacherDetails,ClassDetails } from '../../Const/AnalyzeData';
 
// const useStyles = makeStyles({
//   container:{
//     backgroundColor: "#EDF5E1"
//   }
// }); 

const AdminHome = () => {

  const {data, isLoading, error} = useFetch(base_url+"/admin/");
  console.log(data);
  const [teacher, setTeacher] = useState(null);

  
 
  const theme = useTheme();
  const history = useHistory();
  //const classes =useStyles();
  const match = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
     
 
     return (  
     
         <Box
             display='flex'
             flexDirection='column'
             sx={{  mt: 8, pl:2,pr:2, width:'100%', 
             backgroundColor:"white"
            }}
         >
             <Box
                 marginTop = {2}
                 marginBottom = {2}
                 display='flex'
                 flexWrap="wrap"
                 //backgroundColor="#EDf5e1"
                 paddingLeft={2}
                 paddingBottom={2}
                 sx={{justifyContent:'center',backgroundColor:'#F2F2F2',borderRadius: 2}}
             >
             <Typography
               sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}} 
             >
               Dashboard
             </Typography>
             </Box>
         

             <Box
                display='flex'
                flexWrap="wrap"
                paddingBottom={2}
                sx={{justifyContent:match?'center':'center'}}
            >
                {isLoading && <CircularProgress color="success" />}
                {data && data.map((item) => (
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
               sx={{fontSize:20,mb:1,mt:1,color:"#3F51B5"}} 
              >
               User Details
             </Typography>

            </Box>


            <Box
              display='flex'
              flexWrap="wrap"
              
              sx={{justifyContent:'center',width:'100%',}}
            >
                 <ColumnChart/>
             </Box>
             
            
         </Box>

     );
 }
 export default AdminHome;
  
 