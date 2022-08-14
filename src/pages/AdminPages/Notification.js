import { Box } from '@mui/system';
//import ClassCard from '../../components/TeacherClassList';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';

import { useState } from 'react';
import { makeStyles } from '@mui/styles';


const Notification = () => {

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);


    

    return (  
        <Box
            display='flex'
            flexDirection='column'
            sx={{  mt: 8, pl:2,pr:2, width:'100%', backgroundColor:"white"}}
        >
            <Box
                marginTop = {2}
                marginBottom = {2}
                display='flex'
                flexWrap="wrap"
                //backgroundColor="#EDf5e1"
                paddingLeft={2}
                paddingBottom={2}
               sx={{justifyContent:'center',backgroundColor:'#F2F2F2',borderRadius: 2}}>

            <Typography
              sx={{fontSize:30,mb:1,mt:1}} 
            >
              Notifications
            </Typography>
            </Box>
           

        
        </Box>
    );
}
 
export default Notification;

