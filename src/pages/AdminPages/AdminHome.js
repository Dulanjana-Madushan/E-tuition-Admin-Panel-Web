 import { Box } from '@mui/system';
 import Typography from '@mui/material/Typography';
 import useFetch from '../../services/useFetch';
 import { useTheme } from '@mui/material/styles';
 import useMediaQuery from '@mui/material/useMediaQuery';
 import CircularProgress from '@mui/material/CircularProgress';
 import DialogAlert from '../../components/Dialog';

import AnalyzeCard from '../../components/AdminComponents/AnalyzeCards';
import ColumnChart from '../../components/AdminComponents/ColumnChart';
import { base_url } from '../../Const/Const';

const AdminHome = () => {

  const {data, isLoading, error} = useFetch(base_url+"/admin/");

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("sm"));
 
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
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <div>{error}</div>}
                {isLoading && <CircularProgress color="primary" />}
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
  
 