import { useNavigate, useParams, Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Avatar, CircularProgress, Rating, Typography } from '@mui/material';

const StudentList = () => {

    return (
        <Box 
            display='flex'
            flexDirection='column'
            sx={{ mt: 8, pl:2,pr:2, width:'100%'}}  
        >
             <Box
                marginTop = {2}
                display='flex'
                flexWrap="wrap"
                marginBottom={2}
                sx={{justifyContent:'center',backgroundColor:'#D9DDDC'}}
            >
            <Typography
                sx={{fontFamily:"Times New Roman" , fontSize
                :30,}}
            >
                StudentList
            </Typography>
            </Box>
        </Box>
    );
}
 
export default StudentList;