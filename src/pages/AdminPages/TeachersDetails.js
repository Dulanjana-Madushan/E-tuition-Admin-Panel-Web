import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import useFetch from '../../services/useFetch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
//import CustomPaginationGrid from '../components/TeacherDataTable';
import TeacherTable from '../../components/AdminComponents/TeacherDataTable';
import CircularProgress from '@mui/material/CircularProgress';

const TeachersDetails = () => {

    

    // const theme = useTheme();
    // const match = useMediaQuery(theme.breakpoints.down("sm"));
    // const [open, setOpen] = useState(false);

    return (  
        <Box
            display='flex'
            flexDirection='column'
            sx={{  mt: 8, pl:2,pr:2, width:'100%'}}
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
              sx={{fontSize:30,mb:1,mt:1}} 
            >
              Teachers Details
            </Typography>
            </Box>


            <Box
            display='flex'
            flexWrap="wrap"
            sx={{justifyContent:'center'}}
            >
                
                <TeacherTable/>
            </Box>


            {/*<Box>
                <CustomPaginationGrid/>
    </Box>*/}

            
        </Box>
    );
}
export default TeachersDetails;
 
