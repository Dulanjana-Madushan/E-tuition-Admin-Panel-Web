import { Box } from '@mui/system';
//import ClassCard from '../../components/TeacherClassList';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';

import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Image from '../images/web_nav_logo.png';


const PageNotFound = () => {

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = useState(false);


    

    return (  
        <Box
            display='flex'
            flexDirection='column'
            sx={{  mt: 8,width:'100%', backgroundColor:"white"}}
        >
            <Box
                marginTop = {2}
                marginBottom = {2}
                display='flex'
                flexWrap="wrap"
                //backgroundColor="#EDf5e1"
                //paddingLeft={2}
                paddingBottom={2}
               sx={{justifyContent:'center'}}>

            <Typography
              sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}}  
            >
              404 : page not found
            </Typography>
            </Box>

            <Box
            display='flex'
            flexWrap="wrap"
            sx={{justifyContent:'center'
            //,backgroundColor:"#EDf5e1"
            }}
            >
                 <div>
                    <img alt="profile" height="250px" src={Image}/>
                </div>
            </Box>
           

        
        </Box>
    );
}
 
export default PageNotFound;

