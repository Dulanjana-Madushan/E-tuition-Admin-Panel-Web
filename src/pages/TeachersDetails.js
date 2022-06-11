import { Box } from '@mui/system';
import ClassCard from '../components/TeacherClassList';
import Typography from '@mui/material/Typography';
import useFetch from '../useFetch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';

import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import CustomPaginationGrid from '../components/TeacherDataTable';


const TeachersDetails = () => {

    const {data, isLoading, error} = useFetch('http://localhost:5000/subjects/myclasses/5d7a514b5d2c12c7449be041');

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);


    

    return (  
        <Box
            display='flex'
            flexDirection='column'
            sx={{  mt: 8, pl:2,pr:2, width:'100%'}}
        >
            <Box
                display='flex'
                flexWrap="wrap"
                backgroundColor="white"
                sx={{justifyContent:'center'}}
            >
            <Typography
              sx={{fontFamily:"Times New Roman" , fontSize:30,mb:1,mt:1}} 
            >
              Teachers Details
            </Typography>
            </Box>

            {/*<Box>
                <CustomPaginationGrid/>
             </Box>*/}
        </Box>
    );
}
export default TeachersDetails;
 
