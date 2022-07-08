import * as React from 'react';
import { Box } from '@mui/system';
import ClassCard from '../../components/TeacherComponents/TeacherClassList';
import Typography from '@mui/material/Typography';
import useFetch from '../../useFetch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Container,  Modal, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Class } from '@mui/icons-material';
import AddClass from './AddClass';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    container:{
        width: 500,
        height: 500,
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        //[theme.breakpoints.down("sm")]:{
        /*"@media (max-width: 1440px)": {
            width: "50vw",
            height: "70vh",
        },*/
    },
}));

const TeacherHome = () => {

    const {data, isLoading, error} = useFetch('http://localhost:5000/subjects');
    //const {data, isLoading, error} = useFetch('http://localhost:5000/subject/myclasses/5d7a514b5d2c12c7449be041');

    const theme = useTheme();
    const history = useHistory();
    const match = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    


    

    return ( 
        <Box
            display='flex'
            flexDirection='column'
            backgroundColor="#EDF5E1"
            sx={{  mt: 8, pl:2,pr:2, width:'100%'}}
        >
            <Box
                marginTop={2}
                marginBottom={2}
                display='flex'
                flexWrap="wrap"
                backgroundColor="#EDF5E1"
                paddingLeft={2}
                //paddingBottom={7}
                sx={{justifyContent:'center'}}
            >
            <Typography
              sx={{fontFamily:"Times New Roman" , fontSize:30,mb:1,mt:1}} 
            >
              My Classes
            </Typography>
            </Box>
           

            <Box
                
                display='flex'
                flexWrap="wrap"
                backgroundColor="#EDF5E1"
                paddingLeft={2}
                paddingTop={2}
                paddingBottom={2}
                sx={{justifyContent:'center'}}
            >
           
                <Button variant="contained" startIcon={<AddIcon />} onClick={()=>{history.push("/teacherHome/addClass");}}
                >
                    Add Class
                </Button>
                
                
            </Box>

            {/* <Box
            >
                <ClassCard /> 
            </Box> */}

            <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:match?'center':'start'}}
            >
                {error && <div>{error}</div>}
                {isLoading && <CircularProgress color="success" />}
                {data && data.data.map((item) => (
                    <div key={item._id}>
                        <ClassCard data={item} />
                    </div>
                ))}
            </Box>
        </Box>
  
    );
}
 
export default TeacherHome;