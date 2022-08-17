import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/system';
import { Typography, CircularProgress, Button, useTheme, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import ClassCard from '../../components/TeacherComponents/TeacherClassCard';
import DialogAlert from '../../components/Dialog';
import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';

const TeacherHome = () => {

    const {data, isLoading, error} = useFetch(base_url + '/subjects/mysubjects');

    const theme = useTheme();
    const navigate = useNavigate();
    const match = useMediaQuery(theme.breakpoints.down("sm"));

    return ( 
        <Box
            display='flex'
            flexDirection='column'
            padding={2}
            sx={{mt: 6, pl:2,pr:2, width:'100%'}}
        >
            <Box
                marginTop = {2}
                display='flex'
                flexWrap="wrap"
                marginBottom={2}
                sx={{justifyContent:'center',backgroundColor:'#D9DDDC',borderRadius: 2}}
            >
                <Typography
                    sx={{fontSize:30,mb:1,mt:1}} 
                >
                    My Classes
                </Typography>
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                flexDirection='row'
                sx={{justifyContent:'right', mb:2}}
            >
                <Button variant="contained" startIcon={<AddIcon />} onClick={()=>{navigate('/teacher/subjects');}}
                sx={{backgroundColor:"#4b0082",color:"white"}}>
                    Add Class
                </Button>          
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:'center'}}
            >
                {error && error === 'Token Expired' && <DialogAlert></DialogAlert>}
                {error && <div>{error}</div>}
                {isLoading && <CircularProgress color="success" />}
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:match?'center':'start'}}
            >
                {data && data.map((item) => (
                    <div key={item._id}>
                        <ClassCard data={item} />
                    </div>
                ))}
            </Box>
        </Box>
  
    );
}
 
export default TeacherHome;